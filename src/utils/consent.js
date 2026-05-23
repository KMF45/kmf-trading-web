// Lightweight consent management for analytics cookies.
// Stores state in localStorage; loads gtag only after explicit user consent.

export const CONSENT_KEY = 'kmf_consent_v1';
export const CONSENT_VERSION = 1;
const GA_ID = 'G-CTE9Y21S1L';

// Returns: { status: 'accepted' | 'rejected' | null, version: number, ts: number } | null
export function getConsent() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null; // outdated → re-ask
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(status) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ status, version: CONSENT_VERSION, ts: Date.now() })
    );
  } catch {}
  if (status === 'accepted') loadAnalytics();
  else removeAnalytics();
}

// Auto-reject if browser sends Do Not Track signal.
export function dntEnabled() {
  if (typeof navigator === 'undefined') return false;
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}

let analyticsLoaded = false;

export function loadAnalytics() {
  if (typeof window === 'undefined' || analyticsLoaded) return;
  analyticsLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.id = 'kmf-gtag-script';
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
}

// If user later switches from accepted to rejected, clear GA cookies + remove script.
export function removeAnalytics() {
  if (typeof document === 'undefined') return;
  document.getElementById('kmf-gtag-script')?.remove();
  // Clear all _ga* cookies on current domain + parent domain
  const hosts = [location.hostname, '.' + location.hostname];
  if (location.hostname.split('.').length > 2) {
    const parent = location.hostname.split('.').slice(-2).join('.');
    hosts.push('.' + parent);
  }
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name.startsWith('_ga')) {
      hosts.forEach((h) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${h}`;
      });
    }
  });
  analyticsLoaded = false;
}

// Boot: on every page load, replay consent decision.
export function initConsent() {
  if (typeof window === 'undefined') return;
  if (dntEnabled()) return; // Honor DNT — no analytics, no banner needed
  const c = getConsent();
  if (c?.status === 'accepted') loadAnalytics();
}
