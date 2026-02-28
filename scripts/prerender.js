/**
 * Postbuild prerender script.
 * Spins up a local server, visits each route with Puppeteer, and saves the
 * fully-rendered HTML back into dist/ so Googlebot gets real content.
 *
 * Run: node scripts/prerender.js
 */

import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;

const routes = [
  '/',
  '/blog',
  '/blog/profit-factor-vs-win-rate',
  '/blog/1-percent-risk-rule',
  '/blog/revenge-trading',
  '/blog/weekly-trading-review-template',
  '/blog/r-multiple-explained',
  '/blog/why-traders-break-their-rules',
  '/blog/how-to-recover-from-losing-streak',
  '/blog/10-questions-after-every-trade',
  '/blog/trading-expectancy-explained',
  '/blog/how-to-set-stop-loss',
  '/blog/position-sizing-guide',
  '/blog/pre-trade-checklist',
  '/blog/best-free-trading-journal-app-android-2026',
  '/blog/execution-gap-backtest-vs-live-trading',
  '/blog/prop-firm-trading-journal',
  '/blog/good-loss-vs-bad-win',
  '/blog/ghost-trades-journaling-missed-opportunities',
  '/blog/crypto-vs-forex-journaling',
];

// Simple static file server that falls back to index.html (SPA)
function startServer() {
  const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

  const mimeTypes = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp',
    '.svg': 'image/svg+xml', '.xml': 'application/xml',
  };

  const server = createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = join(DIST, url.pathname);

    try {
      const ext = filePath.match(/\.[^.]+$/)?.[0] || '';
      if (ext && ext !== '.html') {
        const data = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
        return;
      }
    } catch {}

    // SPA fallback
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
  });

  return new Promise(resolve => server.listen(PORT, () => resolve(server)));
}

async function prerender() {
  console.log('Starting prerender...');
  const server = await startServer();

  const browser = await launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of routes) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

    // Wait a bit for React to settle and useEffect to fire
    await new Promise(r => setTimeout(r, 1500));

    const html = await page.content();
    await page.close();

    // Write to dist
    const outDir = route === '/' ? DIST : join(DIST, route);
    mkdirSync(outDir, { recursive: true });
    const outFile = join(outDir, 'index.html');
    writeFileSync(outFile, html);
    console.log(`  ✓ ${route}`);
  }

  await browser.close();
  server.close();
  console.log(`Done — ${routes.length} pages prerendered.`);
}

prerender().catch(err => {
  console.error('Prerender failed:', err.message);
  console.log('Build will continue without prerendering.');
  process.exit(0); // Don't fail the build
});
