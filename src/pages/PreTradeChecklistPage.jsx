import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { getLibraryItems, getLibraryCategories } from '../data/checklistLibrary';
import { getStarterTemplates } from '../data/checklistTemplates';
import { useLanguage } from '../i18n/LanguageContext';

const OG_IMAGE = 'https://kmfjournal.com/tools/og/pre-trade-checklist.png';
const PAGE_URL = 'https://kmfjournal.com/tools/pre-trade-checklist';
const STORAGE_KEY = 'kmf_pretrade_v1';

const T = {
  en: {
    pageTitle: 'Free Pre-Trade Checklist Builder — Personalized for Your Strategy | K.M.F.',
    pageDesc: 'Build your own pre-trade checklist for forex, stocks, crypto, or prop firm trading. Free, no signup. Customize items, save locally, share via link, export PDF.',
    ogAlt: 'Free Pre-Trade Checklist Builder by K.M.F. Trading Journal',
    badge: 'Free Trading Tool',
    heroP: 'Build your own pre-trade checklist. Pick a starter, add suggestions, or write your own items. Auto-saved locally, shareable via link, and printable as a PDF.',
    onboardTitle: 'Start with a template or from scratch',
    onboardSub: 'Pick a starting point. You can rewrite, delete, reorder, or add items afterwards — nothing is locked.',
    itemsCats: (items, cats) => `${items} items · ${cats} categories`,
    actLoadTemplate: 'Load template', actShare: 'Share link', actCopyText: 'Copy as text', actCopied: 'Copied!',
    actPrint: 'Print / PDF', actExport: 'Export JSON', actImport: 'Import JSON',
    actResetChecks: 'Reset checks', actResetAll: 'Reset all',
    titleResetChecks: 'Uncheck all items (keeps structure)', titleResetAll: 'Delete the entire checklist',
    progress: 'Progress', checkedCount: (c, t) => `${c} / ${t} checked`,
    printTitle: 'Pre-Trade Checklist',
    nameFirstCat: 'Name your first category', firstCatPlaceholder: 'e.g., Setup, Risk, Psychology',
    emptyTitle: 'Your checklist is empty',
    emptyDescA: 'Add a category to organize your checks, jump straight to your first item, or pick from the suggestion library ',
    emptyRight: 'on the right', emptyBelow: 'below',
    addCategory: 'Add category', addItem: 'Add item', loadTemplateInstead: 'Load a template instead',
    allClearTitle: "All clear — you're cleared to trade",
    allClearBody: (t) => `${t} of ${t} checks done. Trade the plan you just verified — not your mood.`,
    addCategoryDashed: '+ Add category', addItemSmall: '+ Add item',
    catPlaceholder: 'Category name (e.g., Setup, Risk, Psychology)',
    libTitle: 'Suggestion Library',
    libSub: 'Click any item to add it to your checklist. It goes into the matching category (created if missing).',
    libSearch: 'Search library…', libAllCats: 'All categories', libNoMatch: 'No suggestions match.',
    libAdded: 'Already in your checklist (click to add again)', libClickAdd: 'Click to add',
    ctaTitle: 'Run this checklist on every trade.',
    ctaBody: 'K.M.F. Trading Journal includes a pre-trade checklist feature in the Android app. Track completion over time, see which items you skip most, and build the habit.',
    ctaButton: 'Download K.M.F. on Google Play',
    otherTools: 'Other free tools',
    tplModalTitle: 'Load a starter template', tplModalWarn: 'Heads up: this replaces your current checklist. Export it first if you want to keep it.',
    shareModalTitle: 'Share your checklist',
    shareModalDesc: 'Anyone who opens this link gets a copy of your checklist they can edit on their side. Nothing is uploaded — the data lives in the URL.',
    copyLink: 'Copy link', copiedClipboard: '✓ Copied to clipboard',
    confirmDeleteCat: 'Delete this category and all its items?',
    confirmLoadTpl: 'Loading this template will replace your current checklist. Continue?',
    confirmResetAll: 'Delete the entire checklist? This cannot be undone (unless you exported it).',
    confirmImport: 'Replace your current checklist with the imported one?',
    alertBadFile: 'Could not read this file. Make sure it is a checklist JSON exported from this tool.',
    catItemPlaceholder: 'New item — what should you check before entering?',
    save: 'Save', cancel: 'Cancel',
    tMoveCatUp: 'Move category up', tMoveCatDown: 'Move category down', tRenameCat: 'Rename category', tDeleteCat: 'Delete category',
    tMoveUp: 'Move up', tMoveDown: 'Move down', tEdit: 'Edit', tDelete: 'Delete',
    aUncheck: 'Uncheck', aCheck: 'Check', tDblEdit: 'Double-click to edit',
    txtHeader: 'KMF Pre-Trade Checklist',
  },
  ro: {
    pageTitle: 'Pre-Trade Checklist Builder Gratuit — Personalizat pentru Strategia Ta | K.M.F.',
    pageDesc: 'Construiește-ți propriul checklist pre-trade pentru forex, acțiuni, crypto sau prop firm. Gratuit, fără înregistrare. Personalizează items, salvează local, distribuie prin link, exportă PDF.',
    ogAlt: 'Pre-Trade Checklist Builder Gratuit de la K.M.F. Trading Journal',
    badge: 'Unealtă gratuită',
    heroP: 'Construiește-ți propriul checklist pre-trade. Alege un șablon de start, adaugă sugestii sau scrie-ți propriile items. Salvat automat local, distribuibil prin link și printabil ca PDF.',
    onboardTitle: 'Începe cu un șablon sau de la zero',
    onboardSub: 'Alege un punct de pornire. Poți rescrie, șterge, reordona sau adăuga items după aceea — nimic nu e blocat.',
    itemsCats: (items, cats) => `${items} items · ${cats} categorii`,
    actLoadTemplate: 'Încarcă șablon', actShare: 'Distribuie link', actCopyText: 'Copiază ca text', actCopied: 'Copiat!',
    actPrint: 'Printează / PDF', actExport: 'Exportă JSON', actImport: 'Importă JSON',
    actResetChecks: 'Resetează bifele', actResetAll: 'Resetează tot',
    titleResetChecks: 'Debifează toate items (păstrează structura)', titleResetAll: 'Șterge tot checklist-ul',
    progress: 'Progres', checkedCount: (c, t) => `${c} / ${t} bifate`,
    printTitle: 'Pre-Trade Checklist',
    nameFirstCat: 'Denumește prima categorie', firstCatPlaceholder: 'ex. Setup, Risc, Psihologie',
    emptyTitle: 'Checklist-ul tău e gol',
    emptyDescA: 'Adaugă o categorie ca să-ți organizezi bifele, sari direct la primul item sau alege din librăria de sugestii ',
    emptyRight: 'din dreapta', emptyBelow: 'de mai jos',
    addCategory: 'Adaugă categorie', addItem: 'Adaugă item', loadTemplateInstead: 'Încarcă un șablon în schimb',
    allClearTitle: 'Totul clar — ai undă verde să tranzacționezi',
    allClearBody: (t) => `${t} din ${t} bife făcute. Tranzacționează planul pe care tocmai l-ai verificat — nu starea ta.`,
    addCategoryDashed: '+ Adaugă categorie', addItemSmall: '+ Adaugă item',
    catPlaceholder: 'Nume categorie (ex. Setup, Risc, Psihologie)',
    libTitle: 'Librărie de sugestii',
    libSub: 'Apasă orice item ca să-l adaugi în checklist-ul tău. Intră în categoria potrivită (creată dacă lipsește).',
    libSearch: 'Caută în librărie…', libAllCats: 'Toate categoriile', libNoMatch: 'Nicio sugestie nu se potrivește.',
    libAdded: 'Deja în checklist-ul tău (apasă ca să adaugi din nou)', libClickAdd: 'Apasă ca să adaugi',
    ctaTitle: 'Rulează acest checklist la fiecare trade.',
    ctaBody: 'K.M.F. Trading Journal include o funcție de checklist pre-trade în aplicația de Android. Urmărește completarea în timp, vezi ce items sari cel mai des și construiește obiceiul.',
    ctaButton: 'Descarcă K.M.F. din Google Play',
    otherTools: 'Alte unelte gratuite',
    tplModalTitle: 'Încarcă un șablon de start', tplModalWarn: 'Atenție: asta înlocuiește checklist-ul tău curent. Exportă-l întâi dacă vrei să-l păstrezi.',
    shareModalTitle: 'Distribuie checklist-ul tău',
    shareModalDesc: 'Oricine deschide acest link primește o copie a checklist-ului tău pe care o poate edita la el. Nimic nu se încarcă pe server — datele trăiesc în URL.',
    copyLink: 'Copiază linkul', copiedClipboard: '✓ Copiat în clipboard',
    confirmDeleteCat: 'Ștergi această categorie și toate items-urile ei?',
    confirmLoadTpl: 'Încărcarea acestui șablon va înlocui checklist-ul tău curent. Continui?',
    confirmResetAll: 'Ștergi tot checklist-ul? Asta nu se poate anula (decât dacă l-ai exportat).',
    confirmImport: 'Înlocuiești checklist-ul curent cu cel importat?',
    alertBadFile: 'Nu am putut citi acest fișier. Asigură-te că e un JSON de checklist exportat din această unealtă.',
    catItemPlaceholder: 'Item nou — ce ar trebui să verifici înainte de intrare?',
    save: 'Salvează', cancel: 'Anulează',
    tMoveCatUp: 'Mută categoria în sus', tMoveCatDown: 'Mută categoria în jos', tRenameCat: 'Redenumește categoria', tDeleteCat: 'Șterge categoria',
    tMoveUp: 'Mută în sus', tMoveDown: 'Mută în jos', tEdit: 'Editează', tDelete: 'Șterge',
    aUncheck: 'Debifează', aCheck: 'Bifează', tDblEdit: 'Dublu-click pentru editare',
    txtHeader: 'KMF Pre-Trade Checklist',
  },
};

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
  const { lang } = useLanguage();
  const t = T[lang] || T.en;
  const LIBRARY_ITEMS = useMemo(() => getLibraryItems(lang), [lang]);
  const LIBRARY_CATEGORIES = useMemo(() => getLibraryCategories(lang), [lang]);
  const STARTER_TEMPLATES = useMemo(() => getStarterTemplates(lang), [lang]);
  const [state, setState] = useState({ categories: [] });
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);
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
          setStarted(true);
          setLoaded(true);
          return;
        }
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.categories)) {
          setState(parsed);
          if (parsed.categories.length > 0) setStarted(true);
        }
      }
      if (localStorage.getItem('kmf_pretrade_started') === '1') setStarted(true);
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
    document.title = t.pageTitle;
    const setMeta = (attr, val, content) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', t.pageDesc);
    setMeta('property', 'og:title', t.pageTitle);
    setMeta('property', 'og:description', t.pageDesc);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', t.ogAlt);
    setMeta('property', 'og:url', PAGE_URL);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', t.pageTitle);
    setMeta('name', 'twitter:description', t.pageDesc);
    setMeta('name', 'twitter:image', OG_IMAGE);
    setMeta('name', 'twitter:image:alt', t.ogAlt);

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
          description: t.pageDesc,
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
  }, [t]);

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
    if (!confirm(t.confirmDeleteCat)) return;
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
      if (!confirm(t.confirmLoadTpl)) return;
    }
    setState(templateToState(template));
    setStarted(true);
    try { localStorage.setItem('kmf_pretrade_started', '1'); } catch { /* */ }
    setShowTemplates(false);
  }, [state.categories.length]);

  /* Quick add for empty-started state: create a default category and open item input */
  const handleAddFirstItem = useCallback(() => {
    const defaultName = 'My Checks';
    let targetId = state.categories.find(c => c.name.toLowerCase() === defaultName.toLowerCase())?.id;
    if (!targetId) {
      targetId = uid('cat-');
      setState(prev => ({ categories: [...prev.categories, { id: targetId, name: defaultName, items: [] }] }));
    }
    setAddingToCat(targetId);
  }, [state.categories]);

  const resetChecks = useCallback(() => {
    setState(prev => ({
      categories: prev.categories.map(c => ({ ...c, items: c.items.map(it => ({ ...it, checked: false })) })),
    }));
  }, []);

  const resetAll = useCallback(() => {
    if (!confirm(t.confirmResetAll)) return;
    setState({ categories: [] });
    setStarted(false);
    try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem('kmf_pretrade_started'); } catch { /* */ }
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
  }, [librarySearch, libraryFilter, LIBRARY_ITEMS]);

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
  const allChecked = totalItems > 0 && checkedItems === totalItems;

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
        if (state.categories.length > 0 && !confirm(t.confirmImport)) return;
        setState(newState);
      } catch {
        alert(t.alertBadFile);
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

          {/* Header — screen only */}
          <div className="text-center mb-8 print:hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              {t.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-kmf-accent to-cyan-300 bg-clip-text text-transparent">Pre-Trade Checklist Builder</span>
            </h1>
            <p className="text-kmf-text-secondary max-w-2xl mx-auto text-base">
              {t.heroP}
            </p>
          </div>

          {/* First-time onboarding — only when user has NOT picked anything yet */}
          {!started && loaded && (
            <div className="rounded-2xl p-6 mb-8 print:hidden" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.15)' }}>
              <h2 className="text-lg font-semibold mb-3 text-kmf-text-primary">{t.onboardTitle}</h2>
              <p className="text-sm text-kmf-text-tertiary mb-5">
                {t.onboardSub}
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
                        {t.itemsCats(tpl.categories.reduce((n, c) => n + c.items.length, 0), tpl.categories.length)}
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
              <ActionButton onClick={() => setShowTemplates(true)} icon={<IconLayers />} label={t.actLoadTemplate} />
              <ActionButton onClick={handleShare} icon={<IconLink />} label={t.actShare} />
              <ActionButton onClick={handleCopyText} icon={<IconCopy />} label={textCopied ? t.actCopied : t.actCopyText} active={textCopied} />
              <ActionButton onClick={handlePrint} icon={<IconPrint />} label={t.actPrint} />
              <ActionButton onClick={() => downloadJson(state)} icon={<IconDownload />} label={t.actExport} />
              <ActionButton onClick={() => importInputRef.current?.click()} icon={<IconUpload />} label={t.actImport} />
              <input ref={importInputRef} type="file" accept="application/json,.json" onChange={handleImport} className="hidden" />
              <div className="flex-1" />
              <ActionButton onClick={resetChecks} icon={<IconRefresh />} label={t.actResetChecks} tone="warn" size="sm" title={t.titleResetChecks} />
              <ActionButton onClick={resetAll} icon={<IconTrash />} label={t.actResetAll} tone="danger" size="sm" title={t.titleResetAll} />
            </div>
          )}

          {/* Progress bar */}
          {!isEmpty && (
            <div className="mb-6 print:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-kmf-text-tertiary font-semibold">{t.progress}</span>
                <span className="text-xs text-kmf-text-secondary">{t.checkedCount(checkedItems, totalItems)}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #4FC3F7, #00C853)' }} />
              </div>
            </div>
          )}

          {/* Print-only header: logo + small title */}
          <div className="hidden print:flex items-center gap-2 mb-4">
            <img className="print-logo" src="/logo-80.png" alt="KMF" width="28" height="28" style={{ width: 28, height: 28 }} />
            <div>
              <h2 className="print-header-title font-bold leading-tight" style={{ color: '#000' }}>{t.printTitle}</h2>
              <p className="print-header-sub" style={{ color: '#555' }}>kmfjournal.com</p>
            </div>
          </div>

          {/* Builder + Library layout — only after user has chosen a starting point */}
          <div className={`grid grid-cols-1 ${started ? 'lg:grid-cols-3' : ''} gap-6 print:block`}>

            {/* Builder (2 cols on lg when library is visible) */}
            <div className={started ? 'lg:col-span-2' : ''}>
              {/* Empty-started state: user clicked "Start from scratch" — show clear next-steps */}
              {started && isEmpty && (
                <div className="rounded-2xl p-8 text-center print:hidden" style={{
                  background: 'rgba(79,195,247,0.04)',
                  border: '1px dashed rgba(79,195,247,0.25)',
                }}>
                  {addingToCat === 'new' ? (
                    <>
                      <h3 className="text-sm font-semibold mb-3 text-kmf-text-primary uppercase tracking-wider">{t.nameFirstCat}</h3>
                      <div className="max-w-md mx-auto">
                        <InlineAddInput
                          t={t}
                          placeholder={t.firstCatPlaceholder}
                          onCancel={() => setAddingToCat(null)}
                          onSubmit={(name) => { addCategory(name); setAddingToCat(null); }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold mb-2 text-kmf-text-primary">{t.emptyTitle}</h3>
                      <p className="text-sm text-kmf-text-tertiary mb-5 max-w-md mx-auto">
                        {t.emptyDescA}
                        <span className="lg:inline hidden">{t.emptyRight}</span>
                        <span className="lg:hidden inline">{t.emptyBelow}</span>.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <button
                          onClick={() => setAddingToCat('new')}
                          className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 flex items-center gap-1.5"
                          style={{ background: '#4FC3F7', color: '#0F1115' }}
                        ><span className="text-base">+</span> {t.addCategory}</button>
                        <button
                          onClick={handleAddFirstItem}
                          className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 flex items-center gap-1.5"
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#E0E0E0', border: '1px solid rgba(255,255,255,0.12)' }}
                        ><span className="text-base">+</span> {t.addItem}</button>
                      </div>
                      <button
                        onClick={() => setShowTemplates(true)}
                        className="mt-5 text-xs text-kmf-text-tertiary hover:text-kmf-accent transition-colors underline"
                      >{t.loadTemplateInstead}</button>
                    </>
                  )}
                </div>
              )}

              {allChecked && (
                <div className="rounded-2xl p-5 mb-4 text-center print:hidden animate-fadeIn" style={{
                  background: 'linear-gradient(135deg, rgba(0,200,83,0.14), rgba(79,195,247,0.06))',
                  border: '1px solid rgba(0,200,83,0.32)',
                  boxShadow: '0 0 32px rgba(0,200,83,0.12)',
                }}>
                  <div className="inline-flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#00C853' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold" style={{ color: '#00E676' }}>{t.allClearTitle}</h3>
                  </div>
                  <p className="text-sm text-kmf-text-secondary mt-2 max-w-md mx-auto">
                    {t.allClearBody(totalItems)}
                  </p>
                </div>
              )}
              {state.categories.map((cat, catIdx) => (
                <CategoryBlock
                  key={cat.id}
                  t={t}
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
                      t={t}
                      placeholder={t.catPlaceholder}
                      onCancel={() => setAddingToCat(null)}
                      onSubmit={(name) => { addCategory(name); setAddingToCat(null); }}
                    />
                  ) : (
                    <button
                      onClick={() => setAddingToCat('new')}
                      className="w-full py-3 rounded-xl text-sm text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.12)' }}
                    >{t.addCategoryDashed}</button>
                  )}
                </div>
              )}
            </div>

            {/* Library sidebar — only after user has started (picked a template) */}
            {started && (
            <aside className="print:hidden">
              <div className="rounded-2xl p-4 sticky top-24" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider mb-3">{t.libTitle}</h2>
                <p className="text-xs text-kmf-text-tertiary mb-3">{t.libSub}</p>

                <input
                  type="text"
                  placeholder={t.libSearch}
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
                  <option value="all">{t.libAllCats}</option>
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
                              title={added ? t.libAdded : t.libClickAdd}
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
                    <p className="text-xs text-kmf-text-tertiary italic">{t.libNoMatch}</p>
                  )}
                </div>
              </div>
            </aside>
            )}
          </div>

          {/* CTA — only when not empty and not in print */}
          {!isEmpty && (
            <div className="mt-12 rounded-2xl p-6 text-center print:hidden" style={{ background: 'linear-gradient(135deg, rgba(79,195,247,0.06), rgba(206,147,216,0.04))', border: '1px solid rgba(79,195,247,0.15)' }}>
              <h3 className="text-lg font-semibold text-kmf-text-primary mb-2">{t.ctaTitle}</h3>
              <p className="text-sm text-kmf-text-tertiary mb-4 max-w-xl mx-auto">
                {t.ctaBody}
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.kmf.tradingjournal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.('event', 'play_store_click', { source: 'pretrade_checklist' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: 'white', boxShadow: '0 4px 16px rgba(255,179,0,0.25)' }}
              >{t.ctaButton}</a>
            </div>
          )}

          {/* Other tools cross-link */}
          <div className="mt-12 print:hidden">
            <h3 className="text-xs uppercase tracking-wider text-kmf-text-tertiary font-semibold mb-3 text-center">{t.otherTools}</h3>
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
              <h2 className="text-lg font-semibold text-kmf-text-primary">{t.tplModalTitle}</h2>
              <button onClick={() => setShowTemplates(false)} className="text-kmf-text-tertiary hover:text-kmf-accent text-2xl leading-none">×</button>
            </div>
            <p className="text-sm text-kmf-text-tertiary mb-5">{t.tplModalWarn}</p>
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
              <h2 className="text-lg font-semibold text-kmf-text-primary">{t.shareModalTitle}</h2>
              <button onClick={() => setShareUrl(null)} className="text-kmf-text-tertiary hover:text-kmf-accent text-2xl leading-none">×</button>
            </div>
            <p className="text-sm text-kmf-text-tertiary mb-3">{t.shareModalDesc}</p>
            <div className="rounded-lg p-3 mb-3 text-xs break-all font-mono text-kmf-text-secondary" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{shareUrl}</div>
            <button
              onClick={() => { navigator.clipboard?.writeText(shareUrl); setShareCopied(true); }}
              className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ background: shareCopied ? 'rgba(0,200,83,0.15)' : '#4FC3F7', color: shareCopied ? '#00C853' : '#0F1115', border: shareCopied ? '1px solid rgba(0,200,83,0.4)' : 'none' }}
            >{shareCopied ? t.copiedClipboard : t.copyLink}</button>
          </div>
        </div>
      )}

      <Footer />

      {/* Print stylesheet — strip browser injection, blackout text, empty checkboxes */}
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          main#main-content { padding: 0.9cm 1.2cm !important; }
          .bg-kmf-bg { background: white !important; }
          /* All text → solid black */
          .text-kmf-text-primary, .text-kmf-text-secondary, .text-kmf-text-tertiary, .text-kmf-accent,
          h1, h2, h3, h4, h5, p, span, li, button { color: #000 !important; }
          .bg-clip-text { -webkit-text-fill-color: #000 !important; }
          nav, footer { display: none !important; }
          /* Logo → solid black silhouette regardless of source color */
          .print-logo {
            filter: brightness(0) !important;
            width: 22pt !important;
            height: 22pt !important;
          }
          /* Header text smaller */
          .print-header-title { font-size: 10pt !important; }
          .print-header-sub { font-size: 6.5pt !important; color: #555 !important; }
          /* Empty checkbox squares — small, crisp, printable */
          .print-checkbox {
            border: 1px solid #000 !important;
            background: white !important;
            width: 9pt !important;
            height: 9pt !important;
            min-width: 9pt !important;
            border-radius: 1.5px !important;
            box-shadow: none !important;
            margin-top: 1pt !important;
          }
          .print-checkbox-mark { display: none !important; }
          /* Item text — small, dense, solid black */
          .print-item-text {
            color: #000 !important;
            text-decoration: none !important;
            opacity: 1 !important;
            font-size: 8pt !important;
            line-height: 1.35 !important;
          }
          /* Category title — compact uppercase */
          .print-cat-title {
            color: #000 !important;
            font-size: 8.5pt !important;
            margin-bottom: 3pt !important;
            letter-spacing: 0.04em !important;
          }
          /* Tight section spacing, kill card backgrounds */
          section {
            page-break-inside: avoid;
            background: none !important;
            border: none !important;
            padding: 0 !important;
            margin-bottom: 6pt !important;
          }
          ul { margin: 0 !important; }
          li { padding: 0.5pt 0 !important; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORY BLOCK
   ═══════════════════════════════════════════════════════════════════════════ */
function CategoryBlock({
  t, cat, isFirst, isLast,
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
            t={t}
            initial={cat.name}
            onCancel={() => setEditing(null)}
            onSubmit={(name) => { renameCategory(cat.id, name); setEditing(null); }}
          />
        ) : (
          <h3 className="print-cat-title text-sm font-semibold uppercase tracking-wider text-kmf-accent flex-1">{cat.name}</h3>
        )}
        {!renamingThis && (
          <div className="flex items-center gap-1 print:hidden">
            <IconBtn onClick={() => moveCategory(cat.id, 'up')} disabled={isFirst} title={t.tMoveCatUp}>↑</IconBtn>
            <IconBtn onClick={() => moveCategory(cat.id, 'down')} disabled={isLast} title={t.tMoveCatDown}>↓</IconBtn>
            <IconBtn onClick={() => setEditing({ kind: 'rename', catId: cat.id })} title={t.tRenameCat}>✎</IconBtn>
            <IconBtn onClick={() => removeCategory(cat.id)} title={t.tDeleteCat} danger>✕</IconBtn>
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
                className="print-checkbox shrink-0 mt-0.5 w-5 h-5 rounded border transition-all flex items-center justify-center"
                style={{
                  background: it.checked ? '#4FC3F7' : 'transparent',
                  borderColor: it.checked ? '#4FC3F7' : 'rgba(255,255,255,0.2)',
                }}
                aria-label={it.checked ? t.aUncheck : t.aCheck}
              >
                {it.checked && <span className="print-checkbox-mark text-[#0F1115] text-xs font-bold leading-none">✓</span>}
              </button>
              {isEditing ? (
                <div className="flex-1">
                  <InlineAddInput
                    t={t}
                    initial={it.text}
                    onCancel={() => setEditing(null)}
                    onSubmit={(text) => { editItem(cat.id, it.id, text); setEditing(null); }}
                  />
                </div>
              ) : (
                <>
                  <span
                    onDoubleClick={() => setEditing({ catId: cat.id, itemId: it.id })}
                    className="print-item-text flex-1 text-sm leading-snug cursor-pointer"
                    style={{
                      color: it.checked ? '#8FB3C5' : '#E0E0E0',
                      textDecoration: it.checked ? 'line-through' : 'none',
                      opacity: it.checked ? 0.65 : 1,
                    }}
                    title={t.tDblEdit}
                  >{it.text}</span>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                    <IconBtn onClick={() => moveItem(cat.id, it.id, 'up')} disabled={idx === 0} title={t.tMoveUp}>↑</IconBtn>
                    <IconBtn onClick={() => moveItem(cat.id, it.id, 'down')} disabled={idx === cat.items.length - 1} title={t.tMoveDown}>↓</IconBtn>
                    <IconBtn onClick={() => setEditing({ catId: cat.id, itemId: it.id })} title={t.tEdit}>✎</IconBtn>
                    <IconBtn onClick={() => removeItem(cat.id, it.id)} title={t.tDelete} danger>✕</IconBtn>
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
            t={t}
            placeholder={t.catItemPlaceholder}
            onCancel={() => setAddingToCat(null)}
            onSubmit={(text) => { addItem(cat.name, text); setAddingToCat(null); }}
          />
        ) : (
          <button
            onClick={() => setAddingToCat(cat.id)}
            className="text-xs text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
          >{t.addItemSmall}</button>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE INPUT (used for add + rename + edit)
   ═══════════════════════════════════════════════════════════════════════════ */
function InlineAddInput({ t, initial = '', placeholder = '', onSubmit, onCancel }) {
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
      >{t?.save ?? 'Save'}</button>
      <button
        onClick={onCancel}
        className="px-2 py-1.5 rounded-lg text-xs text-kmf-text-tertiary hover:text-kmf-accent"
      >{t?.cancel ?? 'Cancel'}</button>
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

/* ═══════════════════════════════════════════════════════════════════════════
   ACTION BUTTON (top toolbar — prominent, icon + label)
   ═══════════════════════════════════════════════════════════════════════════ */
const ACTION_TONES = {
  default: {
    bg: 'rgba(255,255,255,0.06)',
    bgHover: 'rgba(79,195,247,0.14)',
    border: 'rgba(255,255,255,0.12)',
    borderHover: 'rgba(79,195,247,0.4)',
    color: '#D8E1EA',
    colorHover: '#4FC3F7',
  },
  active: {
    bg: 'rgba(0,200,83,0.14)',
    bgHover: 'rgba(0,200,83,0.18)',
    border: 'rgba(0,200,83,0.4)',
    borderHover: 'rgba(0,200,83,0.5)',
    color: '#80E5A4',
    colorHover: '#80E5A4',
  },
  warn: {
    bg: 'rgba(255,179,0,0.1)',
    bgHover: 'rgba(255,179,0,0.18)',
    border: 'rgba(255,179,0,0.35)',
    borderHover: 'rgba(255,179,0,0.55)',
    color: '#FFB300',
    colorHover: '#FFD54F',
  },
  danger: {
    bg: 'rgba(255,82,82,0.1)',
    bgHover: 'rgba(255,82,82,0.18)',
    border: 'rgba(255,82,82,0.35)',
    borderHover: 'rgba(255,82,82,0.55)',
    color: '#FF5252',
    colorHover: '#FF8A80',
  },
};

function ActionButton({ icon, label, onClick, tone = 'default', active, title, size }) {
  const t = ACTION_TONES[active ? 'active' : tone] || ACTION_TONES.default;
  const isSm = size === 'sm';
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center rounded-lg font-semibold transition-all duration-150 ${isSm ? 'gap-1.5 px-2.5 py-1.5 text-xs' : 'gap-2 px-3.5 py-2 text-sm'}`}
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        color: t.color,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = t.bgHover;
        e.currentTarget.style.borderColor = t.borderHover;
        e.currentTarget.style.color = t.colorHover;
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = t.bg;
        e.currentTarget.style.borderColor = t.border;
        e.currentTarget.style.color = t.color;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span className={`shrink-0 inline-flex ${isSm ? '[&_svg]:w-3 [&_svg]:h-3' : ''}`}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

/* ─── Icons (Material-style, 16px) ─── */
const iconProps = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' };
const IconLayers = () => <svg {...iconProps}><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg>;
const IconLink = () => <svg {...iconProps}><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>;
const IconCopy = () => <svg {...iconProps}><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>;
const IconPrint = () => <svg {...iconProps}><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>;
const IconDownload = () => <svg {...iconProps}><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>;
const IconUpload = () => <svg {...iconProps}><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>;
const IconRefresh = () => <svg {...iconProps}><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>;
const IconTrash = () => <svg {...iconProps}><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>;
