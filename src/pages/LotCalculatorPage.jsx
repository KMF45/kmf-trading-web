import { useState, useMemo } from 'react';
import { useTrades } from '../contexts/TradesContext';
import { FaCalculator, FaInfoCircle } from 'react-icons/fa';

const inputClass = "w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-kmf-text-primary text-sm placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all";

const LotCalculatorPage = () => {
  const { settings } = useTrades();
  const [accountBalance, setAccountBalance] = useState(settings.accountBalance?.toString() || '10000');
  const [riskPercent, setRiskPercent] = useState(settings.riskPerTrade?.toString() || '1');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLossPrice, setStopLossPrice] = useState('');
  const [pair, setPair] = useState('EURUSD');

  const result = useMemo(() => {
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercent);
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLossPrice);

    if (!balance || !risk || !entry || !sl || entry === sl) {
      return null;
    }

    const riskAmount = balance * (risk / 100);
    const pipDiff = Math.abs(entry - sl);
    const isJPY = pair.toUpperCase().includes('JPY');
    const pipsDistance = isJPY ? pipDiff * 100 : pipDiff * 10000;
    const pipValue = isJPY ? 1000 : 10;
    const lotSize = pipsDistance > 0 ? riskAmount / (pipsDistance * pipValue) : 0;

    // Round to nearest standard lot sizes
    const standardLot = Math.floor(lotSize * 100) / 100;
    const miniLot = Math.floor(lotSize * 10) / 10;

    return {
      riskAmount: riskAmount.toFixed(2),
      pipsDistance: pipsDistance.toFixed(1),
      lotSize: lotSize.toFixed(4),
      standardLot: standardLot.toFixed(2),
      miniLot: miniLot.toFixed(1),
      microLot: Math.floor(lotSize * 100).toString(),
      potentialLoss: riskAmount.toFixed(2),
    };
  }, [accountBalance, riskPercent, entryPrice, stopLossPrice, pair]);

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaCalculator className="text-kmf-accent text-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Lot Calculator</h1>
          <p className="text-sm text-kmf-text-tertiary">Calculate optimal position size based on your risk management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 space-y-5">
          <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider">Parameters</h3>

          <div>
            <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Pair / Symbol</label>
            <input type="text" className={inputClass} placeholder="EURUSD" value={pair} onChange={(e) => setPair(e.target.value.toUpperCase())} />
          </div>

          <div>
            <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Account Balance ({settings.currency || 'USD'})</label>
            <input type="number" step="any" className={inputClass} value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Risk per Trade (%)</label>
            <input type="number" step="0.1" min="0.1" max="100" className={inputClass} value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} />
            <div className="flex gap-2 mt-2">
              {['0.5', '1', '1.5', '2', '3'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setRiskPercent(v)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    riskPercent === v
                      ? 'bg-kmf-accent/20 text-kmf-accent border border-kmf-accent/40'
                      : 'bg-kmf-surface text-kmf-text-tertiary border border-kmf-accent/10 hover:border-kmf-accent/30'
                  }`}
                >
                  {v}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Entry Price</label>
            <input type="number" step="any" className={inputClass} placeholder="1.08500" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Stop Loss Price</label>
            <input type="number" step="any" className={inputClass} placeholder="1.08200" value={stopLossPrice} onChange={(e) => setStopLossPrice(e.target.value)} />
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {result ? (
            <>
              {/* Main Result */}
              <div className="bg-kmf-panel rounded-xl p-6 border-2 border-kmf-accent/30 shadow-glow text-center">
                <p className="text-xs text-kmf-text-tertiary uppercase tracking-wider mb-1">Recommended Lot Size</p>
                <p className="text-5xl font-bold gradient-text mb-2">{result.standardLot}</p>
                <p className="text-sm text-kmf-text-tertiary">standard lots ({result.lotSize} exact)</p>
              </div>

              {/* Details */}
              <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 space-y-4">
                <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider">Breakdown</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-kmf-accent/5">
                    <span className="text-sm text-kmf-text-tertiary">Risk Amount</span>
                    <span className="text-sm font-bold text-kmf-loss">${result.riskAmount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-kmf-accent/5">
                    <span className="text-sm text-kmf-text-tertiary">Stop Loss Distance</span>
                    <span className="text-sm font-bold text-kmf-text-primary">{result.pipsDistance} pips</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-kmf-accent/5">
                    <span className="text-sm text-kmf-text-tertiary">Standard Lots</span>
                    <span className="text-sm font-bold text-kmf-accent">{result.standardLot}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-kmf-accent/5">
                    <span className="text-sm text-kmf-text-tertiary">Mini Lots</span>
                    <span className="text-sm font-bold text-kmf-text-primary">{result.miniLot}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-kmf-text-tertiary">Micro Lots</span>
                    <span className="text-sm font-bold text-kmf-text-primary">{result.microLot}</span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-kmf-pending/5 rounded-xl p-4 border border-kmf-pending/20 flex gap-3">
                <FaInfoCircle className="text-kmf-pending flex-shrink-0 mt-0.5" />
                <p className="text-xs text-kmf-text-tertiary leading-relaxed">
                  Maximum potential loss on this trade: <span className="text-kmf-loss font-bold">${result.potentialLoss}</span> ({riskPercent}% of account).
                  This calculation assumes standard lot sizing. Verify with your broker for exact pip values.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-kmf-panel rounded-xl p-12 border border-kmf-accent/10 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-kmf-accent/10 flex items-center justify-center mb-4">
                <FaCalculator className="text-kmf-accent text-2xl" />
              </div>
              <h2 className="text-lg font-semibold text-kmf-text-primary mb-2">Enter Parameters</h2>
              <p className="text-kmf-text-tertiary text-sm">Fill in entry price and stop loss to calculate lot size</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LotCalculatorPage;
