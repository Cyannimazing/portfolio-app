"use client";
import { useEffect } from "react";

export function ChatWidgetScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://127.0.0.1:8000/browser-ui/chat-widget-loader.js";
    script.setAttribute("data-widget-id", "af89018d-2113-411d-946a-e60a32abddbb");
    script.setAttribute("data-api-base", "http://127.0.0.1:8000/api");
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
}
