/**
 * Registers the fonts used by the image-generation scripts.
 *
 * Without this, @napi-rs/canvas resolves "sans-serif" against whatever the OS
 * has installed — on a machine with no sans-serif font it silently falls back
 * to a monospace face, which is how every OG image ended up looking like a
 * terminal. Inter is bundled in the repo so regeneration is identical on any
 * machine (SIL Open Font License).
 *
 * Import this module for its side effect BEFORE creating any canvas:
 *   import { FONT } from './register-fonts.js';
 *   ctx.font = `bold 48px ${FONT}`;
 */

import { GlobalFonts } from '@napi-rs/canvas';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = join(__dirname, 'fonts');

export const FONT = 'Inter';

// Both weights register under one family so `bold 48px Inter` picks the bold face.
GlobalFonts.registerFromPath(join(FONT_DIR, 'Inter-Regular.otf'), FONT);
GlobalFonts.registerFromPath(join(FONT_DIR, 'Inter-Bold.otf'), FONT);

if (!GlobalFonts.families.some((f) => f.family === FONT)) {
  throw new Error(`Font "${FONT}" failed to register — check scripts/fonts/.`);
}
