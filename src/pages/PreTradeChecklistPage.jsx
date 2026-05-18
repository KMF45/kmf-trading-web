import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { LIBRARY_ITEMS, LIBRARY_CATEGORIES } from '../data/checklistLibrary';
import { STARTER_TEMPLATES } from '../data/checklistTemplates';

const PAGE_TITLE = 'Free Pre-Trade Checklist Builder — Personalized for Your Strategy | K.M.F.';
const PAGE_DESC = 'Build your own pre-trade checklist for forex, stocks, crypto, or prop firm trading. Free, no signup. Customize items, save locally, share via link, export PDF.';
const OG_IMAGE = 'https://kmfjournal.com/tools/og/pre-trade-checklist.png';
const PAGE_URL = 'https://kmfjournal.com/tools/pre-trade-checklist';
const STORAGE_KEY = 'kmf_pretrade_v1';

/* ─── ID generator (stable enough for React keys) ─── */
let _id = 0;
const uid = (prefix = '') => `${prefix}${Date.now().toString(36)}-${(_id++).toString(36)}`;

/* ─── URL encode/decode (compact, share-friendly) ─── */
function encodeChecklist(state) {
  try {
    const minimal = {
      c: (state.categories || []).map(cat => ({
        n: cat.name,
        i: cat.items.map(it => it.text),
      })),
    };
    return btoa(unescape(encodeURIComponent(JSON.stringify(minimal))));
  } catch {
    return '';
  }
}
function decodeChecklist(encoded) {
  try {
    const minimal = JSON.parse(decodeURIComponent(escape(atob(encoded))));
    if (!minimal || !Array.isArray(minimal.c)) return null;
    return {
      categories: minimal.c.map((cat) => ({
        id: uid('cat-'),
        name: String(cat.n || '').slice(0, 80),
        items: (cat.i || []).map((text) => ({
          id: uid('it-'),
          text: String(text || '').slice(0, 240),
          checked: false,
        })),
      })),
    };
  } catch {
    return null;
  }
}

/* ─── Convert a template into builder state ─── */
function templateToState(template) {
  return {
    categories: template.categories.map((cat) => ({
      id: uid('cat-'),
      name: cat.name,
      items: cat.items.map((text) => ({
        id: uid('it-'),
        text,
        checked: false,
      })),
    })),
  };
}

/* ─── Plain-text export ─── */
function checklistToText(state) {
  const lines = ['KMF Pre-Trade Checklist', '', '— kmfjournal.com —', ''];
  for (const cat of state.categories) {
    lines.push(`## ${cat.name}`);
    for (const it of cat.items) {
      lines.push(`[ ] ${it.text}`);
    }
    lines.push('');
  }
  return lines.join('\n').trim();
}

