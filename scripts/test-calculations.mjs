/**
 * Comprehensive test script for lot size calculations.
 * Tests every instrument type × every account currency × edge cases.
 * Run: node scripts/test-calculations.mjs
 */

import { calculateLotSize, calculatePipValue, getConversionRate } from '../src/utils/calculations.js';

// Simulate realistic exchange rates (as the API would return)
const RATES = {
  'USD/EUR': { rate: 0.91 }, 'EUR/USD': { rate: 1.0989 },
  'USD/GBP': { rate: 0.79 }, 'GBP/USD': { rate: 1.2658 },
  'USD/JPY': { rate: 154.64 }, 'JPY/USD': { rate: 0.006467 },
  'USD/CHF': { rate: 0.88 }, 'CHF/USD': { rate: 1.1364 },
  'USD/CAD': { rate: 1.35 }, 'CAD/USD': { rate: 0.7407 },
  'USD/AUD': { rate: 1.52 }, 'AUD/USD': { rate: 0.6579 },
  'USD/NZD': { rate: 1.61 }, 'NZD/USD': { rate: 0.6211 },
  'USD/SEK': { rate: 10.50 }, 'SEK/USD': { rate: 0.09524 },
  'USD/TRY': { rate: 32.20 }, 'TRY/USD': { rate: 0.03106 },
  'USD/ZAR': { rate: 18.20 }, 'ZAR/USD': { rate: 0.05495 },
  'USD/MXN': { rate: 17.10 }, 'MXN/USD': { rate: 0.05848 },
  'USD/HKD': { rate: 7.82 }, 'HKD/USD': { rate: 0.12788 },
  'USD/SGD': { rate: 1.34 }, 'SGD/USD': { rate: 0.7463 },
  'USD/PLN': { rate: 4.02 }, 'PLN/USD': { rate: 0.2488 },
  'USD/HUF': { rate: 360 }, 'HUF/USD': { rate: 0.002778 },
  'USD/CNH': { rate: 7.25 }, 'CNH/USD': { rate: 0.1379 },
  'USD/NOK': { rate: 10.65 }, 'NOK/USD': { rate: 0.09390 },
  'USD/DKK': { rate: 6.78 }, 'DKK/USD': { rate: 0.1475 },
  'USD/INR': { rate: 83.50 }, 'INR/USD': { rate: 0.01198 },
  'USD/RON': { rate: 4.55 }, 'RON/USD': { rate: 0.2198 },
  // Cross pairs
  'EUR/GBP': { rate: 0.8681 }, 'GBP/EUR': { rate: 1.1520 },
  'EUR/JPY': { rate: 169.96 }, 'JPY/EUR': { rate: 0.005884 },
  'EUR/CHF': { rate: 0.9670 }, 'CHF/EUR': { rate: 1.0341 },
  'GBP/JPY': { rate: 195.77 }, 'JPY/GBP': { rate: 0.005108 },
  'AUD/JPY': { rate: 101.75 }, 'JPY/AUD': { rate: 0.009828 },
  'EUR/AUD': { rate: 1.6697 }, 'AUD/EUR': { rate: 0.5989 },
  'EUR/SEK': { rate: 11.538 }, 'SEK/EUR': { rate: 0.08667 },
  'EUR/TRY': { rate: 35.385 }, 'TRY/EUR': { rate: 0.02826 },
  'EUR/NOK': { rate: 11.703 }, 'NOK/EUR': { rate: 0.08545 },
};

let passed = 0;
let failed = 0;
const errors = [];

function test(name, actual, expected, tolerance = 0.02) {
  if (typeof expected === 'number' && typeof actual === 'number') {
    const ratio = expected !== 0 ? Math.abs(actual - expected) / Math.abs(expected) : Math.abs(actual);
    if (ratio <= tolerance) {
      passed++;
      return;
    }
    failed++;
    errors.push(`FAIL: ${name} — expected ${expected}, got ${actual} (${(ratio * 100).toFixed(1)}% off)`);
  } else if (actual === expected) {
    passed++;
  } else {
    failed++;
    errors.push(`FAIL: ${name} — expected ${expected}, got ${actual}`);
  }
}

function testBool(name, actual, expected) {
  if (actual === expected) { passed++; }
  else { failed++; errors.push(`FAIL: ${name} — expected ${expected}, got ${actual}`); }
}

// ══════════════════════════════════════════════
// SECTION 1: PIP VALUE TESTS
// ══════════════════════════════════════════════
console.log('\n═══ SECTION 1: PIP VALUE TESTS ═══\n');

