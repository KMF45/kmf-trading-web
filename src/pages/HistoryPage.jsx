import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrades } from '../contexts/TradesContext';
import { formatPrice, formatPnL, formatDate, formatTime } from '../utils/formatters';
import { getCategoryEmoji, getSymbolByCode } from '../data/defaultSymbols';
import {
  FaHistory, FaSearch, FaFilter, FaChevronDown, FaChevronUp,
  FaEdit, FaTrashAlt, FaCheck, FaTimes, FaCalendarAlt, FaClock,
  FaStar, FaSortAmountDown, FaSortAmountUp,
} from 'react-icons/fa';

const RESULT_CONFIG = {
  PROFIT: { label: '✅ Profit', bg: 'bg-kmf-profit/15', text: 'text-kmf-profit', border: 'border-kmf-profit/30', glow: 'shadow-[0_0_8px_rgba(0,230,118,0.1)]' },
  LOSS: { label: '❌ Loss', bg: 'bg-kmf-loss/15', text: 'text-kmf-loss', border: 'border-kmf-loss/30', glow: 'shadow-[0_0_8px_rgba(255,82,82,0.1)]' },
  BREAKEVEN: { label: '⚖️ BE', bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', glow: '' },
  PENDING: { label: '⏳ Pending', bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30', glow: 'shadow-[0_0_8px_rgba(234,179,8,0.1)]' },
};

const FILTER_OPTIONS = [
  { val: 'ALL', label: 'All' },
  { val: 'PROFIT', label: '✅ Profit' },
  { val: 'LOSS', label: '❌ Loss' },
  { val: 'BREAKEVEN', label: '⚖️ BE' },
  { val: 'PENDING', label: '⏳ Pending' },
];

const HistoryPage = () => {
  const navigate = useNavigate();
  const { trades, editTrade, removeTrade, getPnL } = useTrades();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterResult, setFilterResult] = useState('ALL');
  const [sortNewest, setSortNewest] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Finalize dialog state
  const [finalizeDialog, setFinalizeDialog] = useState(null);
  const [finalizeForm, setFinalizeForm] = useState({ result: 'PROFIT', actualPnL: '' });

  // Edit date/time dialog state
  const [dateTimeDialog, setDateTimeDialog] = useState(null);
  const [dateTimeForm, setDateTimeForm] = useState({ date: '', time: '' });

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Filter & sort trades
  const filteredTrades = useMemo(() => {
    let result = [...trades];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        (t.instrument || '').toLowerCase().includes(q) ||
        (t.notes || '').toLowerCase().includes(q) ||
        (t.type || '').toLowerCase().includes(q)
      );
    }

    // Result filter
    if (filterResult !== 'ALL') {
      result = result.filter(t => t.result === filterResult);
    }

    // Sort
    result.sort((a, b) => {
      const timeA = a.tradeDateTime || a.timestamp || 0;
      const timeB = b.tradeDateTime || b.timestamp || 0;
      return sortNewest ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [trades, searchQuery, filterResult, sortNewest]);

  // Toggle expand
  const toggleExpand = useCallback((id) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  // ============ FINALIZE TRADE (PENDING → PROFIT/LOSS/BREAKEVEN) ============
  const openFinalizeDialog = (trade) => {
    setFinalizeDialog(trade);
    setFinalizeForm({ result: 'PROFIT', actualPnL: '' });
  };

  const handleFinalize = async () => {
    if (!finalizeDialog) return;
    const pnl = finalizeForm.actualPnL ? parseFloat(finalizeForm.actualPnL) : null;

    // P/L validation
    if (pnl !== null) {
      if (finalizeForm.result === 'PROFIT' && pnl < 0) return;
      if (finalizeForm.result === 'LOSS' && pnl > 0) return;
    }

    try {
      await editTrade(finalizeDialog.id, {
        result: finalizeForm.result,
        actualPnL: pnl,
        pnlAmount: pnl,
      });
      console.log('[KMF_DEBUG] Trade finalized:', finalizeDialog.id, finalizeForm.result);
      setFinalizeDialog(null);
    } catch (err) {
      console.error('[KMF_DEBUG] Error finalizing trade:', err);
    }
  };

  // ============ EDIT DATE/TIME ============
  const openDateTimeDialog = (trade) => {
    const dt = new Date(trade.tradeDateTime || trade.timestamp);
    setDateTimeDialog(trade);
    setDateTimeForm({
      date: dt.toISOString().split('T')[0],
      time: `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`,
    });
  };

  const handleDateTimeSave = async () => {
    if (!dateTimeDialog) return;
    try {
      const [year, month, day] = dateTimeForm.date.split('-').map(Number);
      const [hours, minutes] = dateTimeForm.time.split(':').map(Number);
      const newDateTime = new Date(year, month - 1, day, hours, minutes).getTime();
      await editTrade(dateTimeDialog.id, { tradeDateTime: newDateTime });
      console.log('[KMF_DEBUG] Trade date/time updated:', dateTimeDialog.id);
      setDateTimeDialog(null);
    } catch (err) {
      console.error('[KMF_DEBUG] Error updating date/time:', err);
    }
  };

  // ============ DELETE ============
  const handleDelete = async (tradeId) => {
    try {
      await removeTrade(tradeId);
      console.log('[KMF_DEBUG] Trade deleted:', tradeId);
      setDeleteConfirm(null);
      setExpandedId(null);
    } catch (err) {
      console.error('[KMF_DEBUG] Error deleting trade:', err);
    }
  };

  // ============ RENDER TRADE CARD ============
  const renderTradeCard = (trade) => {
    const isExpanded = expandedId === trade.id;
    const config = RESULT_CONFIG[trade.result] || RESULT_CONFIG.PENDING;
    const pnl = getPnL(trade);
    const sym = getSymbolByCode(trade.instrument);
    const emoji = sym ? getCategoryEmoji(sym.category) : '📈';

    return (
      <div key={trade.id}
        className={`bg-kmf-panel rounded-xl border transition-all duration-200 ${config.border} ${config.glow} hover:border-kmf-accent/30`}
      >
        {/* Collapsed Header — always visible */}
        <button
          type="button"
          onClick={() => toggleExpand(trade.id)}
          className="w-full p-4 flex items-center gap-3 text-left"
        >
          {/* Symbol + Type badge */}
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
              trade.type === 'BUY' ? 'bg-kmf-profit/10' : 'bg-kmf-loss/10'
            }`}>
              {emoji}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-kmf-text-primary truncate">{trade.instrument}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                trade.type === 'BUY'
                  ? 'bg-kmf-profit/20 text-kmf-profit'
                  : 'bg-kmf-loss/20 text-kmf-loss'
              }`}>{trade.type}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${config.bg} ${config.text}`}>
                {config.label}
              </span>
            </div>
            <p className="text-xs text-kmf-text-tertiary mt-0.5">
              {formatDate(trade.tradeDateTime || trade.timestamp)} · {formatTime(trade.tradeDateTime || trade.timestamp)}
            </p>
          </div>

          {/* P/L + expand arrow */}
          <div className="text-right flex-shrink-0 flex items-center gap-2">
            {trade.result !== 'PENDING' && (
              <span className={`text-sm font-bold ${pnl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                {formatPnL(pnl)}
              </span>
            )}
            {isExpanded
              ? <FaChevronUp className="text-kmf-accent text-xs" />
              : <FaChevronDown className="text-kmf-text-tertiary text-xs" />
            }
          </div>
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-kmf-accent/10 pt-3 animate-fadeIn">
            {/* Price Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <div className="bg-kmf-surface rounded-lg p-2.5">
                <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider">Entry</p>
                <p className="text-sm font-bold text-kmf-text-primary">{formatPrice(trade.entryPrice)}</p>
              </div>
              <div className="bg-kmf-surface rounded-lg p-2.5">
                <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider">Lot Size</p>
                <p className="text-sm font-bold text-kmf-text-primary">{trade.lotSize}</p>
              </div>
              {trade.stopLoss != null && (
                <div className="bg-kmf-surface rounded-lg p-2.5">
                  <p className="text-[10px] text-kmf-loss uppercase tracking-wider">SL</p>
                  <p className="text-sm font-bold text-kmf-loss">{formatPrice(trade.stopLoss)}</p>
                </div>
              )}
              {trade.takeProfit != null && (
                <div className="bg-kmf-surface rounded-lg p-2.5">
                  <p className="text-[10px] text-kmf-profit uppercase tracking-wider">TP</p>
                  <p className="text-sm font-bold text-kmf-profit">{formatPrice(trade.takeProfit)}</p>
                </div>
              )}
            </div>

            {/* Rating */}
            {trade.rating > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="text-xs text-kmf-text-secondary">Rating: {trade.rating}/5</span>
                {trade.followedPlan && (
                  <span className="text-[10px] bg-kmf-profit/15 text-kmf-profit px-1.5 py-0.5 rounded ml-2">
                    ✅ Plan followed
                  </span>
                )}
              </div>
            )}

            {/* R-Multiple */}
            {trade.rMultiple !== 0 && trade.rMultiple != null && (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs text-kmf-text-tertiary">R-Multiple:</span>
                <span className={`text-xs font-bold ${trade.rMultiple >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                  {trade.rMultiple > 0 ? '+' : ''}{trade.rMultiple.toFixed(2)}R
                </span>
              </div>
            )}

            {/* Notes */}
            {trade.notes && (
              <div className="bg-kmf-surface rounded-lg p-2.5 mb-3">
                <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1">Notes</p>
                <p className="text-xs text-kmf-text-secondary leading-relaxed">{trade.notes}</p>
              </div>
            )}

            {/* Chart Screenshot */}
            {trade.photoUri && (
              <div className="mb-3">
                <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1.5">Chart</p>
                <a href={trade.photoUri} target="_blank" rel="noopener noreferrer">
                  <img src={trade.photoUri} alt="Trade chart" className="w-full max-h-48 object-cover rounded-lg border border-kmf-accent/20 hover:opacity-90 transition-opacity cursor-zoom-in" />
                </a>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 flex-wrap">
              {/* Finalize button (only for PENDING trades) */}
              {trade.result === 'PENDING' && (
                <button onClick={() => openFinalizeDialog(trade)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kmf-accent/15 text-kmf-accent text-xs font-medium hover:bg-kmf-accent/25 transition-all">
                  <FaCheck size={10} /> Finalize
                </button>
              )}

              {/* Edit date/time */}
              <button onClick={() => openDateTimeDialog(trade)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kmf-surface text-kmf-text-secondary text-xs font-medium hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all border border-kmf-accent/10">
                <FaCalendarAlt size={10} /> Date/Time
              </button>

              {/* Edit */}
              <button onClick={() => navigate(`/app/add-trade?edit=${trade.id}`)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kmf-surface text-kmf-text-secondary text-xs font-medium hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all border border-kmf-accent/10">
                <FaEdit size={10} /> Edit
              </button>

              {/* Delete */}
              <button onClick={() => setDeleteConfirm(trade)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kmf-loss/10 text-kmf-loss text-xs font-medium hover:bg-kmf-loss/20 transition-all border border-kmf-loss/20">
                <FaTrashAlt size={10} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
            <FaHistory className="text-kmf-accent text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-kmf-text-primary">📋 History</h1>
            <p className="text-xs text-kmf-text-tertiary">{filteredTrades.length} trade{filteredTrades.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button onClick={() => setSortNewest(!sortNewest)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kmf-surface border border-kmf-accent/10 text-kmf-text-secondary text-xs hover:text-kmf-accent hover:border-kmf-accent/30 transition-all">
          {sortNewest ? <FaSortAmountDown size={12} /> : <FaSortAmountUp size={12} />}
          {sortNewest ? 'Newest' : 'Oldest'}
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-text-tertiary text-sm" />
          <input
            type="text"
            placeholder="Search by instrument, notes, type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-kmf-panel border border-kmf-accent/15 rounded-lg pl-9 pr-10 py-2.5 text-sm text-kmf-text-primary placeholder:text-kmf-text-tertiary/40 focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all"
          />
          <button onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded transition-all ${
              showFilters || filterResult !== 'ALL' ? 'text-kmf-accent' : 'text-kmf-text-tertiary hover:text-kmf-accent'
            }`}>
            <FaFilter size={12} />
          </button>
        </div>

        {/* Filter chips */}
        {showFilters && (
          <div className="flex gap-2 flex-wrap animate-fadeIn">
            {FILTER_OPTIONS.map((f) => (
              <button key={f.val} onClick={() => setFilterResult(f.val)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterResult === f.val
                    ? 'bg-kmf-accent/20 text-kmf-accent border border-kmf-accent/40'
                    : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary hover:border-kmf-accent/30'
                }`}>
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Trade Cards */}
      {filteredTrades.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-kmf-text-tertiary text-sm">
            {trades.length === 0
              ? 'No trades yet. Add your first trade!'
              : 'No trades match your filters.'}
          </p>
          {trades.length === 0 && (
            <button onClick={() => navigate('/app/add-trade')}
              className="mt-4 px-5 py-2.5 rounded-lg bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white text-sm font-bold hover:shadow-glow transition-all">
              ➕ Add Trade
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3 pb-6">
          {filteredTrades.map(renderTradeCard)}
        </div>
      )}

      {/* ============ FINALIZE DIALOG ============ */}
      {finalizeDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setFinalizeDialog(null)}>
          <div className="bg-kmf-panel rounded-2xl border border-kmf-accent/20 p-5 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-1">🎯 Finalize Trade</h3>
            <p className="text-xs text-kmf-text-tertiary mb-4">{finalizeDialog.instrument} — {finalizeDialog.type}</p>

            {/* Result Selection */}
            <p className="text-xs text-kmf-accent font-medium mb-2">Result</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { val: 'PROFIT', label: '✅ Profit', cls: 'bg-kmf-profit/20 text-kmf-profit border-kmf-profit/50' },
                { val: 'LOSS', label: '❌ Loss', cls: 'bg-kmf-loss/20 text-kmf-loss border-kmf-loss/50' },
                { val: 'BREAKEVEN', label: '⚖️ BE', cls: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
              ].map((r) => (
                <button key={r.val} onClick={() => setFinalizeForm(prev => ({ ...prev, result: r.val }))}
                  className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                    finalizeForm.result === r.val
                      ? `${r.cls} border-2`
                      : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary hover:border-kmf-accent/30'
                  }`}>
                  {r.label}
                </button>
              ))}
            </div>

            {/* Actual P/L */}
            <p className="text-xs text-kmf-accent font-medium mb-1">💰 Actual P/L</p>
            <input
              type="number" step="any"
              placeholder="+245.50 or -120.30"
              value={finalizeForm.actualPnL}
              onChange={(e) => setFinalizeForm(prev => ({ ...prev, actualPnL: e.target.value }))}
              className="w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-kmf-text-primary text-sm placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all mb-4"
            />

            {/* P/L validation warning */}
            {finalizeForm.actualPnL && (
              (finalizeForm.result === 'PROFIT' && parseFloat(finalizeForm.actualPnL) < 0) ||
              (finalizeForm.result === 'LOSS' && parseFloat(finalizeForm.actualPnL) > 0)
            ) && (
              <p className="text-xs text-kmf-loss mb-3">⚠️ P/L doesn't match the selected result</p>
            )}

            <div className="flex gap-3">
              <button onClick={() => setFinalizeDialog(null)}
                className="flex-1 py-2.5 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary text-sm font-medium hover:border-kmf-accent/40 transition-all">
                Cancel
              </button>
              <button onClick={handleFinalize}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white text-sm font-bold hover:shadow-glow transition-all">
                ✅ Finalize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ EDIT DATE/TIME DIALOG ============ */}
      {dateTimeDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDateTimeDialog(null)}>
          <div className="bg-kmf-panel rounded-2xl border border-kmf-accent/20 p-5 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-1">📅 Edit Date & Time</h3>
            <p className="text-xs text-kmf-text-tertiary mb-4">{dateTimeDialog.instrument}</p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-1 block">📅 Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-accent text-sm pointer-events-none" />
                  <input type="date" value={dateTimeForm.date}
                    onChange={(e) => setDateTimeForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg pl-9 pr-4 py-2.5 text-kmf-text-primary text-sm focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-1 block">🕐 Time</label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-accent text-sm pointer-events-none" />
                  <input type="time" value={dateTimeForm.time}
                    onChange={(e) => setDateTimeForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg pl-9 pr-4 py-2.5 text-kmf-text-primary text-sm focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setDateTimeDialog(null)}
                className="flex-1 py-2.5 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary text-sm font-medium hover:border-kmf-accent/40 transition-all">
                Cancel
              </button>
              <button onClick={handleDateTimeSave}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white text-sm font-bold hover:shadow-glow transition-all">
                💾 Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ DELETE CONFIRMATION DIALOG ============ */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-kmf-panel rounded-2xl border border-kmf-loss/30 p-5 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-1">🗑️ Delete Trade?</h3>
            <p className="text-xs text-kmf-text-tertiary mb-4">
              {deleteConfirm.instrument} · {deleteConfirm.type} · {formatDate(deleteConfirm.tradeDateTime || deleteConfirm.timestamp)}
            </p>
            <p className="text-sm text-kmf-text-secondary mb-4">This action cannot be undone.</p>

            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary text-sm font-medium hover:border-kmf-accent/40 transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 py-2.5 rounded-lg bg-kmf-loss/20 border border-kmf-loss/40 text-kmf-loss text-sm font-bold hover:bg-kmf-loss/30 transition-all">
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
