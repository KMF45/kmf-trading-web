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

    // Margin calculation
    const positionValueInQuoteCurrency = finalLotSize * symbol.contractSize * entry;
    let marginRequired;

    if (symbol.quoteCurrency.toUpperCase() === accountCurrency.toUpperCase()) {
      marginRequired = positionValueInQuoteCurrency / leverage;
    } else if (symbol.quoteCurrency.toUpperCase() === 'JPY' && accountCurrency.toUpperCase() === 'USD') {
      const usdJpyRate = exchangeRates['USD/JPY']?.rate || 154.64;
      marginRequired = (positionValueInQuoteCurrency / usdJpyRate) / leverage;
    } else if (symbol.baseCurrency.toUpperCase() === accountCurrency.toUpperCase()) {
      marginRequired = positionValueInQuoteCurrency / leverage;
    } else {
      const conversionRate = getConversionRate(symbol.quoteCurrency, accountCurrency, exchangeRates);
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
        errorMessage: `Insufficient margin! Required: $${marginRequired.toFixed(2)}, Available: $${balance.toFixed(2)}`,
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
    if (entryPrice > 0) {
      return (contractSize * pipSize) / entryPrice;
    }
    return 0;
  }

  if (quoteCurrency.toUpperCase() === 'JPY' && accountCurrency.toUpperCase() === 'USD') {
    // Special JPY handling
    const pipValueInJPY = contractSize * pipSize;
    const usdJpyRate = exchangeRates['USD/JPY']?.rate || 154.64;
    return pipValueInJPY / usdJpyRate;
  }

  // General case: convert from quote currency to account currency
  const conversionRate = getConversionRate(quoteCurrency, accountCurrency, exchangeRates);
  return (contractSize * pipSize) * conversionRate;
}

/**
 * Get conversion rate between currencies — mirrors Android getConversionRate()
 */
export function getConversionRate(from, to, exchangeRates = {}) {
  const rateKey = `${from}/${to}`;
  const apiRate = exchangeRates[rateKey]?.rate;

  if (apiRate) return apiRate;

  // Fallback rates
  const fromUp = from.toUpperCase();
  const toUp = to.toUpperCase();

  if (fromUp === toUp) return 1.0;
  if (fromUp === 'EUR' && toUp === 'USD') return 1.10;
  if (fromUp === 'USD' && toUp === 'EUR') return 0.91;
  if (fromUp === 'JPY' && toUp === 'USD') return 1.0 / 154.64;
  if (fromUp === 'USD' && toUp === 'JPY') return 154.64;
  if (fromUp === 'GBP' && toUp === 'USD') return 1.27;
  if (fromUp === 'USD' && toUp === 'GBP') return 0.79;
  if (fromUp === 'CHF' && toUp === 'USD') return 1.13;
  if (fromUp === 'USD' && toUp === 'CHF') return 0.88;
  if (fromUp === 'CAD' && toUp === 'USD') return 0.74;
  if (fromUp === 'USD' && toUp === 'CAD') return 1.35;
  if (fromUp === 'AUD' && toUp === 'USD') return 0.66;
  if (fromUp === 'USD' && toUp === 'AUD') return 1.52;

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