// 1a. EUR/USD (quote=USD) with USD account → $10/pip
const eurusd = { symbol: 'EUR/USD', contractSize: 100000, pipSize: 0.0001, baseCurrency: 'EUR', quoteCurrency: 'USD' };
test('EUR/USD pipValue USD acct', calculatePipValue(eurusd, 'USD', 1.08, RATES), 10.0);

// 1b. EUR/USD with EUR account → quote=USD ≠ acct=EUR, base=EUR = acct=EUR → (100000*0.0001)/1.08
test('EUR/USD pipValue EUR acct', calculatePipValue(eurusd, 'EUR', 1.08, RATES), 100000 * 0.0001 / 1.08);

// 1c. USD/JPY (base=USD) with USD account → (100000*0.01)/154.64 ≈ $6.47
const usdjpy = { symbol: 'USD/JPY', contractSize: 100000, pipSize: 0.01, baseCurrency: 'USD', quoteCurrency: 'JPY' };
test('USD/JPY pipValue USD acct', calculatePipValue(usdjpy, 'USD', 154.64, RATES), 100000 * 0.01 / 154.64);

// 1d. USD/JPY with EUR account → base=USD ≠ EUR, quote=JPY ≠ EUR → general case
// pipValueInJPY = 100000*0.01 = 1000 JPY → convert JPY→EUR
test('USD/JPY pipValue EUR acct', calculatePipValue(usdjpy, 'EUR', 154.64, RATES), 1000 * (RATES['JPY/EUR']?.rate || 0.005884));

// 1e. EUR/GBP (cross) with USD account → pip in GBP, convert to USD
const eurgbp = { symbol: 'EUR/GBP', contractSize: 100000, pipSize: 0.0001, baseCurrency: 'EUR', quoteCurrency: 'GBP' };
test('EUR/GBP pipValue USD acct', calculatePipValue(eurgbp, 'USD', 0.868, RATES), 100000 * 0.0001 * RATES['GBP/USD'].rate);

// 1f. EUR/GBP with EUR account → base=EUR = acct → (100000*0.0001)/0.868
test('EUR/GBP pipValue EUR acct', calculatePipValue(eurgbp, 'EUR', 0.868, RATES), 100000 * 0.0001 / 0.868);

// 1g. USD/SEK with USD account → base=USD = acct → (100000*0.0001)/10.50
const usdsek = { symbol: 'USD/SEK', contractSize: 100000, pipSize: 0.0001, baseCurrency: 'USD', quoteCurrency: 'SEK' };
test('USD/SEK pipValue USD acct', calculatePipValue(usdsek, 'USD', 10.50, RATES), 100000 * 0.0001 / 10.50);

// 1h. USD/TRY with USD account → base=USD = acct → (100000*0.0001)/32.20
const usdtry = { symbol: 'USD/TRY', contractSize: 100000, pipSize: 0.0001, baseCurrency: 'USD', quoteCurrency: 'TRY' };
test('USD/TRY pipValue USD acct', calculatePipValue(usdtry, 'USD', 32.20, RATES), 100000 * 0.0001 / 32.20);

// 1i. EUR/TRY with USD account → neither base nor quote = USD → general case
const eurtry = { symbol: 'EUR/TRY', contractSize: 100000, pipSize: 0.0001, baseCurrency: 'EUR', quoteCurrency: 'TRY' };
test('EUR/TRY pipValue USD acct', calculatePipValue(eurtry, 'USD', 35.38, RATES), 100000 * 0.0001 * RATES['TRY/USD'].rate);

// 1j. XAU/USD (gold) with USD account → 100 * 0.01 = $1/pip
const xauusd = { symbol: 'XAU/USD', contractSize: 100, pipSize: 0.01, baseCurrency: 'XAU', quoteCurrency: 'USD' };
test('XAU/USD pipValue USD acct', calculatePipValue(xauusd, 'USD', 2350, RATES), 100 * 0.01);

// 1k. XAG/USD (silver) with USD account → 5000 * 0.001 = $5/pip
const xagusd = { symbol: 'XAG/USD', contractSize: 5000, pipSize: 0.001, baseCurrency: 'XAG', quoteCurrency: 'USD' };
test('XAG/USD pipValue USD acct', calculatePipValue(xagusd, 'USD', 29.50, RATES), 5000 * 0.001);

