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

const RESULT_STYLE = {
  PROFIT: { cls: 'trade-profit', text: 'text-kmf-profit', badge: 'bg-kmf-profit/15 text-kmf-profit' },
  LOSS: { cls: 'trade-loss', text: 'text-kmf-loss', badge: 'bg-kmf-loss/15 text-kmf-loss' },
  BREAKEVEN: { cls: 'trade-breakeven', text: 'text-blue-400', badge: 'bg-blue-500/15 text-blue-400' },
  PENDING: { cls: 'trade-pending', text: 'text-yellow-400', badge: 'bg-yellow-500/15 text-yellow-400' },
};
const RESULT_LABEL = { PROFIT: 'Profit', LOSS: 'Loss', BREAKEVEN: 'BE', PENDING: 'Pending' };

const FILTER_OPTIONS = [
  { val: 'ALL', label: 'All' },
  { val: 'PROFIT', label: 'Profit' },
  { val: 'LOSS', label: 'Loss' },
  { val: 'BREAKEVEN', label: 'BE' },
  { val: 'PENDING', label: 'Pending' },
];

const inputClass = "w-full bg-kmf-surface border border-kmf-accent/15 rounded-xl px-4 py-2.5 text-sm text-kmf-text-primary placeholder:text-kmf-text-tertiary/40 focus:outline-none focus:border-kmf-accent focus:shadow-[0_0_0_3px_rgba(79,195,247,0.1)] transition-all input-glow";

