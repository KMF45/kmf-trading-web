import { useState, useMemo } from 'react';
import { useTrades } from '../contexts/TradesContext';
import { FaHistory, FaSearch, FaTrash, FaEdit, FaTimes, FaSave, FaStar, FaFilter } from 'react-icons/fa';

const HistoryPage = () => {
  const { trades, removeTrade, editTrade, settings, syncing } = useTrades();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const currencySymbol = settings.currency === 'EUR' ? '€' : settings.currency === 'GBP' ? '£' : '$';

  const filteredTrades = useMemo(() => {
    return trades.filter(t => {
      const matchSearch = !search || (t.symbol || '').toLowerCase().includes(search.toLowerCase())
        || (t.notes || '').toLowerCase().includes(search.toLowerCase())
        || (t.strategy || '').toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'ALL' || t.type === filterType;
      const matchStatus = filterStatus === 'ALL' || t.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }, [trades, search, filterType, filterStatus]);

  const startEdit = (trade) => {
    setEditingId(trade.id);
    setEditForm({
      symbol: trade.symbol || '',
      type: trade.type || 'BUY',
      status: trade.status || 'CLOSED',
      entryPrice: trade.entryPrice?.toString() || '',
      exitPrice: trade.exitPrice?.toString() || '',
      lotSize: trade.lotSize?.toString() || '0.01',
      profitLoss: trade.profitLoss?.toString() || '0',
      stopLoss: trade.stopLoss?.toString() || '',
      takeProfit: trade.takeProfit?.toString() || '',
      discipline: trade.discipline || 3,
      notes: trade.notes || '',
      strategy: trade.strategy || '',
      emotions: trade.emotions || '',
    });
  };

  const saveEdit = async () => {
    await editTrade(editingId, {
      symbol: editForm.symbol.toUpperCase().trim(),
      type: editForm.type,
      status: editForm.status,
      entryPrice: parseFloat(editForm.entryPrice) || 0,
      exitPrice: editForm.exitPrice ? parseFloat(editForm.exitPrice) : null,
      lotSize: parseFloat(editForm.lotSize) || 0.01,
      profitLoss: parseFloat(editForm.profitLoss) || 0,
      stopLoss: editForm.stopLoss ? parseFloat(editForm.stopLoss) : null,
      takeProfit: editForm.takeProfit ? parseFloat(editForm.takeProfit) : null,
      discipline: editForm.discipline,
      notes: editForm.notes,
      strategy: editForm.strategy,
      emotions: editForm.emotions,
    });
    setEditingId(null);
  };

  const confirmDelete = async (id) => {
    await removeTrade(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaHistory className="text-kmf-accent text-lg" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-kmf-text-primary">Trade History</h1>
          <p className="text-sm text-kmf-text-tertiary">{filteredTrades.length} trade{filteredTrades.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 mb-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-text-tertiary text-sm" />
          <input
            type="text"
            placeholder="Search by symbol, notes, strategy..."
            className="w-full bg-kmf-surface border border-kmf-accent/10 rounded-lg pl-9 pr-4 py-2 text-sm text-kmf-text-primary placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="bg-kmf-surface border border-kmf-accent/10 rounded-lg px-3 py-2 text-sm text-kmf-text-primary focus:outline-none focus:border-kmf-accent"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="BUY">Buy Only</option>
            <option value="SELL">Sell Only</option>
          </select>
          <select
            className="bg-kmf-surface border border-kmf-accent/10 rounded-lg px-3 py-2 text-sm text-kmf-text-primary focus:outline-none focus:border-kmf-accent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Trade List */}
      {filteredTrades.length > 0 ? (
        <div className="space-y-2">
          {filteredTrades.map((trade) => (
            <div key={trade.id} className="bg-kmf-panel rounded-xl border border-kmf-accent/10 hover:border-kmf-accent/20 transition-all overflow-hidden">
              {editingId === trade.id ? (
                /* Edit Mode */
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <input className="bg-kmf-surface border border-kmf-accent/20 rounded-lg px-3 py-2 text-sm text-kmf-text-primary" placeholder="Symbol" value={editForm.symbol} onChange={(e) => setEditForm(p => ({ ...p, symbol: e.target.value }))} />
                    <select className="bg-kmf-surface border border-kmf-accent/20 rounded-lg px-3 py-2 text-sm text-kmf-text-primary" value={editForm.type} onChange={(e) => setEditForm(p => ({ ...p, type: e.target.value }))}>
                      <option value="BUY">BUY</option>
                      <option value="SELL">SELL</option>
                    </select>
                    <input className="bg-kmf-surface border border-kmf-accent/20 rounded-lg px-3 py-2 text-sm text-kmf-text-primary" placeholder="Entry" type="number" step="any" value={editForm.entryPrice} onChange={(e) => setEditForm(p => ({ ...p, entryPrice: e.target.value }))} />
                    <input className="bg-kmf-surface border border-kmf-accent/20 rounded-lg px-3 py-2 text-sm text-kmf-text-primary" placeholder="P&L" type="number" step="any" value={editForm.profitLoss} onChange={(e) => setEditForm(p => ({ ...p, profitLoss: e.target.value }))} />
                  </div>
                  <textarea className="w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-3 py-2 text-sm text-kmf-text-primary resize-none" placeholder="Notes..." rows={2} value={editForm.notes} onChange={(e) => setEditForm(p => ({ ...p, notes: e.target.value }))} />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setEditingId(null)} className="px-4 py-1.5 rounded-lg border border-kmf-accent/20 text-kmf-text-tertiary text-sm hover:text-kmf-text-primary transition-colors">
                      <FaTimes className="inline mr-1" />Cancel
                    </button>
                    <button onClick={saveEdit} disabled={syncing} className="px-4 py-1.5 rounded-lg bg-kmf-accent text-white text-sm font-medium hover:bg-kmf-accent-bright transition-colors disabled:opacity-50">
                      <FaSave className="inline mr-1" />{syncing ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="p-4 flex items-center gap-4">
                  <div className={`w-1.5 h-14 rounded-full flex-shrink-0 ${trade.type === 'BUY' ? 'bg-kmf-profit' : 'bg-kmf-loss'}`}></div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-kmf-text-primary">{trade.symbol || '--'}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${trade.type === 'BUY' ? 'bg-kmf-profit/15 text-kmf-profit' : 'bg-kmf-loss/15 text-kmf-loss'}`}>
                        {trade.type}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${trade.status === 'OPEN' ? 'bg-kmf-pending/15 text-kmf-pending' : 'bg-kmf-accent/10 text-kmf-accent'}`}>
                        {trade.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-kmf-text-tertiary">
                      <span>{trade.lotSize || '--'} lots</span>
                      <span>Entry: {trade.entryPrice || '--'}</span>
                      {trade.exitPrice && <span>Exit: {trade.exitPrice}</span>}
                      {trade.strategy && <span className="hidden sm:inline">{trade.strategy}</span>}
                    </div>
                    {trade.notes && (
                      <p className="text-xs text-kmf-text-tertiary/70 mt-1 truncate max-w-md">{trade.notes}</p>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${
                      trade.status === 'OPEN' ? 'text-kmf-pending' :
                      (trade.profitLoss || 0) > 0 ? 'text-kmf-profit' :
                      (trade.profitLoss || 0) < 0 ? 'text-kmf-loss' : 'text-kmf-breakeven'
                    }`}>
                      {trade.status === 'OPEN' ? 'OPEN' : `${(trade.profitLoss || 0) >= 0 ? '+' : ''}${currencySymbol}${(trade.profitLoss || 0).toFixed(2)}`}
                    </p>
                    <p className="text-xs text-kmf-text-tertiary">
                      {new Date(trade.openDate).toLocaleDateString()}
                    </p>
                    {trade.discipline > 0 && (
                      <div className="flex gap-0.5 justify-end mt-0.5">
                        {[1,2,3,4,5].map(s => (
                          <FaStar key={s} size={8} className={s <= trade.discipline ? 'text-kmf-star' : 'text-kmf-text-tertiary/20'} />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button onClick={() => startEdit(trade)} className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all" title="Edit">
                      <FaEdit size={14} />
                    </button>
                    <button onClick={() => setDeleteConfirm(trade.id)} className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-loss hover:bg-kmf-loss/10 transition-all" title="Delete">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-kmf-panel rounded-xl p-12 border border-kmf-accent/10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-kmf-accent/10 flex items-center justify-center mb-4">
            <FaHistory className="text-kmf-accent text-2xl" />
          </div>
          <h2 className="text-lg font-semibold text-kmf-text-primary mb-2">
            {trades.length === 0 ? 'No trades yet' : 'No matching trades'}
          </h2>
          <p className="text-kmf-text-tertiary text-sm">
            {trades.length === 0 ? 'Add your first trade to get started' : 'Try adjusting your filters'}
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-loss/30 max-w-sm w-full shadow-glow-loss" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-2">Delete Trade?</h3>
            <p className="text-sm text-kmf-text-tertiary mb-4">This action cannot be undone. The trade will be permanently removed.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary text-sm hover:text-kmf-text-primary transition-colors">
                Cancel
              </button>
              <button onClick={() => confirmDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-kmf-loss text-white text-sm font-medium hover:bg-kmf-loss/80 transition-colors">
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