// 1l. XAU/EUR (gold EUR) with USD account → pip in EUR, convert to USD
const xaueur = { symbol: 'XAU/EUR', contractSize: 100, pipSize: 0.01, baseCurrency: 'XAU', quoteCurrency: 'EUR' };
test('XAU/EUR pipValue USD acct', calculatePipValue(xaueur, 'USD', 2140, RATES), 100 * 0.01 * RATES['EUR/USD'].rate);

// 1m. XAU/JPY with USD account → pip in JPY, convert to USD
const xaujpy = { symbol: 'XAU/JPY', contractSize: 100, pipSize: 1, baseCurrency: 'XAU', quoteCurrency: 'JPY' };
test('XAU/JPY pipValue USD acct', calculatePipValue(xaujpy, 'USD', 350000, RATES), 100 * 1 * RATES['JPY/USD'].rate);

// 1n. US30 (index) with USD account → 1 * 1.0 = $1/pip
const us30 = { symbol: 'US30', label: 'Dow Jones', contractSize: 1, pipSize: 1.0, baseCurrency: 'US30', quoteCurrency: 'USD' };
test('US30 pipValue USD acct', calculatePipValue(us30, 'USD', 42000, RATES), 1 * 1.0);

// 1o. DE40 (DAX, EUR quote) with USD account → 1 * 1.0 * EUR/USD
const de40 = { symbol: 'DE40', label: 'DAX', contractSize: 1, pipSize: 1.0, baseCurrency: 'DE40', quoteCurrency: 'EUR' };
test('DE40 pipValue USD acct', calculatePipValue(de40, 'USD', 18500, RATES), 1 * 1.0 * RATES['EUR/USD'].rate);

// 1p. DE40 with EUR account → 1 * 1.0 = €1/pip
test('DE40 pipValue EUR acct', calculatePipValue(de40, 'EUR', 18500, RATES), 1 * 1.0);

// 1q. JP225 (JPY quote) with USD account → 1 * 1.0 * JPY/USD
const jp225 = { symbol: 'JP225', label: 'Nikkei', contractSize: 1, pipSize: 1.0, baseCurrency: 'JP225', quoteCurrency: 'JPY' };
test('JP225 pipValue USD acct', calculatePipValue(jp225, 'USD', 39000, RATES), 1 * 1.0 * RATES['JPY/USD'].rate);

// 1r. BTC/USD with USD account → 1 * 1.0 = $1/pip
const btcusd = { symbol: 'BTC/USD', contractSize: 1, pipSize: 1.0, baseCurrency: 'BTC', quoteCurrency: 'USD' };
test('BTC/USD pipValue USD acct', calculatePipValue(btcusd, 'USD', 95000, RATES), 1 * 1.0);

// 1s. AAPL (stock, USD quote) with USD account → 1 * 0.01 = $0.01/pip
const aapl = { symbol: 'AAPL', label: 'Apple', contractSize: 1, pipSize: 0.01, baseCurrency: 'AAPL', quoteCurrency: 'USD' };
test('AAPL pipValue USD acct', calculatePipValue(aapl, 'USD', 190, RATES), 1 * 0.01);

// 1t. ASML (stock, EUR quote) with USD account → 1 * 0.01 * EUR/USD
const asml = { symbol: 'ASML', label: 'ASML', contractSize: 1, pipSize: 0.01, baseCurrency: 'ASML', quoteCurrency: 'EUR' };
test('ASML pipValue USD acct', calculatePipValue(asml, 'USD', 900, RATES), 1 * 0.01 * RATES['EUR/USD'].rate);

// 1u. USOIL with USD account → 1000 * 0.01 = $10/pip
const usoil = { symbol: 'USOIL', label: 'WTI Crude', contractSize: 1000, pipSize: 0.01, baseCurrency: 'USOIL', quoteCurrency: 'USD' };
test('USOIL pipValue USD acct', calculatePipValue(usoil, 'USD', 78, RATES), 1000 * 0.01);

// 1v. WHEAT with USD account → 5000 * 0.01 = $50/pip
const wheat = { symbol: 'WHEAT', label: 'Wheat', contractSize: 5000, pipSize: 0.01, baseCurrency: 'WHEAT', quoteCurrency: 'USD' };
test('WHEAT pipValue USD acct', calculatePipValue(wheat, 'USD', 550, RATES), 5000 * 0.01);

