/**
 * Postbuild prerender script.
 * Spins up a local server, visits each route with Puppeteer, and saves the
 * fully-rendered HTML back into dist/ so Googlebot gets real content.
 *
 * Run: node scripts/prerender.js
 */

import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;

const routes = [
  // Priority pages first (homepage, about, blog index, categories)
  '/',
  '/about',
  '/blog',
  '/blog/category/psychology',
  '/blog/category/risk-management',
  '/blog/category/statistics',
  '/blog/category/improvement',
  '/blog/category/discipline',
  '/blog/category/app-reviews',
  // Tools
  '/tools/lot-size-calculator',
  '/tools/risk-of-ruin',
  '/tools/win-rate-rr-matrix',
  // Translated articles
  '/blog/ro/what-is-kmf-trading-journal',
  // Blog articles
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
  '/blog/tradingview-kmf-workflow',
  '/blog/excel-vs-trading-journal-app',
  '/blog/prop-firm-daily-drawdown-guide',
  '/blog/strategy-is-not-enough',
  '/blog/why-traders-fail-at-journaling',
  '/blog/overtrading-checklist',
  '/blog/tilt-recovery-protocol',
  '/blog/worst-trading-excuses',
  '/blog/ai-trade-review',
  '/blog/monday-effect-trading',
  '/blog/confidence-vs-overconfidence',
  '/blog/weekend-gap-risk',
  '/blog/scaling-in-vs-scaling-out',
  '/blog/what-is-kmf-trading-journal',
  '/blog/static-vs-trailing-drawdown',
  '/blog/revenge-trading-kill-switch',
  '/blog/metatrader-pre-trade-checklist',
  '/blog/breakeven-stop-too-early',
  '/blog/scared-money-prop-firm',
  '/blog/lotto-ticket-syndrome',
  '/blog/prospect-theory-trading',
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

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  let rendered = 0;
  const page = await browser.newPage();

  for (const route of routes) {
    try {
      const url = `http://localhost:${PORT}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

      // Wait a bit for React to settle and useEffect to fire
      await new Promise(r => setTimeout(r, 1500));

      var html = await page.content();

    // Remove homepage-only JSON-LD from non-homepage routes
    // (SoftwareApplication, FAQPage, Organization, WebSite, homepage BreadcrumbList)
    if (route !== '/') {
      html = html.replace(
        /<!-- Structured Data: SoftwareApplication -->[\s\S]*?<\/script>/,
        ''
      );
      html = html.replace(
        /<!-- Structured Data: Organization -->[\s\S]*?<\/script>/,
        ''
      );
      html = html.replace(
        /<!-- Structured Data: WebSite -->[\s\S]*?<\/script>/,
        ''
      );
      html = html.replace(
        /<!-- Structured Data: FAQPage[\s\S]*?<\/script>/,
        ''
      );
      html = html.replace(
        /<!-- Structured Data: BreadcrumbList -->[\s\S]*?<\/script>/,
        ''
      );
    }

    // Write to dist
    const outDir = route === '/' ? DIST : join(DIST, route);
    mkdirSync(outDir, { recursive: true });
    const outFile = join(outDir, 'index.html');
    writeFileSync(outFile, html);
    rendered++;
    console.log(`  ✓ ${route}`);
    } catch (err) {
      console.error(`  ✗ ${route} — ${err.message}`);
    }
  }

  await page.close();
  await browser.close();
  server.close();
  console.log(`Done — ${rendered}/${routes.length} pages prerendered.`);
}

prerender().catch(err => {
  console.error('Prerender failed:', err.message);
  console.log('Build will continue without prerendering.');
  process.exit(0); // Don't fail the build
});
