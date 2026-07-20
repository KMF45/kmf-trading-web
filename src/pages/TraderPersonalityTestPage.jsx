import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { QUESTIONS, PROFILES, TOTAL_QUESTIONS, scoreTest, profileBySlug } from '../data/traderPersonalityTest';
import { trackEvent } from '../utils/consent';

const OG_IMAGE = 'https://kmfjournal.com/tools/og/trader-personality-test.png';
const PAGE_URL = 'https://kmfjournal.com/tools/trader-personality-test';
const LS_KEY = 'kmf_personality_test_v1';
const APP_CTA = '/#download';

const PAGE_TITLE = 'Trader Personality Test — Which of the 9 Trader Types Are You? | K.M.F.';
const PAGE_DESC = 'Free 16-question trader personality test. Find your trading archetype — Sniper, Stoic, Revenge Trader, True Believer & more — with your behavioral biases and 3 fixes. No signup, nothing stored on a server.';

const typeImg = (key) => `/tools/personality/${key.toLowerCase()}.png`;
const shareUrl = (profile) => `${PAGE_URL}/${profile.slug}`;
const shareImg = (profile) => `https://kmfjournal.com/tools/og/personality/${profile.slug}.png`;
const OG_ALT = 'K.M.F. Trader Personality Test';

const STYLE_LABEL = {
  scalper: 'scalper', day: 'day trader', swing: 'swing trader',
  position: 'position trader', mixed: 'developing trader',
};

const FAQ = [
  { q: 'What is the trader personality test?', a: 'A free 16-question self-assessment that estimates your trading archetype across 9 behavioral profiles used in the K.M.F. Trading Journal app — from the disciplined Sniper to the emotional Revenge Trader. It reveals your dominant behavioral bias and gives you three concrete fixes.' },
  { q: 'Do you store my answers or results?', a: 'No. Everything runs in your browser. Your answers and result are saved only in your own browser (localStorage) so a page refresh does not lose them — nothing is ever sent to, or stored on, a server. There is no signup and no data collection.' },
  { q: 'How accurate is it?', a: 'It is a self-report estimate of the same trader archetypes the K.M.F. app computes automatically from your real trades (discipline, emotions, hold-time patterns, disposition effect). It is an excellent mirror and starting point — your true, data-driven profile comes from your actual trade history in the app.' },
];

