import { useState, useMemo } from 'react';
import { useTrades } from '../contexts/TradesContext';
import { FaHistory, FaSearch, FaTrash, FaEdit, FaTimes, FaSave, FaStar } from 'react-icons/fa';

const HistoryPage = () => {
  const { trades, removeTrade, editTrade, syncing, getPnL } = useTrades();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredTrades = useMemo(() => {
    return trades.filter(t => {
      const matchSearch = !search || (t.instrument || '').toLowerCase().includes(search.toLowerCase()) || (t.notes || '').toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'ALL' || t.type === filterType;
      return matchSearch && matchType;
    });
  }, [trades, search, filterType]);

  const wins = filteredTrades.filter(t => t.result === 'PROFIT').length;
  const loss = filteredTrades.filter(t => t.result === 'LOSS').length;
  const wr = filteredTrades.length > 0 && (wins + loss) > 0 ? ((wins / (wins + loss)) * 100).toFixed(0) : '--';

  const startEdit = (trade) => {
    setEditingId(trade.id);
    setEditForm({
      instrument: trade.instrument || '',
      type: trade.type || 'BUY',
      entryPrice: trade.entryPrice?.toString() || '',
      actualPnL: (trade.actualPnL ?? trade.pnlAmount ?? 0).toString(),
      result: trade.result || 'PENDING',
      rating: trade.rating || 0,
      notes: trade.notes || '',
    });
  };

  const saveEdit = async () => {
    await editTrade(editingId, {
      instrument: editForm.instrument.toUpperCase().trim(),
      type: editForm.type,
      entryPrice: parseFloat(editForm.entryPrice) || 0,
      actualPnL: parseFloat(editForm.actualPnL) || 0,
      pnlAmount: parseFloat(editForm.actualPnL) || 0,
      result: editForm.result,
      rating: editForm.rating,
      notes: editForm.notes,
    });
    setEditingId(null);
  };

  const resultBadge = (result) => {
    if (result === 'PROFIT') return 'bg-kmf-profit/15 text-kmf-profit border border-kmf-profit/30';
    if (result === 'LOSS') return 'bg-kmf-loss/15 text-kmf-loss border border-kmf-loss/30';
    return 'bg-kmf-pending/15 text-kmf-pending border border-kmf-pending/30';
  };

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaHistory className="text-kmf-accent text-lg" />
        </div>
        <h1 className="text-2xl font-bold text-kmf-text-primary">History</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-kmf-panel rounded-lg p-3 border border-kmf-accent/10 text-center">
          <p className="text-xs text-kmf-text-tertiary">Total</p>
          <p className="text-xl font-bold text-kmf-accent">{filteredTrades.length}</p>
        </div>
        <div className="bg-kmf-panel rounded-lg p-3 border border-kmf-accent/10 text-center">
          <p className="text-xs text-kmf-text-tertiary">Wins ✅</p>
          <p className="text-xl font-bold text-kmf-profit">{wins}</p>
          <p className="text-xs text-kmf-text-tertiary">{loss} Losses</p>
        </div>
        <div className="bg-kmf-panel rounded-lg p-3 border border-kmf-accent/10 text-center">
          <p className="text-xs text-kmf-text-tertiary">Win Rate 🎯</p>
          <p className="text-xl font-bold text-kmf-profit">{wr}%</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-kmf-panel rounded-xl p-3 border border-kmf-accent/10 mb-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-text-tertiary text-sm" />
          <input type="text" placeholder="Search instrument..." className="w-full bg-kmf-surface border border-kmf-accent/10 rounded-lg pl-9 pr-4 py-2 text-sm text-kmf-text-primary placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="bg-kmf-surface border border-kmf-accent/10 rounded-lg px-3 py-2 text-sm text-kmf-text-primary focus:outline-none focus:border-kmf-accent" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="ALL">All</option>
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
      </div>

      {/* Trade List */}
      {filteredTrades.length > 0 ? (
        <div className="space-y-2">
          {filteredTrades.map((trade) => (
            <div key={trade.id} className="bg-kmf-panel rounded-xl border border-kmf-accent/10 hover:border-kmf-accent/20 transition-all overflow-hidden">
              {editingId === trade.id ? (
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <input className="bg-kmf-surface border border-kmf-accent/20 rounded-lg px-3 py-2 text-sm text-kmf-text-primary" placeholder="Instrument" value={editForm.instrument} onChange={(e) => setEditForm(p => ({ ...p, instrument: e.target.value }))} />
                    <select className="bg-kmf-surface border border-kmf-accent/20 rounded-lg px-3 py-2 text-sm text-kmf-text-primary" value={editForm.result} onChange={(e) => setEditForm(p => ({ ...p, result: e.target.value }))}>
                      <option value="PROFIT">PROFIT</option>
                      <option value="LOSS">LOSS</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                    <input className="bg-kmf-surface border border-kmf-accent/20 rounded-lg px-3 py-2 text-sm text-kmf-text-primary" placeholder="Entry" type="number" step="any" value={editForm.entryPrice} onChange={(e) => setEditForm(p => ({ ...p, entryPrice: e.target.value }))} />
                    <input className="bg-kmf-surface border border-kmf-accent/20 rounded-lg px-3 py-2 text-sm text-kmf-text-primary" placeholder="P&L" type="number" step="any" value={editForm.actualPnL} onChange={(e) => setEditForm(p => ({ ...p, actualPnL: e.target.value }))} />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setEditingId(null)} className="px-4 py-1.5 rounded-lg border border-kmf-accent/20 text-kmf-text-tertiary text-sm">Cancel</button>
                    <button onClick={saveEdit} disabled={syncing} className="px-4 py-1.5 rounded-lg bg-kmf-accent text-white text-sm font-medium disabled:opacity-50">Save</button>
                  </div>
                </div>
              ) : (
                <div className="p-4 flex items-center gap-3">
                  <div className={`w-1.5 h-12 rounded-full flex-shrink-0 ${trade.type === 'BUY' ? 'bg-kmf-profit' : 'bg-kmf-loss'}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-kmf-text-primary">{trade.instrument || '--'}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${trade.type === 'BUY' ? 'bg-kmf-profit/15 text-kmf-profit' : 'bg-kmf-loss/15 text-kmf-loss'}`}>{trade.type}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${resultBadge(trade.result)}`}>
                        {trade.result === 'PROFIT' ? '✅ ' : trade.result === 'LOSS' ? '❌ ' : '⏳ '}{trade.result}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-kmf-text-tertiary">
                      <span>📅 {new Date(trade.tradeDateTime || trade.timestamp).toLocaleDateString()}</span>
                      <span>🕐 {new Date(trade.tradeDateTime || trade.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-kmf-text-tertiary">
                      <span>Entry Price: <b className="text-kmf-text-primary">{trade.entryPrice || '--'}</b></span>
                      <span>Lot Size: <b className="text-kmf-text-primary">{trade.lotSize || '--'}</b></span>
                      <span className="flex items-center gap-0.5">Rating: <b className="text-kmf-text-primary">{trade.rating || 0}/5</b> <FaStar size={8} className="text-kmf-star" /></span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${
                      trade.result === 'PENDING' ? 'text-kmf-pending' : getPnL(trade) >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'
                    }`}>
                      {trade.result === 'PENDING' ? 'PENDING' : `${getPnL(trade) >= 0 ? '+' : ''}${getPnL(trade).toFixed(2)} USD`}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button onClick={() => startEdit(trade)} className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all"><FaEdit size={13} /></button>
                    <button onClick={() => setDeleteConfirm(trade.id)} className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-loss hover:bg-kmf-loss/10 transition-all"><FaTrash size={13} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-kmf-panel rounded-xl p-12 border border-kmf-accent/10 text-center">
          <FaHistory className="text-kmf-accent text-3xl mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-kmf-text-primary mb-1">{trades.length === 0 ? 'No trades yet' : 'No matching trades'}</h2>
          <p className="text-kmf-text-tertiary text-sm">{trades.length === 0 ? 'Add your first trade to get started' : 'Try adjusting your filters'}</p>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-loss/30 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-2">Delete Trade?</h3>
            <p className="text-sm text-kmf-text-tertiary mb-4">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary text-sm">Cancel</button>
              <button onClick={async () => { await removeTrade(deleteConfirm); setDeleteConfirm(null); }} className="px-4 py-2 rounded-lg bg-kmf-loss text-white text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
