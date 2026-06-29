// Generates public/blog/fr/rss.xml from the French article files.
// Run after adding/removing FR articles:  node scripts/generate-fr-rss.js
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const frDir = join(__dirname, '..', 'src', 'pages', 'blog', 'fr');
const outFile = join(__dirname, '..', 'public', 'blog', 'fr', 'rss.xml');
const SITE = 'https://kmfjournal.com';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// pull a prop value: matches `  <prop>="..."` (single line, double-quoted)
function prop(src, name) {
  const re = new RegExp(`(?:^|\\n)\\s*${name}="((?:[^"\\\\]|\\\\.)*)"`);
  const m = src.match(re);
  return m ? m[1].replace(/\\'/g, "'") : null;
}

const items = readdirSync(frDir)
  .filter((f) => f.endsWith('.jsx'))
  .map((f) => {
    const src = readFileSync(join(frDir, f), 'utf8');
    return {
      slug: prop(src, 'slug'),
      title: prop(src, 'title'),
      desc: prop(src, 'metaDescription'),
      category: prop(src, 'category'),
      dateISO: prop(src, 'dateISO'),
    };
  })
  .filter((it) => it.slug && it.title && it.dateISO)
  .sort((a, b) => b.dateISO.localeCompare(a.dateISO));

const pubDate = (iso) => new Date(`${iso}T00:00:00Z`).toUTCString().replace('GMT', '+0000');
const buildDate = items.length ? pubDate(items[0].dateISO) : new Date().toUTCString().replace('GMT', '+0000');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>K.M.F. Trading Journal Blog (Français)</title>
    <link>${SITE}/blog</link>
    <description>Analyses de trading, guides de l'application et conseils pour traders sérieux. Le blog K.M.F. Trading Journal, en français.</description>
    <language>fr-fr</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE}/blog/fr/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE}/logo.png</url>
      <title>K.M.F. Trading Journal Blog (Français)</title>
      <link>${SITE}/blog</link>
    </image>

${items.map((it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${SITE}/blog/fr/${it.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/fr/${it.slug}</guid>
      <pubDate>${pubDate(it.dateISO)}</pubDate>
      <category>${esc(it.category || '')}</category>
      <description>${esc(it.desc || '')}</description>
    </item>`).join('\n\n')}

  </channel>
</rss>
`;

writeFileSync(outFile, xml, 'utf8');
console.log(`Done — FR RSS: ${items.length} items -> ${outFile.replace(join(__dirname, '..') + '/', '')}`);
