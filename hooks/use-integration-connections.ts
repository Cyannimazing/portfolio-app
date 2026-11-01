"use client";

import { useEffect, useState, type RefObject } from "react";
import { integrationConnection } from "@/lib/integration-geometry";

type Connections = { width: number; height: number; paths: { id: string; path: string }[] };

export function useIntegrationConnections(ref: RefObject<HTMLButtonElement | null>) {
  const [connections, setConnections] = useState<Connections>({ width: 0, height: 0, paths: [] });

  useEffect(() => {
    const container = ref.current;
    const hub = container?.querySelector<HTMLElement>("[data-integration-hub]");
    if (!container || !hub) return;
    const nodes = [...container.querySelectorAll<HTMLElement>("[data-integration-node]")];
    let frame = 0;
    let disposed = false;
    const measure = () => {
      const bounds = container.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;
      const relativeRect = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x - bounds.x, y: rect.y - bounds.y, width: rect.width, height: rect.height };
      };
      const target = relativeRect(hub);
      const next: Connections = {
        width: bounds.width, height: bounds.height,
        paths: nodes.map(node => ({ id: node.dataset.integrationNode!, path: integrationConnection(relativeRect(node), target) })),
      };
      setConnections(current => current.width === next.width && current.height === next.height
        && current.paths.every((item, index) => item.path === next.paths[index]?.path)
        && current.paths.length === next.paths.length ? current : next);
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    [container, hub, ...nodes].forEach(element => observer.observe(element));
    const card = container.closest("[data-entered]");
    card?.addEventListener("animationend", schedule);
    void document.fonts.ready.then(schedule);
    schedule();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); card?.removeEventListener("animationend", schedule); };
  }, [ref]);

  return connections;
}
