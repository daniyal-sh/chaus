import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const pages = JSON.parse(await readFile(join(root, 'src/pageMeta.json'), 'utf8'));
const site = new URL(process.env.SITE_URL || 'https://coffeehouse.rice.edu/');
site.pathname = `${site.pathname.replace(/\/$/, '')}/`;
const baseUrl = site.href;
const template = await readFile(join(dist, 'index.html'), 'utf8');
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const [path, page] of Object.entries(pages)) {
  const url = new URL(path.replace(/^\//, ''), baseUrl).href;
  const head = `<title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <meta name="robots" content="${path === '/404' ? 'noindex, follow' : 'index, follow'}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Rice Coffeehouse" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${baseUrl}images/chaus.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${baseUrl}images/chaus.webp" />`;
  const html = template.replace(/<title>[\s\S]*?<\/title>/, head).replace(/<meta\s+name="description"[\s\S]*?\/>/, '');
  const directory = path === '/' || path === '/404' ? dist : join(dist, path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, path === '/404' ? '404.html' : 'index.html'), html);
}
await writeFile(join(dist, '.nojekyll'), '');
const urls = Object.keys(pages).filter((path) => path !== '/404');
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>${baseUrl}${path.slice(1)}</loc></url>`).join('')}</urlset>\n`);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${baseUrl}sitemap.xml\n`);
// Source PNGs stay in the workspace; production serves the optimized WebP assets.
for (const name of ['chaus-mascot-v2', 'nutty-bee-v2', 'honeysuckle-v2', 'milky-way-v2']) {
  await unlink(join(dist, 'images', `${name}.png`)).catch((error) => { if (error.code !== 'ENOENT') throw error; });
}
console.log(`Prepared ${urls.length} pages, sharing metadata, sitemap, and 404 page for ${baseUrl}.`);
