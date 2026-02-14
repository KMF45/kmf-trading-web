/**
 * formatters.js — KMF Trading Journal
 * Smart price formatting matching Android formatPrice() helper
 */

/**
 * Smart price formatting — matches Android TradeCard formatPrice()
 * Keeps significant decimals, removes trailing zeros
 */
export const formatPrice = (price) => {
  if (price == null || price === undefined) return '—';
  const str = price.toString();
  if (str.endsWith('.0')) return str;
  // Remove trailing zeros but keep at least one decimal
  const trimmed = str.replace(/(\.\d*?)0+$/, '$1');
  return trimmed.endsWith('.') ? trimmed + '0' : trimmed;
};

/** Format P/L with sign and currency */
export const formatPnL = (amount, currency = 'USD') => {
  if (amount == null) return '—';
  const sign = amount >= 0 ? '+' : '';
  return `${sign}${amount.toFixed(2)} ${currency}`;
};

/** Format date as "dd MMM yyyy" */
export const formatDate = (timestamp) => {
  if (!timestamp) return '—';
  const d = new Date(timestamp);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

/** Format time as "HH:mm" */
export const formatTime = (timestamp) => {
  if (!timestamp) return '—';
  const d = new Date(timestamp);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
};

/** Format date and time combined */
export const formatDateTime = (timestamp) => {
  return `${formatDate(timestamp)}, ${formatTime(timestamp)}`;
};

/** Format number with commas */
export const formatNumber = (num, decimals = 2) => {
  if (num == null) return '—';
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/** Format percentage */
export const formatPercent = (value, decimals = 1) => {
  if (value == null) return '—';
  return `${Number(value).toFixed(decimals)}%`;
};

/** Get week number from date — matches Android getWeekNumber() */
export const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

/** Get start/end dates for a week number */
export const getWeekRange = (weekNum, year) => {
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7;
  const firstMonday = new Date(jan4);
  firstMonday.setDate(jan4.getDate() - dayOfWeek + 1);
  const start = new Date(firstMonday);
  start.setDate(firstMonday.getDate() + (weekNum - 1) * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
};

export default {
  formatPrice, formatPnL, formatDate, formatTime, formatDateTime,
  formatNumber, formatPercent, getWeekNumber, getWeekRange,
};
