/**
 * Generate OG images (1200x630) for each blog article.
 * Uses @napi-rs/canvas for zero-system-dependency image generation.
 *
 * Run: node scripts/generate-og-images.js
 */

import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'blog', 'og');

const articles = [
  { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate:\nWhich Metric Actually\nPredicts Trading Success?', category: 'Statistics', color: '#4FC3F7' },
  { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule:\nThe Trading Rule That Keeps\nProfessional Traders Alive', category: 'Risk Management', color: '#00C853' },
  { slug: 'revenge-trading', title: 'Revenge Trading:\nWhat It Is, Why It Happens,\nand How to Break the Cycle', category: 'Psychology', color: '#CE93D8' },
  { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly\nTrading Review\n(With a Complete Template)', category: 'Improvement', color: '#FFB300' },
  { slug: 'r-multiple-explained', title: 'R-Multiple Explained:\nHow to Measure Trade Quality\n(Not Just Profit)', category: 'Statistics', color: '#4FC3F7' },
  { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own\nTrading Rules —\nAnd How to Stop', category: 'Psychology', color: '#CE93D8' },
  { slug: 'how-to-recover-from-losing-streak', title: 'How to Recover from\na Losing Streak Without\nBlowing Your Account', category: 'Psychology', color: '#CE93D8' },
  { slug: '10-questions-after-every-trade', title: '10 Questions Every Trader\nShould Ask After\nEvery Trade', category: 'Improvement', color: '#FFB300' },
  { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained:\nThe Formula That Tells\nIf Your Strategy Works', category: 'Statistics', color: '#4FC3F7' },
  { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss\nProperly\n(Not Just Randomly)', category: 'Risk Management', color: '#00C853' },
  { slug: 'position-sizing-guide', title: 'Position Sizing Guide:\nHow Much Should\nYou Trade?', category: 'Risk Management', color: '#00C853' },
  { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist:\n10 Things to Verify\nBefore Every Trade Entry', category: 'Discipline', color: '#FFB300' },
  { slug: 'best-free-trading-journal-app-android-2026', title: 'Best Free Trading Journal\nApp for Android\nin 2026', category: 'App Reviews', color: '#4FC3F7' },
];

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function generate(article) {
  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0F1115';
  ctx.fillRect(0, 0, W, H);

  // Accent bar (left side)
  const [r, g, b] = hexToRgb(article.color);
  ctx.fillStyle = article.color;
  ctx.fillRect(0, 0, 6, H);

  // Subtle gradient overlay
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.06)`);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Category badge
  ctx.fillStyle = `rgba(${r},${g},${b},0.15)`;
  const catText = article.category.toUpperCase();
  ctx.font = 'bold 16px sans-serif';
  const catWidth = ctx.measureText(catText).width + 24;
  const catX = 60, catY = 60;
  ctx.beginPath();
  ctx.roundRect(catX, catY, catWidth, 32, 16);
  ctx.fill();
  ctx.fillStyle = article.color;
  ctx.fillText(catText, catX + 12, catY + 22);

  // Title text
  ctx.fillStyle = '#E8EAED';
  ctx.font = 'bold 48px sans-serif';
  const lines = article.title.split('\n');
  let y = 150;
  for (const line of lines) {
    ctx.fillText(line, 60, y);
    y += 62;
  }

  // Bottom branding
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, H - 70, W, 1);
  ctx.fillStyle = '#9AA0A6';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('K.M.F. Trading Journal', 60, H - 28);
  ctx.fillStyle = '#6B7280';
  ctx.font = '16px sans-serif';
  ctx.fillText('kmfjournal.com', W - 60 - ctx.measureText('kmfjournal.com').width, H - 28);

  const buf = canvas.toBuffer('image/png');
  const outPath = join(OUT_DIR, `${article.slug}.png`);
  writeFileSync(outPath, buf);
  console.log(`  ✓ ${article.slug}.png`);
}

mkdirSync(OUT_DIR, { recursive: true });
console.log('Generating OG images...');
for (const article of articles) {
  generate(article);
}
console.log(`Done — ${articles.length} images in public/blog/og/`);
