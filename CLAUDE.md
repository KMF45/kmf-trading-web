# K.M.F. Trading Journal — Web Project (kmfjournal.com)

## Efficiency Rules (Token Conservation)
- **Context Minimalist**: Never repeat entire files/classes. Send only the relevant method/function.
- **No Verbosity**: Start directly with the solution. No intros like "Sure, I can help" or "Here's the modified code". Explanations go AFTER code as short notes.
- **Think Before Writing**: For complex tasks, generate a short step list (plan) in Markdown first and wait for confirmation before writing code. Prevents hallucinations and rewrites.
- **Use Reference Files**: Read local docs/config files (package.json, vite.config.js, tailwind.config.js) BEFORE suggesting solutions to avoid redundant or incompatible dependencies.

## Code Quality Rules (Error Prevention)
- **Zero Warnings**: Never mark a task as "done" if there are linting/typing warnings in generated code. Fix them before delivering.
- **Mental Execution Test**: Before considering a change complete, mentally simulate code execution (e.g., "If user inputs X, what does the function return?"). Reduces logic errors.
- **Anti-Rewrite Pattern**: If existing code works, don't refactor it for style ("don't fix what isn't broken"). Focus only on the requested functionality.

## Project Overview
- **Location**: `/home/kmf45/kmf-trading-web`
- **Stack**: React 18, Vite, Tailwind CSS, React Router, Firebase (Auth + Firestore)
- **URL**: https://kmfjournal.com
- **Deploy**: GitHub Pages / static hosting

## Build
```bash
npm run build    # vite build + prerender
npm run dev      # dev server
```

## Project Structure
```
src/
├── pages/
│   ├── LandingPage.jsx          # Main landing (orchestrates sections)
│   ├── BlogPage.jsx             # Blog index with all posts
│   ├── blog/                    # 13+ individual article pages
│   └── auth/                    # Login, Register, ForgotPassword
├── components/
│   ├── landing/Navbar.jsx       # Fixed navbar with scroll detection
│   ├── Hero.jsx                 # Hero section with market ticker
│   ├── BetaBanner.jsx           # Beta signup with Firestore form
│   ├── Features.jsx, WhyKMF.jsx, HowItWorks.jsx
│   ├── Pricing.jsx, Download.jsx, FAQ.jsx
│   ├── Testimonials.jsx
│   ├── Footer.jsx               # Footer with blog links
│   └── blog/BlogArticleLayout.jsx  # Shared article layout + SEO
├── config/firebase.js           # Firebase init (Auth, Firestore, Storage)
├── contexts/                    # AuthContext, TradesContext
└── styles/index.css             # Tailwind + custom keyframes
```

## Blog Articles
- All articles use `BlogArticleLayout` with props: `title, metaTitle, metaDescription, slug, date, dateISO, readTime, category, categoryColor, relatedArticles`
- Exception: `BestTradingJournalAndroid2026.jsx` has its own custom layout
- When adding a new article: update App.jsx (route), BlogPage.jsx (posts array), sitemap.xml, rss.xml, scripts/prerender.js, scripts/generate-og-images.js

## SEO
- Each article gets: canonical URL, OG tags, Twitter cards, JSON-LD (Article + BreadcrumbList)
- BlogPage has: CollectionPage + BreadcrumbList JSON-LD
- index.html has: SoftwareApplication, Organization, WebSite, FAQPage, BreadcrumbList schemas
- sitemap.xml and rss.xml must be manually updated when adding articles

## Firebase
- Project: `kmf-trading-journal`
- Firestore collections: `users/{uid}/trades`, `betaSignups` (landing page forms)
- Rules deployed from Android project: `/home/kmf45/AndroidStudioProjects/KMFTradingJournal/firestore.rules`

## Design System
- **Dark theme**: bg #0F1115, accent cyan #4FC3F7, profit green #00C853, loss red #FF5252, gold #FFB300
- **Category colors**: Statistics #4FC3F7, Risk Management #00C853, Psychology #CE93D8, Improvement/Discipline #FFB300
- **Tailwind prefix**: `kmf-` (kmf-bg, kmf-text-primary, kmf-accent, etc.)