// 1w. COCOA with USD account → 10 * 1.0 = $10/pip
const cocoa = { symbol: 'COCOA', label: 'Cocoa', contractSize: 10, pipSize: 1.0, baseCurrency: 'COCOA', quoteCurrency: 'USD' };
test('COCOA pipValue USD acct', calculatePipValue(cocoa, 'USD', 9500, RATES), 10 * 1.0);

// 1x. USD/HUF with USD account → base=USD = acct → (100000*0.01)/360
const usdhuf = { symbol: 'USD/HUF', contractSize: 100000, pipSize: 0.01, baseCurrency: 'USD', quoteCurrency: 'HUF' };
test('USD/HUF pipValue USD acct', calculatePipValue(usdhuf, 'USD', 360, RATES), 100000 * 0.01 / 360);

// 1y. EUR/NOK with EUR account → base=EUR = acct → (100000*0.0001)/11.70
const eurnok = { symbol: 'EUR/NOK', contractSize: 100000, pipSize: 0.0001, baseCurrency: 'EUR', quoteCurrency: 'NOK' };
test('EUR/NOK pipValue EUR acct', calculatePipValue(eurnok, 'EUR', 11.70, RATES), 100000 * 0.0001 / 11.70);

// 1z. NATGAS with USD account → 10000 * 0.001 = $10/pip
const natgas = { symbol: 'NATGAS', label: 'Natural Gas', contractSize: 10000, pipSize: 0.001, baseCurrency: 'NATGAS', quoteCurrency: 'USD' };
test('NATGAS pipValue USD acct', calculatePipValue(natgas, 'USD', 2.50, RATES), 10000 * 0.001);

// 1aa. SHIB/USD (memecoin) with USD account → 1 * 0.00000001 = tiny
const shibusd = { symbol: 'SHIB/USD', contractSize: 1, pipSize: 0.00000001, baseCurrency: 'SHIB', quoteCurrency: 'USD' };
test('SHIB/USD pipValue USD acct', calculatePipValue(shibusd, 'USD', 0.000025, RATES), 1 * 0.00000001);

// 1ab. JGB bond (JPY quote) with USD account
const jgb = { symbol: 'JGB', label: 'Japan 10Y Bond', contractSize: 1, pipSize: 0.01, baseCurrency: 'JGB', quoteCurrency: 'JPY' };
test('JGB pipValue USD acct', calculatePipValue(jgb, 'USD', 148, RATES), 1 * 0.01 * RATES['JPY/USD'].rate);

console.log(`Pip Value tests: ${passed} passed, ${failed} failed\n`);

// ══════════════════════════════════════════════
// SECTION 2: FULL LOT SIZE CALCULATIONS
// ══════════════════════════════════════════════
console.log('═══ SECTION 2: FULL LOT SIZE CALCULATIONS ═══\n');
const p1 = passed, f1 = failed;

// 2a. Classic: EUR/USD, $10k, 1%, entry 1.0850, SL 1.0800 = 50 pips
// Risk = $100, pipValue = $10/pip, lot = 100/(50*10) = 0.20
let r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.0850, stopLoss: 1.0800, symbol: eurusd, leverage: 100, exchangeRates: RATES });
test('EUR/USD lot size', r.lotSize, 0.20);
test('EUR/USD risk amount', r.riskAmount, 100, 0.01);
test('EUR/USD pip value', r.pipValue, 2.0); // pipValuePerLot(10) * 0.20 = 2.0
test('EUR/USD SL pips', r.stopLossPips, 50);
testBool('EUR/USD no error', r.hasError, false);

// 2b. USD/JPY, $10k, 1%, entry 154.64, SL 154.14 = 50 pips
// pipValue = (100000*0.01)/154.64 ≈ 6.4665, lot = 100/(50*6.4665) ≈ 0.30
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 154.640, stopLoss: 154.140, symbol: usdjpy, leverage: 100, exchangeRates: RATES });
test('USD/JPY lot size', r.lotSize, Math.floor(100 / (50 * (100000 * 0.01 / 154.64)) * 100) / 100);
testBool('USD/JPY no error', r.hasError, false);

// 2c. EUR/GBP with USD account, $10k, 1%, entry 0.8680, SL 0.8630 = 50 pips
// pipValue = 100000*0.0001*GBP/USD(1.2658) ≈ 12.658
// lot = 100/(50*12.658) ≈ 0.15
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 0.8680, stopLoss: 0.8630, symbol: eurgbp, leverage: 100, exchangeRates: RATES });
test('EUR/GBP lot (USD acct)', r.lotSize, Math.floor(100 / (50 * 100000 * 0.0001 * RATES['GBP/USD'].rate) * 100) / 100);

