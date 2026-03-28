/**
 * instruments.js — 400+ trading instruments for the Lot Size Calculator
 * Contract sizes and pip sizes follow standard broker conventions (ICMarkets, Pepperstone, Exness)
 */

const fx = (symbol, pip = 0.0001) => {
  const [base, quote] = symbol.split('/');
  return { symbol, label: symbol, contractSize: 100000, pipSize: pip, baseCurrency: base, quoteCurrency: quote };
};
const idx = (symbol, label, quote = 'USD') => ({ symbol, label, contractSize: 1, pipSize: 1.0, baseCurrency: symbol, quoteCurrency: quote });
const metal = (symbol, label, contract, pip, quote = 'USD') => ({ symbol, label, contractSize: contract, pipSize: pip, baseCurrency: symbol.split('/')[0] || symbol, quoteCurrency: quote });
const energy = (symbol, label, contract, pip) => ({ symbol, label, contractSize: contract, pipSize: pip, baseCurrency: symbol, quoteCurrency: 'USD' });
const crypto = (symbol, label, pip) => ({ symbol, label, contractSize: 1, pipSize: pip, baseCurrency: symbol.split('/')[0], quoteCurrency: 'USD' });
const stock = (symbol, label, quote = 'USD') => ({ symbol, label, contractSize: 1, pipSize: 0.01, baseCurrency: symbol, quoteCurrency: quote });
const agri = (symbol, label, contract, pip = 0.01) => ({ symbol, label, contractSize: contract, pipSize: pip, baseCurrency: symbol, quoteCurrency: 'USD' });
const bond = (symbol, label, quote = 'USD') => ({ symbol, label, contractSize: 1, pipSize: 0.01, baseCurrency: symbol, quoteCurrency: quote });
const etf = (symbol, label) => ({ symbol, label, contractSize: 1, pipSize: 0.01, baseCurrency: symbol, quoteCurrency: 'USD' });

// ═══ FOREX MAJORS (7) ═══
const FOREX_MAJORS = [
  fx('EUR/USD'), fx('GBP/USD'), fx('USD/JPY', 0.01), fx('USD/CHF'), fx('AUD/USD'), fx('USD/CAD'), fx('NZD/USD'),
];

// ═══ FOREX CROSSES (21) ═══
const FOREX_CROSSES = [
  fx('EUR/GBP'), fx('EUR/JPY', 0.01), fx('EUR/CHF'), fx('EUR/AUD'), fx('EUR/CAD'), fx('EUR/NZD'),
  fx('GBP/JPY', 0.01), fx('GBP/CHF'), fx('GBP/AUD'), fx('GBP/CAD'), fx('GBP/NZD'),
  fx('AUD/JPY', 0.01), fx('AUD/CHF'), fx('AUD/CAD'), fx('AUD/NZD'),
  fx('NZD/JPY', 0.01), fx('NZD/CHF'), fx('NZD/CAD'),
  fx('CAD/JPY', 0.01), fx('CAD/CHF'), fx('CHF/JPY', 0.01),
];

// ═══ FOREX EXOTICS (70+) ═══
const FOREX_EXOTICS = [
  // Scandinavian
  fx('USD/SEK'), fx('USD/NOK'), fx('USD/DKK'), fx('EUR/SEK'), fx('EUR/NOK'), fx('EUR/DKK'),
  fx('GBP/SEK'), fx('GBP/NOK'), fx('GBP/DKK'), fx('NOK/SEK'), fx('NOK/JPY', 0.01), fx('SEK/JPY', 0.01),
  // Turkish Lira
  fx('USD/TRY'), fx('EUR/TRY'), fx('GBP/TRY'),
  // South African Rand
  fx('USD/ZAR'), fx('EUR/ZAR'), fx('GBP/ZAR'),
  // Mexican Peso
  fx('USD/MXN'), fx('EUR/MXN'),
  // Polish Zloty
  fx('USD/PLN'), fx('EUR/PLN'), fx('GBP/PLN'), fx('CHF/PLN'),
  // Hungarian Forint
  fx('USD/HUF', 0.01), fx('EUR/HUF', 0.01),
  // Czech Koruna
  fx('USD/CZK'), fx('EUR/CZK'),
  // Singapore Dollar
  fx('USD/SGD'), fx('EUR/SGD'), fx('GBP/SGD'), fx('AUD/SGD'), fx('SGD/JPY', 0.01),
  // Hong Kong Dollar
  fx('USD/HKD'), fx('EUR/HKD'), fx('GBP/HKD'),
  // Chinese Yuan
  fx('USD/CNH'), fx('EUR/CNH'), fx('GBP/CNH'),
  // Thai Baht
  fx('USD/THB', 0.01),
  // Indian Rupee
  fx('USD/INR'),
  // Other Asian
  fx('USD/TWD', 0.01), fx('USD/KRW', 0.01), fx('USD/IDR', 0.01), fx('USD/MYR'), fx('USD/PHP'),
  // Middle East
  fx('USD/SAR'), fx('USD/AED'), fx('USD/ILS'),
  // South America
  fx('USD/BRL'), fx('USD/CLP', 0.01), fx('USD/COP', 0.01), fx('USD/ARS'), fx('USD/PEN'),
  // Eastern Europe
  fx('USD/RON'), fx('EUR/RON'), fx('USD/BGN'), fx('USD/RUB'), fx('EUR/RUB'),
];

