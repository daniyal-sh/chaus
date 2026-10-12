import pages from "./pageMeta.json";
import { sitePath } from "./sitePath";

export function updateMetadata(path: string) {
  const page = pages[path as keyof typeof pages] || pages["/404"];
  document.title = page.title;
  for (const [selector, attribute, value] of [
    ['meta[name="description"]', 'content', page.description],
    ['meta[property="og:title"]', 'content', page.title],
    ['meta[property="og:description"]', 'content', page.description],
    ['meta[name="twitter:title"]', 'content', page.title],
    ['meta[name="twitter:description"]', 'content', page.description],
  ]) {
    document.querySelector(selector)?.setAttribute(attribute, value);
  }
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const origin = canonical ? new URL(canonical.href).origin : location.origin;
  const url = new URL(path === "/404" ? location.pathname : sitePath(path), origin).href;
  canonical?.setAttribute('href', url);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
  document.querySelector('meta[name="robots"]')?.setAttribute('content', path === "/404" ? 'noindex, follow' : 'index, follow');
}