// 2d. EUR/GBP with EUR account (base=EUR=account)
r = calculateLotSize({ balance: 10000, accountCurrency: 'EUR', riskPercent: 1, entry: 0.8680, stopLoss: 0.8630, symbol: eurgbp, leverage: 100, exchangeRates: RATES });
const pvEurgbpEur = (100000 * 0.0001) / 0.8680;
test('EUR/GBP lot (EUR acct)', r.lotSize, Math.floor(100 / (50 * pvEurgbpEur) * 100) / 100);

// 2e. USD/SEK with USD account
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 10.50, stopLoss: 10.45, symbol: usdsek, leverage: 100, exchangeRates: RATES });
const pvUsdsek = (100000 * 0.0001) / 10.50;
const pipsUsdsek = Math.abs(10.50 - 10.45) / 0.0001;
test('USD/SEK lot (USD acct)', r.lotSize, Math.floor(100 / (pipsUsdsek * pvUsdsek) * 100) / 100);
// Margin check: should be in USD, not SEK
test('USD/SEK margin reasonable', r.marginRequired < 10000, true); // margin can't exceed balance if no error

// 2f. USD/TRY with USD account
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 32.20, stopLoss: 32.15, symbol: usdtry, leverage: 100, exchangeRates: RATES });
testBool('USD/TRY no error', r.hasError, false);
test('USD/TRY margin is in USD range', r.marginRequired > 0 && r.marginRequired < 10000, true);

// 2g. XAU/USD with USD account, $10k, 1%, entry 2350, SL 2340 = 1000 pips (10/$0.01)
// pipValue = 100*0.01 = $1/pip, risk = $100, lot = 100/(1000*1) = 0.10
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 2350, stopLoss: 2340, symbol: xauusd, leverage: 100, exchangeRates: RATES });
test('XAU/USD lot', r.lotSize, 0.10);

// 2h. XAU/USD with EUR account
r = calculateLotSize({ balance: 10000, accountCurrency: 'EUR', riskPercent: 1, entry: 2350, stopLoss: 2340, symbol: xauusd, leverage: 100, exchangeRates: RATES });
const pvGoldEur = 100 * 0.01 * getConversionRate('USD', 'EUR', RATES);
test('XAU/USD lot (EUR acct)', r.lotSize, Math.floor(100 / (1000 * pvGoldEur) * 100) / 100);

// 2i. BTC/USD with USD account, $10k, 1%, entry 95000, SL 94000 = 1000 pips
// pipValue = 1*1.0 = $1/pip, lot = 100/(1000*1) = 0.10
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 95000, stopLoss: 94000, symbol: btcusd, leverage: 100, exchangeRates: RATES });
test('BTC/USD lot', r.lotSize, 0.10);

// 2j. DE40 with EUR account
r = calculateLotSize({ balance: 10000, accountCurrency: 'EUR', riskPercent: 1, entry: 18500, stopLoss: 18450, symbol: de40, leverage: 100, exchangeRates: RATES });
// pipValue = 1*1.0 = €1/pip, pips=50, lot = 100/(50*1) = 2.00
test('DE40 lot (EUR acct)', r.lotSize, 2.00);

// 2k. DE40 with USD account
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 18500, stopLoss: 18450, symbol: de40, leverage: 100, exchangeRates: RATES });
const pvDaxUsd = 1 * 1.0 * RATES['EUR/USD'].rate;
test('DE40 lot (USD acct)', r.lotSize, Math.floor(100 / (50 * pvDaxUsd) * 100) / 100);

// 2l. JP225 with JPY account
r = calculateLotSize({ balance: 1500000, accountCurrency: 'JPY', riskPercent: 1, entry: 39000, stopLoss: 38900, symbol: jp225, leverage: 100, exchangeRates: RATES });
// pipValue = 1*1.0 = ¥1/pip, pips=100, risk=¥15000, lot = 15000/(100*1) = 150.00 → capped at 100
test('JP225 lot (JPY acct)', r.lotSize, 100);

// 2m. AAPL with USD account
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 190, stopLoss: 185, symbol: aapl, leverage: 5, exchangeRates: RATES });
// pipValue = 1*0.01 = $0.01/pip, pips = 500, lot = 100/(500*0.01) = 20.00
test('AAPL lot', r.lotSize, 20.00);

