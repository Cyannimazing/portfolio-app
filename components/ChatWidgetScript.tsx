"use client";
import { useEffect } from "react";

export function ChatWidgetScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://server6611.aworkinsight.dk/browser-ui/chat-widget-loader.js";
    script.setAttribute("data-widget-id", "18cb5e6e-c542-4532-9fd8-552718823854");
    script.setAttribute("data-api-base", "https://server6611.aworkinsight.dk/api");
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
}
