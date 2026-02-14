/**
 * priceApi.js — KMF Trading Journal
 * Mirrors Android TwelveDataApi.kt — live prices and exchange rates
 * Uses TwelveData API (free tier: 8 calls/min, 800/day)
 */

const API_BASE = 'https://api.twelvedata.com';
const API_KEY = 'demo'; // Replace with actual key for production

// Cache to avoid excessive API calls
const priceCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

/**
 * Format symbol for TwelveData API
 * TwelveData uses: EUR/USD, XAU/USD, BTC/USD, etc.
 * Indices: US30 → DJI, NAS100 → NDX, SPX500 → SPX, DE40 → DAX
 */
const formatSymbolForAPI = (symbol) => {
  const indexMap = {
    'US30': 'DJI',
    'NAS100': 'NDX',
    'SPX500': 'SPX',
    'DE40': 'DAX',
    'UK100': 'FTSE',
    'JP225': 'N225',
    'AUS200': 'AXJO',
    'FR40': 'FCHI',
    'ES35': 'IBEX',
    'HK50': 'HSI',
    'USOIL': 'WTI',
    'UKOIL': 'BRENT',
    'NATGAS': 'NG',
  };
  return indexMap[symbol] || symbol;
};

/**
 * Get live price for a symbol — mirrors TwelveDataApi.getPrice()
 * @returns {Promise<{price: number, symbol: string, timestamp: number}|null>}
 */
export const getLivePrice = async (symbol) => {
  try {
    // Check cache
    const cacheKey = `price_${symbol}`;
    const cached = priceCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const apiSymbol = formatSymbolForAPI(symbol);
    const response = await fetch(
      `${API_BASE}/price?symbol=${encodeURIComponent(apiSymbol)}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      console.warn(`[PriceAPI] HTTP error ${response.status} for ${symbol}`);
      return null;
    }

    const data = await response.json();

    if (data.code || !data.price) {
      console.warn(`[PriceAPI] Error for ${symbol}:`, data.message || 'No price data');
      return null;
    }

    const result = {
      price: parseFloat(data.price),
      symbol,
      timestamp: Date.now(),
    };

    // Update cache
    priceCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } catch (err) {
    console.error(`[PriceAPI] Error fetching price for ${symbol}:`, err);
    return null;
  }
};

/**
 * Get exchange rate — mirrors TwelveDataApi.getExchangeRate()
 * @returns {Promise<{rate: number, from: string, to: string}|null>}
 */
export const getExchangeRate = async (from, to) => {
  try {
    const cacheKey = `rate_${from}_${to}`;
    const cached = priceCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const pair = `${from}/${to}`;
    const response = await fetch(
      `${API_BASE}/exchange_rate?symbol=${encodeURIComponent(pair)}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      console.warn(`[PriceAPI] HTTP error ${response.status} for exchange rate ${pair}`);
      return null;
    }

    const data = await response.json();

    if (data.code || !data.rate) {
      console.warn(`[PriceAPI] Error for exchange rate ${pair}:`, data.message || 'No rate data');
      return null;
    }

    const result = {
      rate: parseFloat(data.rate),
      from,
      to,
      timestamp: Date.now(),
    };

    priceCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } catch (err) {
    console.error(`[PriceAPI] Error fetching exchange rate ${from}/${to}:`, err);
    return null;
  }
};

/** Clear the price cache */
export const clearCache = () => priceCache.clear();

export default { getLivePrice, getExchangeRate, clearCache };
