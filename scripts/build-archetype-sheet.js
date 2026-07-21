/**
 * Build a self-contained HTML sheet showing all 9 archetypes exactly as the
 * result card renders them — for screenshotting into social posts.
 *
 * Content and colors come from src/data/traderPersonalityTest.js, and icons are
 * inlined as data URIs, so the sheet can never drift from the live test.
 *
 * Run: node scripts/build-archetype-sheet.js [outfile]
 */

import { createCanvas, loadImage } from '@napi-rs/canvas';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PROFILES } from '../src/data/traderPersonalityTest.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICON_DIR = join(__dirname, '..', 'public', 'tools', 'personality');
const OUT = process.argv[2] || join(__dirname, '..', 'archetype-sheet.html');

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Icons are 512px on disk; 288px is plenty at the 176px display size (2x) and
// keeps the page from ballooning past a megabyte.
async function iconDataUri(key) {
  const img = await loadImage(join(ICON_DIR, `${key.toLowerCase()}.png`));
  const S = 288;
  const c = createCanvas(S, S);
  c.getContext('2d').drawImage(img, 0, 0, S, S);
  return `data:image/png;base64,${c.toBuffer('image/png').toString('base64')}`;
}

const card = (p, icon) => `
<article class="card" id="${p.slug}" style="--accent:${p.color}">
  <header class="card-head">
    <p class="kicker">Your Trader Personality</p>
    <img class="badge" src="${icon}" alt="${esc(p.name)}" width="176" height="176" />
    <h2>${esc(p.name)}</h2>
    <p class="tagline">${esc(p.tagline)}</p>
    <p class="style-note">Based on your answers as a swing trader</p>
  </header>

  <p class="description">${esc(p.description)}</p>

  <div class="callout">
    <p class="callout-title">🧠 Your behavioral bias</p>
    <p>${esc(p.bias)}</p>
  </div>

  <div class="columns">
    <section>
      <h3 class="col-title good">💪 Strengths</h3>
      <ul class="marked">
        ${p.strengths.map((s) => `<li><span class="mark good">+</span>${esc(s)}</li>`).join('\n        ')}
      </ul>
    </section>
    <section>
      <h3 class="col-title bad">⚠️ Watch out for</h3>
      <ul class="marked">
        ${p.weaknesses.map((w) => `<li><span class="mark bad">−</span>${esc(w)}</li>`).join('\n        ')}
      </ul>
    </section>
  </div>

  <section class="tips">
    <h3 class="col-title accent">✅ 3 fixes to work on</h3>
    <ol>
      ${p.tips.map((t, i) => `<li><span class="num">${i + 1}</span><span>${esc(t)}</span></li>`).join('\n      ')}
    </ol>
  </section>

  <footer class="card-foot">kmfjournal.com · Trader Personality Test</footer>
</article>`;

const profiles = Object.values(PROFILES);
const icons = await Promise.all(profiles.map((p) => iconDataUri(p.key)));

const html = `<title>The 9 Trader Archetypes — result cards</title>
<style>
  :root {
    --bg: #0F1115;
    --panel: #1A1D24;
    --ink: #FFFFFF;
    --muted: #B0BEC5;
    --hair: rgba(255,255,255,0.07);
    --profit: #00E676;
    --loss: #FF5252;
    --accent-ui: #4FC3F7;
    color-scheme: dark;
  }

  /* Committed to the site's dark theme on purpose: these screenshots have to
     match kmfjournal.com, so a light variant would be off-brand. */
  body {
    margin: 0;
    padding: 32px 20px 72px;
    background: var(--bg);
    color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .sheet { max-width: 672px; margin: 0 auto; display: flex; flex-direction: column; gap: 56px; }

  .page-head { text-align: center; display: flex; flex-direction: column; gap: 10px; }
  .page-head h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.01em; text-wrap: balance; }
  .page-head p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.6; }
  .page-head .hint {
    font-size: 13px; color: var(--muted); background: var(--panel);
    border: 1px solid var(--hair); border-radius: 10px; padding: 12px 16px; text-align: left;
  }
  .page-head .hint b { color: var(--ink); font-weight: 600; }

  .card {
    background: var(--panel);
    border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
    border-radius: 16px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 26px;
  }

  .card-head { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
  .kicker {
    margin: 0 0 4px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--muted);
  }
  .badge {
    width: 176px; height: 176px; border-radius: 16px; display: block;
    border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  }
  .card h2 { margin: 6px 0 0; font-size: 36px; font-weight: 700; color: var(--accent); letter-spacing: -0.02em; }
  .tagline { margin: 0; font-size: 18px; color: var(--muted); text-wrap: balance; }
  .style-note { margin: 0; font-size: 12px; color: color-mix(in srgb, var(--muted) 70%, transparent); }

  .description { margin: 0; font-size: 16px; line-height: 1.65; color: rgba(255,255,255,0.9); }

  .callout {
    border-left: 4px solid var(--accent);
    background: color-mix(in srgb, var(--accent) 7%, transparent);
    border-radius: 12px;
    padding: 16px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .callout-title { margin: 0; font-size: 14px; font-weight: 600; color: var(--accent); }
  .callout p:last-child { margin: 0; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.9); }

  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 560px) { .columns { grid-template-columns: 1fr; } }

  .col-title { margin: 0 0 10px; font-size: 14px; font-weight: 600; }
  .col-title.good { color: var(--profit); }
  .col-title.bad { color: var(--loss); }
  .col-title.accent { color: var(--accent-ui); }

  .marked { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
  .marked li { display: flex; gap: 8px; font-size: 14px; line-height: 1.5; color: rgba(255,255,255,0.85); }
  .mark { flex: none; font-weight: 700; }
  .mark.good { color: var(--profit); }
  .mark.bad { color: var(--loss); }

  .tips ol { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .tips li { display: flex; gap: 12px; font-size: 14px; line-height: 1.55; color: rgba(255,255,255,0.9); }
  .num {
    flex: none; width: 24px; height: 24px; border-radius: 999px;
    background: color-mix(in srgb, var(--accent-ui) 15%, transparent);
    color: var(--accent-ui); font-size: 12px; font-weight: 600;
    display: flex; align-items: center; justify-content: center;
  }

  .card-foot {
    border-top: 1px solid rgba(255,255,255,0.05);
    padding-top: 16px; text-align: center;
    font-size: 12px; color: color-mix(in srgb, var(--muted) 60%, transparent);
  }
</style>

<div class="sheet">
  <div class="page-head">
    <h1>The 9 Trader Archetypes</h1>
    <p>Every result card exactly as it appears at the end of the test on kmfjournal.com.</p>
    <p class="hint">
      <b>For screenshots:</b> capture a single card from its top edge to the
      “kmfjournal.com” line — that framing matches what a person sees after finishing the test.
      Ready-made 1200×630 share images also live at
      <b>kmfjournal.com/tools/og/personality/&lt;type&gt;.png</b>.
    </p>
  </div>

  ${profiles.map((p, i) => card(p, icons[i])).join('\n')}
</div>
`;

writeFileSync(OUT, html);
console.log(`Wrote ${OUT} — ${profiles.length} cards, ${(html.length / 1024 / 1024).toFixed(2)} MB`);
