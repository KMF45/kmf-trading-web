/**
 * SymbolPicker.jsx — KMF Trading Journal
 * Full-screen overlay symbol picker matching Android SymbolPickerScreen
 * Features: category tabs, search, visual symbol selection
 */
import { useState, useMemo } from 'react';
import { FaSearch, FaTimes, FaCheck } from 'react-icons/fa';
import { getDefaultSymbols, getCategories, getCategoryEmoji } from '../../data/defaultSymbols';

const allSymbols = getDefaultSymbols();
const categories = getCategories();

const SymbolPicker = ({ isOpen, onClose, onSelect, currentSymbol }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? allSymbols
      : allSymbols.filter(s => s.category === activeCategory);

    if (search.trim()) {
      const q = search.toLowerCase().replace('/', '');
      list = list.filter(s =>
        s.symbol.toLowerCase().replace('/', '').includes(q) ||
        s.name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-kmf-bg flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-kmf-accent/10 bg-kmf-panel">
        <h2 className="text-lg font-bold text-kmf-text-primary">Select Instrument</h2>
        <button
          onClick={() => { setSearch(''); setActiveCategory('all'); onClose(); }}
          className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-loss hover:bg-kmf-loss/10 transition-all"
        >
          <FaTimes size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-text-tertiary text-sm" />
          <input
            type="text"
            placeholder="Search symbol or name..."
            className="w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-kmf-text-primary placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-kmf-text-tertiary hover:text-kmf-accent"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 pb-2 overflow-x-auto flex gap-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.key
                ? 'bg-kmf-accent/20 text-kmf-accent border border-kmf-accent/40'
                : 'bg-kmf-surface text-kmf-text-tertiary border border-transparent hover:border-kmf-accent/20'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="px-4 py-1">
        <span className="text-xs text-kmf-text-tertiary">{filtered.length} instruments</span>
      </div>

      {/* Symbol List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filtered.length > 0 ? (
          <div className="space-y-1">
            {filtered.map(sym => {
              const isSelected = currentSymbol?.symbol === sym.symbol;
              return (
                <button
                  key={sym.symbol}
                  onClick={() => {
                    onSelect(sym);
                    setSearch('');
                    setActiveCategory('all');
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all ${
                    isSelected
                      ? 'bg-kmf-accent/15 border border-kmf-accent/40'
                      : 'bg-kmf-panel border border-transparent hover:border-kmf-accent/20 hover:bg-kmf-surface/50'
                  }`}
                >
                  {/* Category badge */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${
                    isSelected ? 'bg-kmf-accent/20' : 'bg-kmf-surface'
                  }`}>
                    {getCategoryEmoji(sym.category)}
                  </div>

                  {/* Symbol info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${isSelected ? 'text-kmf-accent' : 'text-kmf-text-primary'}`}>
                        {sym.symbol}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-kmf-surface text-kmf-text-tertiary capitalize">
                        {sym.category}
                      </span>
                    </div>
                    <p className="text-xs text-kmf-text-tertiary truncate">{sym.name}</p>
                  </div>

                  {/* Selected check */}
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-kmf-accent flex items-center justify-center flex-shrink-0">
                      <FaCheck size={10} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-sm text-kmf-text-tertiary">No instruments found</p>
            <p className="text-xs text-kmf-text-tertiary/60 mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymbolPicker;
