import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams, useBlocker } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useTrades } from '../contexts/TradesContext';
import { useAuth } from '../contexts/AuthContext';
import SymbolPicker from '../components/trade/SymbolPicker';
import { getSymbolByCode } from '../data/defaultSymbols';
import { storage } from '../config/firebase';
import { FaPlus, FaStar, FaCheck, FaCalendarAlt, FaClock, FaChevronDown, FaCamera, FaTimes } from 'react-icons/fa';

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
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { trades, addTrade, editTrade } = useTrades();
  const { user } = useAuth();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [validationMsg, setValidationMsg] = useState('');
  const [showSymbolPicker, setShowSymbolPicker] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const submittedRef = useRef(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [existingPhotoUri, setExistingPhotoUri] = useState(null);
  const [photoRemoved, setPhotoRemoved] = useState(false);

  const [form, setForm] = useState({
    type: 'BUY',
    entryPrice: '',
    stopLoss: '',
    takeProfit: '',
    lotSize: '0.10',
    actualPnL: '',
    result: 'PENDING',
    rating: 3,
    notes: '',
    completedTasks: [],
    tradeDate: new Date().toISOString().split('T')[0],
    tradeTime: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
  });

  const [fieldErrors, setFieldErrors] = useState({
    instrument: false, entryPrice: false, lotSize: false,
    stopLoss: false, takeProfit: false, actualPnL: false,
  });

  // Load trade for editing
  useEffect(() => {
    if (editId && trades.length > 0) {
      const trade = trades.find(t => t.id === editId);
      if (trade) {
        setIsEditMode(true);
        setEditingTrade(trade);
        setSelectedSymbol(getSymbolByCode(trade.instrument));
        const dt = new Date(trade.tradeDateTime || trade.timestamp);
        setForm({
          type: trade.type || 'BUY',
          entryPrice: trade.entryPrice?.toString() || '',
          stopLoss: trade.stopLoss?.toString() || '',
          takeProfit: trade.takeProfit?.toString() || '',
          lotSize: trade.lotSize?.toString() || '0.10',
          actualPnL: trade.actualPnL?.toString() || '',
          result: trade.result || 'PENDING',
          rating: trade.rating || 3,
          notes: trade.notes || '',
          completedTasks: trade.completedTasks || [],
          tradeDate: dt.toISOString().split('T')[0],
          tradeTime: `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`,
        });
        if (trade.photoUri) {
          setExistingPhotoUri(trade.photoUri);
          setPhotoPreview(trade.photoUri);
        }
        console.log('[KMF_DEBUG] Loaded trade for editing:', trade.id);
      }
    }
  }, [editId, trades]);

  // Block navigation when form has unsaved changes
  useBlocker(({ currentLocation, nextLocation }) =>
    isDirty && !submittedRef.current && currentLocation.pathname !== nextLocation.pathname
      ? !window.confirm('You have unsaved changes. Leave without saving?')
      : false
  );

  useEffect(() => {
    const handler = (e) => {
      if (isDirty && !submittedRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    setError('');
    setValidationMsg('');
    setFieldErrors(prev => ({ ...prev, [field]: false }));
    if (field === 'type') {
      setFieldErrors(prev => ({ ...prev, stopLoss: false, takeProfit: false }));
    }
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoRemoved(false);
    setIsDirty(true);
  };

  const handlePhotoRemove = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoRemoved(true);
    setIsDirty(true);
  };

  const toggleChecklistItem = (idx) => {
    setForm(prev => {
      const tasks = [...prev.completedTasks];
      const i = tasks.indexOf(idx);
      if (i >= 0) tasks.splice(i, 1); else tasks.push(idx);
      return { ...prev, completedTasks: tasks };
    });
  };

  const buildTradeDateTime = () => {
    try {
      const [year, month, day] = form.tradeDate.split('-').map(Number);
      const [hours, minutes] = form.tradeTime.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes).getTime();
    } catch (err) {
      console.error('[KMF_DEBUG] Error building tradeDateTime:', err);
      return Date.now();
    }
  };

  const isFormValid = useMemo(() => {
    return selectedSymbol !== null &&
      form.entryPrice && parseFloat(form.entryPrice) > 0 &&
      form.lotSize && parseFloat(form.lotSize) > 0;
  }, [selectedSymbol, form.entryPrice, form.lotSize]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationMsg('');
    setFieldErrors({ instrument: false, entryPrice: false, lotSize: false, stopLoss: false, takeProfit: false, actualPnL: false });

    if (!selectedSymbol) {
      setFieldErrors(prev => ({ ...prev, instrument: true }));
      setValidationMsg('Please select an instrument');
      return;
    }
    const entry = parseFloat(form.entryPrice);
    if (!entry || entry <= 0) {
      setFieldErrors(prev => ({ ...prev, entryPrice: true }));
      setValidationMsg('Entry price must be greater than 0');
      return;
    }
    const lotSize = parseFloat(form.lotSize);
    if (!lotSize || lotSize <= 0) {
      setFieldErrors(prev => ({ ...prev, lotSize: true }));
      setValidationMsg('Lot size must be greater than 0');
      return;
    }

    const sl = form.stopLoss ? parseFloat(form.stopLoss) : null;
    const tp = form.takeProfit ? parseFloat(form.takeProfit) : null;
    const pnl = form.actualPnL ? parseFloat(form.actualPnL) : null;

    // SL/TP cross-validation — mirrors Android
    if (sl !== null && tp !== null) {
      const slAboveEntry = sl > entry;
      const tpAboveEntry = tp > entry;
      if (slAboveEntry === tpAboveEntry) {
        setFieldErrors(prev => ({ ...prev, stopLoss: true, takeProfit: true }));
        setValidationMsg('SL and TP must be on opposite sides of entry price');
        return;
      }
      if ((sl < entry && tp > sl && tp < entry) || (sl > entry && tp < sl && tp > entry)) {
        setFieldErrors(prev => ({ ...prev, takeProfit: true }));
        setValidationMsg('TP cannot be between Entry and SL');
        return;
      }
    }

    // P/L vs Result — mirrors Android
    if (pnl !== null) {
      if (form.result === 'PROFIT' && pnl < 0) {
        setFieldErrors(prev => ({ ...prev, actualPnL: true }));
        setValidationMsg('P/L cannot be negative when result is PROFIT');
        return;
      }
      if (form.result === 'LOSS' && pnl > 0) {
        setFieldErrors(prev => ({ ...prev, actualPnL: true }));
        setValidationMsg('P/L cannot be positive when result is LOSS');
        return;
      }
    }

    setSaving(true);
    try {
      // Upload photo if a new one was selected
      let photoUri = existingPhotoUri || null;
      if (photoFile && user) {
        const ext = photoFile.name.split('.').pop();
        const path = `users/${user.uid}/trades/${Date.now()}.${ext}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, photoFile);
        photoUri = await getDownloadURL(storageRef);
      } else if (photoRemoved) {
        photoUri = null;
      }

      const tradeData = {
        instrument: selectedSymbol.symbol,
        type: form.type,
        entryPrice: entry,
        stopLoss: sl,
        takeProfit: tp,
        lotSize,
        pnlAmount: pnl,
        actualPnL: pnl,
        result: form.result,
        rating: form.rating,
        notes: form.notes,
        completedTasks: form.completedTasks,
        timestamp: isEditMode ? editingTrade.timestamp : Date.now(),
        tradeDateTime: buildTradeDateTime(),
        followedPlan: form.completedTasks.length >= Math.floor(DEFAULT_CHECKLIST.length / 2),
        rMultiple: 0,
        photoUri,
      };

      submittedRef.current = true;
      if (isEditMode && editingTrade) {
        await editTrade(editingTrade.id, tradeData);
        console.log('[KMF_DEBUG] Trade updated:', editingTrade.id);
      } else {
        await addTrade(tradeData);
        console.log('[KMF_DEBUG] Trade added successfully');
      }
      navigate('/app/history');
    } catch (err) {
      console.error('[KMF_DEBUG] Error saving trade:', err);
      setError('Failed to save trade. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaPlus className="text-kmf-accent text-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">
            {isEditMode ? '✏️ Edit Trade' : '➕ Add Trade'}
          </h1>
          {isEditMode && <p className="text-xs text-kmf-text-tertiary">Editing {editingTrade?.instrument}</p>}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-kmf-loss/10 border border-kmf-loss/30 text-kmf-loss text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-kmf-accent font-medium mb-1 block">📅 Trade Date</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-accent text-sm pointer-events-none" />
              <input type="date" value={form.tradeDate} onChange={(e) => updateField('tradeDate', e.target.value)}
                className={`${inputClass} pl-9 cursor-pointer`} />
            </div>
          </div>
          <div>
            <label className="text-xs text-kmf-accent font-medium mb-1 block">🕐 Trade Time</label>
            <div className="relative">
              <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-kmf-accent text-sm pointer-events-none" />
              <input type="time" value={form.tradeTime} onChange={(e) => updateField('tradeTime', e.target.value)}
                className={`${inputClass} pl-9 cursor-pointer`} />
            </div>
          </div>
        </div>

        {/* Trade Type */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
          <p className="text-sm font-semibold text-kmf-text-primary mb-3">📊 Trade Type</p>
          <div className="grid grid-cols-2 gap-3">
            {['BUY', 'SELL'].map((t) => (
              <button key={t} type="button" onClick={() => updateField('type', t)}
                className={`py-3 rounded-lg text-sm font-bold transition-all ${
                  form.type === t
                    ? t === 'BUY'
                      ? 'bg-kmf-profit/20 text-kmf-profit border-2 border-kmf-profit/50 shadow-[0_0_12px_rgba(0,230,118,0.15)]'
                      : 'bg-kmf-loss/20 text-kmf-loss border-2 border-kmf-loss/50 shadow-[0_0_12px_rgba(255,82,82,0.15)]'
                    : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary hover:border-kmf-accent/30'
                }`}>
                {t === 'BUY' ? '📈 BUY' : '📉 SELL'}
              </button>
            ))}
          </div>
        </div>

        {/* Trade Details */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 space-y-3">
          <p className="text-sm font-semibold text-kmf-text-primary">📝 Trade Details</p>

          {/* Symbol Picker Trigger */}
          <div>
            <label className={`text-xs font-medium mb-1 block ${fieldErrors.instrument ? 'text-kmf-loss' : 'text-kmf-accent'}`}>Instrument *</label>
            <button type="button" onClick={() => setShowSymbolPicker(true)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                fieldErrors.instrument ? 'bg-kmf-surface border-2 border-kmf-loss/50' : 'bg-kmf-surface border border-kmf-accent/20 hover:border-kmf-accent/40'
              }`}>
              <span className={`text-sm ${selectedSymbol ? 'font-medium text-kmf-text-primary' : 'text-kmf-text-tertiary/50'}`}>
                {selectedSymbol ? `${selectedSymbol.symbol} — ${selectedSymbol.name}` : 'EUR/USD, XAU/USD, NAS100...'}
              </span>
              <FaChevronDown className="text-kmf-text-tertiary text-xs" />
            </button>
          </div>

          <div>
            <label className={`text-xs font-medium mb-1 block ${fieldErrors.entryPrice ? 'text-kmf-loss' : 'text-kmf-accent'}`}>Entry Price *</label>
            <input type="number" step="any" className={`${inputClass} ${fieldErrors.entryPrice ? 'border-kmf-loss/50 border-2' : ''}`}
              placeholder="1.0850" value={form.entryPrice} onChange={(e) => updateField('entryPrice', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-medium mb-1 block ${fieldErrors.stopLoss ? 'text-kmf-loss' : 'text-kmf-accent'}`}>SL</label>
              <input type="number" step="any" className={`${inputClass} ${fieldErrors.stopLoss ? 'border-kmf-loss/50 border-2' : ''}`}
                placeholder={form.type === 'BUY' ? '< Entry' : '> Entry'} value={form.stopLoss} onChange={(e) => updateField('stopLoss', e.target.value)} />
            </div>
            <div>
              <label className={`text-xs font-medium mb-1 block ${fieldErrors.takeProfit ? 'text-kmf-loss' : 'text-kmf-accent'}`}>TP</label>
              <input type="number" step="any" className={`${inputClass} ${fieldErrors.takeProfit ? 'border-kmf-loss/50 border-2' : ''}`}
                placeholder={form.type === 'BUY' ? '> Entry' : '< Entry'} value={form.takeProfit} onChange={(e) => updateField('takeProfit', e.target.value)} />
            </div>
          </div>

          {validationMsg && <p className="text-xs text-kmf-loss font-medium px-1">⚠️ {validationMsg}</p>}

          <div>
            <label className={`text-xs font-medium mb-1 block ${fieldErrors.lotSize ? 'text-kmf-loss' : 'text-kmf-accent'}`}>Lot Size *</label>
            <input type="number" step="0.01" min="0.01" className={`${inputClass} ${fieldErrors.lotSize ? 'border-kmf-loss/50 border-2' : ''}`}
              placeholder="0.10" value={form.lotSize} onChange={(e) => updateField('lotSize', e.target.value)} />
          </div>

          <div>
            <label className={`text-xs font-medium mb-1 block ${fieldErrors.actualPnL ? 'text-kmf-loss' : 'text-kmf-accent'}`}>💰 Actual P/L</label>
            <input type="number" step="any" className={`${inputClass} ${fieldErrors.actualPnL ? 'border-kmf-loss/50 border-2' : ''}`}
              placeholder="+245.50 or -120.30" value={form.actualPnL} onChange={(e) => updateField('actualPnL', e.target.value)} />
          </div>
        </div>

        {/* Pre-Trade Checklist */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-kmf-text-primary">✅ Pre-Trade Checklist</p>
            <span className="text-xs text-kmf-accent font-bold">{form.completedTasks.length}/{DEFAULT_CHECKLIST.length}</span>
          </div>
          <div className="space-y-2">
            {DEFAULT_CHECKLIST.map((item, idx) => {
              const checked = form.completedTasks.includes(idx);
              return (
                <button key={idx} type="button" onClick={() => toggleChecklistItem(idx)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all ${
                    checked ? 'bg-kmf-profit/10 border border-kmf-profit/30' : 'bg-kmf-surface/50 border border-transparent hover:border-kmf-accent/20'
                  }`}>
                  <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center ${checked ? 'bg-kmf-profit text-white' : 'border border-kmf-text-tertiary/30'}`}>
                    {checked && <FaCheck size={10} />}
                  </div>
                  <span className={`text-sm ${checked ? 'text-kmf-text-primary line-through opacity-70' : 'text-kmf-text-tertiary'}`}>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result — with BREAKEVEN */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
          <p className="text-sm font-semibold text-kmf-text-primary mb-3">🎯 Result</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { val: 'PROFIT', label: '✅ Profit', cls: 'bg-kmf-profit/20 text-kmf-profit border-kmf-profit/50' },
              { val: 'LOSS', label: '❌ Loss', cls: 'bg-kmf-loss/20 text-kmf-loss border-kmf-loss/50' },
              { val: 'BREAKEVEN', label: '⚖️ BE', cls: 'bg-kmf-pending/20 text-kmf-pending border-kmf-pending/50' },
              { val: 'PENDING', label: '⏳ Pending', cls: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
            ].map((r) => (
              <button key={r.val} type="button" onClick={() => updateField('result', r.val)}
                className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                  form.result === r.val ? `${r.cls} border-2` : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary hover:border-kmf-accent/30'
                }`}>
                {r.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-kmf-text-primary flex items-center gap-1"><FaStar className="text-yellow-400" /> Rating:</span>
              <span className="text-sm font-bold text-yellow-400">{form.rating}/5</span>
            </div>
            <input type="range" min="1" max="5" step="1" value={form.rating} onChange={(e) => updateField('rating', parseInt(e.target.value))}
              className="w-full accent-kmf-accent h-2 rounded-lg appearance-none bg-kmf-surface cursor-pointer" />
          </div>
        </div>

        {/* Notes */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
          <p className="text-sm font-semibold text-kmf-text-primary mb-2">📝 Notes</p>
          <textarea className={`${inputClass} min-h-[80px] resize-y`} placeholder="Trade notes, reasoning, lessons learned..."
            value={form.notes} onChange={(e) => updateField('notes', e.target.value)} rows={3} />
        </div>

        {/* Photo */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
          <p className="text-sm font-semibold text-kmf-text-primary mb-3">📷 Chart Screenshot</p>
          {photoPreview ? (
            <div className="relative inline-block">
              <img src={photoPreview} alt="Trade chart" className="w-full max-h-48 object-cover rounded-lg border border-kmf-accent/20" />
              <button type="button" onClick={handlePhotoRemove}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-kmf-loss/80 transition-all">
                <FaTimes size={11} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-kmf-accent/20 rounded-lg cursor-pointer hover:border-kmf-accent/40 hover:bg-kmf-accent/5 transition-all">
              <FaCamera className="text-kmf-accent text-2xl" />
              <span className="text-xs text-kmf-text-tertiary">Tap to add a chart screenshot</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
            </label>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pb-6">
          <button type="button" onClick={() => { submittedRef.current = true; navigate(isEditMode ? '/app/history' : '/app'); }}
            className="flex-1 py-3 rounded-lg border border-kmf-accent/20 text-kmf-text-secondary text-sm font-medium hover:text-kmf-text-primary hover:border-kmf-accent/40 transition-all">
            Cancel
          </button>
          <button type="submit" disabled={saving || !isFormValid}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white font-bold text-sm hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            💾 {saving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Save Trade'}
          </button>
        </div>
      </form>

      <SymbolPicker isOpen={showSymbolPicker} onClose={() => setShowSymbolPicker(false)}
        onSelect={(sym) => { setSelectedSymbol(sym); setFieldErrors(prev => ({ ...prev, instrument: false })); }}
        currentSymbol={selectedSymbol} />
    </div>
  );
};

export default AddTradePage;
