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
  '/tools/compound-calculator',
  '/tools/pre-trade-checklist',
  // Legal
  '/privacy-policy',
  '/terms-of-service',
  // LiquidHours legal
  '/liquidhours/privacy-policy',
  '/liquidhours/terms-of-use',
  // Translated articles
  '/blog/ro/what-is-kmf-trading-journal',
  '/blog/ro/trading-vs-gambling',
  '/blog/ro/analysis-paralysis-trading',
  '/blog/ro/is-100-enough-to-start-forex',
  '/blog/ro/revenge-trading',
  '/blog/ro/trading-expectancy-explained',
  '/blog/ro/1-percent-risk-rule',
  '/blog/ro/how-to-recover-from-losing-streak',
  '/blog/ro/profit-factor-vs-win-rate',
  '/blog/ro/position-sizing-guide',
  '/blog/ro/how-to-set-stop-loss',
  '/blog/ro/r-multiple-explained',
  '/blog/ro/crypto-vs-forex-journaling',
  '/blog/ro/why-traders-break-their-rules',
  '/blog/ro/good-loss-vs-bad-win',
  '/blog/ro/weekend-gap-risk',
  '/blog/ro/pre-trade-checklist',
  '/blog/ro/10-questions-after-every-trade',
  '/blog/ro/weekly-trading-review-template',
  '/blog/ro/execution-gap-backtest-vs-live-trading',
  '/blog/ro/ghost-trades-journaling-missed-opportunities',
  '/blog/ro/prospect-theory-trading',
  '/blog/ro/confidence-vs-overconfidence',
  '/blog/ro/tilt-recovery-protocol',
  '/blog/ro/lotto-ticket-syndrome',
  '/blog/ro/breakeven-stop-too-early',
  '/blog/ro/excel-vs-trading-journal-app',
  '/blog/ro/ai-trade-review',
  '/blog/ro/tradingview-kmf-workflow',
  '/blog/ro/strategy-is-not-enough',
  '/blog/ro/why-traders-fail-at-journaling',
  '/blog/ro/overtrading-checklist',
  '/blog/ro/revenge-trading-kill-switch',
  '/blog/ro/market-order-vs-limit-order',
  '/blog/ro/scaling-in-vs-scaling-out',
  '/blog/ro/monday-effect-trading',
  '/blog/ro/worst-trading-excuses',
  '/blog/ro/metatrader-pre-trade-checklist',
  '/blog/ro/static-vs-trailing-drawdown',
  '/blog/ro/prop-firm-trading-journal',
  '/blog/ro/prop-firm-daily-drawdown-guide',
  '/blog/ro/scared-money-prop-firm',
  '/blog/ro/best-free-trading-journal-app-android-2026',
  // German blog articles
  '/blog/de/profit-factor-vs-win-rate',
  '/blog/de/market-order-vs-limit-order',
  '/blog/de/scaling-in-vs-scaling-out',
  '/blog/de/1-percent-risk-rule',
  '/blog/de/position-sizing-guide',
  '/blog/de/trading-expectancy-explained',
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
  '/blog/market-order-vs-limit-order',
  '/blog/analysis-paralysis-trading',
  '/blog/what-is-kmf-trading-journal',
  '/blog/static-vs-trailing-drawdown',
  '/blog/revenge-trading-kill-switch',
  '/blog/metatrader-pre-trade-checklist',
  '/blog/breakeven-stop-too-early',
  '/blog/scared-money-prop-firm',
  '/blog/lotto-ticket-syndrome',
  '/blog/prospect-theory-trading',
  '/blog/is-100-enough-to-start-forex',
  '/blog/trading-vs-gambling',
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