// ══════════════════════════════════════════════
// SECTION 3: MARGIN CALCULATION TESTS
// ══════════════════════════════════════════════
console.log(`Lot Size tests: ${passed - p1} passed, ${failed - f1} failed\n`);
console.log('═══ SECTION 3: MARGIN CALCULATION TESTS ═══\n');
const p2 = passed, f2 = failed;

// 3a. EUR/USD 0.20 lots, USD acct, entry 1.085, leverage 100
// posValue = 0.20*100000*1.085 = 21700 USD, margin = 21700/100 = 217
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.085, stopLoss: 1.080, symbol: eurusd, leverage: 100, exchangeRates: RATES });
test('EUR/USD margin (USD)', r.marginRequired, r.lotSize * 100000 * 1.085 / 100, 0.01);

// 3b. USD/SEK, USD acct — margin should be in USD, NOT in SEK
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 10.50, stopLoss: 10.45, symbol: usdsek, leverage: 100, exchangeRates: RATES });
// posValue = lot*100000*10.50 (in SEK), convert to USD: *SEK/USD rate
const expectedMarginUsdsek = (r.lotSize * 100000 * 10.50 * RATES['SEK/USD'].rate) / 100;
test('USD/SEK margin in USD', r.marginRequired, expectedMarginUsdsek, 0.02);
// Should NOT be ~1050 (SEK value without conversion), should be ~200 (USD)
test('USD/SEK margin ~200 USD', r.marginRequired > 150 && r.marginRequired < 250, true);

// 3c. USD/TRY, USD acct
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 32.20, stopLoss: 32.15, symbol: usdtry, leverage: 100, exchangeRates: RATES });
const expectedMarginUsdtry = (r.lotSize * 100000 * 32.20 * RATES['TRY/USD'].rate) / 100;
test('USD/TRY margin in USD', r.marginRequired, expectedMarginUsdtry, 0.02);

// 3d. DE40 with USD acct — margin should be EUR→USD converted
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 18500, stopLoss: 18450, symbol: de40, leverage: 100, exchangeRates: RATES });
const expectedMarginDax = (r.lotSize * 1 * 18500 * RATES['EUR/USD'].rate) / 100;
test('DE40 margin (USD acct)', r.marginRequired, expectedMarginDax, 0.02);

// 3e. JP225 with USD acct — margin in JPY→USD
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 39000, stopLoss: 38900, symbol: jp225, leverage: 100, exchangeRates: RATES });
const expectedMarginJp225 = (r.lotSize * 1 * 39000 * RATES['JPY/USD'].rate) / 100;
test('JP225 margin (USD acct)', r.marginRequired, expectedMarginJp225, 0.02);

// 3f. EUR/JPY with EUR account → posValue in JPY, convert JPY→EUR
const eurjpy = { symbol: 'EUR/JPY', contractSize: 100000, pipSize: 0.01, baseCurrency: 'EUR', quoteCurrency: 'JPY' };
r = calculateLotSize({ balance: 10000, accountCurrency: 'EUR', riskPercent: 1, entry: 170, stopLoss: 169.50, symbol: eurjpy, leverage: 100, exchangeRates: RATES });
const expectedMarginEurjpy = (r.lotSize * 100000 * 170 * getConversionRate('JPY', 'EUR', RATES)) / 100;
test('EUR/JPY margin (EUR acct)', r.marginRequired, expectedMarginEurjpy, 0.02);

console.log(`Margin tests: ${passed - p2} passed, ${failed - f2} failed\n`);

// ══════════════════════════════════════════════
// SECTION 4: CONVERSION RATE TESTS
// ══════════════════════════════════════════════
console.log('═══ SECTION 4: CONVERSION RATE TESTS ═══\n');
const p3 = passed, f3 = failed;

// Direct rates
test('EUR→USD direct', getConversionRate('EUR', 'USD', RATES), RATES['EUR/USD'].rate);
test('USD→JPY direct', getConversionRate('USD', 'JPY', RATES), RATES['USD/JPY'].rate);
test('Same currency', getConversionRate('USD', 'USD', RATES), 1.0);

// Indirect: TRY→EUR (no direct rate, but TRY/USD and USD/EUR exist)
const tryEurIndirect = RATES['TRY/USD'].rate * RATES['USD/EUR'].rate;
test('TRY→EUR indirect', getConversionRate('TRY', 'EUR', RATES), tryEurIndirect, 0.01);