// ═══ INDICES (30) ═══
const INDICES = [
  // Americas
  idx('US30', 'US30 (Dow Jones)'), idx('SPX500', 'SPX500 (S&P 500)'), idx('NAS100', 'NAS100 (Nasdaq)'),
  idx('US2000', 'US2000 (Russell 2000)'), idx('DXY', 'DXY (Dollar Index)'),
  // Europe
  idx('DE40', 'DE40 (DAX)', 'EUR'), idx('UK100', 'UK100 (FTSE)', 'GBP'), idx('FR40', 'FR40 (CAC 40)', 'EUR'),
  idx('EU50', 'EU50 (Euro Stoxx)', 'EUR'), idx('ES35', 'ES35 (IBEX)', 'EUR'), idx('IT40', 'IT40 (FTSE MIB)', 'EUR'),
  idx('NL25', 'NL25 (AEX)', 'EUR'), idx('CH20', 'CH20 (SMI)', 'CHF'),
  idx('SE30', 'SE30 (OMX Stockholm)', 'SEK'), idx('NO25', 'NO25 (OBX Oslo)', 'NOK'),
  idx('AT20', 'AT20 (ATX Vienna)', 'EUR'), idx('PL20', 'PL20 (WIG 20)', 'PLN'),
  // Asia-Pacific
  idx('JP225', 'JP225 (Nikkei)', 'JPY'), idx('HK50', 'HK50 (Hang Seng)', 'HKD'),
  idx('CHINA50', 'CHINA50 (FTSE China A50)'), idx('AUS200', 'AUS200 (ASX)', 'AUD'),
  idx('SG25', 'SG25 (Singapore)', 'SGD'), idx('NIFTY50', 'NIFTY50 (India)'),
  idx('KOSPI', 'KOSPI (South Korea)'), idx('TWSE', 'TWSE (Taiwan)'),
  idx('NZ50', 'NZ50 (New Zealand)', 'NZD'),
  // Other
  idx('SA40', 'SA40 (JSE Top 40)'), idx('VIX', 'VIX (Volatility)'),
];

// ═══ METALS (12) ═══
const METALS = [
  metal('XAU/USD', 'Gold (XAU/USD)', 100, 0.01), metal('XAG/USD', 'Silver (XAG/USD)', 5000, 0.001),
  metal('XPT/USD', 'Platinum (XPT/USD)', 100, 0.01), metal('XPD/USD', 'Palladium (XPD/USD)', 100, 0.01),
  metal('XAU/EUR', 'Gold (XAU/EUR)', 100, 0.01, 'EUR'), metal('XAU/AUD', 'Gold (XAU/AUD)', 100, 0.01, 'AUD'),
  metal('XAU/GBP', 'Gold (XAU/GBP)', 100, 0.01, 'GBP'), metal('XAU/JPY', 'Gold (XAU/JPY)', 100, 1, 'JPY'),
  metal('XAG/EUR', 'Silver (XAG/EUR)', 5000, 0.001, 'EUR'),
  { symbol: 'COPPER', label: 'Copper', contractSize: 25000, pipSize: 0.0001, baseCurrency: 'COPPER', quoteCurrency: 'USD' },
  { symbol: 'ALUMINIUM', label: 'Aluminium', contractSize: 25, pipSize: 0.01, baseCurrency: 'ALUMINIUM', quoteCurrency: 'USD' },
  { symbol: 'ZINC', label: 'Zinc', contractSize: 25, pipSize: 0.01, baseCurrency: 'ZINC', quoteCurrency: 'USD' },
];

