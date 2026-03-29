/**
 * calculations.js — KMF Trading Journal
 * Mirrors Android calculateLotSize(), calculatePipValue(), getConversionRate() exactly
 * Key: Uses TRUNCATION (floor), NOT rounding for lot sizes
 */

/**
 * Main lot size calculator
 * @param {Object} params
 * @param {number} params.balance - Account balance
 * @param {string} params.accountCurrency - Account currency (USD, EUR)
 * @param {number} params.riskPercent - Risk per trade (e.g. 1.0 for 1%)
 * @param {number} params.entry - Entry price
 * @param {number} params.stopLoss - Stop loss price
 * @param {number|null} params.takeProfit - Take profit price (optional)
 * @param {Object|null} params.symbol - TradingSymbol object from defaultSymbols
 * @param {number} params.leverage - Leverage number (e.g. 100)
 * @param {Object} params.exchangeRates - Map of exchange rates { "USD/JPY": { rate: 154.64 } }
 * @returns {Object} CalculationResult
 */
export function calculateLotSize({
  balance = 0,
  accountCurrency = 'USD',
  riskPercent = 1.0,
  entry = 0,
  stopLoss = 0,
  takeProfit = null,
  symbol = null,
  leverage = 100,
  exchangeRates = {},
}) {
  // Validation
  if (balance <= 0) {
    return createResult({ hasError: true, errorMessage: 'Account balance must be greater than 0' });
  }
  if (!symbol) {
    return createResult({ hasError: true, errorMessage: 'Please select an instrument' });
  }
  if (entry <= 0) {
    return createResult({});
  }
  if (stopLoss <= 0) {
    return createResult({});
  }
  if (entry === stopLoss) {
    return createResult({ hasError: true, errorMessage: 'Entry and Stop Loss cannot be equal' });
  }

  try {
    const pipSize = symbol.pipSize;
    const pips = Math.abs(entry - stopLoss) / pipSize;

    // SL distance warning (>5% from entry)
    const slDistancePercent = (Math.abs(entry - stopLoss) / entry) * 100;
    let slWarning = '';
    if (slDistancePercent > 5.0) {
      slWarning = `⚠️ Stop Loss is ${slDistancePercent.toFixed(1)}% away from entry price. This seems unusually large - please verify your prices are correct.`;
    }

    const riskTargetAmount = balance * (riskPercent / 100);
    const pipValuePerLot = calculatePipValue(symbol, accountCurrency, entry, exchangeRates);

    const rawLotSize = (pipValuePerLot > 0 && pips > 0)
      ? riskTargetAmount / (pips * pipValuePerLot)
      : 0;

    let finalLotSize;
    let finalRiskAmount;
    let lotWarning = slWarning;

    // Lot size validation
    if (rawLotSize < 0.01) {
      return createResult({
        lotSize: 0,
        riskAmount: riskTargetAmount,
        stopLossPips: pips,
        hasError: false,
        warningMessage: `⚠️ Calculated lot size (${rawLotSize.toFixed(5)}) is below broker minimum (0.01). Consider: increasing risk %, reducing stop loss distance, or use minimum lot size 0.01 (actual risk will be higher).`,
      });
    }

    if (rawLotSize > 100) {
      finalLotSize = 100;
      finalRiskAmount = pips * pipValuePerLot * finalLotSize;
      const capMsg = `⚠️ Lot size capped at 100.00 (calculated: ${rawLotSize.toFixed(2)}). Your stop loss is very close to entry (${pips.toFixed(1)} pips).`;
      lotWarning = lotWarning ? `${lotWarning}\n\n${capMsg}` : capMsg;
    } else {
      // TRUNCATION to 2 decimals (floor, NOT round!) — matches Android exactly
      finalLotSize = Math.floor(rawLotSize * 100) / 100;
      // Actual risk with TRUNCATED lot size
      finalRiskAmount = pips * pipValuePerLot * finalLotSize;
    }

    // Margin calculation — always convert from quote currency to account currency
    const positionValueInQuoteCurrency = finalLotSize * symbol.contractSize * entry;
    const quoteUp = symbol.quoteCurrency.toUpperCase();
    const acctUp = accountCurrency.toUpperCase();
    let marginRequired;

    if (quoteUp === acctUp) {
      marginRequired = positionValueInQuoteCurrency / leverage;
    } else {
      const conversionRate = getConversionRate(quoteUp, acctUp, exchangeRates);
      marginRequired = (positionValueInQuoteCurrency * conversionRate) / leverage;
    }

    // Insufficient margin check
    if (marginRequired > balance) {
      return createResult({
        lotSize: finalLotSize,
        riskAmount: finalRiskAmount,
        marginRequired,
        stopLossPips: pips,
        hasError: true,
        errorMessage: `Insufficient margin! Required: ${marginRequired.toFixed(2)} ${accountCurrency}, Available: ${balance.toFixed(2)} ${accountCurrency}`,
        warningMessage: 'Reduce lot size or increase leverage',
      });
    }

    // TRUNCATION for Mini/Micro lots — matches Android
    const standardLots = finalLotSize;
    const miniLots = Math.floor(finalLotSize * 10 * 10) / 10;
    const microLots = Math.floor(finalLotSize * 100);

    // Take Profit calculations
    const tpPips = takeProfit ? Math.abs(entry - takeProfit) / pipSize : 0;
    const tpAmount = tpPips * pipValuePerLot * finalLotSize;
    const riskRewardRatio = pips > 0 ? tpPips / pips : 0;
    const balanceAfterLoss = balance - finalRiskAmount;
    const balanceAfterWin = balance + tpAmount;

    return createResult({
      lotSize: finalLotSize,
      riskAmount: finalRiskAmount,
      marginRequired,
      pipValue: pipValuePerLot * finalLotSize,
      stopLossPips: pips,
      takeProfitPips: tpPips,
      riskRewardRatio,
      balanceAfterLoss,
      balanceAfterWin,
      standardLots,
      miniLots,
      microLots,
      hasError: false,
      errorMessage: '',
      warningMessage: lotWarning,
    });
  } catch (err) {
    return createResult({
      hasError: true,
      errorMessage: `Calculation error: ${err.message}`,
    });
  }
}

