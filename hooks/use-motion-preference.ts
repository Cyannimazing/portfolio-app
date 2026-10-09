"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

// Match the server render, then enable motion after reading the user's preference.
export function useMotionPreference() {
  return useSyncExternalStore(subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true);
}