// ═══ ENERGY (6) ═══
const ENERGY = [
  energy('USOIL', 'WTI Crude Oil', 1000, 0.01), energy('UKOIL', 'Brent Crude Oil', 1000, 0.01),
  energy('NATGAS', 'Natural Gas', 10000, 0.001), energy('GASOLINE', 'Gasoline (RBOB)', 1000, 0.0001),
  energy('HEATING', 'Heating Oil', 1000, 0.0001), energy('CARBON', 'Carbon Emissions', 1000, 0.01),
];

// ═══ CRYPTO (55) ═══
const CRYPTO = [
  // Top tier
  crypto('BTC/USD', 'Bitcoin', 1.0), crypto('ETH/USD', 'Ethereum', 0.01), crypto('BNB/USD', 'BNB', 0.01),
  crypto('XRP/USD', 'Ripple', 0.0001), crypto('SOL/USD', 'Solana', 0.01), crypto('ADA/USD', 'Cardano', 0.0001),
  crypto('DOGE/USD', 'Dogecoin', 0.00001), crypto('TRX/USD', 'TRON', 0.00001), crypto('DOT/USD', 'Polkadot', 0.001),
  crypto('MATIC/USD', 'Polygon', 0.0001), crypto('LTC/USD', 'Litecoin', 0.01), crypto('AVAX/USD', 'Avalanche', 0.01),
  crypto('LINK/USD', 'Chainlink', 0.001), crypto('UNI/USD', 'Uniswap', 0.001), crypto('ATOM/USD', 'Cosmos', 0.001),
  crypto('XLM/USD', 'Stellar', 0.00001), crypto('NEAR/USD', 'NEAR Protocol', 0.001), crypto('BCH/USD', 'Bitcoin Cash', 0.01),
  crypto('FIL/USD', 'Filecoin', 0.001), crypto('APT/USD', 'Aptos', 0.001), crypto('ICP/USD', 'Internet Computer', 0.01),
  crypto('ETC/USD', 'Ethereum Classic', 0.01), crypto('HBAR/USD', 'Hedera', 0.00001), crypto('TON/USD', 'Toncoin', 0.001),
  crypto('ARB/USD', 'Arbitrum', 0.0001), crypto('OP/USD', 'Optimism', 0.001), crypto('SUI/USD', 'Sui', 0.0001),
  crypto('SEI/USD', 'Sei', 0.0001), crypto('INJ/USD', 'Injective', 0.01), crypto('TIA/USD', 'Celestia', 0.001),
  // Mid cap
  crypto('FET/USD', 'Fetch.AI', 0.0001), crypto('WLD/USD', 'Worldcoin', 0.001), crypto('JUP/USD', 'Jupiter', 0.0001),
  crypto('ALGO/USD', 'Algorand', 0.0001), crypto('VET/USD', 'VeChain', 0.00001), crypto('FTM/USD', 'Fantom', 0.0001),
  crypto('SAND/USD', 'The Sandbox', 0.0001), crypto('MANA/USD', 'Decentraland', 0.0001), crypto('AXS/USD', 'Axie Infinity', 0.001),
  crypto('AAVE/USD', 'Aave', 0.01), crypto('MKR/USD', 'Maker', 0.01), crypto('CRV/USD', 'Curve DAO', 0.0001),
  crypto('GRT/USD', 'The Graph', 0.0001), crypto('RNDR/USD', 'Render', 0.001), crypto('RUNE/USD', 'THORChain', 0.001),
  crypto('STX/USD', 'Stacks', 0.001), crypto('IMX/USD', 'Immutable X', 0.001),
  // Memecoins & newer
  crypto('SHIB/USD', 'Shiba Inu', 0.00000001), crypto('PEPE/USD', 'Pepe', 0.00000001),
  crypto('BONK/USD', 'Bonk', 0.00000001), crypto('FLOKI/USD', 'Floki', 0.00000001),
  crypto('WIF/USD', 'dogwifhat', 0.0001), crypto('TAO/USD', 'Bittensor', 0.01),
  crypto('KAS/USD', 'Kaspa', 0.00001), crypto('ORDI/USD', 'ORDI', 0.01),
  crypto('PENDLE/USD', 'Pendle', 0.001),
];