// Indirect: SEK→GBP
const sekGbpIndirect = RATES['SEK/USD'].rate * RATES['USD/GBP'].rate;
test('SEK→GBP indirect', getConversionRate('SEK', 'GBP', RATES), sekGbpIndirect, 0.01);

// Fallback (no API rates)
test('EUR→USD fallback', getConversionRate('EUR', 'USD', {}), 1.10 / 1); // 1.10/1 from fallbackToUsd
test('TRY→USD fallback', getConversionRate('TRY', 'USD', {}), 0.031 / 1);
test('SEK→EUR fallback', getConversionRate('SEK', 'EUR', {}), 0.095 / 1.10, 0.01);

// Unknown currency fallback
test('XXX→USD fallback = 1.0', getConversionRate('XXX', 'USD', {}), 1.0);

console.log(`Conversion tests: ${passed - p3} passed, ${failed - f3} failed\n`);

// ══════════════════════════════════════════════
// SECTION 5: EDGE CASES & VALIDATION
// ══════════════════════════════════════════════
console.log('═══ SECTION 5: EDGE CASES & VALIDATION ═══\n');
const p4 = passed, f4 = failed;

// 5a. Zero balance
r = calculateLotSize({ balance: 0, accountCurrency: 'USD', riskPercent: 1, entry: 1.08, stopLoss: 1.07, symbol: eurusd, leverage: 100, exchangeRates: RATES });
testBool('Zero balance → error', r.hasError, true);

// 5b. No symbol
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.08, stopLoss: 1.07, symbol: null, leverage: 100, exchangeRates: RATES });
testBool('No symbol → error', r.hasError, true);

// 5c. Entry = SL
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.08, stopLoss: 1.08, symbol: eurusd, leverage: 100, exchangeRates: RATES });
testBool('Entry=SL → error', r.hasError, true);

// 5d. Entry = 0
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 0, stopLoss: 1.07, symbol: eurusd, leverage: 100, exchangeRates: RATES });
testBool('Entry=0 → no result (no error)', r.hasError, false);
test('Entry=0 → lot=0', r.lotSize, 0);

// 5e. SL = 0
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.08, stopLoss: 0, symbol: eurusd, leverage: 100, exchangeRates: RATES });
test('SL=0 → lot=0', r.lotSize, 0);

// 5f. Very tiny SL → lot size capped at 100
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.08000, stopLoss: 1.07999, symbol: eurusd, leverage: 100, exchangeRates: RATES });
test('Tiny SL → lot capped', r.lotSize, 100);

// 5g. Very wide SL → lot < 0.01 warning
r = calculateLotSize({ balance: 100, accountCurrency: 'USD', riskPercent: 0.5, entry: 2350, stopLoss: 2200, symbol: xauusd, leverage: 100, exchangeRates: RATES });
// risk = $0.50, pips = 15000, pipValue = $1, lot = 0.50/(15000*1) = 0.00003
test('Wide SL → lot = 0', r.lotSize, 0);
test('Wide SL → has warning', r.warningMessage.includes('below broker minimum'), true);

// 5h. Take Profit calculation
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.0850, stopLoss: 1.0800, takeProfit: 1.0950, symbol: eurusd, leverage: 100, exchangeRates: RATES });
test('TP pips', r.takeProfitPips, 100);
test('R:R ratio', r.riskRewardRatio, 2.0);
test('Balance after win', r.balanceAfterWin, 10000 + r.takeProfitPips * calculatePipValue(eurusd, 'USD', 1.085, RATES) * r.lotSize, 0.01);

// 5i. Truncation test: 0.837 → 0.83, NOT 0.84
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 2.09, entry: 1.0850, stopLoss: 1.0800, symbol: eurusd, leverage: 100, exchangeRates: RATES });
// risk = $209, pips = 50, pipValue = $10, rawLot = 209/(50*10) = 0.418 → floor = 0.41
test('Truncation 0.418 → 0.41', r.lotSize, 0.41);

// 5j. Mini/Micro lot truncation
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.085, stopLoss: 1.080, symbol: eurusd, leverage: 100, exchangeRates: RATES });
test('Mini lots', r.miniLots, Math.floor(r.lotSize * 10 * 10) / 10);
test('Micro lots', r.microLots, Math.floor(r.lotSize * 100));

// 5k. Insufficient margin
r = calculateLotSize({ balance: 100, accountCurrency: 'USD', riskPercent: 50, entry: 1.085, stopLoss: 1.080, symbol: eurusd, leverage: 1, exchangeRates: RATES });
testBool('Insufficient margin → error', r.hasError, true);
test('Insufficient margin msg', r.errorMessage.includes('Insufficient margin'), true);

