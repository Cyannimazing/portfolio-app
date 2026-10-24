// Intro safeguards count time the visitor can actually see, matching playback.
export function scheduleVisibleTimeout(callback: () => void, delay: number): () => void {
  let remaining = Math.max(0, delay);
  let handle: number | null = null;
  let startedAt = 0;
  let cancelled = false;

  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    if (handle !== null) window.clearTimeout(handle);
    document.removeEventListener("visibilitychange", visibility);
  };
  const arm = () => {
    if (cancelled || document.hidden || handle !== null) return;
    startedAt = performance.now();
    handle = window.setTimeout(() => {
      cancel();
      callback();
    }, remaining);
  };
  function visibility() {
    if (document.hidden) {
      if (handle !== null) {
        window.clearTimeout(handle);
        handle = null;
        remaining = Math.max(0, remaining - (performance.now() - startedAt));
      }
    } else arm();
  }

  document.addEventListener("visibilitychange", visibility);
  arm();
  return cancel;
}