// ── Count-up hook (matches the site's StatsStrip pattern) ──
function useCountUp(target, run, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) { setVal(0); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

// ── Confetti burst (CSS, zero deps) ──
const CONFETTI_COLORS = ['#4FC3F7', '#00C853', '#FFB300', '#CE93D8', '#FF5252'];
function Confetti({ show }) {
  const pieces = useRef(
    Array.from({ length: 46 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      dur: 1.8 + Math.random() * 1.6,
      size: 6 + Math.random() * 7,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rot: Math.random() * 360,
      round: Math.random() > 0.6,
    }))
  ).current;
  if (!show) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute', top: '-16px', left: `${p.left}%`,
            width: p.size, height: p.round ? p.size : p.size * 0.4,
            background: p.color, borderRadius: p.round ? '50%' : '1px',
            transform: `rotate(${p.rot}deg)`,
            animation: `kmf-confetti-fall ${p.dur}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

// ── Animated match bar ──
function MatchBar({ item, run, index }) {
  const pct = useCountUp(item.pct, run);
  return (
    <div className="kmf-anim-stagger" style={{ animationDelay: `${0.15 + index * 0.12}s` }}>
      <div className="flex items-center justify-between mb-1.5 text-sm">
        <span className="text-kmf-text-primary font-medium flex items-center gap-2">
          <img src={typeImg(item.key)} alt="" className="w-5 h-5 rounded" />
          {item.name}
        </span>
        <span className="tabular-nums font-semibold" style={{ color: item.color }}>{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="kmf-bar-fill h-full rounded-full"
          style={{ width: run ? `${item.pct}%` : '0%', background: item.color }}
        />
      </div>
    </div>
  );
}

export default function TraderPersonalityTestPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  // A shared result URL (/tools/trader-personality-test/sniper) renders the
  // archetype as a landing page for the visitor who received the link.
  const sharedProfile = type ? profileBySlug(type) : null;

  const [phase, setPhase] = useState('intro'); // intro | quiz | analyzing | result
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [barsOn, setBarsOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [manualLink, setManualLink] = useState(null); // shown when copying is blocked
  const [pdfBusy, setPdfBusy] = useState(false);
  // Set when a visitor on a shared URL starts their own test. We stay on that
  // URL on purpose: navigating to the base route would remount this component
  // (separate <Route> elements) and throw away the quiz state.
  const [leftShared, setLeftShared] = useState(false);
  const cardRef = useRef(null);

  // Unknown slug → send it to the clean test URL rather than showing a broken page.
  useEffect(() => {
    if (type && !sharedProfile) navigate('/tools/trader-personality-test', { replace: true });
  }, [type, sharedProfile, navigate]);

  // ── SEO ──
  useEffect(() => {
    const title = sharedProfile
      ? `${sharedProfile.name} — Trader Personality Test | K.M.F.`
      : PAGE_TITLE;
    const desc = sharedProfile
      ? `${sharedProfile.tagline} ${sharedProfile.description.slice(0, 150)}… Take the free 16-question test and find your own trader archetype.`
      : PAGE_DESC;
    const image = sharedProfile ? shareImg(sharedProfile) : OG_IMAGE;
    const url = sharedProfile ? shareUrl(sharedProfile) : PAGE_URL;

    document.title = title;
    const setMeta = (attr, val, content) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', sharedProfile ? sharedProfile.name : OG_ALT);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', image);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', url);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'Trader Personality Test',
          url: PAGE_URL,
          description: desc,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          creator: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: 'https://kmfjournal.com' },
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kmfjournal.com' },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kmfjournal.com/tools' },
            { '@type': 'ListItem', position: 3, name: 'Trader Personality Test', item: PAGE_URL },
            ...(sharedProfile
              ? [{ '@type': 'ListItem', position: 4, name: sharedProfile.name, item: shareUrl(sharedProfile) }]
              : []),
          ],
        },
      ],
    };
    let script = document.getElementById('tpt-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'tpt-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);
    return () => { script?.remove(); link?.remove(); };
  }, [sharedProfile]);

  // ── Load saved state (results persist across refresh; no server) ──
  useEffect(() => {
    // On a shared archetype URL the visitor came to see THAT profile — don't
    // hijack the page with their own saved result.
    if (sharedProfile) return;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.answers) setAnswers(saved.answers);
      if (saved.completed && saved.answers) {
        setResult(scoreTest(saved.answers));
        setPhase('result');
      } else if (saved.answers && Object.keys(saved.answers).length) {
        const firstUnanswered = QUESTIONS.findIndex(q => saved.answers[q.id] == null);
        setStep(firstUnanswered === -1 ? 0 : firstUnanswered);
        setPhase('quiz');
      }
    } catch { /* ignore corrupt storage */ }
  }, [sharedProfile]);

  // Trigger result animations after mount
  useEffect(() => {
    if (phase !== 'result') { setBarsOn(false); return; }
    const t = setTimeout(() => setBarsOn(true), 150);
    return () => clearTimeout(t);
  }, [phase, result]);

  const persist = (nextAnswers, completed) => {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ v: 1, answers: nextAnswers, completed: !!completed })); } catch { /* storage disabled */ }
  };

  const start = (source = 'intro') => {
    trackEvent('test_start', { source });
    setPhase('quiz'); setStep(0); window.scrollTo({ top: 0 });
  };

  const pick = (idx) => {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.id]: idx };
    setAnswers(next);
    const isLast = step === TOTAL_QUESTIONS - 1;
    persist(next, isLast);
    // Halfway marker: the funnel gap between start and here is where people bail.
    if (step + 1 === Math.floor(TOTAL_QUESTIONS / 2)) trackEvent('test_halfway');
    setTimeout(() => {
      if (isLast) {
        setPhase('analyzing');
        window.scrollTo({ top: 0 });
        setTimeout(() => {
          const scored = scoreTest(next);
          trackEvent('test_complete', { archetype: scored.profile.slug, trading_style: scored.style });
          setResult(scored); setPhase('result'); window.scrollTo({ top: 0 });
        }, 1600);
      } else {
        setStep(s => s + 1);
      }
    }, 240);
  };

  const goBack = () => {
    if (step === 0) { setPhase('intro'); return; }
    setStep(s => s - 1);
  };

  const reset = useCallback(() => {
    trackEvent('test_retake');
    try { localStorage.removeItem(LS_KEY); } catch { /* noop */ }
    setAnswers({}); setResult(null); setStep(0); setBarsOn(false); setPhase('intro');
    window.scrollTo({ top: 0 });
  }, []);

  // Legacy copy path for browsers that deny the async Clipboard API.
  const copyFallback = (value) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const share = async () => {
    if (!result) return;
    // Shares the archetype's own URL so the link preview shows that card.
    const url = shareUrl(result.profile);
    const text = `I'm "${result.profile.name}" ${result.profile.emoji} — my trader personality. Find yours:`;
    const full = `${text} ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Trader Personality', text, url });
        trackEvent('test_share', { archetype: result.profile.slug, method: 'native' });
        return;
      } catch (e) {
        // AbortError = user closed the share sheet on purpose; anything else
        // means the sheet failed, so fall through to copying instead.
        if (e?.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(full);
      trackEvent('test_share', { archetype: result.profile.slug, method: 'clipboard' });
      setCopied(true); setTimeout(() => setCopied(false), 2200);
      return;
    } catch { /* clipboard blocked — try the legacy path */ }

    if (copyFallback(full)) {
      trackEvent('test_share', { archetype: result.profile.slug, method: 'exec_command' });
      setCopied(true); setTimeout(() => setCopied(false), 2200);
      return;
    }

    // Nothing could copy for the user — show the link so they can do it manually.
    trackEvent('test_share', { archetype: result.profile.slug, method: 'manual' });
    setManualLink(url);
  };

  const downloadPdf = async () => {
    if (!cardRef.current || pdfBusy) return;
    setPdfBusy(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: '#0F1115', cacheBust: true });
      const img = new Image();
      img.src = dataUrl;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ orientation: img.height > img.width ? 'portrait' : 'landscape', unit: 'px', format: [img.width, img.height] });
      pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
      pdf.save(`kmf-trader-personality-${result.profile.key.toLowerCase()}.pdf`);
      trackEvent('test_pdf_download', { archetype: result.profile.slug });
    } catch (e) {
      console.error('PDF export failed', e);
      alert('Could not generate the PDF. Please try again.');
    } finally {
      setPdfBusy(false);
    }
  };

  const q = QUESTIONS[step];
  const answeredCount = Object.keys(answers).length;
  const progress = phase === 'result' ? 100 : Math.round((step / TOTAL_QUESTIONS) * 100);

  return (
    <div className="min-h-screen bg-kmf-bg text-kmf-text-primary">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* ── SHARED RESULT (someone sent you their archetype) ── */}
          {sharedProfile && !leftShared && phase === 'intro' && (
            <div className="kmf-anim-qin">
              <div className="bg-kmf-card border rounded-2xl p-6 sm:p-8 text-center" style={{ borderColor: `${sharedProfile.color}40` }}>
                <div className="text-xs font-semibold tracking-wider uppercase text-kmf-text-secondary mb-3">A Trader Personality</div>
                <img
                  src={typeImg(sharedProfile.key)}
                  alt={sharedProfile.name}
                  width="512" height="512"
                  className="kmf-anim-emoji inline-block w-40 h-40 sm:w-44 sm:h-44 rounded-2xl mb-4 border"
                  style={{ borderColor: `${sharedProfile.color}40` }}
                />
                <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: sharedProfile.color }}>{sharedProfile.name}</h1>
                <p className="text-kmf-text-secondary text-lg">{sharedProfile.tagline}</p>

                <p className="text-kmf-text-primary/90 leading-relaxed mt-6 text-left">{sharedProfile.description}</p>

                <div className="mt-7 rounded-xl p-4 border-l-4 text-left" style={{ borderColor: sharedProfile.color, background: `${sharedProfile.color}12` }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: sharedProfile.color }}>🧠 The behavioral bias</div>
                  <p className="text-sm text-kmf-text-primary/90">{sharedProfile.bias}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-6 text-left">
                  <div>
                    <div className="text-sm font-semibold text-kmf-profit mb-2">💪 Strengths</div>
                    <ul className="space-y-1.5">
                      {sharedProfile.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-kmf-text-primary/85 flex gap-2"><span className="text-kmf-profit">+</span>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-kmf-loss mb-2">⚠️ Watch out for</div>
                    <ul className="space-y-1.5">
                      {sharedProfile.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-kmf-text-primary/85 flex gap-2"><span className="text-kmf-loss">−</span>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl p-6 text-center border border-kmf-accent/20 bg-gradient-to-b from-kmf-accent/10 to-transparent">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Which of the 9 types are <span className="text-kmf-accent">you</span>?</h2>
                <p className="text-kmf-text-secondary text-sm mb-5 max-w-md mx-auto">
                  16 questions, about 2 minutes. No signup, nothing stored on a server — your answers never leave your browser.
                </p>
                <button
                  onClick={() => { setLeftShared(true); start('shared_result'); }}
                  className="inline-flex items-center gap-2 bg-kmf-accent hover:bg-kmf-accent/90 text-kmf-bg font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-kmf-accent/20"
                >
                  Take the test →
                </button>
              </div>
            </div>
          )}

          {/* ── INTRO ── */}
          {(!sharedProfile || leftShared) && phase === 'intro' && (
            <div className="kmf-anim-qin text-center">
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-kmf-accent bg-kmf-accent/10 border border-kmf-accent/20 rounded-full px-3 py-1 mb-5">
                Free Trading Tool
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                What's Your <span className="text-kmf-accent">Trader Personality?</span>
              </h1>
              <p className="text-kmf-text-secondary text-lg mb-6 max-w-xl mx-auto">
                16 quick questions reveal which of the <strong className="text-kmf-text-primary">9 trader archetypes</strong> you are — plus your hidden behavioral bias and three fixes to trade better.
              </p>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-kmf-text-secondary mb-8">
                <span>⏱️ ~2 minutes</span>
                <span>🔒 Nothing saved on a server</span>
                <span>🚫 No signup</span>
              </div>

              <button
                onClick={() => start('intro')}
                className="inline-flex items-center gap-2 bg-kmf-accent hover:bg-kmf-accent/90 text-kmf-bg font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-kmf-accent/20"
              >
                Start the test →
              </button>

              {answeredCount > 0 && (
                <div className="mt-4">
                  <button onClick={() => setPhase('quiz')} className="text-sm text-kmf-accent underline underline-offset-2">
                    Resume where you left off ({answeredCount}/{TOTAL_QUESTIONS})
                  </button>
                </div>
              )}

              <div className="mt-10 grid sm:grid-cols-3 gap-3 text-left">
                {[
                  ['🎯', 'Your archetype', 'From Sniper to True Believer'],
                  ['🧠', 'Your bias', 'The behavioral trap to watch'],
                  ['✅', '3 fixes + PDF', 'Actionable, downloadable'],
                ].map(([e, t, d]) => (
                  <div key={t} className="bg-kmf-card border border-white/5 rounded-xl p-4">
                    <div className="text-2xl mb-1">{e}</div>
                    <div className="font-semibold text-sm">{t}</div>
                    <div className="text-xs text-kmf-text-secondary">{d}</div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-xs text-kmf-text-secondary/80 max-w-md mx-auto">
                🔒 Your answers stay in your browser (localStorage) so a refresh won't lose them. We don't collect, send, or store anything on a server.
              </p>
            </div>
          )}

          {/* ── QUIZ ── */}
          {phase === 'quiz' && q && (
            <div>
              {/* progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <button onClick={goBack} className="text-kmf-text-secondary hover:text-kmf-text-primary transition-colors">← Back</button>
                  <span className="text-kmf-text-secondary tabular-nums">{step + 1} / {TOTAL_QUESTIONS}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="kmf-bar-fill h-full rounded-full bg-kmf-accent" style={{ width: `${((step) / TOTAL_QUESTIONS) * 100}%` }} />
                </div>
              </div>

              <div key={q.id} className="kmf-anim-qin">
                <div className="text-xs font-semibold tracking-wider uppercase text-kmf-accent mb-3">{q.section}</div>
                <h2 className="text-2xl font-bold mb-2 leading-snug">{q.text}</h2>
                <p className="text-xs text-kmf-text-secondary/70 mb-6">Pick what you <strong className="text-kmf-text-secondary">actually do most often</strong> — not your ideal self. One honest answer.</p>

                <div className="space-y-3">
                  {q.options.map((opt, idx) => {
                    const selected = answers[q.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => pick(idx)}
                        className={`kmf-anim-stagger w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 active:scale-[0.98] ${
                          selected
                            ? 'border-kmf-accent bg-kmf-accent/10 scale-[1.01]'
                            : 'border-white/8 bg-kmf-card hover:border-kmf-accent/40 hover:bg-white/[0.03]'
                        }`}
                        style={{ animationDelay: `${idx * 0.05}s` }}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'border-kmf-accent bg-kmf-accent' : 'border-white/25'}`}>
                            {selected && <span className="w-2 h-2 rounded-full bg-kmf-bg" />}
                          </span>
                          <span className="text-kmf-text-primary">{opt.text}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── ANALYZING ── */}
          {phase === 'analyzing' && (
            <div className="text-center py-16 kmf-anim-qin">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-kmf-accent" style={{ animation: 'kmf-ring-spin 0.9s linear infinite' }} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Analyzing your answers…</h2>
              <p className="text-kmf-text-secondary">Matching you against 9 trader archetypes</p>
              <div className="flex justify-center gap-1.5 mt-6">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full bg-kmf-accent" style={{ animation: `kmf-dots 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          {/* ── RESULT ── */}
          {phase === 'result' && result && (
            <div className="relative">
              <Confetti show={barsOn} />

              <div className="kmf-anim-result">
                {/* Card (captured for PDF) */}
                <div ref={cardRef} className="bg-kmf-card border rounded-2xl p-6 sm:p-8" style={{ borderColor: `${result.profile.color}40` }}>
                  <div className="text-center">
                    <div className="text-xs font-semibold tracking-wider uppercase text-kmf-text-secondary mb-3">Your Trader Personality</div>
                    <img
                      src={typeImg(result.profile.key)}
                      alt={result.profile.name}
                      width="512" height="512"
                      className="kmf-anim-emoji inline-block w-40 h-40 sm:w-44 sm:h-44 rounded-2xl mb-4 border"
                      style={{ borderColor: `${result.profile.color}40` }}
                    />
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: result.profile.color }}>{result.profile.name}</h1>
                    <p className="text-kmf-text-secondary text-lg mb-1">{result.profile.tagline}</p>
                    <p className="text-xs text-kmf-text-secondary/70">Based on your answers as a {STYLE_LABEL[result.style] || 'trader'}</p>
                  </div>

                  <p className="text-kmf-text-primary/90 leading-relaxed mt-6">{result.profile.description}</p>

                  {/* match breakdown */}
                  {result.breakdown.length > 1 && (
                    <div className="mt-7 space-y-4">
                      <div className="text-sm font-semibold text-kmf-text-secondary">Your match</div>
                      {result.breakdown.map((item, i) => (
                        <MatchBar key={item.key} item={item} run={barsOn} index={i} />
                      ))}
                    </div>
                  )}

                  {/* bias callout */}
                  <div className="mt-7 rounded-xl p-4 border-l-4" style={{ borderColor: result.profile.color, background: `${result.profile.color}12` }}>
                    <div className="text-sm font-semibold mb-1" style={{ color: result.profile.color }}>🧠 Your behavioral bias</div>
                    <p className="text-sm text-kmf-text-primary/90">{result.profile.bias}</p>
                  </div>

                  {/* strengths / weaknesses */}
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div className="kmf-anim-stagger" style={{ animationDelay: '0.5s' }}>
                      <div className="text-sm font-semibold text-kmf-profit mb-2">💪 Strengths</div>
                      <ul className="space-y-1.5">
                        {result.profile.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-kmf-text-primary/85 flex gap-2"><span className="text-kmf-profit">+</span>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="kmf-anim-stagger" style={{ animationDelay: '0.62s' }}>
                      <div className="text-sm font-semibold text-kmf-loss mb-2">⚠️ Watch out for</div>
                      <ul className="space-y-1.5">
                        {result.profile.weaknesses.map((w, i) => (
                          <li key={i} className="text-sm text-kmf-text-primary/85 flex gap-2"><span className="text-kmf-loss">−</span>{w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* tips */}
                  <div className="mt-6 kmf-anim-stagger" style={{ animationDelay: '0.74s' }}>
                    <div className="text-sm font-semibold text-kmf-accent mb-2">✅ 3 fixes to work on</div>
                    <ol className="space-y-2">
                      {result.profile.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-kmf-text-primary/90 flex gap-3">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-kmf-accent/15 text-kmf-accent font-semibold flex items-center justify-center text-xs">{i + 1}</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-kmf-text-secondary/60">
                    kmfjournal.com · Trader Personality Test
                  </div>
                </div>

                {/* actions */}
                <div className="flex flex-wrap gap-3 mt-5">
                  <button onClick={downloadPdf} disabled={pdfBusy} className="flex-1 min-w-[140px] bg-kmf-accent hover:bg-kmf-accent/90 disabled:opacity-60 text-kmf-bg font-semibold px-5 py-3 rounded-xl transition-all active:scale-95">
                    {pdfBusy ? 'Generating…' : '⬇ Download PDF'}
                  </button>
                  <button onClick={share} className="flex-1 min-w-[140px] bg-kmf-card border border-white/10 hover:border-kmf-accent/40 font-semibold px-5 py-3 rounded-xl transition-all active:scale-95">
                    {copied ? '✓ Link copied' : '↗ Share result'}
                  </button>
                  <button onClick={reset} className="flex-1 min-w-[140px] bg-kmf-card border border-white/10 hover:border-white/25 text-kmf-text-secondary font-semibold px-5 py-3 rounded-xl transition-all active:scale-95">
                    ↻ Retake
                  </button>
                </div>

                {/* Copying blocked by the browser — hand the link over directly. */}
                {manualLink && (
                  <div className="mt-3 bg-kmf-card border border-kmf-accent/30 rounded-xl p-4">
                    <div className="text-sm font-semibold mb-2">Your browser blocked copying — here's your link:</div>
                    <input
                      readOnly
                      value={manualLink}
                      onFocus={(e) => e.target.select()}
                      className="w-full bg-kmf-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-kmf-text-primary"
                      aria-label="Your result link"
                    />
                    <div className="text-xs text-kmf-text-secondary mt-2">Tap the link to select it, then copy.</div>
                  </div>
                )}

                {/* CTA to app */}
                <div className="mt-8 rounded-2xl p-6 text-center border border-kmf-accent/20 bg-gradient-to-b from-kmf-accent/10 to-transparent">
                  <h3 className="text-xl font-bold mb-2">This is your <em>self-image</em>. Want your <span className="text-kmf-accent">real</span> profile?</h3>
                  <p className="text-kmf-text-secondary text-sm mb-5 max-w-md mx-auto">
                    The K.M.F. app computes your true archetype automatically from your actual trades — discipline, emotions, hold-times and disposition effect. No guessing.
                  </p>
                  <a href={APP_CTA} className="inline-flex items-center gap-2 bg-kmf-accent hover:bg-kmf-accent/90 text-kmf-bg font-semibold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.03] active:scale-95">
                    Get the free app →
                  </a>
                </div>

                <p className="mt-6 text-center text-xs text-kmf-text-secondary/70 max-w-md mx-auto">
                  🔒 This result lives only in your browser. We don't collect, send, or store your answers anywhere. Hit “Retake” to erase it.
                </p>
              </div>
            </div>
          )}

          {/* ── FAQ / explainer (always visible on intro & result for SEO) ── */}
          {(phase === 'intro' || phase === 'result') && (
            <div className="mt-16 border-t border-white/5 pt-10">
              <h2 className="text-xl font-bold mb-5">Frequently asked</h2>
              <div className="space-y-4">
                {FAQ.map((f) => (
                  <div key={f.q} className="bg-kmf-card border border-white/5 rounded-xl p-4">
                    <div className="font-semibold text-kmf-text-primary mb-1.5">{f.q}</div>
                    <p className="text-sm text-kmf-text-secondary leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>

              {/* type list for SEO */}
              <h2 className="text-xl font-bold mb-4 mt-10">The 9 trader archetypes</h2>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {Object.values(PROFILES).map((p) => (
                  <div key={p.key} className="flex items-center gap-3 bg-kmf-card border border-white/5 rounded-lg px-4 py-3">
                    <img src={typeImg(p.key)} alt={p.name} width="512" height="512" loading="lazy" className="w-11 h-11 shrink-0 rounded-lg" />
                    <div>
                      <div className="font-semibold text-sm" style={{ color: p.color }}>{p.name}</div>
                      <div className="text-xs text-kmf-text-secondary">{p.tagline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
