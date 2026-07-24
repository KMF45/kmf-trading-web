// Localization layer for the Trader Personality Test.
//
// The scoring structure and English source live in src/data/traderPersonalityTest.js
// and are never touched here — scoreTest() keeps computing on the English data.
// These helpers only overlay translated *display text* onto that structure, keyed
// by question id / option index / profile key, with English as the fallback.

import { QUESTIONS, PROFILES } from '../../data/traderPersonalityTest';
import * as ro from './ro';
import * as de from './de';
import * as fr from './fr';
import * as ru from './ru';

const PACKS = { ro, de, fr, ru };

// Localized questions for display. Structure (scores, style, hold, id, kind,
// styleSensitive) is preserved; only section/text/option-text are swapped.
export function localizedQuestions(lang) {
  const pack = PACKS[lang];
  if (!pack) return QUESTIONS;
  return QUESTIONS.map((q) => {
    const t = pack.Q[q.id];
    if (!t) return q;
    return {
      ...q,
      section: t.section ?? q.section,
      text: t.text ?? q.text,
      options: q.options.map((o, i) => ({ ...o, text: t.options?.[i] ?? o.text })),
    };
  });
}

// Localized profiles for display. Structure (key, slug, emoji, color) is
// preserved; only the text fields are swapped.
export function localizedProfiles(lang) {
  const pack = PACKS[lang];
  if (!pack) return PROFILES;
  const out = {};
  for (const [key, p] of Object.entries(PROFILES)) {
    const t = pack.P[key] || {};
    out[key] = {
      ...p,
      name: t.name ?? p.name,
      tagline: t.tagline ?? p.tagline,
      description: t.description ?? p.description,
      bias: t.bias ?? p.bias,
      strengths: t.strengths ?? p.strengths,
      weaknesses: t.weaknesses ?? p.weaknesses,
      tips: t.tips ?? p.tips,
    };
  }
  return out;
}

export function profileBySlugLocalized(slug, lang) {
  const profiles = localizedProfiles(lang);
  return Object.values(profiles).find((p) => p.slug === slug) || null;
}

// UI strings for the page chrome (buttons, headings, FAQ, …). Returns the
// English defaults merged with the language pack so any missing key falls back.
export function getUI(lang) {
  const pack = PACKS[lang];
  return pack ? pack.UI : null; // null → page uses its built-in English strings
}
