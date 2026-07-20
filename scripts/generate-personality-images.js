/**
 * Generate archetype art for the Trader Personality Test:
 *   1. Square icons  (512x512)  → /public/tools/personality/<key>.png
 *   2. Share cards   (1200x630) → /public/tools/og/personality/<slug>.png
 * Drawn with @napi-rs/canvas in the site's dark theme + each archetype's color.
 * Names/taglines are imported from the app data so they can never drift.
 *
 * Run: node scripts/generate-personality-images.js
 */

import { createCanvas } from '@napi-rs/canvas';
import { FONT } from './register-fonts.js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PROFILES } from '../src/data/traderPersonalityTest.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'tools', 'personality');
const OG_DIR = join(__dirname, '..', 'public', 'tools', 'og', 'personality');

const SIZE = 512;
const CX = SIZE / 2;
const CY = SIZE / 2;

// ── shared helpers ──────────────────────────────────────────────────────────

function hexA(hex, alpha) {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${hex}${a}`;
}

function drawBackground(ctx, color) {
  // base dark gradient
  const bg = ctx.createLinearGradient(0, 0, 0, SIZE);
  bg.addColorStop(0, '#161A22');
  bg.addColorStop(1, '#0F1115');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // subtle grid
  ctx.strokeStyle = 'rgba(255,255,255,0.035)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= SIZE; x += 64) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, SIZE); ctx.stroke();
  }
  for (let y = 0; y <= SIZE; y += 64) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(SIZE, y); ctx.stroke();
  }

  // radial glow in archetype color
  const glow = ctx.createRadialGradient(CX, CY, 40, CX, CY, 320);
  glow.addColorStop(0, hexA(color, 0.22));
  glow.addColorStop(0.55, hexA(color, 0.07));
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // inner border
  ctx.strokeStyle = hexA(color, 0.25);
  ctx.lineWidth = 2;
  ctx.strokeRect(10.5, 10.5, SIZE - 21, SIZE - 21);
}

function withGlow(ctx, color, blur, fn) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  fn();
  ctx.restore();
}

function arrowHead(ctx, x, y, angle, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-size, -size * 0.62);
  ctx.lineTo(-size, size * 0.62);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

// ── per-archetype icons ─────────────────────────────────────────────────────

function drawSNI(ctx, color) { // crosshair / target
  ctx.lineCap = 'round';
  withGlow(ctx, color, 26, () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.beginPath(); ctx.arc(CX, CY, 132, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 9;
    ctx.strokeStyle = hexA(color, 0.55);
    ctx.beginPath(); ctx.arc(CX, CY, 84, 0, Math.PI * 2); ctx.stroke();
  });
  // ticks N E S W crossing the outer ring
  ctx.strokeStyle = '#EAF6FF';
  ctx.lineWidth = 12;
  const t = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  t.forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(CX + dx * 168, CY + dy * 168);
    ctx.lineTo(CX + dx * 108, CY + dy * 108);
    ctx.stroke();
  });
  withGlow(ctx, color, 30, () => {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(CX, CY, 24, 0, Math.PI * 2); ctx.fill();
  });
}

function drawSTO(ctx, color) { // zen circle + calm horizon line
  ctx.lineCap = 'round';
  withGlow(ctx, color, 24, () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 13;
    // enso-style open circle
    ctx.beginPath(); ctx.arc(CX, CY, 122, Math.PI * 0.62, Math.PI * 0.38); ctx.stroke();
  });
  // level horizon line through the circle — the market moves, you don't
  ctx.strokeStyle = '#EAF6FF';
  ctx.lineWidth = 11;
  ctx.beginPath(); ctx.moveTo(CX - 168, CY); ctx.lineTo(CX + 168, CY); ctx.stroke();
  // calm sun resting on the horizon
  withGlow(ctx, color, 30, () => {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(CX, CY - 24, 19, 0, Math.PI * 2); ctx.fill();
  });
}

function drawCMB(ctx, color) { // equity curve: drawdown → new high
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  // dashed baseline = old high
  ctx.strokeStyle = 'rgba(255,255,255,0.22)';
  ctx.lineWidth = 5;
  ctx.setLineDash([14, 12]);
  ctx.beginPath(); ctx.moveTo(88, 208); ctx.lineTo(424, 208); ctx.stroke();
  ctx.setLineDash([]);
  // curve
  const pts = [[96, 208], [176, 300], [230, 356], [286, 268], [388, 140]];
  withGlow(ctx, color, 22, () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
    ctx.stroke();
  });
  arrowHead(ctx, 404, 120, Math.atan2(140 - 268, 388 - 286), 34, color);
  // valley marker
  ctx.fillStyle = '#EAF6FF';
  ctx.beginPath(); ctx.arc(230, 356, 11, 0, Math.PI * 2); ctx.fill();
}

function drawREV(ctx, color) { // flame
  withGlow(ctx, color, 34, () => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(CX, 118);
    ctx.bezierCurveTo(CX + 26, 170, CX + 96, 202, CX + 92, 288);
    ctx.bezierCurveTo(CX + 88, 356, CX + 46, 396, CX, 398);
    ctx.bezierCurveTo(CX - 46, 396, CX - 88, 356, CX - 92, 288);
    ctx.bezierCurveTo(CX - 96, 210, CX - 40, 188, CX, 118);
    ctx.closePath();
    ctx.fill();
  });
  // inner flame
  ctx.fillStyle = '#FF8A80';
  ctx.beginPath();
  ctx.moveTo(CX, 216);
  ctx.bezierCurveTo(CX + 16, 250, CX + 48, 268, CX + 44, 318);
  ctx.bezierCurveTo(CX + 40, 360, CX + 22, 378, CX, 380);
  ctx.bezierCurveTo(CX - 22, 378, CX - 40, 360, CX - 44, 318);
  ctx.bezierCurveTo(CX - 48, 272, CX - 16, 252, CX, 216);
  ctx.closePath();
  ctx.fill();
  // hot core
  ctx.fillStyle = '#FFD9D6';
  ctx.beginPath();
  ctx.ellipse(CX, 344, 20, 30, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawGAM(ctx, color) { // rolling die
  ctx.save();
  ctx.translate(CX, CY);
  ctx.rotate(-0.21);
  const s = 210;
  const r = 34;
  withGlow(ctx, color, 26, () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 13;
    ctx.fillStyle = hexA(color, 0.10);
    ctx.beginPath();
    ctx.roundRect(-s / 2, -s / 2, s, s, r);
    ctx.fill();
    ctx.stroke();
  });
  // pips (5)
  ctx.fillStyle = '#EAF6FF';
  const o = 56;
  [[0, 0], [-o, -o], [o, -o], [-o, o], [o, o]].forEach(([x, y]) => {
    ctx.beginPath(); ctx.arc(x, y, 17, 0, Math.PI * 2); ctx.fill();
  });
  ctx.restore();
  // motion arcs
  ctx.strokeStyle = hexA(color, 0.5);
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(CX, CY, 188, Math.PI * 1.18, Math.PI * 1.5); ctx.stroke();
  ctx.beginPath(); ctx.arc(CX, CY, 188, Math.PI * 0.18, Math.PI * 0.5); ctx.stroke();
}

function drawOVR(ctx, color) { // spiral of too many trades
  ctx.lineCap = 'round';
  withGlow(ctx, color, 20, () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.beginPath();
    const turns = 3.1;
    const steps = 220;
    for (let i = 0; i <= steps; i++) {
      const p = i / steps;
      const ang = p * turns * Math.PI * 2 - Math.PI / 2;
      const rad = 12 + p * 138;
      const x = CX + Math.cos(ang) * rad;
      const y = CY + Math.sin(ang) * rad;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
  // trade dots caught in the spiral
  ctx.fillStyle = '#EAF6FF';
  [[0.32, 0], [0.55, 0], [0.78, 0], [0.97, 0]].forEach(([p]) => {
    const ang = p * 3.1 * Math.PI * 2 - Math.PI / 2;
    const rad = 12 + p * 138;
    ctx.beginPath();
    ctx.arc(CX + Math.cos(ang) * rad, CY + Math.sin(ang) * rad, 11, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawHES(ctx, color) { // hourglass — time slips while you hesitate
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const w = 150, h = 210, x0 = CX - w / 2, y0 = CY - h / 2;
  withGlow(ctx, color, 22, () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 13;
    // frame
    ctx.beginPath();
    ctx.moveTo(x0, y0); ctx.lineTo(x0 + w, y0);
    ctx.lineTo(CX + 10, CY); ctx.lineTo(x0 + w, y0 + h);
    ctx.lineTo(x0, y0 + h); ctx.lineTo(CX - 10, CY);
    ctx.closePath();
    ctx.stroke();
    // caps
    ctx.lineWidth = 15;
    ctx.beginPath(); ctx.moveTo(x0 - 22, y0); ctx.lineTo(x0 + w + 22, y0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0 - 22, y0 + h); ctx.lineTo(x0 + w + 22, y0 + h); ctx.stroke();
  });
  // sand: top almost gone, bottom piled up (kept inside the frame)
  ctx.fillStyle = '#EAF6FF';
  ctx.beginPath();
  ctx.moveTo(CX - 20, CY - 34); ctx.lineTo(CX + 20, CY - 34); ctx.lineTo(CX, CY - 6);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(CX - 42, y0 + h - 12); ctx.lineTo(CX + 42, y0 + h - 12); ctx.lineTo(CX, CY + 56);
  ctx.closePath(); ctx.fill();
  // falling grains
  ctx.fillStyle = hexA('#EAF6FF', 0.8);
  [12, 30].forEach(dy => {
    ctx.beginPath(); ctx.arc(CX, CY + dy, 4.5, 0, Math.PI * 2); ctx.fill();
  });
}

function drawBAG(ctx, color) { // bag holding a falling position
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  withGlow(ctx, color, 22, () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 13;
    ctx.fillStyle = hexA(color, 0.08);
    // body
    ctx.beginPath();
    ctx.moveTo(CX - 34, 172);
    ctx.bezierCurveTo(CX - 130, 232, CX - 122, 388, CX, 392);
    ctx.bezierCurveTo(CX + 122, 388, CX + 130, 232, CX + 34, 172);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // tied neck
    ctx.beginPath();
    ctx.moveTo(CX - 44, 158); ctx.lineTo(CX + 44, 158);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(CX - 30, 158); ctx.lineTo(CX - 48, 116);
    ctx.moveTo(CX + 30, 158); ctx.lineTo(CX + 48, 116);
    ctx.stroke();
  });
  // falling chart inside the bag
  ctx.strokeStyle = '#EAF6FF';
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.moveTo(CX - 62, 258);
  ctx.lineTo(CX - 18, 292);
  ctx.lineTo(CX + 8, 272);
  ctx.lineTo(CX + 52, 330);
  ctx.stroke();
  arrowHead(ctx, 52 + CX + 8, 340, Math.atan2(330 - 272, 52 - 8), 24, '#EAF6FF');
}

function drawMOM(ctx, color) { // momentum wave + steep arrow
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  // speed lines
  ctx.strokeStyle = hexA(color, 0.35);
  ctx.lineWidth = 9;
  ctx.beginPath(); ctx.moveTo(104, 372); ctx.lineTo(196, 372); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(88, 336); ctx.lineTo(160, 336); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(120, 408); ctx.lineTo(236, 408); ctx.stroke();
  // rising wave
  withGlow(ctx, color, 24, () => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(110, 348);
    ctx.bezierCurveTo(190, 330, 200, 262, 258, 250);
    ctx.bezierCurveTo(310, 240, 320, 180, 386, 138);
    ctx.stroke();
  });
  arrowHead(ctx, 404, 126, -0.62, 36, color);
  // riding dot
  ctx.fillStyle = '#EAF6FF';
  ctx.beginPath(); ctx.arc(258, 250, 13, 0, Math.PI * 2); ctx.fill();
}

// ── archetype list (colors mirror src/data/traderPersonalityTest.js) ───────
const ARCHETYPES = [
  { key: 'sni', color: '#00C853', draw: drawSNI },
  { key: 'sto', color: '#4FC3F7', draw: drawSTO },
  { key: 'cmb', color: '#00C853', draw: drawCMB },
  { key: 'rev', color: '#FF5252', draw: drawREV },
  { key: 'gam', color: '#FF5252', draw: drawGAM },
  { key: 'ovr', color: '#FFB300', draw: drawOVR },
  { key: 'hes', color: '#FFB300', draw: drawHES },
  { key: 'bag', color: '#FFB300', draw: drawBAG },
  { key: 'mom', color: '#4FC3F7', draw: drawMOM },
];

// ── 1200x630 share card: icon on the left, archetype identity on the right ──
function generateShareCard(archetype, profile) {
  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const color = archetype.color;

  // background
  ctx.fillStyle = '#0F1115';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  const glow = ctx.createRadialGradient(330, H / 2, 40, 330, H / 2, 520);
  glow.addColorStop(0, hexA(color, 0.20));
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 8, H);

  // icon rendered offscreen at native size, then scaled in
  const icon = createCanvas(SIZE, SIZE);
  const ictx = icon.getContext('2d');
  drawBackground(ictx, color);
  archetype.draw(ictx, color);
  const D = 340, IX = 96, IY = (H - D) / 2;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(IX, IY, D, D, 28);
  ctx.clip();
  ctx.drawImage(icon, IX, IY, D, D);
  ctx.restore();
  ctx.strokeStyle = hexA(color, 0.4);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(IX, IY, D, D, 28);
  ctx.stroke();

  // right column
  const TX = 500;
  ctx.fillStyle = '#9AA0A6';
  ctx.font = `bold 20px ${FONT}`;
  ctx.fillText('MY TRADER PERSONALITY', TX, 210);

  ctx.fillStyle = color;
  ctx.font = `bold 66px ${FONT}`;
  ctx.fillText(profile.name, TX, 292);

  // tagline, wrapped to the available width
  ctx.fillStyle = '#E8EAED';
  ctx.font = `28px ${FONT}`;
  const maxW = W - TX - 70;
  const words = profile.tagline.split(' ');
  let line = '', ty = 348;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, TX, ty); ty += 38; line = w;
    } else { line = test; }
  }
  if (line) ctx.fillText(line, TX, ty);

  ctx.fillStyle = '#6B7280';
  ctx.font = `24px ${FONT}`;
  // NOTE: plain ASCII only — the build env has no font with arrow glyphs.
  ctx.fillText('Take the free test at kmfjournal.com', TX, ty + 74);

  // branding
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, H - 70, W, 1);
  ctx.fillStyle = '#9AA0A6';
  ctx.font = `bold 18px ${FONT}`;
  ctx.fillText('K.M.F. Trading Journal', 96, H - 28);

  writeFileSync(join(OG_DIR, `${profile.slug}.png`), canvas.toBuffer('image/png'));
}

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(OG_DIR, { recursive: true });
for (const a of ARCHETYPES) {
  const profile = PROFILES[a.key.toUpperCase()];
  if (!profile) throw new Error(`No profile for archetype "${a.key}" — keys are out of sync.`);

  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, a.color);
  a.draw(ctx, a.color);
  writeFileSync(join(OUT_DIR, `${a.key}.png`), canvas.toBuffer('image/png'));

  generateShareCard(a, profile);
  console.log(`✓ ${a.key}.png + og/${profile.slug}.png`);
}
console.log(`Done — ${ARCHETYPES.length} icons + ${ARCHETYPES.length} share cards.`);