const HistoryPage = () => {
  const navigate = useNavigate();
  const { trades, editTrade, removeTrade, getPnL } = useTrades();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterResult, setFilterResult] = useState('ALL');
  const [sortNewest, setSortNewest] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [finalizeDialog, setFinalizeDialog] = useState(null);
  const [finalizeForm, setFinalizeForm] = useState({ result: 'PROFIT', actualPnL: '' });
  const [dateTimeDialog, setDateTimeDialog] = useState(null);
  const [dateTimeForm, setDateTimeForm] = useState({ date: '', time: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredTrades = useMemo(() => {
    let result = [...trades];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        (t.instrument || '').toLowerCase().includes(q) ||
        (t.notes || '').toLowerCase().includes(q) ||
        (t.type || '').toLowerCase().includes(q)
      );
    }
    if (filterResult !== 'ALL') result = result.filter(t => t.result === filterResult);
    result.sort((a, b) => {
      const timeA = a.tradeDateTime || a.timestamp || 0;
      const timeB = b.tradeDateTime || b.timestamp || 0;
      return sortNewest ? timeB - timeA : timeA - timeB;
    });
    return result;
  }, [trades, searchQuery, filterResult, sortNewest]);

  const toggleExpand = useCallback((id) => setExpandedId(prev => prev === id ? null : id), []);

  const openFinalizeDialog = (trade) => { setFinalizeDialog(trade); setFinalizeForm({ result: 'PROFIT', actualPnL: '' }); };
  const handleFinalize = async () => {
    if (!finalizeDialog) return;
    const pnl = finalizeForm.actualPnL ? parseFloat(finalizeForm.actualPnL) : null;
    if (pnl !== null) {
      if (finalizeForm.result === 'PROFIT' && pnl < 0) return;
      if (finalizeForm.result === 'LOSS' && pnl > 0) return;
    }
    try {
      await editTrade(finalizeDialog.id, { result: finalizeForm.result, actualPnL: pnl, pnlAmount: pnl });
      setFinalizeDialog(null);
    } catch (err) { console.error('[KMF] Finalize error:', err); }
  };

  const openDateTimeDialog = (trade) => {
    const dt = new Date(trade.tradeDateTime || trade.timestamp);
    setDateTimeDialog(trade);
    setDateTimeForm({ date: dt.toISOString().split('T')[0], time: `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}` });
  };
  const handleDateTimeSave = async () => {
    if (!dateTimeDialog) return;
    try {
      const [year, month, day] = dateTimeForm.date.split('-').map(Number);
      const [hours, minutes] = dateTimeForm.time.split(':').map(Number);
      await editTrade(dateTimeDialog.id, { tradeDateTime: new Date(year, month - 1, day, hours, minutes).getTime() });
      setDateTimeDialog(null);
    } catch (err) { console.error('[KMF] Date/time error:', err); }
  };

  const handleDelete = async (tradeId) => {
    try { await removeTrade(tradeId); setDeleteConfirm(null); setExpandedId(null); }
    catch (err) { console.error('[KMF] Delete error:', err); }
  };

  const renderTradeCard = (trade, idx) => {
    const isExpanded = expandedId === trade.id;
    const style = RESULT_STYLE[trade.result] || RESULT_STYLE.PENDING;
    const pnl = getPnL(trade);
    const sym = getSymbolByCode(trade.instrument);
    const emoji = sym ? getCategoryEmoji(sym.category) : '📈';

    return (
      <div key={trade.id}
        className={`rounded-xl ${style.cls} transition-all duration-300 hover-glow`}
        style={{ animationDelay: `${Math.min(idx * 30, 300)}ms` }}
      >
        <button type="button" onClick={() => toggleExpand(trade.id)}
          className="w-full p-4 flex items-center gap-3 text-left">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
            trade.type === 'BUY' ? 'bg-kmf-profit/8' : 'bg-kmf-loss/8'
          }`}>{emoji}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-kmf-text-primary truncate">{trade.instrument}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                trade.type === 'BUY' ? 'bg-kmf-profit/15 text-kmf-profit' : 'bg-kmf-loss/15 text-kmf-loss'
              }`}>{trade.type}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${style.badge}`}>
                {RESULT_LABEL[trade.result]}
              </span>
            </div>
            <p className="text-xs text-kmf-text-tertiary mt-0.5">
              {formatDate(trade.tradeDateTime || trade.timestamp)} · {formatTime(trade.tradeDateTime || trade.timestamp)}
            </p>
          </div>

          <div className="text-right flex-shrink-0 flex items-center gap-2">
            {trade.result !== 'PENDING' && (
              <span className={`text-sm font-bold ${pnl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                {formatPnL(pnl)}
              </span>
            )}
            {isExpanded ? <FaChevronUp className="text-kmf-accent text-xs" /> : <FaChevronDown className="text-kmf-text-tertiary text-xs" />}
          </div>
        </button>

        {isExpanded && (
          <div className="px-4 pb-4 border-t border-white/5 pt-3 expand-enter">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {[
                { label: 'Entry', value: formatPrice(trade.entryPrice), color: '' },
                { label: 'Lot Size', value: trade.lotSize, color: '' },
                trade.stopLoss != null && { label: 'SL', value: formatPrice(trade.stopLoss), color: 'text-kmf-loss' },
                trade.takeProfit != null && { label: 'TP', value: formatPrice(trade.takeProfit), color: 'text-kmf-profit' },
              ].filter(Boolean).map((d, i) => (
                <div key={i} className="bg-kmf-surface/50 rounded-lg p-2.5">
                  <p className={`text-[10px] uppercase tracking-wider ${d.color || 'text-kmf-text-tertiary'}`}>{d.label}</p>
                  <p className={`text-sm font-bold ${d.color || 'text-kmf-text-primary'}`}>{d.value}</p>
                </div>
              ))}
            </div>

            {trade.rating > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="text-xs text-kmf-text-secondary">Rating: {trade.rating}/5</span>
                {trade.followedPlan && (
                  <span className="text-[10px] bg-kmf-profit/15 text-kmf-profit px-1.5 py-0.5 rounded ml-2">Plan followed</span>
                )}
              </div>
            )}
            {trade.rMultiple !== 0 && trade.rMultiple != null && (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs text-kmf-text-tertiary">R-Multiple:</span>
                <span className={`text-xs font-bold ${trade.rMultiple >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                  {trade.rMultiple > 0 ? '+' : ''}{trade.rMultiple.toFixed(2)}R
                </span>
              </div>
            )}
            {trade.notes && (
              <div className="bg-kmf-surface/50 rounded-lg p-2.5 mb-3">
                <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1">Notes</p>
                <p className="text-xs text-kmf-text-secondary leading-relaxed">{trade.notes}</p>
              </div>
            )}
            {trade.photoUri && (
              <div className="mb-3">
                <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1.5">Chart</p>
                <a href={trade.photoUri} target="_blank" rel="noopener noreferrer">
                  <img src={trade.photoUri} alt="Trade chart" className="w-full max-h-48 object-cover rounded-lg border border-white/5 hover:opacity-90 transition-opacity cursor-zoom-in" />
                </a>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              {trade.result === 'PENDING' && (
                <button onClick={() => openFinalizeDialog(trade)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kmf-accent/10 text-kmf-accent text-xs font-medium hover:bg-kmf-accent/20 hover-scale transition-all">
                  <FaCheck size={10} /> Finalize
                </button>
              )}
              <button onClick={() => openDateTimeDialog(trade)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kmf-surface/80 text-kmf-text-secondary text-xs font-medium hover:text-kmf-accent hover-scale transition-all border border-white/5">
                <FaCalendarAlt size={10} /> Date/Time
              </button>
              <button onClick={() => navigate(`/app/add-trade?edit=${trade.id}`)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kmf-surface/80 text-kmf-text-secondary text-xs font-medium hover:text-kmf-accent hover-scale transition-all border border-white/5">
                <FaEdit size={10} /> Edit
              </button>
              <button onClick={() => setDeleteConfirm(trade)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kmf-loss/8 text-kmf-loss/80 text-xs font-medium hover:bg-kmf-loss/15 hover:text-kmf-loss hover-scale transition-all border border-kmf-loss/10">
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
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20">
            <FaHistory className="text-purple-400 text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-kmf-text-primary">History</h1>
            <p className="text-xs text-kmf-text-tertiary">{filteredTrades.length} trade{filteredTrades.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button onClick={() => setSortNewest(!sortNewest)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-kmf-surface/50 border border-white/5 text-kmf-text-secondary text-xs hover:text-kmf-accent hover:border-kmf-accent/20 hover-scale transition-all">
          {sortNewest ? <FaSortAmountDown size={12} /> : <FaSortAmountUp size={12} />}
          {sortNewest ? 'Newest' : 'Oldest'}
        </button>
      </div>

      {/* Search + Filters */}
      <div className="space-y-3 mb-5">
        <div className="relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kmf-text-tertiary/50 text-sm" />
          <input type="text" placeholder="Search by instrument, notes, type..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className={`${inputClass} pl-10 pr-10`} />
          <button onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
              showFilters || filterResult !== 'ALL' ? 'text-kmf-accent bg-kmf-accent/10' : 'text-kmf-text-tertiary hover:text-kmf-accent'
            }`}>
            <FaFilter size={12} />
          </button>
        </div>

        {showFilters && (
          <div className="flex gap-2 flex-wrap animate-fadeIn">
            {FILTER_OPTIONS.map((f) => (
              <button key={f.val} onClick={() => setFilterResult(f.val)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium hover-scale transition-all ${
                  filterResult === f.val
                    ? 'bg-kmf-accent/20 text-kmf-accent border border-kmf-accent/40'
                    : 'bg-kmf-surface/50 border border-white/5 text-kmf-text-tertiary hover:border-kmf-accent/20'
                }`}>
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Trade Cards */}
      {filteredTrades.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-kmf-text-tertiary text-sm">
            {trades.length === 0 ? 'No trades yet. Add your first trade!' : 'No trades match your filters.'}
          </p>
          {trades.length === 0 && (
            <button onClick={() => navigate('/app/add-trade')}
              className="mt-4 px-5 py-2.5 rounded-xl btn-primary text-white text-sm font-bold">
              Add Trade
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2 pb-6 stagger-in">
          {filteredTrades.map((t, i) => renderTradeCard(t, i))}
        </div>
      )}

      {/* ─── FINALIZE DIALOG ─── */}
      {finalizeDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop" onClick={() => setFinalizeDialog(null)}>
          <div className="glass-card rounded-2xl p-5 w-full max-w-sm modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-1">Finalize Trade</h3>
            <p className="text-xs text-kmf-text-tertiary mb-4">{finalizeDialog.instrument} — {finalizeDialog.type}</p>
            <p className="text-xs text-kmf-accent font-medium mb-2">Result</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { val: 'PROFIT', label: 'Profit', cls: 'bg-kmf-profit/20 text-kmf-profit border-kmf-profit/50' },
                { val: 'LOSS', label: 'Loss', cls: 'bg-kmf-loss/20 text-kmf-loss border-kmf-loss/50' },
                { val: 'BREAKEVEN', label: 'BE', cls: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
              ].map((r) => (
                <button key={r.val} onClick={() => setFinalizeForm(prev => ({ ...prev, result: r.val }))}
                  className={`py-2.5 rounded-xl text-xs font-bold hover-scale transition-all ${
                    finalizeForm.result === r.val ? `${r.cls} border-2` : 'bg-kmf-surface border border-white/5 text-kmf-text-tertiary hover:border-kmf-accent/20'
                  }`}>{r.label}</button>
              ))}
            </div>
            <p className="text-xs text-kmf-accent font-medium mb-1">Actual P/L</p>
            <input type="number" step="any" placeholder="+245.50 or -120.30"
              value={finalizeForm.actualPnL} onChange={(e) => setFinalizeForm(prev => ({ ...prev, actualPnL: e.target.value }))}
              className={`${inputClass} mb-4`} />
            {finalizeForm.actualPnL && ((finalizeForm.result === 'PROFIT' && parseFloat(finalizeForm.actualPnL) < 0) ||
              (finalizeForm.result === 'LOSS' && parseFloat(finalizeForm.actualPnL) > 0)) && (
              <p className="text-xs text-kmf-loss mb-3">P/L doesn't match the selected result</p>
            )}
            <div className="flex gap-3">
              <button onClick={() => setFinalizeDialog(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-kmf-text-secondary text-sm font-medium hover:border-kmf-accent/20 hover-scale transition-all">Cancel</button>
              <button onClick={handleFinalize} className="flex-1 py-2.5 rounded-xl btn-primary text-white text-sm font-bold">Finalize</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DATE/TIME DIALOG ─── */}
      {dateTimeDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop" onClick={() => setDateTimeDialog(null)}>
          <div className="glass-card rounded-2xl p-5 w-full max-w-sm modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-1">Edit Date & Time</h3>
            <p className="text-xs text-kmf-text-tertiary mb-4">{dateTimeDialog.instrument}</p>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-1 block">Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-accent text-sm pointer-events-none" />
                  <input type="date" value={dateTimeForm.date} onChange={(e) => setDateTimeForm(prev => ({ ...prev, date: e.target.value }))}
                    className={`${inputClass} pl-9 cursor-pointer`} />
                </div>
              </div>
              <div>
                <label className="text-xs text-kmf-accent font-medium mb-1 block">Time</label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-accent text-sm pointer-events-none" />
                  <input type="time" value={dateTimeForm.time} onChange={(e) => setDateTimeForm(prev => ({ ...prev, time: e.target.value }))}
                    className={`${inputClass} pl-9 cursor-pointer`} />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDateTimeDialog(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-kmf-text-secondary text-sm font-medium hover-scale transition-all">Cancel</button>
              <button onClick={handleDateTimeSave} className="flex-1 py-2.5 rounded-xl btn-primary text-white text-sm font-bold">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DELETE DIALOG ─── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="glass-card rounded-2xl p-5 w-full max-w-sm modal-content border-kmf-loss/20" style={{ borderWidth: 1 }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-1">Delete Trade?</h3>
            <p className="text-xs text-kmf-text-tertiary mb-2">
              {deleteConfirm.instrument} · {deleteConfirm.type} · {formatDate(deleteConfirm.tradeDateTime || deleteConfirm.timestamp)}
            </p>
            <p className="text-sm text-kmf-text-secondary mb-4">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-kmf-text-secondary text-sm font-medium hover-scale transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 py-2.5 rounded-xl bg-kmf-loss/15 border border-kmf-loss/30 text-kmf-loss text-sm font-bold hover:bg-kmf-loss/25 hover-scale transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