/* ─── JSON download helper ─── */
function downloadJson(state) {
  const data = JSON.stringify(
    { v: 1, exportedAt: new Date().toISOString(), categories: state.categories.map(c => ({ name: c.name, items: c.items.map(i => i.text) })) },
    null, 2
  );
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `kmf-pretrade-checklist-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function PreTradeChecklistPage() {
  const [state, setState] = useState({ categories: [] });
  const [loaded, setLoaded] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryFilter, setLibraryFilter] = useState('all');
  const [editing, setEditing] = useState(null); // { catId, itemId } | { catId, kind: 'rename' } | null
  const [addingToCat, setAddingToCat] = useState(null); // catId | 'new'
  const [showTemplates, setShowTemplates] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [textCopied, setTextCopied] = useState(false);
  const importInputRef = useRef(null);

  /* ─── Load from URL or localStorage on mount ─── */
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const c = url.searchParams.get('c');
      if (c) {
        const loadedState = decodeChecklist(c);
        if (loadedState) {
          setState(loadedState);
          setLoaded(true);
          return;
        }
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.categories)) {
          setState(parsed);
        }
      }
    } catch { /* fall through to empty state */ }
    setLoaded(true);
  }, []);

  /* ─── Auto-save to localStorage on state change ─── */
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* quota or disabled */ }
  }, [state, loaded]);

  /* ─── SEO meta + JSON-LD ─── */
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
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', 'Free Pre-Trade Checklist Builder by K.M.F. Trading Journal');
    setMeta('property', 'og:url', PAGE_URL);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', PAGE_TITLE);
    setMeta('name', 'twitter:description', PAGE_DESC);
    setMeta('name', 'twitter:image', OG_IMAGE);
    setMeta('name', 'twitter:image:alt', 'Free Pre-Trade Checklist Builder by K.M.F. Trading Journal');

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', PAGE_URL);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'KMF Pre-Trade Checklist Builder',
          url: PAGE_URL,
          description: PAGE_DESC,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          creator: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: 'https://kmfjournal.com' },
        },
        {
          '@type': 'HowTo',
          name: 'How to build a personalized pre-trade checklist',
          step: [
            { '@type': 'HowToStep', name: 'Pick a starter template or start blank' },
            { '@type': 'HowToStep', name: 'Add items from the suggestion library or write your own' },
            { '@type': 'HowToStep', name: 'Organize items into categories that match your workflow' },
            { '@type': 'HowToStep', name: 'Export as PDF or share via link, then run through it before every trade' },
          ],
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kmfjournal.com' },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kmfjournal.com/tools' },
            { '@type': 'ListItem', position: 3, name: 'Pre-Trade Checklist Builder', item: PAGE_URL },
          ],
        },
      ],
    };
    let script = document.getElementById('pretrade-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'pretrade-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);

    return () => { script?.remove(); };
  }, []);

  /* ─── Builder mutations ─── */
  const addItem = useCallback((categoryName, text) => {
    const clean = (text || '').trim();
    if (!clean) return;
    setState(prev => {
      const cats = [...prev.categories];
      let cat = cats.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
      if (!cat) {
        cat = { id: uid('cat-'), name: categoryName, items: [] };
        cats.push(cat);
      }
      cat.items = [...cat.items, { id: uid('it-'), text: clean, checked: false }];
      return { categories: cats };
    });
  }, []);

  const addCategory = useCallback((name) => {
    const clean = (name || '').trim();
    if (!clean) return;
    setState(prev => {
      if (prev.categories.some(c => c.name.toLowerCase() === clean.toLowerCase())) return prev;
      return { categories: [...prev.categories, { id: uid('cat-'), name: clean, items: [] }] };
    });
  }, []);

  const removeCategory = useCallback((catId) => {
    if (!confirm('Delete this category and all its items?')) return;
    setState(prev => ({ categories: prev.categories.filter(c => c.id !== catId) }));
  }, []);

  const renameCategory = useCallback((catId, newName) => {
    const clean = (newName || '').trim();
    if (!clean) return;
    setState(prev => ({
      categories: prev.categories.map(c => c.id === catId ? { ...c, name: clean } : c),
    }));
  }, []);

  const moveCategory = useCallback((catId, dir) => {
    setState(prev => {
      const idx = prev.categories.findIndex(c => c.id === catId);
      const swap = idx + (dir === 'up' ? -1 : 1);
      if (idx < 0 || swap < 0 || swap >= prev.categories.length) return prev;
      const cats = [...prev.categories];
      [cats[idx], cats[swap]] = [cats[swap], cats[idx]];
      return { categories: cats };
    });
  }, []);

  const editItem = useCallback((catId, itemId, newText) => {
    const clean = (newText || '').trim();
    setState(prev => ({
      categories: prev.categories.map(c => c.id === catId ? {
        ...c,
        items: clean
          ? c.items.map(it => it.id === itemId ? { ...it, text: clean } : it)
          : c.items.filter(it => it.id !== itemId),
      } : c),
    }));
  }, []);

  const removeItem = useCallback((catId, itemId) => {
    setState(prev => ({
      categories: prev.categories.map(c => c.id === catId ? {
        ...c, items: c.items.filter(it => it.id !== itemId),
      } : c),
    }));
  }, []);

  const moveItem = useCallback((catId, itemId, dir) => {
    setState(prev => ({
      categories: prev.categories.map(c => {
        if (c.id !== catId) return c;
        const idx = c.items.findIndex(it => it.id === itemId);
        const swap = idx + (dir === 'up' ? -1 : 1);
        if (idx < 0 || swap < 0 || swap >= c.items.length) return c;
        const items = [...c.items];
        [items[idx], items[swap]] = [items[swap], items[idx]];
        return { ...c, items };
      }),
    }));
  }, []);

  const toggleItem = useCallback((catId, itemId) => {
    setState(prev => ({
      categories: prev.categories.map(c => c.id === catId ? {
        ...c, items: c.items.map(it => it.id === itemId ? { ...it, checked: !it.checked } : it),
      } : c),
    }));
  }, []);

  const loadTemplate = useCallback((template) => {
    if (state.categories.length > 0) {
      if (!confirm('Loading this template will replace your current checklist. Continue?')) return;
    }
    setState(templateToState(template));
    setShowTemplates(false);
  }, [state.categories.length]);

  const resetChecks = useCallback(() => {
    setState(prev => ({
      categories: prev.categories.map(c => ({ ...c, items: c.items.map(it => ({ ...it, checked: false })) })),
    }));
  }, []);

  const resetAll = useCallback(() => {
    if (!confirm('Delete the entire checklist? This cannot be undone (unless you exported it).')) return;
    setState({ categories: [] });
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
  }, []);

  /* ─── Library helpers ─── */
  const existingTexts = useMemo(() => {
    const s = new Set();
    for (const c of state.categories) for (const it of c.items) s.add(it.text.toLowerCase());
    return s;
  }, [state]);

  const filteredLibrary = useMemo(() => {
    const q = librarySearch.trim().toLowerCase();
    return LIBRARY_ITEMS.filter(it => {
      if (libraryFilter !== 'all' && it.category !== libraryFilter) return false;
      if (q && !it.text.toLowerCase().includes(q) && !it.category.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [librarySearch, libraryFilter]);

  const libraryByCategory = useMemo(() => {
    const map = new Map();
    for (const it of filteredLibrary) {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category).push(it);
    }
    return map;
  }, [filteredLibrary]);

  /* ─── Stats ─── */
  const totalItems = state.categories.reduce((n, c) => n + c.items.length, 0);
  const checkedItems = state.categories.reduce((n, c) => n + c.items.filter(i => i.checked).length, 0);
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;
  const isEmpty = state.categories.length === 0;

  /* ─── Actions ─── */
  const handleShare = useCallback(() => {
    const enc = encodeChecklist(state);
    const url = `${PAGE_URL}?c=${enc}`;
    setShareUrl(url);
    setShareCopied(false);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => setShareCopied(true)).catch(() => {});
    }
  }, [state]);

  const handleCopyText = useCallback(() => {
    const txt = checklistToText(state);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(() => {
        setTextCopied(true);
        setTimeout(() => setTextCopied(false), 2000);
      }).catch(() => {});
    }
  }, [state]);

  const handlePrint = useCallback(() => { window.print(); }, []);

  const handleImport = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed || !Array.isArray(parsed.categories)) throw new Error('bad shape');
        const newState = {
          categories: parsed.categories.map((c) => ({
            id: uid('cat-'),
            name: String(c.name || '').slice(0, 80),
            items: (c.items || []).map((text) => ({
              id: uid('it-'),
              text: String(text || '').slice(0, 240),
              checked: false,
            })),
          })),
        };
        if (state.categories.length > 0 && !confirm('Replace your current checklist with the imported one?')) return;
        setState(newState);
      } catch {
        alert('Could not read this file. Make sure it is a checklist JSON exported from this tool.');
      } finally {
        if (importInputRef.current) importInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  }, [state.categories.length]);

  /* ═════════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-kmf-bg text-kmf-text-primary">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

          {/* Header */}
          <div className="text-center mb-8 print:mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 print:hidden" style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              Free Trading Tool
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-kmf-accent to-cyan-300 bg-clip-text text-transparent">Pre-Trade Checklist Builder</span>
            </h1>
            <p className="text-kmf-text-secondary max-w-2xl mx-auto text-base print:hidden">
              Build your own pre-trade checklist. Pick a starter, add suggestions, or write your own items.
              Auto-saved locally, shareable via link, and printable as a PDF.
            </p>
          </div>

          {/* First-time onboarding */}
          {isEmpty && loaded && (
            <div className="rounded-2xl p-6 mb-8 print:hidden" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.15)' }}>
              <h2 className="text-lg font-semibold mb-3 text-kmf-text-primary">Start with a template or from scratch</h2>
              <p className="text-sm text-kmf-text-tertiary mb-5">
                Pick a starting point. You can rewrite, delete, reorder, or add items afterwards — nothing is locked.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {STARTER_TEMPLATES.map(tpl => (
                  <button
                    key={tpl.id}
                    onClick={() => loadTemplate(tpl)}
                    className="text-left p-4 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-sm font-semibold text-kmf-accent mb-1">{tpl.name}</div>
                    <div className="text-xs text-kmf-text-tertiary leading-relaxed">{tpl.description}</div>
                    {tpl.categories.length > 0 && (
                      <div className="text-[10px] text-kmf-text-tertiary mt-2 uppercase tracking-wider">
                        {tpl.categories.reduce((n, c) => n + c.items.length, 0)} items · {tpl.categories.length} categories
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Top action bar */}
          {!isEmpty && (
            <div className="flex flex-wrap items-center gap-2 mb-6 print:hidden">
              <button onClick={() => setShowTemplates(true)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-kmf-accent/10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}>Load template</button>
              <button onClick={handleShare} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-kmf-accent/10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}>Share link</button>
              <button onClick={handleCopyText} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-kmf-accent/10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}>{textCopied ? 'Copied!' : 'Copy as text'}</button>
              <button onClick={handlePrint} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-kmf-accent/10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}>Print / PDF</button>
              <button onClick={() => downloadJson(state)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-kmf-accent/10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}>Export JSON</button>
              <button onClick={() => importInputRef.current?.click()} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-kmf-accent/10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}>Import JSON</button>
              <input ref={importInputRef} type="file" accept="application/json,.json" onChange={handleImport} className="hidden" />
              <div className="flex-1" />
              <button onClick={resetChecks} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors" style={{ background: 'rgba(255,179,0,0.08)', border: '1px solid rgba(255,179,0,0.2)', color: '#FFB300' }} title="Uncheck all items (keeps structure)">Reset checks</button>
              <button onClick={resetAll} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors" style={{ background: 'rgba(255,82,82,0.08)', border: '1px solid rgba(255,82,82,0.2)', color: '#FF5252' }} title="Delete the entire checklist">Reset all</button>
            </div>
          )}

          {/* Progress bar */}
          {!isEmpty && (
            <div className="mb-6 print:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-kmf-text-tertiary font-semibold">Progress</span>
                <span className="text-xs text-kmf-text-secondary">{checkedItems} / {totalItems} checked</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #4FC3F7, #00C853)' }} />
              </div>
            </div>
          )}

          {/* Print-only header */}
          <div className="hidden print:block mb-6 text-black">
            <h2 className="text-2xl font-bold">Pre-Trade Checklist</h2>
            <p className="text-sm">From kmfjournal.com</p>
          </div>

          {/* Builder + Library layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:block">

            {/* Builder (2 cols on lg) */}
            <div className="lg:col-span-2">
              {state.categories.map((cat, catIdx) => (
                <CategoryBlock
                  key={cat.id}
                  cat={cat}
                  isFirst={catIdx === 0}
                  isLast={catIdx === state.categories.length - 1}
                  editing={editing}
                  setEditing={setEditing}
                  addingToCat={addingToCat}
                  setAddingToCat={setAddingToCat}
                  addItem={addItem}
                  editItem={editItem}
                  removeItem={removeItem}
                  moveItem={moveItem}
                  toggleItem={toggleItem}
                  removeCategory={removeCategory}
                  renameCategory={renameCategory}
                  moveCategory={moveCategory}
                />
              ))}

              {!isEmpty && (
                <div className="mt-2 print:hidden">
                  {addingToCat === 'new' ? (
                    <InlineAddInput
                      placeholder="Category name (e.g., Setup, Risk, Psychology)"
                      onCancel={() => setAddingToCat(null)}
                      onSubmit={(name) => { addCategory(name); setAddingToCat(null); }}
                    />
                  ) : (
                    <button
                      onClick={() => setAddingToCat('new')}
                      className="w-full py-3 rounded-xl text-sm text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.12)' }}
                    >+ Add category</button>
                  )}
                </div>
              )}
            </div>

            {/* Library sidebar */}
            <aside className="print:hidden">
              <div className="rounded-2xl p-4 sticky top-24" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider mb-3">Suggestion Library</h2>
                <p className="text-xs text-kmf-text-tertiary mb-3">Click any item to add it to your checklist. It goes into the matching category (created if missing).</p>

                <input
                  type="text"
                  placeholder="Search library…"
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm text-kmf-text-primary outline-none mb-2 focus:ring-1 focus:ring-kmf-accent/40"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />

                <select
                  value={libraryFilter}
                  onChange={(e) => setLibraryFilter(e.target.value)}
                  className="w-full rounded-lg px-2 py-2 text-xs text-kmf-text-primary outline-none mb-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <option value="all">All categories</option>
                  {LIBRARY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <div className="max-h-[60vh] overflow-y-auto pr-1 -mr-1 space-y-3">
                  {Array.from(libraryByCategory.entries()).map(([catName, items]) => (
                    <div key={catName}>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-kmf-text-tertiary mb-1.5">{catName}</div>
                      <div className="space-y-1">
                        {items.map(it => {
                          const added = existingTexts.has(it.text.toLowerCase());
                          return (
                            <button
                              key={it.id}
                              onClick={() => addItem(it.category, it.text)}
                              className="w-full text-left text-xs px-2.5 py-2 rounded-lg transition-all leading-snug hover:bg-kmf-accent/10"
                              style={{
                                background: added ? 'rgba(0,200,83,0.06)' : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${added ? 'rgba(0,200,83,0.18)' : 'rgba(255,255,255,0.05)'}`,
                                color: added ? '#80E5A4' : '#B8C5D0',
                              }}
                              title={added ? 'Already in your checklist (click to add again)' : 'Click to add'}
                            >
                              <span className="flex items-start gap-2">
                                <span className="mt-0.5 shrink-0">{added ? '✓' : '+'}</span>
                                <span>{it.text}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {libraryByCategory.size === 0 && (
                    <p className="text-xs text-kmf-text-tertiary italic">No suggestions match.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* CTA — only when not empty and not in print */}
          {!isEmpty && (
            <div className="mt-12 rounded-2xl p-6 text-center print:hidden" style={{ background: 'linear-gradient(135deg, rgba(79,195,247,0.06), rgba(206,147,216,0.04))', border: '1px solid rgba(79,195,247,0.15)' }}>
              <h3 className="text-lg font-semibold text-kmf-text-primary mb-2">Run this checklist on every trade.</h3>
              <p className="text-sm text-kmf-text-tertiary mb-4 max-w-xl mx-auto">
                K.M.F. Trading Journal includes a pre-trade checklist feature in the Android app. Track completion over time, see which items you skip most, and build the habit.
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.kmf.tradingjournal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.('event', 'play_store_click', { source: 'pretrade_checklist' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: 'white', boxShadow: '0 4px 16px rgba(255,179,0,0.25)' }}
              >Download K.M.F. on Google Play</a>
            </div>
          )}

          {/* Other tools cross-link */}
          <div className="mt-12 print:hidden">
            <h3 className="text-xs uppercase tracking-wider text-kmf-text-tertiary font-semibold mb-3 text-center">Other free tools</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/tools/lot-size-calculator" className="px-3 py-1.5 rounded-lg text-xs text-kmf-text-secondary hover:text-kmf-accent transition-colors" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>Lot Size Calculator</Link>
              <Link to="/tools/risk-of-ruin" className="px-3 py-1.5 rounded-lg text-xs text-kmf-text-secondary hover:text-kmf-accent transition-colors" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>Risk of Ruin</Link>
              <Link to="/tools/win-rate-rr-matrix" className="px-3 py-1.5 rounded-lg text-xs text-kmf-text-secondary hover:text-kmf-accent transition-colors" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>Win Rate vs R:R Matrix</Link>
              <Link to="/tools/compound-calculator" className="px-3 py-1.5 rounded-lg text-xs text-kmf-text-secondary hover:text-kmf-accent transition-colors" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>Compound Calculator</Link>
            </div>
          </div>
        </div>
      </main>

      {/* Templates modal */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowTemplates(false)}>
          <div className="rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" style={{ background: '#0F1115', border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-kmf-text-primary">Load a starter template</h2>
              <button onClick={() => setShowTemplates(false)} className="text-kmf-text-tertiary hover:text-kmf-accent text-2xl leading-none">×</button>
            </div>
            <p className="text-sm text-kmf-text-tertiary mb-5">Heads up: this replaces your current checklist. Export it first if you want to keep it.</p>
            <div className="space-y-2">
              {STARTER_TEMPLATES.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => loadTemplate(tpl)}
                  className="w-full text-left p-4 rounded-xl transition-all hover:bg-kmf-accent/5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="text-sm font-semibold text-kmf-accent mb-1">{tpl.name}</div>
                  <div className="text-xs text-kmf-text-tertiary">{tpl.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Share URL modal */}
      {shareUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setShareUrl(null)}>
          <div className="rounded-2xl p-6 max-w-xl w-full" style={{ background: '#0F1115', border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-kmf-text-primary">Share your checklist</h2>
              <button onClick={() => setShareUrl(null)} className="text-kmf-text-tertiary hover:text-kmf-accent text-2xl leading-none">×</button>
            </div>
            <p className="text-sm text-kmf-text-tertiary mb-3">Anyone who opens this link gets a copy of your checklist they can edit on their side. Nothing is uploaded — the data lives in the URL.</p>
            <div className="rounded-lg p-3 mb-3 text-xs break-all font-mono text-kmf-text-secondary" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{shareUrl}</div>
            <button
              onClick={() => { navigator.clipboard?.writeText(shareUrl); setShareCopied(true); }}
              className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ background: shareCopied ? 'rgba(0,200,83,0.15)' : '#4FC3F7', color: shareCopied ? '#00C853' : '#0F1115', border: shareCopied ? '1px solid rgba(0,200,83,0.4)' : 'none' }}
            >{shareCopied ? '✓ Copied to clipboard' : 'Copy link'}</button>
          </div>
        </div>
      )}

      <Footer />

      {/* Print stylesheet */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .bg-kmf-bg { background: white !important; }
          .text-kmf-text-primary, .text-kmf-text-secondary, .text-kmf-text-tertiary, .text-kmf-accent { color: black !important; }
          .bg-clip-text { -webkit-text-fill-color: black !important; }
          nav, footer { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORY BLOCK
   ═══════════════════════════════════════════════════════════════════════════ */
function CategoryBlock({
  cat, isFirst, isLast,
  editing, setEditing,
  addingToCat, setAddingToCat,
  addItem, editItem, removeItem, moveItem, toggleItem,
  removeCategory, renameCategory, moveCategory,
}) {
  const renamingThis = editing?.kind === 'rename' && editing?.catId === cat.id;
  return (
    <section className="rounded-2xl p-5 mb-4 print:rounded-none print:p-2 print:mb-3 print:border-b print:border-gray-300" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <header className="flex items-center gap-2 mb-3 print:mb-1">
        {renamingThis ? (
          <InlineAddInput
            initial={cat.name}
            onCancel={() => setEditing(null)}
            onSubmit={(name) => { renameCategory(cat.id, name); setEditing(null); }}
          />
        ) : (
          <h3 className="text-sm font-semibold uppercase tracking-wider text-kmf-accent flex-1 print:text-black">{cat.name}</h3>
        )}
        {!renamingThis && (
          <div className="flex items-center gap-1 print:hidden">
            <IconBtn onClick={() => moveCategory(cat.id, 'up')} disabled={isFirst} title="Move category up">↑</IconBtn>
            <IconBtn onClick={() => moveCategory(cat.id, 'down')} disabled={isLast} title="Move category down">↓</IconBtn>
            <IconBtn onClick={() => setEditing({ kind: 'rename', catId: cat.id })} title="Rename category">✎</IconBtn>
            <IconBtn onClick={() => removeCategory(cat.id)} title="Delete category" danger>✕</IconBtn>
          </div>
        )}
      </header>

      <ul className="space-y-2">
        {cat.items.map((it, idx) => {
          const isEditing = editing?.itemId === it.id && editing?.catId === cat.id && editing?.kind !== 'rename';
          return (
            <li key={it.id} className="group flex items-start gap-2 print:py-1">
              <button
                onClick={() => toggleItem(cat.id, it.id)}
                className="shrink-0 mt-0.5 w-5 h-5 rounded border transition-all flex items-center justify-center print:border-black"
                style={{
                  background: it.checked ? '#4FC3F7' : 'transparent',
                  borderColor: it.checked ? '#4FC3F7' : 'rgba(255,255,255,0.2)',
                }}
                aria-label={it.checked ? 'Uncheck' : 'Check'}
              >
                {it.checked && <span className="text-[#0F1115] text-xs font-bold leading-none">✓</span>}
              </button>
              {isEditing ? (
                <div className="flex-1">
                  <InlineAddInput
                    initial={it.text}
                    onCancel={() => setEditing(null)}
                    onSubmit={(text) => { editItem(cat.id, it.id, text); setEditing(null); }}
                  />
                </div>
              ) : (
                <>
                  <span
                    onDoubleClick={() => setEditing({ catId: cat.id, itemId: it.id })}
                    className="flex-1 text-sm leading-snug cursor-pointer print:text-black"
                    style={{
                      color: it.checked ? '#8FB3C5' : '#E0E0E0',
                      textDecoration: it.checked ? 'line-through' : 'none',
                      opacity: it.checked ? 0.65 : 1,
                    }}
                    title="Double-click to edit"
                  >{it.text}</span>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                    <IconBtn onClick={() => moveItem(cat.id, it.id, 'up')} disabled={idx === 0} title="Move up">↑</IconBtn>
                    <IconBtn onClick={() => moveItem(cat.id, it.id, 'down')} disabled={idx === cat.items.length - 1} title="Move down">↓</IconBtn>
                    <IconBtn onClick={() => setEditing({ catId: cat.id, itemId: it.id })} title="Edit">✎</IconBtn>
                    <IconBtn onClick={() => removeItem(cat.id, it.id)} title="Delete" danger>✕</IconBtn>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-3 print:hidden">
        {addingToCat === cat.id ? (
          <InlineAddInput
            placeholder="New item — what should you check before entering?"
            onCancel={() => setAddingToCat(null)}
            onSubmit={(text) => { addItem(cat.name, text); setAddingToCat(null); }}
          />
        ) : (
          <button
            onClick={() => setAddingToCat(cat.id)}
            className="text-xs text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
          >+ Add item</button>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE INPUT (used for add + rename + edit)
   ═══════════════════════════════════════════════════════════════════════════ */
function InlineAddInput({ initial = '', placeholder = '', onSubmit, onCancel }) {
  const [v, setV] = useState(initial);
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); inputRef.current?.select(); }, []);
  return (
    <div className="flex items-center gap-1.5 w-full">
      <input
        ref={inputRef}
        type="text"
        value={v}
        onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit(v);
          if (e.key === 'Escape') onCancel();
        }}
        placeholder={placeholder}
        maxLength={240}
        className="flex-1 rounded-lg px-3 py-1.5 text-sm text-kmf-text-primary outline-none focus:ring-1 focus:ring-kmf-accent/40"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      />
      <button
        onClick={() => onSubmit(v)}
        className="px-2 py-1.5 rounded-lg text-xs"
        style={{ background: 'rgba(79,195,247,0.15)', color: '#4FC3F7' }}
      >Save</button>
      <button
        onClick={onCancel}
        className="px-2 py-1.5 rounded-lg text-xs text-kmf-text-tertiary hover:text-kmf-accent"
      >Cancel</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ICON BUTTON
   ═══════════════════════════════════════════════════════════════════════════ */
function IconBtn({ children, onClick, disabled, title, danger }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-6 h-6 rounded text-xs leading-none transition-colors"
      style={{
        background: 'transparent',
        color: disabled ? 'rgba(255,255,255,0.15)' : (danger ? '#FF5252' : '#8FB3C5'),
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = danger ? 'rgba(255,82,82,0.1)' : 'rgba(79,195,247,0.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >{children}</button>
  );
}
