/**
 * DefaultSymbols.js — KMF Trading Journal
 * Mirrors Android DefaultSymbols.kt exactly
 * Each symbol has: symbol, name, category, baseCurrency, quoteCurrency,
 *                   contractSize, pipSize, tickValue, tickSize
 */

const DEFAULT_SYMBOLS = [
  // ============ FOREX MAJORS ============
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', category: 'forex', baseCurrency: 'EUR', quoteCurrency: 'USD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', category: 'forex', baseCurrency: 'GBP', quoteCurrency: 'USD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', category: 'forex', baseCurrency: 'USD', quoteCurrency: 'JPY', contractSize: 100000, pipSize: 0.01, tickValue: 10.0, tickSize: 0.001 },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', category: 'forex', baseCurrency: 'USD', quoteCurrency: 'CHF', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', category: 'forex', baseCurrency: 'USD', quoteCurrency: 'CAD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', category: 'forex', baseCurrency: 'AUD', quoteCurrency: 'USD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', category: 'forex', baseCurrency: 'NZD', quoteCurrency: 'USD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },

  // ============ FOREX MINORS ============
  { symbol: 'EUR/GBP', name: 'Euro / British Pound', category: 'forex', baseCurrency: 'EUR', quoteCurrency: 'GBP', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'EUR/JPY', name: 'Euro / Japanese Yen', category: 'forex', baseCurrency: 'EUR', quoteCurrency: 'JPY', contractSize: 100000, pipSize: 0.01, tickValue: 10.0, tickSize: 0.001 },
  { symbol: 'GBP/JPY', name: 'British Pound / Japanese Yen', category: 'forex', baseCurrency: 'GBP', quoteCurrency: 'JPY', contractSize: 100000, pipSize: 0.01, tickValue: 10.0, tickSize: 0.001 },
  { symbol: 'EUR/CHF', name: 'Euro / Swiss Franc', category: 'forex', baseCurrency: 'EUR', quoteCurrency: 'CHF', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'EUR/AUD', name: 'Euro / Australian Dollar', category: 'forex', baseCurrency: 'EUR', quoteCurrency: 'AUD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'EUR/CAD', name: 'Euro / Canadian Dollar', category: 'forex', baseCurrency: 'EUR', quoteCurrency: 'CAD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'GBP/AUD', name: 'British Pound / Australian Dollar', category: 'forex', baseCurrency: 'GBP', quoteCurrency: 'AUD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'GBP/CAD', name: 'British Pound / Canadian Dollar', category: 'forex', baseCurrency: 'GBP', quoteCurrency: 'CAD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'AUD/CAD', name: 'Australian Dollar / Canadian Dollar', category: 'forex', baseCurrency: 'AUD', quoteCurrency: 'CAD', contractSize: 100000, pipSize: 0.0001, tickValue: 10.0, tickSize: 0.00001 },
  { symbol: 'AUD/JPY', name: 'Australian Dollar / Japanese Yen', category: 'forex', baseCurrency: 'AUD', quoteCurrency: 'JPY', contractSize: 100000, pipSize: 0.01, tickValue: 10.0, tickSize: 0.001 },
  { symbol: 'CAD/JPY', name: 'Canadian Dollar / Japanese Yen', category: 'forex', baseCurrency: 'CAD', quoteCurrency: 'JPY', contractSize: 100000, pipSize: 0.01, tickValue: 10.0, tickSize: 0.001 },
  { symbol: 'CHF/JPY', name: 'Swiss Franc / Japanese Yen', category: 'forex', baseCurrency: 'CHF', quoteCurrency: 'JPY', contractSize: 100000, pipSize: 0.01, tickValue: 10.0, tickSize: 0.001 },
  { symbol: 'NZD/JPY', name: 'New Zealand Dollar / Japanese Yen', category: 'forex', baseCurrency: 'NZD', quoteCurrency: 'JPY', contractSize: 100000, pipSize: 0.01, tickValue: 10.0, tickSize: 0.001 },

  // ============ INDICES ============
  { symbol: 'US30', name: 'Dow Jones 30', category: 'index', baseCurrency: 'US30', quoteCurrency: 'USD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 1.0 },
  { symbol: 'SPX500', name: 'S&P 500', category: 'index', baseCurrency: 'SPX500', quoteCurrency: 'USD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 0.1 },
  { symbol: 'NAS100', name: 'Nasdaq 100', category: 'index', baseCurrency: 'NAS100', quoteCurrency: 'USD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 0.1 },
  { symbol: 'DE40', name: 'DAX 40 (Germany)', category: 'index', baseCurrency: 'DE40', quoteCurrency: 'EUR', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 1.0 },
  { symbol: 'UK100', name: 'FTSE 100 (UK)', category: 'index', baseCurrency: 'UK100', quoteCurrency: 'GBP', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 1.0 },
  { symbol: 'JP225', name: 'Nikkei 225 (Japan)', category: 'index', baseCurrency: 'JP225', quoteCurrency: 'JPY', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 1.0 },
  { symbol: 'AUS200', name: 'ASX 200 (Australia)', category: 'index', baseCurrency: 'AUS200', quoteCurrency: 'AUD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 1.0 },
  { symbol: 'FR40', name: 'CAC 40 (France)', category: 'index', baseCurrency: 'FR40', quoteCurrency: 'EUR', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 1.0 },
  { symbol: 'ES35', name: 'IBEX 35 (Spain)', category: 'index', baseCurrency: 'ES35', quoteCurrency: 'EUR', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 1.0 },
  { symbol: 'HK50', name: 'Hang Seng 50 (Hong Kong)', category: 'index', baseCurrency: 'HK50', quoteCurrency: 'HKD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 1.0 },

  // ============ METALS ============
  { symbol: 'XAU/USD', name: 'Gold / US Dollar', category: 'metal', baseCurrency: 'XAU', quoteCurrency: 'USD', contractSize: 100, pipSize: 0.01, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'XAG/USD', name: 'Silver / US Dollar', category: 'metal', baseCurrency: 'XAG', quoteCurrency: 'USD', contractSize: 5000, pipSize: 0.01, tickValue: 1.0, tickSize: 0.001 },
  { symbol: 'XPT/USD', name: 'Platinum / US Dollar', category: 'metal', baseCurrency: 'XPT', quoteCurrency: 'USD', contractSize: 100, pipSize: 0.01, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'XPD/USD', name: 'Palladium / US Dollar', category: 'metal', baseCurrency: 'XPD', quoteCurrency: 'USD', contractSize: 100, pipSize: 0.01, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'XAU/EUR', name: 'Gold / Euro', category: 'metal', baseCurrency: 'XAU', quoteCurrency: 'EUR', contractSize: 100, pipSize: 0.01, tickValue: 1.0, tickSize: 0.01 },

  // ============ CRYPTO ============
  { symbol: 'BTC/USD', name: 'Bitcoin / US Dollar', category: 'crypto', baseCurrency: 'BTC', quoteCurrency: 'USD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'ETH/USD', name: 'Ethereum / US Dollar', category: 'crypto', baseCurrency: 'ETH', quoteCurrency: 'USD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'BNB/USD', name: 'Binance Coin / US Dollar', category: 'crypto', baseCurrency: 'BNB', quoteCurrency: 'USD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'XRP/USD', name: 'Ripple / US Dollar', category: 'crypto', baseCurrency: 'XRP', quoteCurrency: 'USD', contractSize: 1, pipSize: 0.0001, tickValue: 1.0, tickSize: 0.00001 },
  { symbol: 'ADA/USD', name: 'Cardano / US Dollar', category: 'crypto', baseCurrency: 'ADA', quoteCurrency: 'USD', contractSize: 1, pipSize: 0.0001, tickValue: 1.0, tickSize: 0.00001 },
  { symbol: 'SOL/USD', name: 'Solana / US Dollar', category: 'crypto', baseCurrency: 'SOL', quoteCurrency: 'USD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'DOT/USD', name: 'Polkadot / US Dollar', category: 'crypto', baseCurrency: 'DOT', quoteCurrency: 'USD', contractSize: 1, pipSize: 0.001, tickValue: 1.0, tickSize: 0.001 },
  { symbol: 'DOGE/USD', name: 'Dogecoin / US Dollar', category: 'crypto', baseCurrency: 'DOGE', quoteCurrency: 'USD', contractSize: 1, pipSize: 0.00001, tickValue: 1.0, tickSize: 0.000001 },
  { symbol: 'MATIC/USD', name: 'Polygon / US Dollar', category: 'crypto', baseCurrency: 'MATIC', quoteCurrency: 'USD', contractSize: 1, pipSize: 0.0001, tickValue: 1.0, tickSize: 0.00001 },
  { symbol: 'AVAX/USD', name: 'Avalanche / US Dollar', category: 'crypto', baseCurrency: 'AVAX', quoteCurrency: 'USD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'LTC/USD', name: 'Litecoin / US Dollar', category: 'crypto', baseCurrency: 'LTC', quoteCurrency: 'USD', contractSize: 1, pipSize: 1.0, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'LINK/USD', name: 'Chainlink / US Dollar', category: 'crypto', baseCurrency: 'LINK', quoteCurrency: 'USD', contractSize: 1, pipSize: 0.001, tickValue: 1.0, tickSize: 0.001 },

  // ============ COMMODITIES ============
  { symbol: 'USOIL', name: 'US Crude Oil', category: 'commodity', baseCurrency: 'OIL', quoteCurrency: 'USD', contractSize: 1000, pipSize: 0.01, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'UKOIL', name: 'UK Brent Oil', category: 'commodity', baseCurrency: 'OIL', quoteCurrency: 'USD', contractSize: 1000, pipSize: 0.01, tickValue: 1.0, tickSize: 0.01 },
  { symbol: 'NATGAS', name: 'Natural Gas', category: 'commodity', baseCurrency: 'GAS', quoteCurrency: 'USD', contractSize: 10000, pipSize: 0.001, tickValue: 1.0, tickSize: 0.001 },
];

/** Get all symbols */
export const getDefaultSymbols = () => DEFAULT_SYMBOLS;

/** Get symbols by category */
export const getSymbolsByCategory = (category) =>
  DEFAULT_SYMBOLS.filter(s => s.category === category);

/** Find symbol by code */
export const getSymbolByCode = (code) =>
  DEFAULT_SYMBOLS.find(s => s.symbol === code) || null;

/** Search symbols by query */
export const searchSymbols = (query) => {
  if (!query) return DEFAULT_SYMBOLS;
  const q = query.toLowerCase().replace('/', '');
  return DEFAULT_SYMBOLS.filter(s =>
    s.symbol.toLowerCase().replace('/', '').includes(q) ||
    s.name.toLowerCase().includes(q)
  );
};

/** Get all unique categories */
export const getCategories = () => [
  { key: 'all', label: 'All', emoji: '📈' },
  { key: 'forex', label: 'Forex', emoji: '💱' },
  { key: 'index', label: 'Indices', emoji: '📊' },
  { key: 'metal', label: 'Metals', emoji: '🥇' },
  { key: 'crypto', label: 'Crypto', emoji: '₿' },
  { key: 'commodity', label: 'Commodities', emoji: '🛢️' },
];

/** Get category emoji */
export const getCategoryEmoji = (category) => {
  const map = { forex: '💱', index: '📊', metal: '🥇', crypto: '₿', commodity: '🛢️' };
  return map[category] || '📈';
};

export default DEFAULT_SYMBOLS;
