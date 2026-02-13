import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrades } from '../contexts/TradesContext';
import { FaPlus, FaSave, FaTimes, FaStar } from 'react-icons/fa';

const STRATEGIES = ['Scalping', 'Day Trading', 'Swing Trading', 'Position Trading', 'Breakout', 'Pullback', 'Reversal', 'Trend Following', 'Range Trading', 'News Trading', 'Other'];
const EMOTIONS = ['Calm', 'Confident', 'Anxious', 'Greedy', 'Fearful', 'Frustrated', 'Excited', 'Bored', 'Revenge', 'FOMO'];

const InputField = ({ label, required, children }) => (
  <div>
    <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">
      {label} {required && <span className="text-kmf-loss">*</span>}
    </label>
    {children}
  </div>
);

const inputClass = "w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-kmf-text-primary text-sm placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all";

const DisciplineStars = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className={`p-1 transition-all ${star <= value ? 'text-kmf-star scale-110' : 'text-kmf-text-tertiary/30 hover:text-kmf-star/50'}`}
      >
        <FaStar size={22} />
      </button>
    ))}
  </div>
);

const AddTradePage = () => {
  const navigate = useNavigate();
  const { addTrade, settings } = useTrades();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    symbol: '',
    type: 'BUY',
    status: 'CLOSED',
    entryPrice: '',
    exitPrice: '',
    lotSize: settings.defaultLotSize?.toString() || '0.01',
    stopLoss: '',
    takeProfit: '',
    profitLoss: '',
    openDate: new Date().toISOString().slice(0, 16),
    closeDate: new Date().toISOString().slice(0, 16),
    strategy: '',
    rMultiple: '',
    discipline: 3,
    emotions: '',
    notes: '',
  });

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const calculatePL = () => {
    const entry = parseFloat(form.entryPrice);
    const exit = parseFloat(form.exitPrice);
    const lots = parseFloat(form.lotSize);
    if (!entry || !exit || !lots) return;
    const pips = form.type === 'BUY' ? exit - entry : entry - exit;
    const symbol = form.symbol.toUpperCase();
    let pipValue = 10;
    if (symbol.includes('JPY')) pipValue = 1000;
    const pl = pips * pipValue * lots;
    updateField('profitLoss', pl.toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.symbol.trim()) { setError('Symbol is required'); return; }
    if (!form.entryPrice) { setError('Entry price is required'); return; }
    if (form.status === 'CLOSED' && !form.profitLoss && !form.exitPrice) {
      setError('Exit price or P&L is required for closed trades');
      return;
    }

    setSaving(true);
    try {
      await addTrade({
        symbol: form.symbol.toUpperCase().trim(),
        type: form.type,
        status: form.status,
        entryPrice: parseFloat(form.entryPrice) || 0,
        exitPrice: form.exitPrice ? parseFloat(form.exitPrice) : null,
        lotSize: parseFloat(form.lotSize) || 0.01,
        stopLoss: form.stopLoss ? parseFloat(form.stopLoss) : null,
        takeProfit: form.takeProfit ? parseFloat(form.takeProfit) : null,
        profitLoss: form.profitLoss ? parseFloat(form.profitLoss) : 0,
        openDate: form.openDate,
        closeDate: form.status === 'CLOSED' ? form.closeDate : null,
        strategy: form.strategy,
        rMultiple: form.rMultiple ? parseFloat(form.rMultiple) : null,
        discipline: form.discipline,
        emotions: form.emotions,
        notes: form.notes,
      });
      navigate('/app/history');
    } catch (err) {
      setError('Failed to save trade. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaPlus className="text-kmf-accent text-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Add Trade</h1>
          <p className="text-sm text-kmf-text-tertiary">Log your trade with detailed entry and exit information</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-kmf-loss/10 border border-kmf-loss/30 text-kmf-loss text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Symbol + Type + Status */}
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 space-y-4">
          <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider">Trade Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="Symbol / Pair" required>
              <input
                type="text"
                className={inputClass}
                placeholder="EURUSD, BTCUSD..."
                value={form.symbol}
                onChange={(e) => updateField('symbol', e.target.value)}
              />
            </InputField>
            <InputField label="Direction" required>
              <div className="flex gap-2">
                {['BUY', 'SELL'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => updateField('type', t)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      form.type === t
                        ? t === 'BUY'
                          ? 'bg-kmf-profit/20 text-kmf-profit border border-kmf-profit/50'
                          : 'bg-kmf-loss/20 text-kmf-loss border border-kmf-loss/50'
                        : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary hover:border-kmf-accent/30'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </InputField>
            <InputField label="Status">
              <div className="flex gap-2">
                {['OPEN', 'CLOSED'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateField('status', s)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      form.status === s
                        ? s === 'OPEN'
                          ? 'bg-kmf-pending/20 text-kmf-pending border border-kmf-pending/50'
                          : 'bg-kmf-accent/15 text-kmf-accent border border-kmf-accent/50'
                        : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary hover:border-kmf-accent/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </InputField>
          </div>
        </div>

        {/* Row 2: Prices */}
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 space-y-4">
          <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider">Prices</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <InputField label="Entry Price" required>
              <input type="number" step="any" className={inputClass} placeholder="0.00000" value={form.entryPrice} onChange={(e) => updateField('entryPrice', e.target.value)} />
            </InputField>
            <InputField label="Exit Price">
              <input type="number" step="any" className={inputClass} placeholder="0.00000" value={form.exitPrice}
                onChange={(e) => updateField('exitPrice', e.target.value)}
                onBlur={calculatePL}
              />
            </InputField>
            <InputField label="Stop Loss">
              <input type="number" step="any" className={inputClass} placeholder="0.00000" value={form.stopLoss} onChange={(e) => updateField('stopLoss', e.target.value)} />
            </InputField>
            <InputField label="Take Profit">
              <input type="number" step="any" className={inputClass} placeholder="0.00000" value={form.takeProfit} onChange={(e) => updateField('takeProfit', e.target.value)} />
            </InputField>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <InputField label="Lot Size">
              <input type="number" step="0.01" min="0.01" className={inputClass} value={form.lotSize} onChange={(e) => updateField('lotSize', e.target.value)} />
            </InputField>
            <InputField label="Profit / Loss">
              <input type="number" step="any" className={inputClass} placeholder="0.00" value={form.profitLoss} onChange={(e) => updateField('profitLoss', e.target.value)} />
            </InputField>
            <InputField label="R-Multiple">
              <input type="number" step="0.01" className={inputClass} placeholder="e.g. 2.5" value={form.rMultiple} onChange={(e) => updateField('rMultiple', e.target.value)} />
            </InputField>
          </div>
        </div>

        {/* Row 3: Dates */}
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 space-y-4">
          <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider">Timing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Open Date">
              <input type="datetime-local" className={inputClass} value={form.openDate} onChange={(e) => updateField('openDate', e.target.value)} />
            </InputField>
            {form.status === 'CLOSED' && (
              <InputField label="Close Date">
                <input type="datetime-local" className={inputClass} value={form.closeDate} onChange={(e) => updateField('closeDate', e.target.value)} />
              </InputField>
            )}
          </div>
        </div>

        {/* Row 4: Analysis */}
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 space-y-4">
          <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider">Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Strategy">
              <select className={inputClass} value={form.strategy} onChange={(e) => updateField('strategy', e.target.value)}>
                <option value="">Select strategy...</option>
                {STRATEGIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </InputField>
            <InputField label="Emotions">
              <select className={inputClass} value={form.emotions} onChange={(e) => updateField('emotions', e.target.value)}>
                <option value="">How did you feel?</option>
                {EMOTIONS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </InputField>
          </div>
          <InputField label="Discipline Rating">
            <DisciplineStars value={form.discipline} onChange={(v) => updateField('discipline', v)} />
          </InputField>
          <InputField label="Notes">
            <textarea
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="What did you learn from this trade?"
              value={form.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={3}
            />
          </InputField>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate('/app')}
            className="px-6 py-2.5 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary hover:text-kmf-text-primary hover:border-kmf-accent/40 transition-all text-sm font-medium"
          >
            <FaTimes className="inline mr-2" />Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white font-semibold text-sm hover:shadow-glow transition-all disabled:opacity-50"
          >
            <FaSave className="inline mr-2" />{saving ? 'Saving...' : 'Save Trade'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTradePage;