// ═══ STOCKS (100) ═══
const STOCKS = [
  // US Tech
  stock('AAPL', 'Apple'), stock('MSFT', 'Microsoft'), stock('GOOGL', 'Alphabet'), stock('AMZN', 'Amazon'),
  stock('NVDA', 'NVIDIA'), stock('TSLA', 'Tesla'), stock('META', 'Meta'), stock('AMD', 'AMD'),
  stock('NFLX', 'Netflix'), stock('CRM', 'Salesforce'), stock('ORCL', 'Oracle'), stock('ADBE', 'Adobe'),
  stock('CSCO', 'Cisco'), stock('AVGO', 'Broadcom'), stock('QCOM', 'Qualcomm'), stock('NOW', 'ServiceNow'),
  stock('INTC', 'Intel'), stock('PLTR', 'Palantir'), stock('UBER', 'Uber'), stock('SHOP', 'Shopify'),
  stock('SQ', 'Block'), stock('SNAP', 'Snap'), stock('COIN', 'Coinbase'), stock('MSTR', 'MicroStrategy'),
  stock('ARM', 'Arm Holdings'), stock('SNOW', 'Snowflake'), stock('NET', 'Cloudflare'), stock('SPOT', 'Spotify'),
  // US Semiconductor
  stock('TSM', 'TSMC (ADR)'), stock('MU', 'Micron'), stock('LRCX', 'Lam Research'), stock('AMAT', 'Applied Materials'),
  stock('KLAC', 'KLA Corp'), stock('MRVL', 'Marvell'), stock('SMCI', 'Super Micro'),
  // US Finance
  stock('JPM', 'JPMorgan'), stock('BAC', 'Bank of America'), stock('WFC', 'Wells Fargo'), stock('GS', 'Goldman Sachs'),
  stock('MS', 'Morgan Stanley'), stock('C', 'Citigroup'), stock('BLK', 'BlackRock'), stock('SCHW', 'Charles Schwab'),
  stock('V', 'Visa'), stock('MA', 'Mastercard'), stock('PYPL', 'PayPal'), stock('AXP', 'American Express'),
  // US Healthcare
  stock('JNJ', 'Johnson & Johnson'), stock('UNH', 'UnitedHealth'), stock('LLY', 'Eli Lilly'), stock('ABBV', 'AbbVie'),
  stock('PFE', 'Pfizer'), stock('MRK', 'Merck'), stock('TMO', 'Thermo Fisher'), stock('ABT', 'Abbott'),
  stock('AMGN', 'Amgen'), stock('GILD', 'Gilead'), stock('MRNA', 'Moderna'), stock('ISRG', 'Intuitive Surgical'),
  // US Consumer
  stock('WMT', 'Walmart'), stock('COST', 'Costco'), stock('HD', 'Home Depot'), stock('MCD', 'McDonald\'s'),
  stock('SBUX', 'Starbucks'), stock('NKE', 'Nike'), stock('TGT', 'Target'), stock('LOW', 'Lowe\'s'),
  stock('PG', 'Procter & Gamble'), stock('KO', 'Coca-Cola'), stock('PEP', 'PepsiCo'),
  // US Industrial / Energy
  stock('XOM', 'ExxonMobil'), stock('CVX', 'Chevron'), stock('BA', 'Boeing'), stock('CAT', 'Caterpillar'),
  stock('GE', 'GE Aerospace'), stock('HON', 'Honeywell'), stock('LMT', 'Lockheed Martin'), stock('RTX', 'RTX (Raytheon)'),
  stock('DE', 'Deere & Co'), stock('UPS', 'UPS'),
  // US Other
  stock('DIS', 'Disney'), stock('ABNB', 'Airbnb'), stock('BKNG', 'Booking'), stock('RIVN', 'Rivian'),
  stock('F', 'Ford'), stock('GM', 'General Motors'), stock('SOFI', 'SoFi'),
  // EU Stocks
  stock('ASML', 'ASML Holding', 'EUR'), stock('SAP', 'SAP SE', 'EUR'), stock('SIE', 'Siemens', 'EUR'),
  stock('MC', 'LVMH', 'EUR'), stock('AIR', 'Airbus', 'EUR'), stock('TTE', 'TotalEnergies', 'EUR'),
  stock('SHEL', 'Shell', 'GBP'), stock('BP', 'BP', 'GBP'), stock('AZN', 'AstraZeneca', 'GBP'),
  stock('HSBA', 'HSBC', 'GBP'), stock('NESN', 'Nestlé', 'CHF'), stock('NOVN', 'Novartis', 'CHF'), stock('ROG', 'Roche', 'CHF'),
  // Asian Stocks
  stock('BABA', 'Alibaba'), stock('NIO', 'NIO'), stock('PDD', 'PDD Holdings'), stock('JD', 'JD.com'),
  stock('BIDU', 'Baidu'), stock('SONY', 'Sony'), stock('TM', 'Toyota'),
];

