import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = "Cyril AI | Your next idea. Fully built.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", color: "#f1f7fa", background: "#10191e", fontFamily: "sans-serif", border: "1px solid #35515f" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>Cyril<span style={{ color: "#62dcf3", marginLeft: 7 }}>AI</span></div>
        <div style={{ display: "flex", color: "#94c8d8", fontSize: 19 }}>FULL STACK DEVELOPMENT</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>Your next idea.</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -4, color: "#62dcf3" }}>Fully built.</div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 24, color: "#c1ced7" }}>Websites, business software &amp; automation.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #35515f", paddingTop: 22, fontSize: 20, color: "#c1ced7" }}>
        <span>{siteConfig.owner}</span><span>{new URL(siteConfig.url).host}</span>
      </div>
    </div>, size,
  );
}