/**
 * Calculate pip value for 1 standard lot — mirrors Android calculatePipValue()
 */
export function calculatePipValue(symbol, accountCurrency, entryPrice, exchangeRates = {}) {
  const { pipSize, contractSize, quoteCurrency, baseCurrency } = symbol;

  if (quoteCurrency.toUpperCase() === accountCurrency.toUpperCase()) {
    // Quote = Account currency (e.g. EUR/USD with USD account)
    return contractSize * pipSize;
  }

  if (baseCurrency.toUpperCase() === accountCurrency.toUpperCase()) {
    // Base = Account currency (e.g. USD/JPY with USD account)
    // pipValue in quote currency, then convert via entry price
    if (entryPrice > 0) {
      return (contractSize * pipSize) / entryPrice;
    }
    return 0;
  }

  // General case: pip value in quote currency, convert to account currency
  const pipValueInQuote = contractSize * pipSize;
  const conversionRate = getConversionRate(quoteCurrency, accountCurrency, exchangeRates);
  return pipValueInQuote * conversionRate;
}

/**
 * Get conversion rate between currencies — mirrors Android getConversionRate()
 */
export function getConversionRate(from, to, exchangeRates = {}) {
  const fromUp = from.toUpperCase();
  const toUp = to.toUpperCase();

  if (fromUp === toUp) return 1.0;

  // Direct rate
  const direct = exchangeRates[`${fromUp}/${toUp}`]?.rate;
  if (direct) return direct;

  // Indirect: from → USD → to
  const fromToUsd = exchangeRates[`${fromUp}/USD`]?.rate;
  const usdToTo = exchangeRates[`USD/${toUp}`]?.rate;
  if (fromToUsd && usdToTo) return fromToUsd * usdToTo;

  // Fallback hardcoded rates (when API fails)
  const fallbackToUsd = {
    USD: 1, EUR: 1.10, GBP: 1.27, JPY: 1 / 154.64, CHF: 1.13,
    CAD: 0.74, AUD: 0.66, NZD: 0.62, SEK: 0.095, NOK: 0.094,
    DKK: 0.148, PLN: 0.25, HUF: 0.0028, CZK: 0.044, TRY: 0.031,
    ZAR: 0.055, MXN: 0.058, SGD: 0.75, HKD: 0.128, CNH: 0.138,
    INR: 0.012, BRL: 0.18, RON: 0.22, THB: 0.029, KRW: 0.00074,
  };
  const fFrom = fallbackToUsd[fromUp];
  const fTo = fallbackToUsd[toUp];
  if (fFrom && fTo) return fFrom / fTo;

  return 1.0;
}

/** Create CalculationResult with defaults */
function createResult(overrides = {}) {
  return {
    lotSize: 0,
    riskAmount: 0,
    marginRequired: 0,
    pipValue: 0,
    stopLossPips: 0,
    takeProfitPips: 0,
    riskRewardRatio: 0,
    balanceAfterLoss: 0,
    balanceAfterWin: 0,
    standardLots: 0,
    miniLots: 0,
    microLots: 0,
    hasError: false,
    errorMessage: '',
    warningMessage: '',
    ...overrides,
  };
}

export default { calculateLotSize, calculatePipValue, getConversionRate };
