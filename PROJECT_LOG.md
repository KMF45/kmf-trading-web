# Jurnal de Proiect — KMF Trading Journal Web

## Stare curentă
Proiect web pentru kmfjournal.com — landing page, blog (18 articole), și webapp (dashboard, trades, statistici, checklist, lot calculator, weekly review). Stack: React 19, Vite, Tailwind CSS, Firebase (Auth + Firestore). Deploy pe Vercel.

## Sesiuni de lucru

### 2026-03-08 — Sesiunea #1
**Ce s-a cerut:** Modificare prețuri landing page: $9.99/lună și $79.99/an
**Ce s-a făcut:**
- Actualizat constantele MONTHLY_PRICE (4.99 → 9.99) și ANNUAL_PRICE (29.99 → 79.99) în Pricing.jsx
- Actualizat highPrice în schema JSON-LD din index.html (29.99 → 79.99)
- SAVE badge se recalculează automat la 33%
**Fișiere modificate:**
- `src/components/Pricing.jsx` — prețuri noi
- `index.html` — schema JSON-LD actualizată
**Următorii pași sugerați:** Build + deploy dacă totul e OK

### 2026-03-08 — Sesiunea #1 (Task 2)
**Ce s-a cerut:** Optimizări PageSpeed Insights (din screenshots)
**Ce s-a făcut:**
- Adăugat preconnect pentru `fonts.googleapis.com` și `fonts.gstatic.com` în index.html
- Defer Firebase Auth loading cu `requestIdleCallback` în AuthContext — nu mai blochează LCP pe landing page
- Navbar logo: schimbat `loading="lazy"` → `loading="eager" fetchPriority="high"` (e above-the-fold)
- Build verificat — zero erori, toate cele 20 pagini prerendered OK
**Fișiere modificate:**
- `index.html` — preconnect-uri noi
- `src/contexts/AuthContext.jsx` — defer Firebase init cu requestIdleCallback
- `src/components/landing/Navbar.jsx` — logo eager loading
**De reținut:** Firebase era deja lazy-loaded în AuthContext și BetaBanner. Imaginile au deja variante WebP. Sidebar.jsx folosește logo.png raw dar e doar pe rute protejate.
**Următorii pași sugerați:** Deploy + re-test PageSpeed

---