// ═══ AGRICULTURE (15) ═══
const AGRICULTURE = [
  agri('WHEAT', 'Wheat', 5000), agri('CORN', 'Corn', 5000), agri('SOYBEAN', 'Soybeans', 5000),
  agri('SOYOIL', 'Soybean Oil', 60000), agri('SOYMEAL', 'Soybean Meal', 100),
  agri('RICE', 'Rough Rice', 2000), agri('OATS', 'Oats', 5000),
  agri('COFFEE', 'Coffee Arabica', 37500), agri('COCOA', 'Cocoa', 10, 1.0), agri('SUGAR', 'Sugar #11', 112000),
  agri('COTTON', 'Cotton #2', 50000), agri('OJ', 'Orange Juice', 15000), agri('LUMBER', 'Lumber', 27500),
  agri('LCATTLE', 'Live Cattle', 40000), agri('LHOGS', 'Lean Hogs', 40000),
];

// ═══ BONDS (10) ═══
const BONDS = [
  bond('US10Y', 'US 10-Year Treasury'), bond('US2Y', 'US 2-Year Treasury'), bond('US5Y', 'US 5-Year Treasury'),
  bond('US30Y', 'US 30-Year Bond'),
  bond('BUND', 'German 10Y Bund', 'EUR'), bond('BOBL', 'German 5Y Bobl', 'EUR'), bond('SCHATZ', 'German 2Y Schatz', 'EUR'),
  bond('GILT', 'UK 10Y Gilt', 'GBP'), bond('BTP', 'Italian 10Y BTP', 'EUR'), bond('JGB', 'Japan 10Y Bond', 'JPY'),
];

// ═══ ETFs (20) ═══
const ETFS = [
  etf('SPY', 'SPDR S&P 500'), etf('QQQ', 'Invesco Nasdaq 100'), etf('IWM', 'iShares Russell 2000'),
  etf('DIA', 'SPDR Dow Jones'), etf('GLD', 'SPDR Gold Trust'), etf('SLV', 'iShares Silver Trust'),
  etf('USO', 'US Oil Fund'), etf('TLT', 'iShares 20Y Treasury'), etf('EEM', 'iShares Emerging Markets'),
  etf('EFA', 'iShares EAFE'), etf('XLF', 'Financial SPDR'), etf('XLE', 'Energy SPDR'),
  etf('XLK', 'Technology SPDR'), etf('XLV', 'Healthcare SPDR'), etf('ARKK', 'ARK Innovation'),
  etf('VXX', 'VIX Short-Term'), etf('HYG', 'iShares High Yield'), etf('FXI', 'iShares China'),
  etf('KWEB', 'KraneShares China Internet'), etf('LQD', 'iShares Investment Grade'),
];

// ═══ CATEGORIES ═══
export const CATEGORIES = {
  'forex-majors': { label: 'Majors', color: '#4FC3F7', instruments: FOREX_MAJORS },
  'forex-crosses': { label: 'Crosses', color: '#26C6DA', instruments: FOREX_CROSSES },
  'forex-exotics': { label: 'Exotics', color: '#00BCD4', instruments: FOREX_EXOTICS },
  'indices': { label: 'Indices', color: '#FFB300', instruments: INDICES },
  'metals': { label: 'Metals', color: '#FFD700', instruments: METALS },
  'energy': { label: 'Energy', color: '#FF9800', instruments: ENERGY },
  'crypto': { label: 'Crypto', color: '#CE93D8', instruments: CRYPTO },
  'stocks': { label: 'Stocks', color: '#00E676', instruments: STOCKS },
  'agriculture': { label: 'Agriculture', color: '#8BC34A', instruments: AGRICULTURE },
  'bonds': { label: 'Bonds', color: '#90CAF9', instruments: BONDS },
  'etfs': { label: 'ETFs', color: '#80CBC4', instruments: ETFS },
};

export const ALL_INSTRUMENTS = Object.values(CATEGORIES).flatMap(c => c.instruments);

export const CUSTOM_INSTRUMENT = {
  symbol: 'CUSTOM', label: 'Custom Instrument', contractSize: 100000,
  pipSize: 0.0001, baseCurrency: 'XXX', quoteCurrency: 'USD',
};

export default { CATEGORIES, ALL_INSTRUMENTS, CUSTOM_INSTRUMENT };
