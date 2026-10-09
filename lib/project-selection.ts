// Browsing stays on /works. Selection is a session preference, never a route.
let selectedId = 1;
export const projectSelectionEvent = "portfolio-project-selection";
export function subscribeProjectSelection(onChange: () => void) {
  window.addEventListener(projectSelectionEvent, onChange);
  return () => window.removeEventListener(projectSelectionEvent, onChange);
}
export function readProjectCollection() {
  try {
    const path = sessionStorage.getItem("portfolio-project-collection");
    return path === "/works" || path?.startsWith("/works?") ? path : "/works";
  } catch { return "/works"; }
}
export function rememberProjectCollection(path: string) {
  try { sessionStorage.setItem("portfolio-project-collection", path); } catch { /* Optional session preference. */ }
  window.dispatchEvent(new Event(projectSelectionEvent));
}
export function readProjectSelection() {
  try { return Number(sessionStorage.getItem("portfolio-selected-project")) || selectedId; }
  catch { return selectedId; }
}
export function selectProject(id: number) {
  selectedId = id;
  try { sessionStorage.setItem("portfolio-selected-project", String(id)); } catch { /* Session storage can be unavailable in private browsing. */ }
  window.dispatchEvent(new Event(projectSelectionEvent));
}
