import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTrades } from '../contexts/TradesContext';
import SymbolPicker from '../components/trade/SymbolPicker';
import { calculateLotSize } from '../utils/calculations';
import { getLivePrice, getExchangeRate } from '../services/priceApi';
import { formatNumber } from '../utils/formatters';
import {
  FaCalculator, FaChevronDown, FaSync, FaExclamationTriangle,
  FaInfoCircle, FaArrowDown, FaArrowUp,
} from 'react-icons/fa';

const inputClass = "w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-kmf-text-primary text-sm placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all";

const ACCOUNT_CURRENCIES = ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD', 'NZD'];
const LEVERAGE_OPTIONS = [1, 10, 20, 30, 50, 100, 200, 500];
const RISK_PRESETS = [0.5, 1.0, 1.5, 2.0, 3.0, 5.0];

const LotCalculatorPage = () => {
  const { settings } = useTrades();

  const [showSymbolPicker, setShowSymbolPicker] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  // Form inputs
  const [balance, setBalance] = useState('');
  const [accountCurrency, setAccountCurrency] = useState('USD');
  const [riskPercent, setRiskPercent] = useState('1.0');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [leverage, setLeverage] = useState(100);

  // Live price state
  const [livePrice, setLivePrice] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [priceError, setPriceError] = useState('');

  // Exchange rates cache
  const [exchangeRates, setExchangeRates] = useState({});
  const [loadingRates, setLoadingRates] = useState(false);

  // Initialize balance from settings
  useEffect(() => {
    if (settings?.accountBalance && !balance) {
      setBalance(settings.accountBalance.toString());
    }
  }, [settings, balance]);

  // Fetch live price when symbol changes
  const fetchLivePrice = useCallback(async () => {
    if (!selectedSymbol) return;
    setLoadingPrice(true);
    setPriceError('');
    try {
      const result = await getLivePrice(selectedSymbol.symbol);
      if (result) {
        setLivePrice(result.price);
        setEntryPrice(result.price.toString());
        console.log('[KMF_DEBUG] Live price fetched:', selectedSymbol.symbol, result.price);
      } else {
        setPriceError('Price unavailable');
        console.warn('[KMF_DEBUG] No price data for:', selectedSymbol.symbol);
      }
    } catch (err) {
      setPriceError('Failed to fetch price');
      console.error('[KMF_DEBUG] Price fetch error:', err);
    } finally {
      setLoadingPrice(false);
    }
  }, [selectedSymbol]);

  useEffect(() => {
    fetchLivePrice();
  }, [fetchLivePrice]);

  // Fetch exchange rates when needed
  const fetchExchangeRates = useCallback(async () => {
    if (!selectedSymbol || !accountCurrency) return;

    const { quoteCurrency, baseCurrency } = selectedSymbol;
    const qUp = quoteCurrency.toUpperCase();
    const accUp = accountCurrency.toUpperCase();

    // Skip if quote currency matches account currency
    if (qUp === accUp) return;

    setLoadingRates(true);
    try {
      const neededPairs = [];

      // Check if we need USD/JPY conversion
      if (qUp === 'JPY' && accUp === 'USD') {
        neededPairs.push({ from: 'USD', to: 'JPY' });
      } else if (baseCurrency.toUpperCase() !== accUp) {
        // General case: need conversion from quote to account
        neededPairs.push({ from: qUp, to: accUp });
      }

      const results = {};
      for (const pair of neededPairs) {
        const key = `${pair.from}/${pair.to}`;
        if (!exchangeRates[key]) {
          const rate = await getExchangeRate(pair.from, pair.to);
          if (rate) {
            results[key] = { rate: rate.rate };
            console.log('[KMF_DEBUG] Exchange rate fetched:', key, rate.rate);
          }
        }
      }

      if (Object.keys(results).length > 0) {
        setExchangeRates(prev => ({ ...prev, ...results }));
      }
    } catch (err) {
      console.error('[KMF_DEBUG] Exchange rate fetch error:', err);
    } finally {
      setLoadingRates(false);
    }
  }, [selectedSymbol, accountCurrency, exchangeRates]);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  // Calculate result using calculations.js
  const result = useMemo(() => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const tp = takeProfit ? parseFloat(takeProfit) : null;
    const bal = parseFloat(balance);
    const risk = parseFloat(riskPercent);

    if (!selectedSymbol || !bal || !entry || !sl) {
      return null;
    }

    return calculateLotSize({
      balance: bal,
      accountCurrency,
      riskPercent: risk,
      entry,
      stopLoss: sl,
      takeProfit: tp,
      symbol: selectedSymbol,
      leverage,
      exchangeRates,
    });
  }, [selectedSymbol, balance, accountCurrency, riskPercent, entryPrice, stopLoss, takeProfit, leverage, exchangeRates]);

  // Risk amount display
  const riskAmount = useMemo(() => {
    const bal = parseFloat(balance);
    const risk = parseFloat(riskPercent);
    if (!bal || !risk) return 0;
    return bal * (risk / 100);
  }, [balance, riskPercent]);

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaCalculator className="text-kmf-accent text-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">🧮 Lot Calculator</h1>
          <p className="text-xs text-kmf-text-tertiary">Risk-based position sizing — truncation, not rounding</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* ========== ACCOUNT SETTINGS ========== */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 space-y-3">
          <p className="text-sm font-semibold text-kmf-text-primary">💳 Account Settings</p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-kmf-accent font-medium mb-1 block">Balance</label>
              <input type="number" step="any" min="0" className={inputClass}
                placeholder="10000" value={balance}
                onChange={(e) => setBalance(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-kmf-accent font-medium mb-1 block">Currency</label>
              <select value={accountCurrency} onChange={(e) => setAccountCurrency(e.target.value)}
                className={`${inputClass} cursor-pointer`}>
                {ACCOUNT_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-kmf-accent font-medium">Risk %</label>
              <span className="text-xs font-bold text-kmf-accent">
                {riskPercent}% = {formatNumber(riskAmount)} {accountCurrency}
              </span>
            </div>
            <input type="number" step="0.1" min="0.1" max="100" className={inputClass}
              value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} />
            {/* Risk presets */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {RISK_PRESETS.map(r => (
                <button key={r} onClick={() => setRiskPercent(r.toString())}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    parseFloat(riskPercent) === r
                      ? 'bg-kmf-accent/20 text-kmf-accent border border-kmf-accent/40'
                      : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary hover:border-kmf-accent/30'
                  }`}>
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-kmf-accent font-medium mb-1 block">Leverage</label>
            <div className="flex gap-2 flex-wrap">
              {LEVERAGE_OPTIONS.map(l => (
                <button key={l} onClick={() => setLeverage(l)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    leverage === l
                      ? 'bg-kmf-accent/20 text-kmf-accent border border-kmf-accent/40'
                      : 'bg-kmf-surface border border-kmf-accent/10 text-kmf-text-tertiary hover:border-kmf-accent/30'
                  }`}>
                  1:{l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========== INSTRUMENT & PRICES ========== */}
        <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 space-y-3">
          <p className="text-sm font-semibold text-kmf-text-primary">📊 Instrument & Prices</p>

          {/* Symbol Picker */}
          <div>
            <label className="text-xs text-kmf-accent font-medium mb-1 block">Instrument</label>
            <button type="button" onClick={() => setShowSymbolPicker(true)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-kmf-surface border border-kmf-accent/20 text-left hover:border-kmf-accent/40 transition-all">
              <span className={`text-sm ${selectedSymbol ? 'font-medium text-kmf-text-primary' : 'text-kmf-text-tertiary/50'}`}>
                {selectedSymbol ? `${selectedSymbol.symbol} — ${selectedSymbol.name}` : 'Select instrument...'}
              </span>
              <FaChevronDown className="text-kmf-text-tertiary text-xs" />
            </button>
          </div>

          {/* Symbol info chips */}
          {selectedSymbol && (
            <div className="flex gap-2 flex-wrap">
              <span className="text-[10px] bg-kmf-surface px-2 py-1 rounded text-kmf-text-tertiary border border-kmf-accent/10">
                Contract: {selectedSymbol.contractSize.toLocaleString()}
              </span>
              <span className="text-[10px] bg-kmf-surface px-2 py-1 rounded text-kmf-text-tertiary border border-kmf-accent/10">
                Pip: {selectedSymbol.pipSize}
              </span>
              <span className="text-[10px] bg-kmf-surface px-2 py-1 rounded text-kmf-text-tertiary border border-kmf-accent/10">
                {selectedSymbol.baseCurrency}/{selectedSymbol.quoteCurrency}
              </span>
              {livePrice && (
                <span className="text-[10px] bg-kmf-accent/10 px-2 py-1 rounded text-kmf-accent border border-kmf-accent/20 font-medium">
                  📡 Live: {livePrice}
                </span>
              )}
            </div>
          )}

          {/* Live price status */}
          {selectedSymbol && (
            <div className="flex items-center gap-2">
              <button onClick={fetchLivePrice} disabled={loadingPrice}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-kmf-surface border border-kmf-accent/10 text-xs text-kmf-text-secondary hover:text-kmf-accent hover:border-kmf-accent/30 transition-all disabled:opacity-50">
                <FaSync size={10} className={loadingPrice ? 'animate-spin' : ''} />
                {loadingPrice ? 'Fetching...' : 'Refresh Price'}
              </button>
              {priceError && (
                <span className="text-xs text-yellow-400">{priceError}</span>
              )}
              {loadingRates && (
                <span className="text-xs text-kmf-text-tertiary">Loading rates...</span>
              )}
            </div>
          )}

          {/* Entry, SL, TP */}
          <div>
            <label className="text-xs text-kmf-accent font-medium mb-1 block">Entry Price</label>
            <input type="number" step="any" className={inputClass}
              placeholder="1.0850" value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-kmf-accent font-medium mb-1 flex items-center gap-1">
                <FaArrowDown className="text-kmf-loss" size={9} /> Stop Loss
              </label>
              <input type="number" step="any" className={inputClass}
                placeholder="1.0800" value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-kmf-accent font-medium mb-1 flex items-center gap-1">
                <FaArrowUp className="text-kmf-profit" size={9} /> Take Profit
              </label>
              <input type="number" step="any" className={inputClass}
                placeholder="1.0950 (optional)" value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)} />
            </div>
          </div>
        </div>

        {/* ========== RESULT ========== */}
        {result && (
          <div className="space-y-3">
            {/* Error */}
            {result.hasError && result.errorMessage && (
              <div className="bg-kmf-loss/10 border border-kmf-loss/30 rounded-xl p-4 flex items-start gap-3">
                <FaExclamationTriangle className="text-kmf-loss text-sm flex-shrink-0 mt-0.5" />
                <p className="text-sm text-kmf-loss">{result.errorMessage}</p>
              </div>
            )}

            {/* Warning */}
            {result.warningMessage && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
                <FaExclamationTriangle className="text-yellow-400 text-sm flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-400 whitespace-pre-line">{result.warningMessage}</p>
              </div>
            )}

            {/* Main Result Card */}
            {result.lotSize > 0 && (
              <div className="bg-gradient-to-br from-kmf-accent/10 to-kmf-accent/5 rounded-xl p-5 border border-kmf-accent/30 shadow-[0_0_20px_rgba(79,195,247,0.08)]">
                <div className="text-center mb-4">
                  <p className="text-xs text-kmf-accent font-medium mb-1 uppercase tracking-wider">Recommended Lot Size</p>
                  <p className="text-4xl font-black text-kmf-text-primary tracking-tight">
                    {result.lotSize.toFixed(2)}
                  </p>
                  <p className="text-xs text-kmf-text-tertiary mt-1">Standard Lots (truncated, not rounded)</p>
                </div>

                {/* Lot variants */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-kmf-panel/50 rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">Standard</p>
                    <p className="text-sm font-bold text-kmf-text-primary">{result.standardLots.toFixed(2)}</p>
                  </div>
                  <div className="bg-kmf-panel/50 rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">Mini</p>
                    <p className="text-sm font-bold text-kmf-text-primary">{result.miniLots.toFixed(1)}</p>
                  </div>
                  <div className="bg-kmf-panel/50 rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">Micro</p>
                    <p className="text-sm font-bold text-kmf-text-primary">{result.microLots}</p>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-kmf-panel/50 rounded-lg p-2.5">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">Risk Amount</p>
                    <p className="text-sm font-bold text-kmf-loss">
                      {formatNumber(result.riskAmount)} {accountCurrency}
                    </p>
                  </div>
                  <div className="bg-kmf-panel/50 rounded-lg p-2.5">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">SL Distance</p>
                    <p className="text-sm font-bold text-kmf-text-primary">
                      {result.stopLossPips.toFixed(1)} pips
                    </p>
                  </div>
                  <div className="bg-kmf-panel/50 rounded-lg p-2.5">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">Pip Value</p>
                    <p className="text-sm font-bold text-kmf-text-primary">
                      {formatNumber(result.pipValue, 4)} {accountCurrency}
                    </p>
                  </div>
                  <div className="bg-kmf-panel/50 rounded-lg p-2.5">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">Margin Required</p>
                    <p className="text-sm font-bold text-kmf-text-primary">
                      {formatNumber(result.marginRequired)} {accountCurrency}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TP / R:R section */}
            {result.lotSize > 0 && result.riskRewardRatio > 0 && (
              <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
                <p className="text-sm font-semibold text-kmf-text-primary mb-3">🎯 Risk/Reward Analysis</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-kmf-surface rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">R:R Ratio</p>
                    <p className={`text-sm font-bold ${result.riskRewardRatio >= 2 ? 'text-kmf-profit' : result.riskRewardRatio >= 1 ? 'text-yellow-400' : 'text-kmf-loss'}`}>
                      1:{result.riskRewardRatio.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-kmf-surface rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">TP Distance</p>
                    <p className="text-sm font-bold text-kmf-profit">{result.takeProfitPips.toFixed(1)} pips</p>
                  </div>
                  <div className="bg-kmf-surface rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">If Win</p>
                    <p className="text-sm font-bold text-kmf-profit">
                      {formatNumber(result.balanceAfterWin)} {accountCurrency}
                    </p>
                  </div>
                  <div className="bg-kmf-surface rounded-lg p-2.5 text-center">
                    <p className="text-[10px] text-kmf-text-tertiary uppercase">If Loss</p>
                    <p className="text-sm font-bold text-kmf-loss">
                      {formatNumber(result.balanceAfterLoss)} {accountCurrency}
                    </p>
                  </div>
                </div>

                {/* R:R visual bar */}
                <div className="mt-3">
                  <div className="flex items-center gap-2 text-xs text-kmf-text-tertiary mb-1">
                    <span>Risk</span>
                    <div className="flex-1 h-1.5 rounded-full bg-kmf-surface overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-kmf-loss to-kmf-profit rounded-full"
                        style={{ width: `${Math.min((result.riskRewardRatio / (result.riskRewardRatio + 1)) * 100, 100)}%` }}
                      />
                    </div>
                    <span>Reward</span>
                  </div>
                </div>
              </div>
            )}

            {/* Info note */}
            {result.lotSize > 0 && (
              <div className="flex items-start gap-2 px-1 pb-6">
                <FaInfoCircle className="text-kmf-text-tertiary text-xs flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-kmf-text-tertiary leading-relaxed">
                  Lot sizes are <span className="text-kmf-accent font-medium">truncated</span> (floored), not rounded — matching professional broker standards. 
                  This ensures your actual risk never exceeds the target risk percentage. 
                  Live prices are cached for 30s. Exchange rates use fallbacks when API is unavailable.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Placeholder when no result yet */}
        {!result && selectedSymbol && (
          <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 text-center">
            <p className="text-sm text-kmf-text-tertiary">
              Enter <span className="text-kmf-accent">Entry Price</span> and <span className="text-kmf-accent">Stop Loss</span> to calculate lot size
            </p>
          </div>
        )}

        {!selectedSymbol && (
          <div className="bg-kmf-panel rounded-xl p-8 border border-kmf-accent/10 text-center">
            <p className="text-3xl mb-2">📐</p>
            <p className="text-sm text-kmf-text-tertiary">
              Select an <span className="text-kmf-accent">instrument</span> to start calculating
            </p>
          </div>
        )}
      </div>

      {/* Symbol Picker Overlay */}
      <SymbolPicker
        isOpen={showSymbolPicker}
        onClose={() => setShowSymbolPicker(false)}
        onSelect={(sym) => {
          setSelectedSymbol(sym);
          setEntryPrice('');
          setStopLoss('');
          setTakeProfit('');
          setLivePrice(null);
          setPriceError('');
        }}
        currentSymbol={selectedSymbol}
      />
    </div>
  );
};

export default LotCalculatorPage;
