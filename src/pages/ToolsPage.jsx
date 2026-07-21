import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';

const PAGE_URL = 'https://kmfjournal.com/tools';
const OG_IMAGE = 'https://kmfjournal.com/tools/og/trader-personality-test.png';
const PAGE_TITLE = 'Free Trading Tools — Calculators, Checklists & Tests | K.M.F.';
const PAGE_DESC = 'Six free trading tools, no signup: lot size calculator, risk of ruin simulator, win rate vs R:R matrix, compound growth calculator, pre-trade checklist builder and the trader personality test.';

const TOOLS = [
  {
    to: '/tools/lot-size-calculator',
    name: 'Lot Size Calculator',
    desc: 'Work out the exact position size for your risk, on forex, crypto, stocks or indices.',
    color: '#00C853',
    tag: 'Risk',
    icon: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
  },
  {
    to: '/tools/risk-of-ruin',
    name: 'Risk of Ruin Calculator',
    desc: 'Monte Carlo simulation of your edge — the odds your account survives the losing streaks.',
    color: '#FF5252',
    tag: 'Risk',
    icon: 'M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z',
  },
  {
    to: '/tools/win-rate-rr-matrix',
    name: 'Win Rate vs R:R Matrix',
    desc: 'See which win rate and reward:risk combinations actually make money — and which never do.',
    color: '#4FC3F7',
    tag: 'Statistics',
    icon: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z',
  },
  {
    to: '/tools/compound-calculator',
    name: 'Compound Calculator',
    desc: 'Project how a consistent edge compounds over months and years — with realistic drawdowns.',
    color: '#FFB300',
    tag: 'Growth',
    icon: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z',
  },
  {
    to: '/tools/pre-trade-checklist',
    name: 'Pre-Trade Checklist Builder',
    desc: 'Build a checklist tailored to your strategy, so no trade gets taken on impulse.',
    color: '#4FC3F7',
    tag: 'Discipline',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  },
  {
    to: '/tools/trader-personality-test',
    name: 'Trader Personality Test',
    desc: 'Sixteen questions reveal which of the 9 trader archetypes you are, plus your behavioral bias.',
    color: '#CE93D8',
    tag: 'Psychology',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  },
];

export default function ToolsPage() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    const setMeta = (attr, val, content) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', PAGE_DESC);
    setMeta('property', 'og:title', PAGE_TITLE);
    setMeta('property', 'og:description', PAGE_DESC);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:url', PAGE_URL);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', PAGE_TITLE);
    setMeta('name', 'twitter:description', PAGE_DESC);
    setMeta('name', 'twitter:image', OG_IMAGE);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', PAGE_URL);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'Free Trading Tools',
          url: PAGE_URL,
          description: PAGE_DESC,
          isPartOf: { '@type': 'WebSite', name: 'K.M.F. Trading Journal', url: 'https://kmfjournal.com' },
        },
        {
          '@type': 'ItemList',
          itemListElement: TOOLS.map((t, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: t.name,
            url: `https://kmfjournal.com${t.to}`,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kmfjournal.com' },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: PAGE_URL },
          ],
        },
      ],
    };
    let script = document.getElementById('tools-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'tools-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);
    return () => { script?.remove(); link?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-kmf-bg text-kmf-text-primary">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-kmf-accent bg-kmf-accent/10 border border-kmf-accent/20 rounded-full px-3 py-1 mb-5">
              Free · No Signup
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Free <span className="text-kmf-accent">Trading Tools</span>
            </h1>
            <p className="text-kmf-text-secondary text-lg max-w-2xl mx-auto">
              Six calculators and tools that answer the questions traders actually ask — position size, survival odds, whether an edge is viable, and what kind of trader you are. Everything runs in your browser.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.to}
                viewTransition
                to={tool.to}
                className="group bg-kmf-panel border border-white/5 rounded-xl p-5 transition-all hover:border-kmf-accent/40 hover:bg-white/[0.03] hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ background: `${tool.color}18`, color: tool.color }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={tool.icon} />
                    </svg>
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-semibold group-hover:text-kmf-accent transition-colors">{tool.name}</h2>
                      <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded" style={{ background: `${tool.color}18`, color: tool.color }}>
                        {tool.tag}
                      </span>
                    </div>
                    <p className="text-sm text-kmf-text-secondary leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-2xl p-6 sm:p-8 text-center border border-kmf-accent/20 bg-gradient-to-b from-kmf-accent/10 to-transparent">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              These tools answer one question at a time.
            </h2>
            <p className="text-kmf-text-secondary text-sm mb-5 max-w-lg mx-auto">
              The K.M.F. app answers them continuously — from your real trades. Position sizing, risk, statistics and behavioral patterns, tracked automatically as you journal.
            </p>
            <a
              href="/#download"
              className="inline-flex items-center gap-2 bg-kmf-accent hover:bg-kmf-accent/90 text-kmf-bg font-semibold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.03] active:scale-95"
            >
              Get the free app →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