// 5l. Negative balance
r = calculateLotSize({ balance: -500, accountCurrency: 'USD', riskPercent: 1, entry: 1.08, stopLoss: 1.07, symbol: eurusd, leverage: 100, exchangeRates: RATES });
testBool('Negative balance → error', r.hasError, true);

// 5m. Short trade (SL above entry)
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.0800, stopLoss: 1.0850, symbol: eurusd, leverage: 100, exchangeRates: RATES });
test('Short trade lot = same as long', r.lotSize, 0.20);

// 5n. SL distance warning (>5%)
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 100, stopLoss: 90, symbol: btcusd, leverage: 100, exchangeRates: RATES });
test('SL >5% warning', r.warningMessage.includes('unusually large'), true);

// 5o. All 8 account currencies with EUR/USD
for (const ccy of ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD']) {
  const bal = ccy === 'JPY' ? 1500000 : 10000;
  r = calculateLotSize({ balance: bal, accountCurrency: ccy, riskPercent: 1, entry: 1.085, stopLoss: 1.080, symbol: eurusd, leverage: 100, exchangeRates: RATES });
  testBool(`EUR/USD ${ccy} acct no crash`, r.hasError === false || r.errorMessage.includes('Insufficient'), true);
  test(`EUR/USD ${ccy} acct lot > 0`, r.lotSize > 0, true);
}

// 5p. All 8 account currencies with USD/JPY
for (const ccy of ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD']) {
  const bal = ccy === 'JPY' ? 1500000 : 10000;
  r = calculateLotSize({ balance: bal, accountCurrency: ccy, riskPercent: 1, entry: 154.64, stopLoss: 154.14, symbol: usdjpy, leverage: 100, exchangeRates: RATES });
  testBool(`USD/JPY ${ccy} acct no crash`, r.hasError === false || r.errorMessage.includes('Insufficient'), true);
  test(`USD/JPY ${ccy} acct lot > 0`, r.lotSize > 0, true);
}

// 5q. All 8 account currencies with XAU/USD
for (const ccy of ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD']) {
  const bal = ccy === 'JPY' ? 1500000 : 10000;
  r = calculateLotSize({ balance: bal, accountCurrency: ccy, riskPercent: 1, entry: 2350, stopLoss: 2340, symbol: xauusd, leverage: 100, exchangeRates: RATES });
  testBool(`XAU/USD ${ccy} acct no crash`, r.hasError === false || r.errorMessage.includes('Insufficient'), true);
}

// 5r. All 8 account currencies with DE40 (EUR quote)
for (const ccy of ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD']) {
  const bal = ccy === 'JPY' ? 1500000 : 10000;
  r = calculateLotSize({ balance: bal, accountCurrency: ccy, riskPercent: 1, entry: 18500, stopLoss: 18450, symbol: de40, leverage: 100, exchangeRates: RATES });
  testBool(`DE40 ${ccy} acct no crash`, r.hasError === false || r.errorMessage.includes('Insufficient'), true);
}

// 5s. Empty exchange rates (fallback mode)
r = calculateLotSize({ balance: 10000, accountCurrency: 'USD', riskPercent: 1, entry: 1.085, stopLoss: 1.080, symbol: eurusd, leverage: 100, exchangeRates: {} });
testBool('No API rates → still works', r.hasError, false);
test('No API rates → lot > 0', r.lotSize > 0, true);

// 5t. EUR/TRY with EUR account (no direct TRY→EUR, needs indirect)
r = calculateLotSize({ balance: 10000, accountCurrency: 'EUR', riskPercent: 1, entry: 35.38, stopLoss: 35.33, symbol: eurtry, leverage: 100, exchangeRates: RATES });
testBool('EUR/TRY EUR acct no crash', r.hasError === false || r.errorMessage.includes('Insufficient'), true);

console.log(`Edge case tests: ${passed - p4} passed, ${failed - f4} failed\n`);

// ══════════════════════════════════════════════
// SUMMARY
// ══════════════════════════════════════════════
console.log('══════════════════════════════════');
console.log(`TOTAL: ${passed} passed, ${failed} failed`);
if (errors.length > 0) {
  console.log('\nFAILURES:');
  errors.forEach(e => console.log(`  ${e}`));
}
console.log('══════════════════════════════════');
process.exit(failed > 0 ? 1 : 0);
