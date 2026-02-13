import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrades } from '../contexts/TradesContext';
import { FaPlus, FaSave, FaTimes, FaStar, FaCheck } from 'react-icons/fa';

const DEFAULT_CHECKLIST = [
  'Analyzed chart on multiple timeframes',
  'Identified support/resistance zones',
  'Set Stop Loss correctly',
  'Calculated Risk/Reward ratio (min 1:2)',
  'Checked economic calendar',
  'Am calm and focused',
  'Verified lot size',
  'Defined clear exit plan',
];

const inputClass = "w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-kmf-text-primary text-sm placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all";

const AddTradePage = () => {
  const navigate = useNavigate();
  const { addTrade } = useTrades();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const now = new Date();
  const [form, setForm] = useState({
    instrument: '',
    type: 'BUY',
    entryPrice: '',
    stopLoss: '',
    takeProfit: '',
    lotSize: '0.10',
    actualPnL: '',
    result: 'PROFIT',
    rating: 3,
    notes: '',
    completedTasks: [],
  });

  const [dateStr] = useState(`${now.getDate()} ${now.toLocaleDateString('en', { month: 'short' })} ${now.getFullYear()}`);
  const [timeStr] = useState(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const toggleChecklistItem = (idx) => {
    setForm(prev => {
      const tasks = [...prev.completedTasks];
      const i = tasks.indexOf(idx);
      if (i >= 0) tasks.splice(i, 1);
      else tasks.push(idx);
      return { ...prev, completedTasks: tasks };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.instrument.trim()) { setError('Instrument is required'); return; }
    if (!form.entryPrice) { setError('Entry price is required'); return; }

    setSaving(true);
    try {
      const ts = Date.now();
      await addTrade({
        instrument: form.instrument.toUpperCase().trim(),
        type: form.type,
        entryPrice: parseFloat(form.entryPrice) || 0,
        stopLoss: form.stopLoss ? parseFloat(form.stopLoss) : null,
        takeProfit: form.takeProfit ? parseFloat(form.takeProfit) : null,
        lotSize: parseFloat(form.lotSize) || 0.1,
        pnlAmount: form.actualPnL ? parseFloat(form.actualPnL) : null,
        actualPnL: form.actualPnL ? parseFloat(form.actualPnL) : null,
        result: form.result,
        rating: form.rating,
        notes: form.notes,
        completedTasks: form.completedTasks,
        timestamp: ts,
        tradeDateTime: ts,
        followedPlan: form.completedTasks.length >= 4,
        rMultiple: 0,
        photoUri: null,
      });
      navigate('/app/history');
    } catch (err) {
      setError('Failed to save trade. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaPlus className="text-kmf-accent text-lg" />
        </div>
        <h1 className="text-2xl font-bold text-kmf-text-primary">Add Trade</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-kmf-loss/10 border border-kmf-loss/30 text-kmf-loss text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-kmf-panel rounded-lg p-3 border border-kmf-accent/10 text-center">
            <p className="text-xs text-kmf-text-tertiary">📅</p>
            <p className="text-sm font-medium text-kmf-text-primary">{dateStr}</p>
          </div>
          <div className="bg-kmf-panel rounded-lg p-3 border border-kmf-accent/10 text-center">
            <p className="text-xs text-kmf-text-tertiary">🕐</p>
            <p className="text-sm font-medium text-kmf-text-primary">{timeStr}</p>
          </div>
        </div>

        {/* Trade Type */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
          <p className="text-sm font-semibold text-kmf-text-primary mb-3">Trade Type</p>
          <div className="grid grid-cols-2 gap-3">
            {['BUY', 'SELL'].map((t) => (
              <button key={t} type="button" onClick={() => updateField('type', t)}
                className={`py-3 rounded-lg text-sm font-bold transition-all ${
                  form.type === t
                    ? t === 'BUY' ? 'bg-kmf-profit/20 text-kmf-profit border-2 border-kmf-profit/50' : 'bg-kmf-loss/20 text-kmf-loss border-2 border-kmf-loss/50'
                    : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary'
                }`}>
                {t === 'BUY' ? '✅ ' : '📊 '}{t === 'BUY' ? 'Buy' : 'Sell'}
              </button>
            ))}
          </div>
        </div>

        {/* Trade Details */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 space-y-3">
          <p className="text-sm font-semibold text-kmf-text-primary">📋 Trade Details</p>
          <div>
            <label className="text-xs text-kmf-accent font-medium">Instrument</label>
            <input type="text" className={inputClass} placeholder="EUR/USD, XAU/USD, NAS100..." value={form.instrument} onChange={(e) => updateField('instrument', e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-kmf-accent font-medium">Entry Price</label>
            <input type="number" step="any" className={inputClass} placeholder="1.0850" value={form.entryPrice} onChange={(e) => updateField('entryPrice', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-kmf-accent font-medium">SL</label>
              <input type="number" step="any" className={inputClass} placeholder="< Entry" value={form.stopLoss} onChange={(e) => updateField('stopLoss', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-kmf-accent font-medium">TP</label>
              <input type="number" step="any" className={inputClass} placeholder="> Entry" value={form.takeProfit} onChange={(e) => updateField('takeProfit', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs text-kmf-accent font-medium">Lot Size</label>
            <input type="number" step="0.01" min="0.01" className={inputClass} value={form.lotSize} onChange={(e) => updateField('lotSize', e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-kmf-accent font-medium">💰 Actual P/L</label>
            <input type="number" step="any" className={inputClass} placeholder="+245.50 or -120.30" value={form.actualPnL} onChange={(e) => updateField('actualPnL', e.target.value)} />
          </div>
        </div>

        {/* Pre-Trade Checklist */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-kmf-text-primary">✅ Pre-Trade Checklist</p>
            <span className="text-xs text-kmf-accent font-medium">{form.completedTasks.length}/{DEFAULT_CHECKLIST.length}</span>
          </div>
          <div className="space-y-2">
            {DEFAULT_CHECKLIST.map((item, idx) => (
              <button key={idx} type="button" onClick={() => toggleChecklistItem(idx)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all ${
                  form.completedTasks.includes(idx) ? 'bg-kmf-profit/10 border border-kmf-profit/30' : 'bg-kmf-surface/50 border border-transparent hover:border-kmf-accent/20'
                }`}>
                <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center ${
                  form.completedTasks.includes(idx) ? 'bg-kmf-profit text-white' : 'border border-kmf-text-tertiary/30'
                }`}>
                  {form.completedTasks.includes(idx) && <FaCheck size={10} />}
                </div>
                <span className={`text-sm ${form.completedTasks.includes(idx) ? 'text-kmf-text-primary' : 'text-kmf-text-tertiary'}`}>{item}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
          <p className="text-sm font-semibold text-kmf-text-primary mb-3">Result</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 'PROFIT', label: '✅ PROFIT', cls: 'bg-kmf-profit/20 text-kmf-profit border-kmf-profit/50' },
              { val: 'LOSS', label: '❌ LOSS', cls: 'bg-kmf-loss/20 text-kmf-loss border-kmf-loss/50' },
              { val: 'PENDING', label: '⏳ Pending', cls: 'bg-kmf-pending/20 text-kmf-pending border-kmf-pending/50' },
            ].map((r) => (
              <button key={r.val} type="button" onClick={() => updateField('result', r.val)}
                className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                  form.result === r.val ? `${r.cls} border-2` : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary'
                }`}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Rating */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-kmf-text-primary flex items-center gap-1"><FaStar className="text-kmf-star" /> Rating:</span>
              <span className="text-sm font-bold text-kmf-star">{form.rating}/5</span>
            </div>
            <input type="range" min="1" max="5" step="1" value={form.rating} onChange={(e) => updateField('rating', parseInt(e.target.value))}
              className="w-full accent-kmf-accent h-2 rounded-lg appearance-none bg-kmf-surface cursor-pointer" />
          </div>
        </div>

        {/* Notes */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
          <p className="text-sm font-semibold text-kmf-text-primary mb-2">📝 Notes</p>
          <textarea className={`${inputClass} min-h-[80px] resize-y`} placeholder="Add your notes here..." value={form.notes} onChange={(e) => updateField('notes', e.target.value)} rows={3} />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/app')}
            className="flex-1 py-3 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary text-sm font-medium hover:text-kmf-text-primary hover:border-kmf-accent/40 transition-all">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white font-bold text-sm hover:shadow-glow transition-all disabled:opacity-50">
            💾 {saving ? 'Saving...' : 'Save Trade'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTradePage;
