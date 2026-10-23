export const portfolioThemes = ["terminal-dark", "terminal-light"] as const;
export type PortfolioTheme = (typeof portfolioThemes)[number];

export const defaultPortfolioTheme: PortfolioTheme = "terminal-dark";
export const themeStorageKey = "cyril-portfolio-theme";
const themeChangeEvent = "cyril-portfolio-theme-change";

export function isPortfolioTheme(value: unknown): value is PortfolioTheme {
  return typeof value === "string" && portfolioThemes.some(theme => theme === value);
}

// A fixed allowlist keeps query and saved values out of executable script text.
// Run before page content so a saved or shared theme is ready for the first paint.
export const themeBootstrapScript = `(()=>{const themes=${JSON.stringify(portfolioThemes)};let theme=${JSON.stringify(defaultPortfolioTheme)};try{const saved=localStorage.getItem(${JSON.stringify(themeStorageKey)});if(themes.includes(saved))theme=saved}catch{}try{const query=new URLSearchParams(location.search).get("theme");if(themes.includes(query)){theme=query;try{localStorage.setItem(${JSON.stringify(themeStorageKey)},theme)}catch{}}}catch{}document.documentElement.dataset.portfolioTheme=theme})()`;

export function getPortfolioTheme(): PortfolioTheme {
  if (typeof document === "undefined") return defaultPortfolioTheme;
  const theme = document.documentElement.dataset.portfolioTheme;
  return isPortfolioTheme(theme) ? theme : defaultPortfolioTheme;
}

export function getServerPortfolioTheme(): PortfolioTheme {
  return defaultPortfolioTheme;
}

export function setPortfolioTheme(theme: PortfolioTheme, options: { persist?: boolean; updateUrl?: boolean } = {}) {
  if (typeof window === "undefined" || !isPortfolioTheme(theme)) return;
  document.documentElement.dataset.portfolioTheme = theme;
  if (options.persist !== false) {
    try { window.localStorage.setItem(themeStorageKey, theme); } catch { /* Keep the selected theme when storage is unavailable. */ }
  }
  if (options.updateUrl !== false) {
    const url = new URL(window.location.href);
    url.searchParams.set("theme", theme);
    // Keep the router's existing history state and avoid a route transition.
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function subscribeToPortfolioTheme(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey && event.key !== null) return;
    setPortfolioTheme(isPortfolioTheme(event.newValue) ? event.newValue : defaultPortfolioTheme, { persist: false, updateUrl: false });
  };
  const onPopState = () => {
    const query = new URLSearchParams(window.location.search).get("theme");
    if (isPortfolioTheme(query)) setPortfolioTheme(query, { updateUrl: false });
  };
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-portfolio-theme"] });
  window.addEventListener(themeChangeEvent, onChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener("popstate", onPopState);
  return () => {
    observer.disconnect();
    window.removeEventListener(themeChangeEvent, onChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("popstate", onPopState);
  };
}
