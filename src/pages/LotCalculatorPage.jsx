import { useState, useMemo } from 'react';
import { useTrades } from '../contexts/TradesContext';
import { FaCalculator, FaSync, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'NZD', 'CAD'];
const LEVERAGES = ['1:10', '1:20', '1:30', '1:50', '1:100', '1:200', '1:500', '1:1000'];
const INSTRUMENTS = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'NZD/USD', 'USD/CAD',
  'EUR/GBP', 'EUR/JPY', 'GBP/JPY', 'AUD/CAD', 'EUR/AUD', 'EUR/CHF',
  'XAU/USD', 'XAG/USD', 'NAS100', 'US30', 'SP500', 'GER40', 'UK100',
  'BTC/USD', 'ETH/USD',
];

const inputClass = "w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-3 text-kmf-text-primary text-sm placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all";

const LotCalculatorPage = () => {
  const { settings } = useTrades();

  const [balance, setBalance] = useState(settings.accountBalance?.toString() || '10000');
  const [currency, setCurrency] = useState('USD');
  const [instrument, setInstrument] = useState('');
  const [leverage, setLeverage] = useState('1:100');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [riskPercent, setRiskPercent] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const riskLabel = riskPercent <= 2 ? { text: '✅ Safe and conservative risk', color: 'text-kmf-profit' }
    : riskPercent <= 5 ? { text: '⚠️ Moderate risk', color: 'text-yellow-400' }
    : { text: '🔴 Dangerous risk level', color: 'text-kmf-loss' };

  const sliderColor = riskPercent <= 2 ? 'accent-green-500' : riskPercent <= 5 ? 'accent-yellow-500' : 'accent-red-500';

  const results = useMemo(() => {
    const bal = parseFloat(balance) || 0;
    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;
    if (!bal || !entry || !sl || entry === sl) return null;

    const riskAmount = bal * (riskPercent / 100);
    const pipDistance = Math.abs(entry - sl);
    const isJPY = instrument.includes('JPY');
    const pipValue = isJPY ? 0.01 : 0.0001;
    const pipsCount = pipDistance / pipValue;

    if (pipsCount <= 0) return null;

    // Standard lot = 100,000 units; pip value for 1 standard lot
    const standardPipValue = isJPY ? (100000 * 0.01) / entry : 10;
    const lotSize = riskAmount / (pipsCount * standardPipValue);

    const leverageNum = parseInt(leverage.split(':')[1]) || 100;
    const marginRequired = (lotSize * 100000 * entry) / leverageNum;

    return {
      riskAmount: riskAmount.toFixed(2),
      pipDistance: pipsCount.toFixed(1),
      lotSize: lotSize.toFixed(4),
      standardLots: Math.floor(lotSize * 100) / 100,
      miniLots: Math.floor(lotSize * 10),
      microLots: Math.floor(lotSize * 100),
      marginRequired: marginRequired.toFixed(2),
      maxLoss: riskAmount.toFixed(2),
    };
  }, [balance, entryPrice, stopLoss, riskPercent, instrument, leverage]);

  const handleReset = () => {
    setBalance(settings.accountBalance?.toString() || '10000');
    setCurrency('USD');
    setInstrument('');
    setLeverage('1:100');
    setEntryPrice('');
    setStopLoss('');
    setRiskPercent(1);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
            <FaCalculator className="text-kmf-accent text-lg" />
          </div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Lot Calculator</h1>
        </div>
        <button onClick={handleReset} className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all"><FaSync size={14} /></button>
      </div>

      {/* Account Balance */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
        <label className="text-xs text-kmf-accent font-medium mb-1 block">💰 Account Balance</label>
        <div className="flex items-center gap-2">
          <input type="number" step="any" className={`${inputClass} flex-1`} placeholder="10000" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <span className="text-sm font-bold text-kmf-text-tertiary w-12 text-right">{currency}</span>
        </div>
      </div>

      {/* Account Currency */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
        <label className="text-xs text-kmf-accent font-medium mb-1 block">🏦 Account Currency</label>
        <select className={inputClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Instrument */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
        <label className="text-xs text-kmf-accent font-medium mb-1 block">📊 Instrument</label>
        <select className={inputClass} value={instrument} onChange={(e) => setInstrument(e.target.value)}>
          <option value="">Select instrument</option>
          {INSTRUMENTS.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      {/* Leverage */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
        <label className="text-xs text-kmf-accent font-medium mb-1 block">✅ Leverage</label>
        <select className={inputClass} value={leverage} onChange={(e) => setLeverage(e.target.value)}>
          {LEVERAGES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Entry Price */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
        <label className="text-xs text-kmf-accent font-medium mb-1 block">📍 Entry Price</label>
        <input type="number" step="any" className={inputClass} placeholder="Entry price..." value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />
      </div>

      {/* Stop Loss */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
        <label className="text-xs text-kmf-accent font-medium mb-1 block">🔴 Stop Loss</label>
        <input type="number" step="any" className={inputClass} placeholder="Stop loss price..." value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
      </div>

      {/* Risk Per Trade */}
      <div className="bg-kmf-panel rounded-xl p-4 border-2 border-kmf-accent/20">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs text-kmf-accent font-medium">⚠️ Risk Per Trade</label>
          <div className="flex items-center gap-1">
            <input type="number" step="0.1" min="0.2" max="100" value={riskPercent}
              onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 1)}
              className="w-16 bg-kmf-surface border border-kmf-accent/20 rounded px-2 py-1 text-sm text-kmf-text-primary text-right focus:outline-none focus:border-kmf-accent" />
            <span className="text-sm text-kmf-text-tertiary">%</span>
          </div>
        </div>
        <input type="range" min="0.2" max="100" step="0.1" value={riskPercent}
          onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
          className={`w-full h-2 rounded-lg appearance-none bg-kmf-surface cursor-pointer ${sliderColor}`} />
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-kmf-text-tertiary">0.2%</span>
          <div className="flex gap-3">
            <span className="text-kmf-profit">🟢 Safe (≤2%)</span>
            <span className="text-yellow-400">🟡 Moderate (2-5%)</span>
            <span className="text-kmf-loss">🔴 Danger ({'>'}5%)</span>
          </div>
          <span className="text-kmf-text-tertiary">100%</span>
        </div>
        <p className={`text-center text-xs font-medium mt-2 ${riskLabel.color}`}>{riskLabel.text}</p>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-kmf-panel rounded-xl p-5 border-2 border-kmf-accent/30">
          <h2 className="text-sm font-bold text-kmf-accent mb-4">📊 Calculation Results</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-kmf-surface/50 rounded-lg p-3"><p className="text-xs text-kmf-text-tertiary">Risk Amount</p><p className="text-lg font-bold text-kmf-loss">${results.riskAmount}</p></div>
            <div className="bg-kmf-surface/50 rounded-lg p-3"><p className="text-xs text-kmf-text-tertiary">Pip Distance</p><p className="text-lg font-bold text-kmf-text-primary">{results.pipDistance} pips</p></div>
            <div className="bg-kmf-surface/50 rounded-lg p-3 col-span-2"><p className="text-xs text-kmf-text-tertiary">Recommended Lot Size</p><p className="text-2xl font-bold text-kmf-accent">{results.lotSize}</p></div>
            <div className="bg-kmf-surface/50 rounded-lg p-3"><p className="text-xs text-kmf-text-tertiary">Standard Lots</p><p className="text-sm font-bold text-kmf-text-primary">{results.standardLots}</p></div>
            <div className="bg-kmf-surface/50 rounded-lg p-3"><p className="text-xs text-kmf-text-tertiary">Mini Lots</p><p className="text-sm font-bold text-kmf-text-primary">{results.miniLots}</p></div>
          </div>
          <div className="mt-3 p-3 rounded-lg bg-kmf-loss/10 border border-kmf-loss/20">
            <p className="text-xs text-kmf-loss font-medium">⚠️ Maximum potential loss: ${results.maxLoss} ({riskPercent}% of balance)</p>
          </div>
        </div>
      )}

      {/* Advanced Options */}
      <button onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm text-kmf-accent hover:text-kmf-accent-bright transition-all">
        {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
        🔽 Advanced Options
      </button>
      {showAdvanced && results && (
        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-kmf-surface/50 rounded-lg p-3"><p className="text-xs text-kmf-text-tertiary">Margin Required</p><p className="text-sm font-bold text-kmf-text-primary">${results.marginRequired}</p></div>
            <div className="bg-kmf-surface/50 rounded-lg p-3"><p className="text-xs text-kmf-text-tertiary">Micro Lots</p><p className="text-sm font-bold text-kmf-text-primary">{results.microLots}</p></div>
          </div>
        </div>
      )}

      {/* Risk Disclaimer */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-yellow-500/20">
        <p className="text-xs font-semibold text-yellow-400 mb-1">⚠️ Risk Disclaimer</p>
        <p className="text-xs text-kmf-text-tertiary">Trading involves risk. Never risk more than 1-2% per trade. This calculator is for educational purposes only.</p>
      </div>
    </div>
  );
};

export default LotCalculatorPage;
