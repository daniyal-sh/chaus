import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const pages = JSON.parse(await readFile(join(root, 'src/pageMeta.json'), 'utf8'));
for (const [route, page] of Object.entries(pages)) {
  const file = route === '/404' ? join(dist, '404.html') : join(dist, route.slice(1), 'index.html');
  const html = await readFile(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1].replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  assert.equal(title, page.title, `Wrong title: ${route}`);
  assert.equal([...html.matchAll(/name="description"/g)].length, 1, `Duplicate description: ${route}`);
  assert(html.includes('property="og:image"'), `Missing sharing image: ${route}`);
  assert(html.includes('rel="canonical"'), `Missing canonical: ${route}`);
  if (route === '/404') assert(html.includes('noindex, follow'));
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
    const relative = base && asset.startsWith(`${base}/`) ? asset.slice(base.length + 1) : asset.slice(1);
    if (/^(assets|images)\//.test(relative)) await access(join(dist, relative));
  }
}
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
assert.equal([...sitemap.matchAll(/<url>/g)].length, Object.keys(pages).length - 1);
assert(!(await readFile(join(dist, 'robots.txt'), 'utf8')).includes('Disallow: /'));
console.log('Production checks passed: route entries, metadata, asset references, sitemap, and 404.');
