/**
 * Generate the video poster / thumbnail for the homepage "How It Works" demo.
 * 1280x720 (16:9 — Google's preferred video thumbnail ratio).
 * Used as <video poster> and as VideoObject.thumbnailUrl for video indexing.
 *
 * Run: node scripts/generate-video-poster.js
 */

import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'public', 'videos', 'how-it-works-poster.png');

const W = 1280, H = 720;
const ACCENT = '#4FC3F7';

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#0F1115';
ctx.fillRect(0, 0, W, H);

// Radial glow behind the play button
const glow = ctx.createRadialGradient(W / 2, H / 2 - 40, 0, W / 2, H / 2 - 40, 420);
glow.addColorStop(0, 'rgba(79,195,247,0.16)');
glow.addColorStop(1, 'rgba(79,195,247,0)');
ctx.fillStyle = glow;
ctx.fillRect(0, 0, W, H);

// Accent bar (left)
ctx.fillStyle = ACCENT;
ctx.fillRect(0, 0, 8, H);

// Play button — outer ring
const cx = W / 2, cy = H / 2 - 40, R = 78;
ctx.beginPath();
ctx.arc(cx, cy, R, 0, Math.PI * 2);
ctx.fillStyle = 'rgba(79,195,247,0.12)';
ctx.fill();
ctx.lineWidth = 4;
ctx.strokeStyle = ACCENT;
ctx.stroke();

// Play triangle
ctx.beginPath();
ctx.moveTo(cx - 22, cy - 32);
ctx.lineTo(cx - 22, cy + 32);
ctx.lineTo(cx + 36, cy);
ctx.closePath();
ctx.fillStyle = ACCENT;
ctx.fill();

// Title
ctx.textAlign = 'center';
ctx.fillStyle = '#E8EAED';
ctx.font = 'bold 56px sans-serif';
ctx.fillText('How It Works', cx, cy + R + 90);

// Subtitle
ctx.fillStyle = '#9AA0A6';
ctx.font = '26px sans-serif';
ctx.fillText('K.M.F. Trading Journal — Log, review and improve every trade', cx, cy + R + 138);

// Bottom branding
ctx.textAlign = 'left';
ctx.fillStyle = 'rgba(255,255,255,0.06)';
ctx.fillRect(0, H - 72, W, 1);
ctx.fillStyle = '#9AA0A6';
ctx.font = 'bold 20px sans-serif';
ctx.fillText('K.M.F. Trading Journal', 56, H - 28);
ctx.fillStyle = '#6B7280';
ctx.font = '18px sans-serif';
ctx.textAlign = 'right';
ctx.fillText('kmfjournal.com', W - 56, H - 28);

writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
console.log(`  ✓ how-it-works-poster.png (${W}x${H})`);
