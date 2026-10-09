const MAX_BYTES = 64 * 1024;
const MAX_REPORTS = 20;
const responseHeaders = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

function respond(status: number) {
  return new Response(null, { status, headers: responseHeaders });
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Keep only short machine-readable fields. Never log raw reports, user agents,
// URL paths/queries, script samples, IP addresses, or request headers.
function token(value: unknown) {
  return typeof value === "string" && /^[a-zA-Z0-9_.-]{1,64}$/.test(value) ? value : undefined;
}

function summary(value: unknown) {
  if (!record(value) || !record(value.body)) return null;
  const { body, type } = value;
  if (type === "csp-violation") {
    const directive = token(body.effectiveDirective ?? body["effective-directive"]);
    return directive ? { type, directive, disposition: token(body.disposition) } : null;
  }
  if (type === "coep") {
    const violation = token(body.type);
    return violation ? { type, violation, destination: token(body.destination) } : null;
  }
  if (type === "network-error") {
    const error = token(body.type);
    return error ? { type, error, phase: token(body.phase) } : null;
  }
  return null;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim();
  if (contentType !== "application/reports+json" && contentType !== "application/csp-report") return respond(415);

  // Browser reports come back to the same origin; do not accept cross-site posts.
  if (request.headers.get("sec-fetch-site") === "cross-site") return respond(403);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return respond(403);
  if (Number(request.headers.get("content-length")) > MAX_BYTES) return respond(413);
  if (!request.body) return respond(400);

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        return respond(413);
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch {
    return respond(400);
  } finally {
    reader.releaseLock();
  }

  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return respond(400);
  }
  const reports = record(payload) && record(payload["csp-report"])
    ? [{ type: "csp-violation", body: payload["csp-report"] }]
    : payload;
  if (!Array.isArray(reports) || reports.length === 0 || reports.length > MAX_REPORTS) return respond(400);

  const summaries = reports.map(summary).filter(value => value !== null);
  if (summaries.length) console.info("browser-policy-report", JSON.stringify(summaries));
  return respond(204);
}
