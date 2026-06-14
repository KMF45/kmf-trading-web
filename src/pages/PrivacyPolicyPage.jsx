import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const META = {
  en: {
    title: 'Privacy Policy — K.M.F. Trading Journal',
    desc: 'Privacy Policy for K.M.F. Trading Journal — covers the kmfjournal.com website and the Android app. GDPR-compliant. Cookie usage and third-party services explained in plain language.',
  },
  ro: {
    title: 'Politică de Confidențialitate — K.M.F. Trading Journal',
    desc: 'Politica de Confidențialitate pentru K.M.F. Trading Journal — acoperă site-ul kmfjournal.com și aplicația de Android. Conformă GDPR. Folosirea cookie-urilor și serviciile terțe explicate în limbaj simplu.',
  },
  de: {
    title: 'Datenschutzerklärung — K.M.F. Trading Journal',
    desc: 'Datenschutzerklärung für K.M.F. Trading Journal — gilt für die Website kmfjournal.com und die Android-App. DSGVO-konform. Cookie-Nutzung und Drittanbieter-Dienste in einfacher Sprache erklärt.',
  },
  fr: {
    title: 'Politique de confidentialité — K.M.F. Trading Journal',
    desc: 'Politique de confidentialité de K.M.F. Trading Journal — couvre le site kmfjournal.com et l\'application Android. Conforme au RGPD. Utilisation des cookies et services tiers expliqués en langage clair.',
  },
  ru: {
    title: 'Политика конфиденциальности — K.M.F. Trading Journal',
    desc: 'Политика конфиденциальности K.M.F. Trading Journal — охватывает сайт kmfjournal.com и приложение для Android. Соответствует GDPR. Использование cookie и сторонние сервисы объяснены простым языком.',
  },
};

const PrivacyPolicyPage = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    const m = META[lang] || META.en;
    document.title = m.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', m.desc);
  }, [lang]);

  if (lang === 'ro') return <PrivacyPolicyRo />;
  if (lang === 'de') return <PrivacyPolicyDe />;
  if (lang === 'fr') return <PrivacyPolicyFr />;
  if (lang === 'ru') return <PrivacyPolicyRu />;

  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Website &amp; Mobile App</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Last updated: May 26, 2026</p>
        </div>

        <h2 style={styles.h2}>1. Introduction &amp; Scope</h2>
        <p style={styles.text}>The K.M.F. Trading Journal is developed and operated by <strong style={styles.strong}>Ionel Aanei</strong>, an individual developer (sole trader) based in Romania ("we", "us", or "our"). This Privacy Policy covers:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> The website at <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> (the "Website").</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> The K.M.F. Trading Journal mobile application on Google Play (the "App").</li>
        </ul>
        <p style={styles.text}>This Privacy Policy covers BOTH the Website and the App. Each section indicates which it applies to. By using either, you agree to the collection and use of information described below.</p>

        <h2 style={styles.h2}>2. Contact &amp; Controller</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Data Controller:</strong> Ionel Aanei (individual developer)<br />
          <strong style={styles.strong}>Email:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Location:</strong> Romania (European Union)
        </p>

        <h2 style={styles.h2}>3. Information Collected on the Website <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 No Direct Personal Data</h3>
        <p style={styles.text}>The Website has no signup form, no contact form, no newsletter, and no payment processing. We do not collect your name, email, password, address, or any personal identifiers through the Website itself.</p>

        <h3 style={styles.h3}>3.2 Analytics (with your consent only)</h3>
        <p style={styles.text}>If you click <strong style={styles.strong}>"Accept"</strong> on the cookie consent banner, we load Google Analytics 4 (GA4) to collect anonymous usage statistics:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Pages viewed and time on page</li>
          <li style={styles.li}>Browser type, OS, device category</li>
          <li style={styles.li}>Approximate location (country/region only — IP is anonymized via <code style={styles.code}>anonymize_ip</code>)</li>
          <li style={styles.li}>Referring source (which site brought you here)</li>
          <li style={styles.li}>Events: button clicks, calculator usage, language switches</li>
        </ul>
        <p style={styles.text}>If you click <strong style={styles.strong}>"Reject"</strong> or your browser sends a Do Not Track signal, GA4 is <strong style={styles.strong}>not loaded</strong> and no analytics cookies are set.</p>

        <h3 style={styles.h3}>3.3 Cookies Set by the Website</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Cookie</th>
                <th style={styles.th}>Purpose</th>
                <th style={styles.th}>Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>_ga</code></td><td style={styles.td}>Google Analytics 4 user identifier</td><td style={styles.td}>2 years</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>_ga_CTE9Y21S1L</code></td><td style={styles.td}>GA4 session state</td><td style={styles.td}>2 years</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Both cookies are set only after you click Accept. You can change your choice anytime via the <strong style={styles.strong}>"Cookie Preferences"</strong> link in the Website footer.</p>

        <h3 style={styles.h3}>3.4 Local Storage in Your Browser</h3>
        <p style={styles.text}>The Website stores a small amount of data in your browser's localStorage to preserve your settings between visits. This data <strong style={styles.strong}>never leaves your device</strong> and is not accessible to us:</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Key</th>
                <th style={styles.th}>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>kmf-lang</code></td><td style={styles.td}>Your selected interface language</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_consent_v1</code></td><td style={styles.td}>Your cookie consent decision</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_exchange_rates</code></td><td style={styles.td}>Cached USD exchange rates for the Lot Size Calculator (refreshed hourly)</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_v1</code></td><td style={styles.td}>Your custom Pre-Trade Checklist content</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_started</code></td><td style={styles.td}>Flag tracking whether you've started a checklist</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_fav_symbols</code></td><td style={styles.td}>Your favorite trading symbols in the Lot Size Calculator</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>You can clear this data anytime via your browser's "Clear site data" option.</p>

        <h2 style={styles.h2}>4. Third-Party Services Used by the Website <span style={styles.pillWeb}>WEB</span></h2>
        <p style={styles.text}>The Website loads resources or data from the following third parties. Each may receive your IP address as part of the standard HTTP request:</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Service</th>
                <th style={styles.th}>Purpose</th>
                <th style={styles.th}>Privacy Policy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Google Analytics 4 (Google LLC)</td>
                <td style={styles.td}>Anonymized analytics (after consent)</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
              <tr>
                <td style={styles.td}>SaasHunt (saashunt.best)</td>
                <td style={styles.td}>"Top 1 Daily Winner" badge image in footer</td>
                <td style={styles.td}>—</td>
              </tr>
              <tr>
                <td style={styles.td}>Product Hunt (producthunt.com)</td>
                <td style={styles.td}>"Featured" badge image in footer</td>
                <td style={styles.td}><a style={styles.link} href="https://www.producthunt.com/legal/privacy" target="_blank" rel="noopener noreferrer">PH</a></td>
              </tr>
              <tr>
                <td style={styles.td}>ExchangeRate-API (open.er-api.com)</td>
                <td style={styles.td}>USD exchange rates for the Lot Size Calculator</td>
                <td style={styles.td}><a style={styles.link} href="https://www.exchangerate-api.com/privacy-policy" target="_blank" rel="noopener noreferrer">ER-API</a></td>
              </tr>
              <tr>
                <td style={styles.td}>Google Play (play.google.com)</td>
                <td style={styles.td}>"Download on Google Play" link target and badge</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>The Website does <strong style={styles.strong}>NOT</strong> use: Facebook Pixel, advertising networks, retargeting pixels, social plugin scripts, Hotjar, Sentry, PostHog, or similar trackers.</p>

        <h2 style={styles.h2}>5. Information Collected by the Mobile App <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>The mobile app collects more data than the website because it is account-based. The following applies only after you create an account and log in.</p>

        <h3 style={styles.h3}>5.1 Personal Information</h3>
        <p style={styles.text}>When you create an account, the App collects:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Email address (required for authentication)</li>
          <li style={styles.li}>Password (hashed by Firebase Authentication — never stored in plain text)</li>
        </ul>
        <p style={styles.text}>To manage your account and email communications, we also store: your selected app language, your signup date, flags and timestamps tracking which emails have been sent to you, your unsubscribe status, and a unique unsubscribe token used to securely process one-click opt-out links.</p>

        <p style={styles.text}><strong style={styles.strong}>The App does NOT collect:</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Your name (unless you voluntarily provide it)</li>
          <li style={styles.li}>Physical address</li>
          <li style={styles.li}>Phone number</li>
          <li style={styles.li}>Payment information (handled by Google Play)</li>
          <li style={styles.li}>Personal photos (only trade-related screenshots you upload)</li>
        </ul>

        <h3 style={styles.h3}>5.2 Trading Data</h3>
        <p style={styles.text}>To provide App functionality, the App stores:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Trade details (instrument, entry price, exit price, lot size, profit/loss)</li>
          <li style={styles.li}>Trade notes, ratings, and pre/post-trade emotion ratings</li>
          <li style={styles.li}>Pre-trade checklist responses</li>
          <li style={styles.li}>Weekly review responses</li>
          <li style={styles.li}>Photos/screenshots you attach to trades</li>
          <li style={styles.li}>Account balance information (user-entered)</li>
          <li style={styles.li}>Timestamps for all activities</li>
        </ul>

        <h3 style={styles.h3}>5.3 Technical and Usage Data</h3>
        <p style={styles.text}>The App automatically collects via Firebase Analytics and Crashlytics:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Device model and operating system version</li>
          <li style={styles.li}>App version</li>
          <li style={styles.li}>IP address (temporary, for authentication purposes)</li>
          <li style={styles.li}>Crash logs and error reports</li>
          <li style={styles.li}>Usage analytics (screens viewed, features used, session duration)</li>
          <li style={styles.li}>Unique device identifiers</li>
        </ul>

        <h2 style={styles.h2}>6. Automated Decision-Making &amp; Profiling <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>The App uses automated analysis on data you provide to generate insights for your own use. None of these decisions have legal or significant effects on you — they are advisory only.</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Trader Personality Profile:</strong> Classifies your behavior into archetypes (Sniper, Robot, Momentum Rider, Wave Rider, Gambler, Revenge Trader) based on trade patterns. Computed locally and stored with your account.</li>
          <li style={styles.li}><strong style={styles.strong}>Tilt Detection:</strong> A 4-level warning system that flags potential emotional trading based on recent loss patterns and self-reported emotions. Triggers in-app warnings; you remain in full control of every trade.</li>
          <li style={styles.li}><strong style={styles.strong}>Honesty Mirror:</strong> Correlates your self-reported trade quality ratings with actual P/L to identify systematic over- or under-confidence.</li>
        </ul>
        <p style={styles.text}>Under GDPR Article 22, you have the right to request human review of any automated decision.</p>

        <h2 style={styles.h2}>7. Legal Basis for Processing (GDPR Article 6)</h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Data</th>
                <th style={styles.th}>Scope</th>
                <th style={styles.th}>Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>Account email &amp; password</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Contract performance — Art. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>Trading data &amp; notes</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Contract performance — Art. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>App analytics &amp; crash reports</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Legitimate interest — Art. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>Email communications (welcome + 7-day follow-up)</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Legitimate interest — Art. 6(1)(f), with one-click opt-out</td></tr>
              <tr><td style={styles.td}>Website analytics (GA4)</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Consent — Art. 6(1)(a)</td></tr>
              <tr><td style={styles.td}>Website third-party badges/APIs</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Legitimate interest — Art. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>localStorage settings</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Legitimate interest</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style={styles.h2}>8. How We Use Your Information</h2>

        <h3 style={styles.h3}>8.1 To Provide Functionality <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Authenticate your account</li>
          <li style={styles.li}>Store and sync your trading data across devices</li>
          <li style={styles.li}>Calculate trading statistics and performance metrics</li>
          <li style={styles.li}>Generate PDF reports</li>
          <li style={styles.li}>Display your trading history and analytics</li>
        </ul>

        <h3 style={styles.h3}>8.2 To Improve the Service <span style={styles.pillWeb}>WEB</span> <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Analyze usage patterns to improve features</li>
          <li style={styles.li}>Identify and fix bugs and crashes</li>
          <li style={styles.li}>Optimize performance</li>
        </ul>

        <h3 style={styles.h3}>8.3 To Communicate With You</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Respond to your support requests</li>
          <li style={styles.li}>Send important updates about the App (if necessary)</li>
          <li style={styles.li}>Notify you about policy changes</li>
        </ul>

        <p style={styles.text}><strong style={styles.strong}>We do NOT use your data for:</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Third-party advertising networks or ad targeting</li>
          <li style={styles.li}>Selling or renting your data to third parties</li>
          <li style={styles.li}>Unrelated commercial purposes</li>
          <li style={styles.li}>Cross-site or cross-device tracking beyond what you explicitly consent to</li>
        </ul>

        <h3 style={styles.h3}>8.4 Email Communications <span style={styles.pillApp}>APP</span></h3>
        <p style={styles.text}>When you create an account in the App, we may send the following emails to your registered address:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Transactional emails</strong> — a welcome email when your account is created, plus service-critical messages (e.g. email verification, password reset, important policy changes). These are necessary to operate your account and cannot be opted out of while your account is active.</li>
          <li style={styles.li}><strong style={styles.strong}>One product follow-up email</strong> — approximately 7 days after signup, inviting you to leave a review or share feedback. This is the only promotional email we send.</li>
        </ul>
        <p style={styles.text}>Every promotional email includes a <strong style={styles.strong}>one-click unsubscribe link</strong> (<a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>). Unsubscribing stops promotional emails only — it does not affect transactional or security emails, and does not delete your account.</p>

        <h2 style={styles.h2}>9. App Third-Party Services <span style={styles.pillApp}>APP</span></h2>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <strong style={styles.strong}>Google Firebase (Google LLC)</strong> — Authentication, cloud database (Firestore), file storage, analytics, crash reporting. Privacy: <a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
          </li>
          <li style={styles.li}>
            <strong style={styles.strong}>Twelve Data (Twelve Data Inc.)</strong> — Real-time market prices and exchange rates inside the App. Data shared: trading symbols requested, IP address. No personal or trading data is shared. Privacy: <a style={styles.link} href="https://twelvedata.com/privacy-policy" target="_blank" rel="noopener noreferrer">twelvedata.com/privacy-policy</a>
          </li>
        </ul>
        <p style={styles.text}>We may also disclose information if required by law or in response to valid requests by public authorities.</p>

        <h2 style={styles.h2}>10. Data Storage, Retention &amp; Security</h2>

        <h3 style={styles.h3}>10.1 Storage Location</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Account data, trading data, and App analytics are stored on Google Cloud servers in the European Union (eur3 region), under GDPR-compliant standards.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Website analytics data (if you consent) is processed by Google Analytics, which may transfer data to Google servers in the United States under the EU–US Data Privacy Framework. localStorage data stays entirely on your device.</p>

        <h3 style={styles.h3}>10.2 Retention Periods</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Data</th>
                <th style={styles.th}>Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>App account &amp; trading data</td><td style={styles.td}>Until you delete your account</td></tr>
              <tr><td style={styles.td}>App crash logs (Crashlytics)</td><td style={styles.td}>90 days, then aggregated and anonymized</td></tr>
              <tr><td style={styles.td}>App analytics events</td><td style={styles.td}>14 months (Firebase default)</td></tr>
              <tr><td style={styles.td}>GA4 user-level data</td><td style={styles.td}>14 months</td></tr>
              <tr><td style={styles.td}>GA4 cookies in your browser</td><td style={styles.td}>2 years (or until you reject/clear)</td></tr>
              <tr><td style={styles.td}>localStorage entries</td><td style={styles.td}>Until you clear browser data or change settings</td></tr>
              <tr><td style={styles.td}>Backup snapshots</td><td style={styles.td}>Up to 30 days after deletion</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={styles.h3}>10.3 Security Measures</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Encryption in transit (HTTPS/TLS)</li>
          <li style={styles.li}>Encryption at rest (Firebase Firestore encrypted by default)</li>
          <li style={styles.li}>Secure authentication (Firebase Authentication)</li>
          <li style={styles.li}>Password hashing (your password is never stored in plain text)</li>
          <li style={styles.li}>Regular security updates</li>
        </ul>
        <p style={styles.text}>However, no method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>

        <h2 style={styles.h2}>11. Your Data Rights Under GDPR</h2>

        <h3 style={styles.h3}>11.1 Right to Access</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> You can access all your data through the App at any time. <span style={styles.pillWeb}>WEB</span> For Website data, contact us — we hold very little (primarily anonymized analytics if you consented).</p>

        <h3 style={styles.h3}>11.2 Right to Rectification</h3>
        <p style={styles.text}>You can edit or correct your trading data, notes, and settings within the App.</p>

        <h3 style={styles.h3}>11.3 Right to Deletion ("Right to be Forgotten")</h3>
        <p style={styles.text}>You can request deletion of your account and all associated data by:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Using the "Delete Account" feature in the App Settings</li>
          <li style={styles.li}>Contacting us at <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a></li>
        </ul>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> For Website cookies/analytics, click "Reject" in the cookie banner or use "Cookie Preferences" in the footer.</p>

        <h3 style={styles.h3}>11.4 Right to Data Portability</h3>
        <p style={styles.text}>You can export your trading data via the built-in export feature (PDF, and CSV/JSON for Premium users).</p>

        <h3 style={styles.h3}>11.5 Right to Object</h3>
        <p style={styles.text}>You can object to processing for analytics or legitimate-interest-based processing by rejecting cookies (Web) or by discontinuing use and deleting your account (App).</p>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> You can also unsubscribe from our product follow-up email at any time using the one-click link in that email or at <a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>. This stops promotional emails without deleting your account or affecting transactional/security emails.</p>

        <h3 style={styles.h3}>11.6 Right to Withdraw Consent</h3>
        <p style={styles.text}>You can withdraw consent at any time. For Website analytics, use "Cookie Preferences" in the footer. For App data, delete your account.</p>

        <h3 style={styles.h3}>11.7 Right to Lodge a Complaint with a Supervisory Authority</h3>
        <p style={styles.text}>If you believe your data rights have been violated, you have the right to file a complaint with a Data Protection Authority. In Romania, this is:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong><br />
          <a style={styles.link} href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>
        </p>
        <p style={styles.text}>If you reside in another EU member state, you may file with your local DPA.</p>
        <p style={styles.text}>To exercise any of these rights, contact us at <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>. We will respond within 30 days.</p>

        <h2 style={styles.h2}>12. Children's Privacy and Age Requirement</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> The App is intended for users aged 18 and older. We do not knowingly collect information from individuals under 18.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> The Website is publicly accessible (no signup) and does not knowingly collect personal data from anyone, including minors. We recommend parental supervision for children browsing financial content.</p>
        <p style={styles.text}>If you are a parent or guardian and believe your child has provided us with personal information, please contact us and we will delete such information.</p>

        <h2 style={styles.h2}>13. International Data Transfers</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> App data is stored in the EU (eur3 region). Where Google Firebase routes traffic outside the EU, standard contractual clauses apply.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Google Analytics may transfer Website analytics data to the US under the EU–US Data Privacy Framework, which the European Commission has deemed to provide an adequate level of protection.</p>

        <h2 style={styles.h2}>14. Changes to This Privacy Policy</h2>
        <p style={styles.text}>We may update this Privacy Policy from time to time. We will post the new version at <a style={styles.link} href="https://kmfjournal.com/privacy-policy">kmfjournal.com/privacy-policy</a> and inside the App, and update the "Last updated" date.</p>
        <p style={styles.text}>For material changes affecting how we process your data, we will provide prominent notice. Your continued use after changes are posted constitutes acceptance.</p>

        <h2 style={styles.h2}>15. Contact Us</h2>
        <p style={styles.text}>For questions about this Privacy Policy or to exercise your data rights:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Email:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Controller:</strong> Ionel Aanei (individual developer)<br />
          <strong style={styles.strong}>Location:</strong> Romania (European Union)
        </p>
        <p style={styles.text}>We will respond within 30 days.</p>
      </div>
    </div>
  );
};

function PrivacyPolicyRo() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Politică de Confidențialitate</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Site &amp; Aplicație mobilă</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Ultima actualizare: 26 mai 2026</p>
        </div>

        <h2 style={styles.h2}>1. Introducere și Domeniu de Aplicare</h2>
        <p style={styles.text}>K.M.F. Trading Journal este dezvoltat și operat de <strong style={styles.strong}>Ionel Aanei</strong>, dezvoltator individual (persoană fizică) din România („noi" sau „al nostru"). Această Politică de Confidențialitate acoperă:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Site-ul de la <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> („Site-ul").</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> Aplicația mobilă K.M.F. Trading Journal din Google Play („Aplicația").</li>
        </ul>
        <p style={styles.text}>Această politică acoperă ATÂT Site-ul, cât și Aplicația. Fiecare secțiune arată la care se aplică. Folosind oricare dintre ele, ești de acord cu colectarea și folosirea informațiilor descrise mai jos.</p>

        <h2 style={styles.h2}>2. Contact și Operator de Date</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Operator de date:</strong> Ionel Aanei (dezvoltator individual)<br />
          <strong style={styles.strong}>Email:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Locație:</strong> România (Uniunea Europeană)
        </p>

        <h2 style={styles.h2}>3. Informații Colectate pe Site <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 Fără Date Personale Directe</h3>
        <p style={styles.text}>Site-ul nu are formular de înregistrare, formular de contact, newsletter sau procesare de plăți. Nu colectăm numele, email-ul, parola, adresa sau vreun identificator personal prin Site-ul în sine.</p>

        <h3 style={styles.h3}>3.2 Analiză (doar cu consimțământul tău)</h3>
        <p style={styles.text}>Dacă apeși <strong style={styles.strong}>„Accept"</strong> pe banner-ul de consimțământ pentru cookie-uri, încărcăm Google Analytics 4 (GA4) ca să colectăm statistici anonime de folosire:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Paginile vizitate și timpul petrecut pe pagină</li>
          <li style={styles.li}>Tipul de browser, sistemul de operare, categoria de dispozitiv</li>
          <li style={styles.li}>Locația aproximativă (doar țară/regiune — IP-ul e anonimizat prin <code style={styles.code}>anonymize_ip</code>)</li>
          <li style={styles.li}>Sursa de referință (ce site te-a adus aici)</li>
          <li style={styles.li}>Evenimente: click-uri pe butoane, folosirea calculatoarelor, schimbarea limbii</li>
        </ul>
        <p style={styles.text}>Dacă apeși <strong style={styles.strong}>„Refuz"</strong> sau browserul tău trimite un semnal Do Not Track, GA4 <strong style={styles.strong}>nu este încărcat</strong> și niciun cookie de analiză nu este setat.</p>

        <h3 style={styles.h3}>3.3 Cookie-uri Setate de Site</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Cookie</th>
                <th style={styles.th}>Scop</th>
                <th style={styles.th}>Păstrare</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>_ga</code></td><td style={styles.td}>Identificator de utilizator Google Analytics 4</td><td style={styles.td}>2 ani</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>_ga_CTE9Y21S1L</code></td><td style={styles.td}>Starea sesiunii GA4</td><td style={styles.td}>2 ani</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Ambele cookie-uri sunt setate doar după ce apeși Accept. Îți poți schimba alegerea oricând prin linkul <strong style={styles.strong}>„Cookie Preferences"</strong> din subsolul Site-ului.</p>

        <h3 style={styles.h3}>3.4 Stocare Locală în Browserul Tău</h3>
        <p style={styles.text}>Site-ul stochează o cantitate mică de date în localStorage-ul browserului tău ca să-ți păstreze setările între vizite. Aceste date <strong style={styles.strong}>nu părăsesc niciodată dispozitivul tău</strong> și nu ne sunt accesibile:</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Cheie</th>
                <th style={styles.th}>Scop</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>kmf-lang</code></td><td style={styles.td}>Limba de interfață aleasă de tine</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_consent_v1</code></td><td style={styles.td}>Decizia ta privind consimțământul pentru cookie-uri</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_exchange_rates</code></td><td style={styles.td}>Cursuri USD salvate pentru Lot Size Calculator (reîmprospătate orar)</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_v1</code></td><td style={styles.td}>Conținutul tău personalizat din Pre-Trade Checklist</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_started</code></td><td style={styles.td}>Marcaj care reține dacă ai început un checklist</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_fav_symbols</code></td><td style={styles.td}>Simbolurile tale de trading favorite din Lot Size Calculator</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Poți șterge aceste date oricând prin opțiunea „Șterge datele site-ului" din browserul tău.</p>

        <h2 style={styles.h2}>4. Servicii Terțe Folosite de Site <span style={styles.pillWeb}>WEB</span></h2>
        <p style={styles.text}>Site-ul încarcă resurse sau date de la următorii terți. Fiecare poate primi adresa ta IP ca parte a cererii HTTP standard:</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Serviciu</th>
                <th style={styles.th}>Scop</th>
                <th style={styles.th}>Politică de Confidențialitate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Google Analytics 4 (Google LLC)</td>
                <td style={styles.td}>Analiză anonimizată (după consimțământ)</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
              <tr>
                <td style={styles.td}>SaasHunt (saashunt.best)</td>
                <td style={styles.td}>Imaginea badge „Top 1 Daily Winner" din subsol</td>
                <td style={styles.td}>—</td>
              </tr>
              <tr>
                <td style={styles.td}>Product Hunt (producthunt.com)</td>
                <td style={styles.td}>Imaginea badge „Featured" din subsol</td>
                <td style={styles.td}><a style={styles.link} href="https://www.producthunt.com/legal/privacy" target="_blank" rel="noopener noreferrer">PH</a></td>
              </tr>
              <tr>
                <td style={styles.td}>ExchangeRate-API (open.er-api.com)</td>
                <td style={styles.td}>Cursuri USD pentru Lot Size Calculator</td>
                <td style={styles.td}><a style={styles.link} href="https://www.exchangerate-api.com/privacy-policy" target="_blank" rel="noopener noreferrer">ER-API</a></td>
              </tr>
              <tr>
                <td style={styles.td}>Google Play (play.google.com)</td>
                <td style={styles.td}>Ținta linkului „Download on Google Play" și badge-ul</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Site-ul <strong style={styles.strong}>NU</strong> folosește: Facebook Pixel, rețele de publicitate, pixeli de retargeting, scripturi de social plugin, Hotjar, Sentry, PostHog sau trackere similare.</p>

        <h2 style={styles.h2}>5. Informații Colectate de Aplicația Mobilă <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>Aplicația mobilă colectează mai multe date decât Site-ul fiindcă funcționează pe bază de cont. Următoarele se aplică doar după ce îți creezi un cont și te loghezi.</p>

        <h3 style={styles.h3}>5.1 Informații Personale</h3>
        <p style={styles.text}>Când îți creezi un cont, Aplicația colectează:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Adresa de email (necesară pentru autentificare)</li>
          <li style={styles.li}>Parola (criptată de Firebase Authentication — niciodată stocată în text simplu)</li>
        </ul>
        <p style={styles.text}>Ca să-ți gestionăm contul și comunicările prin email, mai stocăm: limba aleasă în aplicație, data înregistrării, marcaje și momente care urmăresc ce email-uri ți-au fost trimise, statusul de dezabonare și un token unic de dezabonare folosit ca să procesăm în siguranță linkurile de dezabonare cu un click.</p>

        <p style={styles.text}><strong style={styles.strong}>Aplicația NU colectează:</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Numele tău (decât dacă îl oferi voluntar)</li>
          <li style={styles.li}>Adresa fizică</li>
          <li style={styles.li}>Numărul de telefon</li>
          <li style={styles.li}>Informații de plată (gestionate de Google Play)</li>
          <li style={styles.li}>Poze personale (doar capturile legate de trade-uri pe care le încarci)</li>
        </ul>

        <h3 style={styles.h3}>5.2 Date de Trading</h3>
        <p style={styles.text}>Ca să ofere funcționalitatea Aplicației, aceasta stochează:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Detalii despre trade-uri (instrument, entry price, exit price, lot size, profit/loss)</li>
          <li style={styles.li}>Notițe la trade-uri, rating-uri și evaluări emoționale pre/post-trade</li>
          <li style={styles.li}>Răspunsurile din pre-trade checklist</li>
          <li style={styles.li}>Răspunsurile din review-ul săptămânal</li>
          <li style={styles.li}>Pozele/capturile pe care le atașezi la trade-uri</li>
          <li style={styles.li}>Informații despre soldul contului (introduse de tine)</li>
          <li style={styles.li}>Momente de timp pentru toate activitățile</li>
        </ul>

        <h3 style={styles.h3}>5.3 Date Tehnice și de Folosire</h3>
        <p style={styles.text}>Aplicația colectează automat prin Firebase Analytics și Crashlytics:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Modelul dispozitivului și versiunea sistemului de operare</li>
          <li style={styles.li}>Versiunea aplicației</li>
          <li style={styles.li}>Adresa IP (temporar, pentru autentificare)</li>
          <li style={styles.li}>Logurile de crash și rapoartele de eroare</li>
          <li style={styles.li}>Analiză de folosire (ecrane vizitate, funcții folosite, durata sesiunii)</li>
          <li style={styles.li}>Identificatori unici de dispozitiv</li>
        </ul>

        <h2 style={styles.h2}>6. Decizii Automate și Profilare <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>Aplicația folosește analiză automată pe datele pe care le oferi ca să genereze concluzii pentru uzul tău. Niciuna dintre aceste decizii nu are efecte legale sau semnificative asupra ta — sunt doar orientative.</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Trader Personality Profile:</strong> Îți clasifică comportamentul în arhetipuri (Sniper, Robot, Momentum Rider, Wave Rider, Gambler, Revenge Trader) pe baza pattern-urilor din trade-uri. Calculat local și stocat cu contul tău.</li>
          <li style={styles.li}><strong style={styles.strong}>Tilt Detection:</strong> Un sistem de avertizare pe 4 niveluri care semnalează posibilul trading emoțional pe baza pierderilor recente și a emoțiilor raportate de tine. Declanșează avertismente în aplicație; tu rămâi în control total asupra fiecărui trade.</li>
          <li style={styles.li}><strong style={styles.strong}>Honesty Mirror:</strong> Corelează rating-urile pe care le dai calității trade-urilor cu profit/loss-ul real ca să identifice supraîncrederea sau subîncrederea sistematică.</li>
        </ul>
        <p style={styles.text}>Conform Articolului 22 din GDPR, ai dreptul să ceri o evaluare umană a oricărei decizii automate.</p>

        <h2 style={styles.h2}>7. Temei Legal pentru Prelucrare (GDPR Articolul 6)</h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Aplicabilitate</th>
                <th style={styles.th}>Temei Legal</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>Email-ul și parola contului</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Executarea contractului — Art. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>Datele de trading și notițele</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Executarea contractului — Art. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>Analiza și rapoartele de crash din aplicație</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Interes legitim — Art. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>Comunicări prin email (welcome + follow-up la 7 zile)</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Interes legitim — Art. 6(1)(f), cu dezabonare cu un click</td></tr>
              <tr><td style={styles.td}>Analiza Site-ului (GA4)</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Consimțământ — Art. 6(1)(a)</td></tr>
              <tr><td style={styles.td}>Badge-uri/API-uri terțe pe Site</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Interes legitim — Art. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>Setări în localStorage</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Interes legitim</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style={styles.h2}>8. Cum Folosim Informațiile Tale</h2>

        <h3 style={styles.h3}>8.1 Ca Să Oferim Funcționalitatea <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Să-ți autentificăm contul</li>
          <li style={styles.li}>Să stocăm și să sincronizăm datele tale de trading între dispozitive</li>
          <li style={styles.li}>Să calculăm statistici de trading și indicatori de performanță</li>
          <li style={styles.li}>Să generăm rapoarte PDF</li>
          <li style={styles.li}>Să-ți afișăm istoricul de trading și analiza</li>
        </ul>

        <h3 style={styles.h3}>8.2 Ca Să Îmbunătățim Serviciul <span style={styles.pillWeb}>WEB</span> <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Să analizăm tiparele de folosire ca să îmbunătățim funcțiile</li>
          <li style={styles.li}>Să identificăm și să reparăm bug-uri și crash-uri</li>
          <li style={styles.li}>Să optimizăm performanța</li>
        </ul>

        <h3 style={styles.h3}>8.3 Ca Să Comunicăm cu Tine</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Să răspundem la cererile tale de suport</li>
          <li style={styles.li}>Să trimitem actualizări importante despre Aplicație (dacă e nevoie)</li>
          <li style={styles.li}>Să te anunțăm despre schimbări de politică</li>
        </ul>

        <p style={styles.text}><strong style={styles.strong}>NU folosim datele tale pentru:</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Rețele de publicitate terțe sau targetare de reclame</li>
          <li style={styles.li}>Vânzarea sau închirierea datelor tale către terți</li>
          <li style={styles.li}>Scopuri comerciale fără legătură</li>
          <li style={styles.li}>Urmărire între site-uri sau între dispozitive dincolo de ce accepți explicit</li>
        </ul>

        <h3 style={styles.h3}>8.4 Comunicări prin Email <span style={styles.pillApp}>APP</span></h3>
        <p style={styles.text}>Când îți creezi un cont în Aplicație, putem trimite următoarele email-uri la adresa ta înregistrată:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Email-uri tranzacționale</strong> — un email de bun venit când contul tău e creat, plus mesaje esențiale pentru serviciu (ex. verificarea email-ului, resetarea parolei, schimbări importante de politică). Acestea sunt necesare ca să-ți funcționeze contul și nu poți renunța la ele cât timp contul e activ.</li>
          <li style={styles.li}><strong style={styles.strong}>Un singur email de follow-up despre produs</strong> — la aproximativ 7 zile după înregistrare, care te invită să lași o recenzie sau să oferi feedback. Acesta e singurul email promoțional pe care îl trimitem.</li>
        </ul>
        <p style={styles.text}>Fiecare email promoțional include un <strong style={styles.strong}>link de dezabonare cu un click</strong> (<a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>). Dezabonarea oprește doar email-urile promoționale — nu afectează email-urile tranzacționale sau de securitate și nu îți șterge contul.</p>

        <h2 style={styles.h2}>9. Servicii Terțe ale Aplicației <span style={styles.pillApp}>APP</span></h2>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <strong style={styles.strong}>Google Firebase (Google LLC)</strong> — Autentificare, bază de date cloud (Firestore), stocare de fișiere, analiză, raportare de crash-uri. Confidențialitate: <a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
          </li>
          <li style={styles.li}>
            <strong style={styles.strong}>Twelve Data (Twelve Data Inc.)</strong> — Prețuri de piață în timp real și cursuri valutare în Aplicație. Date partajate: simbolurile de trading cerute, adresa IP. Nu se partajează date personale sau de trading. Confidențialitate: <a style={styles.link} href="https://twelvedata.com/privacy-policy" target="_blank" rel="noopener noreferrer">twelvedata.com/privacy-policy</a>
          </li>
        </ul>
        <p style={styles.text}>Putem de asemenea dezvălui informații dacă legea o cere sau ca răspuns la cereri valide ale autorităților publice.</p>

        <h2 style={styles.h2}>10. Stocarea, Păstrarea și Securitatea Datelor</h2>

        <h3 style={styles.h3}>10.1 Locul de Stocare</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Datele de cont, datele de trading și analiza din Aplicație sunt stocate pe servere Google Cloud din Uniunea Europeană (regiunea eur3), conform standardelor GDPR.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Datele de analiză ale Site-ului (dacă accepți) sunt procesate de Google Analytics, care poate transfera date pe servere Google din Statele Unite conform cadrului EU–US Data Privacy Framework. Datele din localStorage rămân complet pe dispozitivul tău.</p>

        <h3 style={styles.h3}>10.2 Perioade de Păstrare</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Păstrare</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>Datele de cont și de trading din Aplicație</td><td style={styles.td}>Până când îți ștergi contul</td></tr>
              <tr><td style={styles.td}>Loguri de crash din Aplicație (Crashlytics)</td><td style={styles.td}>90 de zile, apoi agregate și anonimizate</td></tr>
              <tr><td style={styles.td}>Evenimente de analiză din Aplicație</td><td style={styles.td}>14 luni (implicit Firebase)</td></tr>
              <tr><td style={styles.td}>Date GA4 la nivel de utilizator</td><td style={styles.td}>14 luni</td></tr>
              <tr><td style={styles.td}>Cookie-uri GA4 din browserul tău</td><td style={styles.td}>2 ani (sau până le refuzi/ștergi)</td></tr>
              <tr><td style={styles.td}>Intrări în localStorage</td><td style={styles.td}>Până când ștergi datele browserului sau schimbi setările</td></tr>
              <tr><td style={styles.td}>Copii de backup</td><td style={styles.td}>Până la 30 de zile după ștergere</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={styles.h3}>10.3 Măsuri de Securitate</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Criptare în tranzit (HTTPS/TLS)</li>
          <li style={styles.li}>Criptare în repaus (Firebase Firestore criptat implicit)</li>
          <li style={styles.li}>Autentificare sigură (Firebase Authentication)</li>
          <li style={styles.li}>Criptarea parolei (parola ta nu e niciodată stocată în text simplu)</li>
          <li style={styles.li}>Actualizări de securitate regulate</li>
        </ul>
        <p style={styles.text}>Totuși, nicio metodă de transmitere sau stocare nu e 100% sigură. Deși ne străduim să-ți protejăm informațiile, nu putem garanta o securitate absolută.</p>

        <h2 style={styles.h2}>11. Drepturile Tale Asupra Datelor Conform GDPR</h2>

        <h3 style={styles.h3}>11.1 Dreptul de Acces</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Poți accesa oricând toate datele tale din Aplicație. <span style={styles.pillWeb}>WEB</span> Pentru datele de pe Site, contactează-ne — avem foarte puține (în principal analiză anonimizată, dacă ai acceptat).</p>

        <h3 style={styles.h3}>11.2 Dreptul de Rectificare</h3>
        <p style={styles.text}>Poți edita sau corecta datele tale de trading, notițele și setările în Aplicație.</p>

        <h3 style={styles.h3}>11.3 Dreptul de Ștergere („Dreptul de a Fi Uitat")</h3>
        <p style={styles.text}>Poți cere ștergerea contului tău și a tuturor datelor asociate:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Folosind funcția „Șterge Contul" din Setările Aplicației</li>
          <li style={styles.li}>Contactându-ne la <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a></li>
        </ul>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Pentru cookie-urile/analiza Site-ului, apasă „Refuz" în banner-ul de cookie-uri sau folosește „Cookie Preferences" din subsol.</p>

        <h3 style={styles.h3}>11.4 Dreptul la Portabilitatea Datelor</h3>
        <p style={styles.text}>Îți poți exporta datele de trading prin funcția de export integrată (PDF, plus CSV/JSON pentru utilizatorii Premium).</p>

        <h3 style={styles.h3}>11.5 Dreptul de Opoziție</h3>
        <p style={styles.text}>Te poți opune prelucrării pentru analiză sau prelucrării bazate pe interes legitim refuzând cookie-urile (Web) sau încetând folosirea și ștergând contul (App).</p>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Te poți de asemenea dezabona oricând de la email-ul nostru de follow-up folosind linkul cu un click din acel email sau la <a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>. Asta oprește email-urile promoționale fără să-ți șteargă contul sau să afecteze email-urile tranzacționale/de securitate.</p>

        <h3 style={styles.h3}>11.6 Dreptul de a Retrage Consimțământul</h3>
        <p style={styles.text}>Îți poți retrage consimțământul oricând. Pentru analiza Site-ului, folosește „Cookie Preferences" din subsol. Pentru datele din Aplicație, șterge-ți contul.</p>

        <h3 style={styles.h3}>11.7 Dreptul de a Depune o Plângere la o Autoritate de Supraveghere</h3>
        <p style={styles.text}>Dacă crezi că drepturile tale asupra datelor au fost încălcate, ai dreptul să depui o plângere la o Autoritate de Protecție a Datelor. În România, aceasta este:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong><br />
          <a style={styles.link} href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>
        </p>
        <p style={styles.text}>Dacă locuiești în alt stat membru UE, poți depune plângerea la autoritatea locală de protecție a datelor.</p>
        <p style={styles.text}>Ca să-ți exerciți oricare dintre aceste drepturi, contactează-ne la <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>. Vom răspunde în termen de 30 de zile.</p>

        <h2 style={styles.h2}>12. Confidențialitatea Copiilor și Cerința de Vârstă</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Aplicația este destinată utilizatorilor de 18 ani și peste. Nu colectăm cu bună știință informații de la persoane sub 18 ani.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Site-ul este accesibil public (fără înregistrare) și nu colectează cu bună știință date personale de la nimeni, inclusiv minori. Recomandăm supravegherea părintească pentru copiii care citesc conținut financiar.</p>
        <p style={styles.text}>Dacă ești părinte sau tutore și crezi că copilul tău ne-a oferit informații personale, te rugăm să ne contactezi și vom șterge acele informații.</p>

        <h2 style={styles.h2}>13. Transferuri Internaționale de Date</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Datele din Aplicație sunt stocate în UE (regiunea eur3). Acolo unde Google Firebase rutează trafic în afara UE, se aplică clauze contractuale standard.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Google Analytics poate transfera datele de analiză ale Site-ului în SUA conform cadrului EU–US Data Privacy Framework, pe care Comisia Europeană l-a considerat ca oferind un nivel adecvat de protecție.</p>

        <h2 style={styles.h2}>14. Modificări ale Acestei Politici</h2>
        <p style={styles.text}>Putem actualiza această Politică de Confidențialitate din când în când. Vom publica noua versiune la <a style={styles.link} href="https://kmfjournal.com/privacy-policy">kmfjournal.com/privacy-policy</a> și în Aplicație, și vom actualiza data „Ultima actualizare".</p>
        <p style={styles.text}>Pentru schimbări importante care afectează modul în care prelucrăm datele tale, vom oferi o notificare vizibilă. Continuarea folosirii după ce schimbările sunt publicate înseamnă acceptare.</p>

        <h2 style={styles.h2}>15. Contactează-ne</h2>
        <p style={styles.text}>Pentru întrebări despre această Politică de Confidențialitate sau ca să-ți exerciți drepturile asupra datelor:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Email:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Operator:</strong> Ionel Aanei (dezvoltator individual)<br />
          <strong style={styles.strong}>Locație:</strong> România (Uniunea Europeană)
        </p>
        <p style={styles.text}>Vom răspunde în termen de 30 de zile.</p>
      </div>
    </div>
  );
}

function PrivacyPolicyDe() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Datenschutzerklärung</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Website &amp; mobile App</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Zuletzt aktualisiert: 26. Mai 2026</p>
        </div>

        <h2 style={styles.h2}>1. Einführung &amp; Geltungsbereich</h2>
        <p style={styles.text}>Das K.M.F. Trading Journal wird von <strong style={styles.strong}>Ionel Aanei</strong> entwickelt und betrieben, einem Einzelentwickler (Einzelunternehmer) mit Sitz in Rumänien („wir" oder „uns"). Diese Datenschutzerklärung umfasst:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Die Website unter <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> (die „Website").</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> Die mobile App K.M.F. Trading Journal bei Google Play (die „App").</li>
        </ul>
        <p style={styles.text}>Diese Datenschutzerklärung gilt SOWOHL für die Website ALS AUCH für die App. Jeder Abschnitt gibt an, worauf er sich bezieht. Durch die Nutzung einer der beiden erklärst du dich mit der nachstehend beschriebenen Erhebung und Verwendung von Informationen einverstanden.</p>

        <h2 style={styles.h2}>2. Kontakt &amp; Verantwortlicher</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Verantwortlicher:</strong> Ionel Aanei (Einzelentwickler)<br />
          <strong style={styles.strong}>E-Mail:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Standort:</strong> Rumänien (Europäische Union)
        </p>

        <h2 style={styles.h2}>3. Auf der Website erhobene Informationen <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 Keine direkten personenbezogenen Daten</h3>
        <p style={styles.text}>Die Website hat kein Anmeldeformular, kein Kontaktformular, keinen Newsletter und keine Zahlungsabwicklung. Wir erheben über die Website selbst weder deinen Namen, deine E-Mail-Adresse, dein Passwort, deine Anschrift noch sonstige persönliche Identifikatoren.</p>

        <h3 style={styles.h3}>3.2 Analyse (nur mit deiner Einwilligung)</h3>
        <p style={styles.text}>Wenn du im Cookie-Banner auf <strong style={styles.strong}>„Akzeptieren"</strong> klickst, laden wir Google Analytics 4 (GA4), um anonyme Nutzungsstatistiken zu erfassen:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Aufgerufene Seiten und Verweildauer pro Seite</li>
          <li style={styles.li}>Browsertyp, Betriebssystem, Gerätekategorie</li>
          <li style={styles.li}>Ungefährer Standort (nur Land/Region — die IP wird über <code style={styles.code}>anonymize_ip</code> anonymisiert)</li>
          <li style={styles.li}>Verweisquelle (welche Seite dich hierher gebracht hat)</li>
          <li style={styles.li}>Ereignisse: Button-Klicks, Nutzung der Rechner, Sprachwechsel</li>
        </ul>
        <p style={styles.text}>Wenn du auf <strong style={styles.strong}>„Ablehnen"</strong> klickst oder dein Browser ein Do-Not-Track-Signal sendet, wird GA4 <strong style={styles.strong}>nicht geladen</strong> und es werden keine Analyse-Cookies gesetzt.</p>

        <h3 style={styles.h3}>3.3 Von der Website gesetzte Cookies</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Cookie</th>
                <th style={styles.th}>Zweck</th>
                <th style={styles.th}>Speicherdauer</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>_ga</code></td><td style={styles.td}>Nutzerkennung von Google Analytics 4</td><td style={styles.td}>2 Jahre</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>_ga_CTE9Y21S1L</code></td><td style={styles.td}>GA4-Sitzungsstatus</td><td style={styles.td}>2 Jahre</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Beide Cookies werden erst gesetzt, nachdem du auf „Akzeptieren" geklickt hast. Du kannst deine Entscheidung jederzeit über den Link <strong style={styles.strong}>„Cookie-Einstellungen"</strong> im Footer der Website ändern.</p>

        <h3 style={styles.h3}>3.4 Lokaler Speicher in deinem Browser</h3>
        <p style={styles.text}>Die Website speichert eine kleine Menge an Daten im localStorage deines Browsers, um deine Einstellungen zwischen den Besuchen zu erhalten. Diese Daten <strong style={styles.strong}>verlassen niemals dein Gerät</strong> und sind für uns nicht zugänglich:</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Schlüssel</th>
                <th style={styles.th}>Zweck</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>kmf-lang</code></td><td style={styles.td}>Deine gewählte Oberflächensprache</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_consent_v1</code></td><td style={styles.td}>Deine Cookie-Einwilligungsentscheidung</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_exchange_rates</code></td><td style={styles.td}>Zwischengespeicherte USD-Wechselkurse für den Lot-Size-Rechner (stündlich aktualisiert)</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_v1</code></td><td style={styles.td}>Dein individueller Inhalt der Pre-Trade-Checkliste</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_started</code></td><td style={styles.td}>Markierung, ob du eine Checkliste begonnen hast</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_fav_symbols</code></td><td style={styles.td}>Deine bevorzugten Trading-Symbole im Lot-Size-Rechner</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Du kannst diese Daten jederzeit über die Option „Websitedaten löschen" deines Browsers entfernen.</p>

        <h2 style={styles.h2}>4. Von der Website genutzte Drittanbieter-Dienste <span style={styles.pillWeb}>WEB</span></h2>
        <p style={styles.text}>Die Website lädt Ressourcen oder Daten von folgenden Drittanbietern. Jeder kann im Rahmen der standardmäßigen HTTP-Anfrage deine IP-Adresse erhalten:</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Dienst</th>
                <th style={styles.th}>Zweck</th>
                <th style={styles.th}>Datenschutz</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Google Analytics 4 (Google LLC)</td>
                <td style={styles.td}>Anonymisierte Analyse (nach Einwilligung)</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
              <tr>
                <td style={styles.td}>SaasHunt (saashunt.best)</td>
                <td style={styles.td}>„Top 1 Daily Winner"-Badge-Bild im Footer</td>
                <td style={styles.td}>—</td>
              </tr>
              <tr>
                <td style={styles.td}>Product Hunt (producthunt.com)</td>
                <td style={styles.td}>„Featured"-Badge-Bild im Footer</td>
                <td style={styles.td}><a style={styles.link} href="https://www.producthunt.com/legal/privacy" target="_blank" rel="noopener noreferrer">PH</a></td>
              </tr>
              <tr>
                <td style={styles.td}>ExchangeRate-API (open.er-api.com)</td>
                <td style={styles.td}>USD-Wechselkurse für den Lot-Size-Rechner</td>
                <td style={styles.td}><a style={styles.link} href="https://www.exchangerate-api.com/privacy-policy" target="_blank" rel="noopener noreferrer">ER-API</a></td>
              </tr>
              <tr>
                <td style={styles.td}>Google Play (play.google.com)</td>
                <td style={styles.td}>Linkziel und Badge „Bei Google Play herunterladen"</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Die Website verwendet <strong style={styles.strong}>KEINE</strong>: Facebook Pixel, Werbenetzwerke, Retargeting-Pixel, Social-Plugin-Skripte, Hotjar, Sentry, PostHog oder ähnliche Tracker.</p>

        <h2 style={styles.h2}>5. Von der mobilen App erhobene Informationen <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>Die mobile App erhebt mehr Daten als die Website, da sie kontobasiert ist. Das Folgende gilt nur, nachdem du ein Konto erstellt hast und angemeldet bist.</p>

        <h3 style={styles.h3}>5.1 Personenbezogene Informationen</h3>
        <p style={styles.text}>Wenn du ein Konto erstellst, erhebt die App:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>E-Mail-Adresse (für die Authentifizierung erforderlich)</li>
          <li style={styles.li}>Passwort (von Firebase Authentication gehasht — niemals im Klartext gespeichert)</li>
        </ul>
        <p style={styles.text}>Zur Verwaltung deines Kontos und der E-Mail-Kommunikation speichern wir außerdem: deine gewählte App-Sprache, dein Anmeldedatum, Markierungen und Zeitstempel darüber, welche E-Mails dir gesendet wurden, deinen Abmeldestatus sowie ein eindeutiges Abmelde-Token, mit dem One-Click-Abmeldelinks sicher verarbeitet werden.</p>

        <p style={styles.text}><strong style={styles.strong}>Die App erhebt NICHT:</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Deinen Namen (es sei denn, du gibst ihn freiwillig an)</li>
          <li style={styles.li}>Postanschrift</li>
          <li style={styles.li}>Telefonnummer</li>
          <li style={styles.li}>Zahlungsinformationen (von Google Play verwaltet)</li>
          <li style={styles.li}>Persönliche Fotos (nur die trade-bezogenen Screenshots, die du hochlädst)</li>
        </ul>

        <h3 style={styles.h3}>5.2 Trading-Daten</h3>
        <p style={styles.text}>Um die Funktionalität der App bereitzustellen, speichert die App:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Trade-Details (Instrument, Einstiegskurs, Ausstiegskurs, Lot-Größe, Gewinn/Verlust)</li>
          <li style={styles.li}>Trade-Notizen, Bewertungen sowie Emotionsbewertungen vor/nach dem Trade</li>
          <li style={styles.li}>Antworten der Pre-Trade-Checkliste</li>
          <li style={styles.li}>Antworten des wöchentlichen Reviews</li>
          <li style={styles.li}>Fotos/Screenshots, die du an Trades anhängst</li>
          <li style={styles.li}>Informationen zum Kontostand (von dir eingegeben)</li>
          <li style={styles.li}>Zeitstempel für alle Aktivitäten</li>
        </ul>

        <h3 style={styles.h3}>5.3 Technische und Nutzungsdaten</h3>
        <p style={styles.text}>Die App erhebt automatisch über Firebase Analytics und Crashlytics:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Gerätemodell und Betriebssystemversion</li>
          <li style={styles.li}>App-Version</li>
          <li style={styles.li}>IP-Adresse (vorübergehend, zu Authentifizierungszwecken)</li>
          <li style={styles.li}>Absturzprotokolle und Fehlerberichte</li>
          <li style={styles.li}>Nutzungsanalyse (aufgerufene Bildschirme, genutzte Funktionen, Sitzungsdauer)</li>
          <li style={styles.li}>Eindeutige Gerätekennungen</li>
        </ul>

        <h2 style={styles.h2}>6. Automatisierte Entscheidungsfindung &amp; Profiling <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>Die App nutzt eine automatisierte Analyse der von dir bereitgestellten Daten, um Erkenntnisse für deinen eigenen Gebrauch zu erzeugen. Keine dieser Entscheidungen hat rechtliche oder erhebliche Auswirkungen auf dich — sie dienen ausschließlich der Beratung.</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Trader Personality Profile:</strong> Ordnet dein Verhalten anhand von Trade-Mustern in Archetypen ein (Sniper, Robot, Momentum Rider, Wave Rider, Gambler, Revenge Trader). Wird lokal berechnet und mit deinem Konto gespeichert.</li>
          <li style={styles.li}><strong style={styles.strong}>Tilt Detection:</strong> Ein vierstufiges Warnsystem, das anhand jüngster Verlustmuster und selbst berichteter Emotionen mögliches emotionales Trading kennzeichnet. Es löst In-App-Warnungen aus; du behältst die volle Kontrolle über jeden Trade.</li>
          <li style={styles.li}><strong style={styles.strong}>Honesty Mirror:</strong> Setzt deine selbst vergebenen Qualitätsbewertungen der Trades in Beziehung zum tatsächlichen Gewinn/Verlust, um systematische Über- oder Unterschätzung zu erkennen.</li>
        </ul>
        <p style={styles.text}>Gemäß Artikel 22 DSGVO hast du das Recht, eine menschliche Überprüfung jeder automatisierten Entscheidung zu verlangen.</p>

        <h2 style={styles.h2}>7. Rechtsgrundlage der Verarbeitung (Art. 6 DSGVO)</h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Daten</th>
                <th style={styles.th}>Geltungsbereich</th>
                <th style={styles.th}>Rechtsgrundlage</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>Konto-E-Mail &amp; Passwort</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Vertragserfüllung — Art. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>Trading-Daten &amp; Notizen</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Vertragserfüllung — Art. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>App-Analyse &amp; Absturzberichte</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Berechtigtes Interesse — Art. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>E-Mail-Kommunikation (Willkommen + Follow-up nach 7 Tagen)</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Berechtigtes Interesse — Art. 6(1)(f), mit One-Click-Abmeldung</td></tr>
              <tr><td style={styles.td}>Website-Analyse (GA4)</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Einwilligung — Art. 6(1)(a)</td></tr>
              <tr><td style={styles.td}>Drittanbieter-Badges/-APIs der Website</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Berechtigtes Interesse — Art. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>localStorage-Einstellungen</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Berechtigtes Interesse</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style={styles.h2}>8. Wie wir deine Informationen verwenden</h2>

        <h3 style={styles.h3}>8.1 Zur Bereitstellung der Funktionalität <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Dein Konto authentifizieren</li>
          <li style={styles.li}>Deine Trading-Daten geräteübergreifend speichern und synchronisieren</li>
          <li style={styles.li}>Trading-Statistiken und Leistungskennzahlen berechnen</li>
          <li style={styles.li}>PDF-Berichte erstellen</li>
          <li style={styles.li}>Deinen Trading-Verlauf und deine Analysen anzeigen</li>
        </ul>

        <h3 style={styles.h3}>8.2 Zur Verbesserung des Dienstes <span style={styles.pillWeb}>WEB</span> <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Nutzungsmuster analysieren, um Funktionen zu verbessern</li>
          <li style={styles.li}>Fehler und Abstürze erkennen und beheben</li>
          <li style={styles.li}>Die Leistung optimieren</li>
        </ul>

        <h3 style={styles.h3}>8.3 Zur Kommunikation mit dir</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Auf deine Support-Anfragen antworten</li>
          <li style={styles.li}>Wichtige Updates zur App senden (falls nötig)</li>
          <li style={styles.li}>Dich über Änderungen der Richtlinien informieren</li>
        </ul>

        <p style={styles.text}><strong style={styles.strong}>Wir verwenden deine Daten NICHT für:</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Drittanbieter-Werbenetzwerke oder Anzeigen-Targeting</li>
          <li style={styles.li}>Verkauf oder Vermietung deiner Daten an Dritte</li>
          <li style={styles.li}>Sachfremde kommerzielle Zwecke</li>
          <li style={styles.li}>Website- oder geräteübergreifendes Tracking über das hinaus, dem du ausdrücklich zustimmst</li>
        </ul>

        <h3 style={styles.h3}>8.4 E-Mail-Kommunikation <span style={styles.pillApp}>APP</span></h3>
        <p style={styles.text}>Wenn du in der App ein Konto erstellst, können wir folgende E-Mails an deine registrierte Adresse senden:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Transaktions-E-Mails</strong> — eine Willkommens-E-Mail bei der Konto­erstellung sowie dienstkritische Nachrichten (z. B. E-Mail-Bestätigung, Passwort-Zurücksetzung, wichtige Richtlinienänderungen). Diese sind für den Betrieb deines Kontos notwendig und können nicht abbestellt werden, solange dein Konto aktiv ist.</li>
          <li style={styles.li}><strong style={styles.strong}>Eine Produkt-Follow-up-E-Mail</strong> — etwa 7 Tage nach der Anmeldung, in der wir dich einladen, eine Bewertung abzugeben oder Feedback zu teilen. Dies ist die einzige Werbe-E-Mail, die wir senden.</li>
        </ul>
        <p style={styles.text}>Jede Werbe-E-Mail enthält einen <strong style={styles.strong}>One-Click-Abmeldelink</strong> (<a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>). Die Abmeldung stoppt nur Werbe-E-Mails — sie wirkt sich nicht auf Transaktions- oder Sicherheits-E-Mails aus und löscht dein Konto nicht.</p>

        <h2 style={styles.h2}>9. Drittanbieter-Dienste der App <span style={styles.pillApp}>APP</span></h2>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <strong style={styles.strong}>Google Firebase (Google LLC)</strong> — Authentifizierung, Cloud-Datenbank (Firestore), Dateispeicher, Analyse, Absturzberichte. Datenschutz: <a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
          </li>
          <li style={styles.li}>
            <strong style={styles.strong}>Twelve Data (Twelve Data Inc.)</strong> — Echtzeit-Marktpreise und Wechselkurse innerhalb der App. Geteilte Daten: angefragte Trading-Symbole, IP-Adresse. Es werden keine personenbezogenen oder Trading-Daten geteilt. Datenschutz: <a style={styles.link} href="https://twelvedata.com/privacy-policy" target="_blank" rel="noopener noreferrer">twelvedata.com/privacy-policy</a>
          </li>
        </ul>
        <p style={styles.text}>Wir können Informationen auch offenlegen, wenn dies gesetzlich vorgeschrieben ist oder als Reaktion auf rechtmäßige Anfragen von Behörden.</p>

        <h2 style={styles.h2}>10. Speicherung, Aufbewahrung &amp; Sicherheit der Daten</h2>

        <h3 style={styles.h3}>10.1 Speicherort</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Kontodaten, Trading-Daten und App-Analysedaten werden auf Google-Cloud-Servern in der Europäischen Union (Region eur3) nach DSGVO-konformen Standards gespeichert.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Website-Analysedaten (falls du einwilligst) werden von Google Analytics verarbeitet, das Daten unter dem EU-US Data Privacy Framework an Google-Server in den USA übertragen kann. localStorage-Daten bleiben vollständig auf deinem Gerät.</p>

        <h3 style={styles.h3}>10.2 Aufbewahrungsfristen</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Daten</th>
                <th style={styles.th}>Aufbewahrung</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>App-Konto- &amp; Trading-Daten</td><td style={styles.td}>Bis du dein Konto löschst</td></tr>
              <tr><td style={styles.td}>App-Absturzprotokolle (Crashlytics)</td><td style={styles.td}>90 Tage, danach aggregiert und anonymisiert</td></tr>
              <tr><td style={styles.td}>App-Analyseereignisse</td><td style={styles.td}>14 Monate (Firebase-Standard)</td></tr>
              <tr><td style={styles.td}>GA4-Daten auf Nutzerebene</td><td style={styles.td}>14 Monate</td></tr>
              <tr><td style={styles.td}>GA4-Cookies in deinem Browser</td><td style={styles.td}>2 Jahre (oder bis du ablehnst/löschst)</td></tr>
              <tr><td style={styles.td}>localStorage-Einträge</td><td style={styles.td}>Bis du die Browserdaten löschst oder Einstellungen änderst</td></tr>
              <tr><td style={styles.td}>Backup-Snapshots</td><td style={styles.td}>Bis zu 30 Tage nach der Löschung</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={styles.h3}>10.3 Sicherheitsmaßnahmen</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Verschlüsselung bei der Übertragung (HTTPS/TLS)</li>
          <li style={styles.li}>Verschlüsselung im Ruhezustand (Firebase Firestore standardmäßig verschlüsselt)</li>
          <li style={styles.li}>Sichere Authentifizierung (Firebase Authentication)</li>
          <li style={styles.li}>Passwort-Hashing (dein Passwort wird niemals im Klartext gespeichert)</li>
          <li style={styles.li}>Regelmäßige Sicherheitsupdates</li>
        </ul>
        <p style={styles.text}>Allerdings ist keine Übertragungs- oder Speichermethode zu 100 % sicher. Wir bemühen uns, deine Informationen zu schützen, können jedoch keine absolute Sicherheit garantieren.</p>

        <h2 style={styles.h2}>11. Deine Datenrechte nach der DSGVO</h2>

        <h3 style={styles.h3}>11.1 Recht auf Auskunft</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Du kannst jederzeit über die App auf all deine Daten zugreifen. <span style={styles.pillWeb}>WEB</span> Für Website-Daten kontaktiere uns — wir speichern davon sehr wenig (hauptsächlich anonymisierte Analyse, falls du eingewilligt hast).</p>

        <h3 style={styles.h3}>11.2 Recht auf Berichtigung</h3>
        <p style={styles.text}>Du kannst deine Trading-Daten, Notizen und Einstellungen innerhalb der App bearbeiten oder korrigieren.</p>

        <h3 style={styles.h3}>11.3 Recht auf Löschung („Recht auf Vergessenwerden")</h3>
        <p style={styles.text}>Du kannst die Löschung deines Kontos und aller zugehörigen Daten beantragen:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Über die Funktion „Konto löschen" in den App-Einstellungen</li>
          <li style={styles.li}>Indem du uns unter <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a> kontaktierst</li>
        </ul>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Für Website-Cookies/-Analyse klicke im Cookie-Banner auf „Ablehnen" oder nutze „Cookie-Einstellungen" im Footer.</p>

        <h3 style={styles.h3}>11.4 Recht auf Datenübertragbarkeit</h3>
        <p style={styles.text}>Du kannst deine Trading-Daten über die integrierte Exportfunktion exportieren (PDF sowie CSV/JSON für Premium-Nutzer).</p>

        <h3 style={styles.h3}>11.5 Widerspruchsrecht</h3>
        <p style={styles.text}>Du kannst der Verarbeitung zu Analysezwecken oder der auf berechtigtem Interesse beruhenden Verarbeitung widersprechen, indem du Cookies ablehnst (Web) oder die Nutzung einstellst und dein Konto löschst (App).</p>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Du kannst dich außerdem jederzeit von unserer Produkt-Follow-up-E-Mail abmelden — über den One-Click-Link in dieser E-Mail oder unter <a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>. Das stoppt Werbe-E-Mails, ohne dein Konto zu löschen oder Transaktions-/Sicherheits-E-Mails zu beeinträchtigen.</p>

        <h3 style={styles.h3}>11.6 Recht auf Widerruf der Einwilligung</h3>
        <p style={styles.text}>Du kannst deine Einwilligung jederzeit widerrufen. Für die Website-Analyse nutze „Cookie-Einstellungen" im Footer. Für App-Daten lösche dein Konto.</p>

        <h3 style={styles.h3}>11.7 Recht auf Beschwerde bei einer Aufsichtsbehörde</h3>
        <p style={styles.text}>Wenn du der Ansicht bist, dass deine Datenrechte verletzt wurden, hast du das Recht, eine Beschwerde bei einer Datenschutzbehörde einzureichen. In Rumänien ist dies:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong><br />
          <a style={styles.link} href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>
        </p>
        <p style={styles.text}>Wenn du in einem anderen EU-Mitgliedstaat wohnst, kannst du die Beschwerde bei deiner lokalen Datenschutzbehörde einreichen.</p>
        <p style={styles.text}>Um eines dieser Rechte auszuüben, kontaktiere uns unter <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>. Wir antworten innerhalb von 30 Tagen.</p>

        <h2 style={styles.h2}>12. Datenschutz von Kindern und Altersanforderung</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Die App ist für Nutzer ab 18 Jahren bestimmt. Wir erheben nicht wissentlich Informationen von Personen unter 18 Jahren.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Die Website ist öffentlich zugänglich (ohne Anmeldung) und erhebt nicht wissentlich personenbezogene Daten von irgendjemandem, einschließlich Minderjährigen. Wir empfehlen elterliche Aufsicht, wenn Kinder Finanzinhalte ansehen.</p>
        <p style={styles.text}>Wenn du Elternteil oder Erziehungsberechtigter bist und glaubst, dass uns dein Kind personenbezogene Daten übermittelt hat, kontaktiere uns bitte, und wir werden diese Informationen löschen.</p>

        <h2 style={styles.h2}>13. Internationale Datenübermittlungen</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> App-Daten werden in der EU (Region eur3) gespeichert. Wo Google Firebase Datenverkehr außerhalb der EU leitet, gelten Standardvertragsklauseln.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Google Analytics kann Website-Analysedaten unter dem EU-US Data Privacy Framework in die USA übertragen, das die Europäische Kommission als angemessenes Schutzniveau anerkannt hat.</p>

        <h2 style={styles.h2}>14. Änderungen dieser Datenschutzerklärung</h2>
        <p style={styles.text}>Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wir veröffentlichen die neue Version unter <a style={styles.link} href="https://kmfjournal.com/privacy-policy">kmfjournal.com/privacy-policy</a> und in der App und aktualisieren das Datum „Zuletzt aktualisiert".</p>
        <p style={styles.text}>Bei wesentlichen Änderungen, die die Art und Weise der Verarbeitung deiner Daten betreffen, weisen wir deutlich darauf hin. Deine fortgesetzte Nutzung nach Veröffentlichung der Änderungen gilt als Zustimmung.</p>

        <h2 style={styles.h2}>15. Kontaktiere uns</h2>
        <p style={styles.text}>Bei Fragen zu dieser Datenschutzerklärung oder zur Ausübung deiner Datenrechte:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>E-Mail:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Verantwortlicher:</strong> Ionel Aanei (Einzelentwickler)<br />
          <strong style={styles.strong}>Standort:</strong> Rumänien (Europäische Union)
        </p>
        <p style={styles.text}>Wir antworten innerhalb von 30 Tagen.</p>
      </div>
    </div>
  );
}

function PrivacyPolicyFr() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Politique de confidentialité</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Site web &amp; application mobile</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Dernière mise à jour : 26 mai 2026</p>
        </div>

        <h2 style={styles.h2}>1. Introduction &amp; champ d'application</h2>
        <p style={styles.text}>K.M.F. Trading Journal est développé et exploité par <strong style={styles.strong}>Ionel Aanei</strong>, développeur individuel (entrepreneur individuel) établi en Roumanie (« nous » ou « notre »). Cette politique de confidentialité couvre :</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Le site web à l'adresse <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> (le « Site »).</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> L'application mobile K.M.F. Trading Journal sur Google Play (l'« Application »).</li>
        </ul>
        <p style={styles.text}>Cette politique couvre À LA FOIS le Site et l'Application. Chaque section indique à quoi elle s'applique. En utilisant l'un ou l'autre, vous acceptez la collecte et l'utilisation des informations décrites ci-dessous.</p>

        <h2 style={styles.h2}>2. Contact &amp; responsable du traitement</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Responsable du traitement :</strong> Ionel Aanei (développeur individuel)<br />
          <strong style={styles.strong}>E-mail :</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Localisation :</strong> Roumanie (Union européenne)
        </p>

        <h2 style={styles.h2}>3. Informations collectées sur le Site <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 Aucune donnée personnelle directe</h3>
        <p style={styles.text}>Le Site n'a pas de formulaire d'inscription, pas de formulaire de contact, pas de newsletter et aucun traitement de paiement. Nous ne collectons pas votre nom, e-mail, mot de passe, adresse ou tout autre identifiant personnel via le Site lui-même.</p>

        <h3 style={styles.h3}>3.2 Analyse (uniquement avec votre consentement)</h3>
        <p style={styles.text}>Si vous cliquez sur <strong style={styles.strong}>« Accepter »</strong> dans la bannière de consentement aux cookies, nous chargeons Google Analytics 4 (GA4) pour collecter des statistiques d'utilisation anonymes :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Pages consultées et temps passé sur la page</li>
          <li style={styles.li}>Type de navigateur, système d'exploitation, catégorie d'appareil</li>
          <li style={styles.li}>Localisation approximative (pays/région uniquement — l'IP est anonymisée via <code style={styles.code}>anonymize_ip</code>)</li>
          <li style={styles.li}>Source de référence (le site qui vous a amené ici)</li>
          <li style={styles.li}>Événements : clics sur les boutons, utilisation des calculateurs, changements de langue</li>
        </ul>
        <p style={styles.text}>Si vous cliquez sur <strong style={styles.strong}>« Refuser »</strong> ou si votre navigateur envoie un signal Do Not Track, GA4 <strong style={styles.strong}>n'est pas chargé</strong> et aucun cookie d'analyse n'est déposé.</p>

        <h3 style={styles.h3}>3.3 Cookies déposés par le Site</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Cookie</th>
                <th style={styles.th}>Objet</th>
                <th style={styles.th}>Conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>_ga</code></td><td style={styles.td}>Identifiant utilisateur Google Analytics 4</td><td style={styles.td}>2 ans</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>_ga_CTE9Y21S1L</code></td><td style={styles.td}>État de session GA4</td><td style={styles.td}>2 ans</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Les deux cookies ne sont déposés qu'après votre clic sur « Accepter ». Vous pouvez modifier votre choix à tout moment via le lien <strong style={styles.strong}>« Préférences de cookies »</strong> dans le pied de page du Site.</p>

        <h3 style={styles.h3}>3.4 Stockage local dans votre navigateur</h3>
        <p style={styles.text}>Le Site stocke une petite quantité de données dans le localStorage de votre navigateur afin de conserver vos réglages entre les visites. Ces données <strong style={styles.strong}>ne quittent jamais votre appareil</strong> et ne nous sont pas accessibles :</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Clé</th>
                <th style={styles.th}>Objet</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>kmf-lang</code></td><td style={styles.td}>Votre langue d'interface sélectionnée</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_consent_v1</code></td><td style={styles.td}>Votre décision de consentement aux cookies</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_exchange_rates</code></td><td style={styles.td}>Taux de change USD mis en cache pour le calculateur de lot (actualisés toutes les heures)</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_v1</code></td><td style={styles.td}>Le contenu personnalisé de votre checklist pré-trade</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_started</code></td><td style={styles.td}>Indicateur précisant si vous avez commencé une checklist</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_fav_symbols</code></td><td style={styles.td}>Vos symboles de trading favoris dans le calculateur de lot</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Vous pouvez effacer ces données à tout moment via l'option « Effacer les données du site » de votre navigateur.</p>

        <h2 style={styles.h2}>4. Services tiers utilisés par le Site <span style={styles.pillWeb}>WEB</span></h2>
        <p style={styles.text}>Le Site charge des ressources ou des données auprès des tiers suivants. Chacun peut recevoir votre adresse IP dans le cadre de la requête HTTP standard :</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Service</th>
                <th style={styles.th}>Objet</th>
                <th style={styles.th}>Confidentialité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Google Analytics 4 (Google LLC)</td>
                <td style={styles.td}>Analyse anonymisée (après consentement)</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
              <tr>
                <td style={styles.td}>SaasHunt (saashunt.best)</td>
                <td style={styles.td}>Image du badge « Top 1 Daily Winner » dans le pied de page</td>
                <td style={styles.td}>—</td>
              </tr>
              <tr>
                <td style={styles.td}>Product Hunt (producthunt.com)</td>
                <td style={styles.td}>Image du badge « Featured » dans le pied de page</td>
                <td style={styles.td}><a style={styles.link} href="https://www.producthunt.com/legal/privacy" target="_blank" rel="noopener noreferrer">PH</a></td>
              </tr>
              <tr>
                <td style={styles.td}>ExchangeRate-API (open.er-api.com)</td>
                <td style={styles.td}>Taux de change USD pour le calculateur de lot</td>
                <td style={styles.td}><a style={styles.link} href="https://www.exchangerate-api.com/privacy-policy" target="_blank" rel="noopener noreferrer">ER-API</a></td>
              </tr>
              <tr>
                <td style={styles.td}>Google Play (play.google.com)</td>
                <td style={styles.td}>Cible du lien et badge « Télécharger sur Google Play »</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Le Site <strong style={styles.strong}>N'UTILISE PAS</strong> : Facebook Pixel, réseaux publicitaires, pixels de reciblage, scripts de plugins sociaux, Hotjar, Sentry, PostHog ou trackers similaires.</p>

        <h2 style={styles.h2}>5. Informations collectées par l'application mobile <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>L'application mobile collecte plus de données que le Site car elle fonctionne sur la base d'un compte. Ce qui suit ne s'applique qu'après la création d'un compte et la connexion.</p>

        <h3 style={styles.h3}>5.1 Informations personnelles</h3>
        <p style={styles.text}>Lorsque vous créez un compte, l'Application collecte :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Adresse e-mail (requise pour l'authentification)</li>
          <li style={styles.li}>Mot de passe (haché par Firebase Authentication — jamais stocké en clair)</li>
        </ul>
        <p style={styles.text}>Pour gérer votre compte et les communications par e-mail, nous stockons également : votre langue d'application sélectionnée, votre date d'inscription, des indicateurs et horodatages suivant les e-mails qui vous ont été envoyés, votre statut de désabonnement et un jeton de désabonnement unique servant à traiter de façon sécurisée les liens de désinscription en un clic.</p>

        <p style={styles.text}><strong style={styles.strong}>L'Application NE collecte PAS :</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Votre nom (sauf si vous le fournissez volontairement)</li>
          <li style={styles.li}>Adresse postale</li>
          <li style={styles.li}>Numéro de téléphone</li>
          <li style={styles.li}>Informations de paiement (gérées par Google Play)</li>
          <li style={styles.li}>Photos personnelles (uniquement les captures liées aux trades que vous importez)</li>
        </ul>

        <h3 style={styles.h3}>5.2 Données de trading</h3>
        <p style={styles.text}>Pour fournir les fonctionnalités de l'Application, celle-ci stocke :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Détails des trades (instrument, prix d'entrée, prix de sortie, taille de lot, profit/perte)</li>
          <li style={styles.li}>Notes de trade, évaluations et notations émotionnelles avant/après le trade</li>
          <li style={styles.li}>Réponses de la checklist pré-trade</li>
          <li style={styles.li}>Réponses du bilan hebdomadaire</li>
          <li style={styles.li}>Photos/captures que vous joignez aux trades</li>
          <li style={styles.li}>Informations sur le solde du compte (saisies par vous)</li>
          <li style={styles.li}>Horodatages de toutes les activités</li>
        </ul>

        <h3 style={styles.h3}>5.3 Données techniques et d'utilisation</h3>
        <p style={styles.text}>L'Application collecte automatiquement via Firebase Analytics et Crashlytics :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Modèle d'appareil et version du système d'exploitation</li>
          <li style={styles.li}>Version de l'application</li>
          <li style={styles.li}>Adresse IP (temporaire, à des fins d'authentification)</li>
          <li style={styles.li}>Journaux de plantage et rapports d'erreur</li>
          <li style={styles.li}>Analyse d'utilisation (écrans consultés, fonctionnalités utilisées, durée de session)</li>
          <li style={styles.li}>Identifiants uniques d'appareil</li>
        </ul>

        <h2 style={styles.h2}>6. Décision automatisée &amp; profilage <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>L'Application utilise une analyse automatisée des données que vous fournissez pour générer des aperçus à votre propre usage. Aucune de ces décisions n'a d'effet juridique ou significatif sur vous — elles sont purement consultatives.</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Trader Personality Profile :</strong> Classe votre comportement en archétypes (Sniper, Robot, Momentum Rider, Wave Rider, Gambler, Revenge Trader) à partir de vos schémas de trades. Calculé localement et stocké avec votre compte.</li>
          <li style={styles.li}><strong style={styles.strong}>Tilt Detection :</strong> Un système d'alerte à 4 niveaux qui signale un éventuel trading émotionnel à partir des pertes récentes et des émotions que vous déclarez. Il déclenche des avertissements dans l'application ; vous gardez le contrôle total de chaque trade.</li>
          <li style={styles.li}><strong style={styles.strong}>Honesty Mirror :</strong> Met en relation les notes de qualité que vous attribuez à vos trades avec le profit/perte réel afin d'identifier une sur- ou sous-confiance systématique.</li>
        </ul>
        <p style={styles.text}>En vertu de l'article 22 du RGPD, vous avez le droit de demander une intervention humaine sur toute décision automatisée.</p>

        <h2 style={styles.h2}>7. Base légale du traitement (article 6 du RGPD)</h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Données</th>
                <th style={styles.th}>Champ</th>
                <th style={styles.th}>Base légale</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>E-mail &amp; mot de passe du compte</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Exécution du contrat — art. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>Données de trading &amp; notes</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Exécution du contrat — art. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>Analyse &amp; rapports de plantage de l'app</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Intérêt légitime — art. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>Communications par e-mail (bienvenue + relance à 7 jours)</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Intérêt légitime — art. 6(1)(f), avec désinscription en un clic</td></tr>
              <tr><td style={styles.td}>Analyse du Site (GA4)</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Consentement — art. 6(1)(a)</td></tr>
              <tr><td style={styles.td}>Badges/API tiers du Site</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Intérêt légitime — art. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>Réglages localStorage</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Intérêt légitime</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style={styles.h2}>8. Comment nous utilisons vos informations</h2>

        <h3 style={styles.h3}>8.1 Pour fournir les fonctionnalités <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Authentifier votre compte</li>
          <li style={styles.li}>Stocker et synchroniser vos données de trading entre appareils</li>
          <li style={styles.li}>Calculer les statistiques de trading et les indicateurs de performance</li>
          <li style={styles.li}>Générer des rapports PDF</li>
          <li style={styles.li}>Afficher votre historique de trading et vos analyses</li>
        </ul>

        <h3 style={styles.h3}>8.2 Pour améliorer le service <span style={styles.pillWeb}>WEB</span> <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Analyser les habitudes d'utilisation pour améliorer les fonctionnalités</li>
          <li style={styles.li}>Identifier et corriger les bugs et plantages</li>
          <li style={styles.li}>Optimiser les performances</li>
        </ul>

        <h3 style={styles.h3}>8.3 Pour communiquer avec vous</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Répondre à vos demandes d'assistance</li>
          <li style={styles.li}>Envoyer des mises à jour importantes sur l'Application (si nécessaire)</li>
          <li style={styles.li}>Vous informer des changements de politique</li>
        </ul>

        <p style={styles.text}><strong style={styles.strong}>Nous N'utilisons PAS vos données pour :</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Les réseaux publicitaires tiers ou le ciblage publicitaire</li>
          <li style={styles.li}>Vendre ou louer vos données à des tiers</li>
          <li style={styles.li}>Des finalités commerciales sans rapport</li>
          <li style={styles.li}>Le suivi inter-sites ou inter-appareils au-delà de ce que vous acceptez explicitement</li>
        </ul>

        <h3 style={styles.h3}>8.4 Communications par e-mail <span style={styles.pillApp}>APP</span></h3>
        <p style={styles.text}>Lorsque vous créez un compte dans l'Application, nous pouvons envoyer les e-mails suivants à votre adresse enregistrée :</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>E-mails transactionnels</strong> — un e-mail de bienvenue à la création de votre compte, plus des messages essentiels au service (par ex. vérification de l'e-mail, réinitialisation du mot de passe, changements importants de politique). Ils sont nécessaires au fonctionnement de votre compte et ne peuvent pas être désactivés tant que votre compte est actif.</li>
          <li style={styles.li}><strong style={styles.strong}>Un seul e-mail de relance produit</strong> — environ 7 jours après l'inscription, vous invitant à laisser un avis ou à partager des retours. C'est le seul e-mail promotionnel que nous envoyons.</li>
        </ul>
        <p style={styles.text}>Chaque e-mail promotionnel inclut un <strong style={styles.strong}>lien de désinscription en un clic</strong> (<a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>). La désinscription n'arrête que les e-mails promotionnels — elle n'affecte pas les e-mails transactionnels ou de sécurité et ne supprime pas votre compte.</p>

        <h2 style={styles.h2}>9. Services tiers de l'Application <span style={styles.pillApp}>APP</span></h2>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <strong style={styles.strong}>Google Firebase (Google LLC)</strong> — Authentification, base de données cloud (Firestore), stockage de fichiers, analyse, rapports de plantage. Confidentialité : <a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
          </li>
          <li style={styles.li}>
            <strong style={styles.strong}>Twelve Data (Twelve Data Inc.)</strong> — Prix de marché en temps réel et taux de change dans l'Application. Données partagées : symboles de trading demandés, adresse IP. Aucune donnée personnelle ou de trading n'est partagée. Confidentialité : <a style={styles.link} href="https://twelvedata.com/privacy-policy" target="_blank" rel="noopener noreferrer">twelvedata.com/privacy-policy</a>
          </li>
        </ul>
        <p style={styles.text}>Nous pouvons également divulguer des informations si la loi l'exige ou en réponse à des demandes valides d'autorités publiques.</p>

        <h2 style={styles.h2}>10. Stockage, conservation &amp; sécurité des données</h2>

        <h3 style={styles.h3}>10.1 Lieu de stockage</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Les données de compte, de trading et d'analyse de l'Application sont stockées sur des serveurs Google Cloud dans l'Union européenne (région eur3), selon des normes conformes au RGPD.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Les données d'analyse du Site (si vous y consentez) sont traitées par Google Analytics, qui peut transférer des données vers des serveurs Google aux États-Unis dans le cadre du Data Privacy Framework UE–États-Unis. Les données localStorage restent entièrement sur votre appareil.</p>

        <h3 style={styles.h3}>10.2 Durées de conservation</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Données</th>
                <th style={styles.th}>Conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>Données de compte &amp; de trading de l'app</td><td style={styles.td}>Jusqu'à la suppression de votre compte</td></tr>
              <tr><td style={styles.td}>Journaux de plantage de l'app (Crashlytics)</td><td style={styles.td}>90 jours, puis agrégés et anonymisés</td></tr>
              <tr><td style={styles.td}>Événements d'analyse de l'app</td><td style={styles.td}>14 mois (par défaut Firebase)</td></tr>
              <tr><td style={styles.td}>Données GA4 au niveau utilisateur</td><td style={styles.td}>14 mois</td></tr>
              <tr><td style={styles.td}>Cookies GA4 dans votre navigateur</td><td style={styles.td}>2 ans (ou jusqu'à refus/effacement)</td></tr>
              <tr><td style={styles.td}>Entrées localStorage</td><td style={styles.td}>Jusqu'à l'effacement des données du navigateur ou la modification des réglages</td></tr>
              <tr><td style={styles.td}>Instantanés de sauvegarde</td><td style={styles.td}>Jusqu'à 30 jours après la suppression</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={styles.h3}>10.3 Mesures de sécurité</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Chiffrement en transit (HTTPS/TLS)</li>
          <li style={styles.li}>Chiffrement au repos (Firebase Firestore chiffré par défaut)</li>
          <li style={styles.li}>Authentification sécurisée (Firebase Authentication)</li>
          <li style={styles.li}>Hachage du mot de passe (votre mot de passe n'est jamais stocké en clair)</li>
          <li style={styles.li}>Mises à jour de sécurité régulières</li>
        </ul>
        <p style={styles.text}>Cependant, aucune méthode de transmission ou de stockage n'est sûre à 100 %. Bien que nous nous efforcions de protéger vos informations, nous ne pouvons garantir une sécurité absolue.</p>

        <h2 style={styles.h2}>11. Vos droits sur les données selon le RGPD</h2>

        <h3 style={styles.h3}>11.1 Droit d'accès</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Vous pouvez accéder à toutes vos données via l'Application à tout moment. <span style={styles.pillWeb}>WEB</span> Pour les données du Site, contactez-nous — nous en détenons très peu (principalement de l'analyse anonymisée si vous y avez consenti).</p>

        <h3 style={styles.h3}>11.2 Droit de rectification</h3>
        <p style={styles.text}>Vous pouvez modifier ou corriger vos données de trading, vos notes et vos réglages dans l'Application.</p>

        <h3 style={styles.h3}>11.3 Droit à l'effacement (« droit à l'oubli »)</h3>
        <p style={styles.text}>Vous pouvez demander la suppression de votre compte et de toutes les données associées :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>En utilisant la fonction « Supprimer le compte » dans les réglages de l'Application</li>
          <li style={styles.li}>En nous contactant à <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a></li>
        </ul>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Pour les cookies/l'analyse du Site, cliquez sur « Refuser » dans la bannière de cookies ou utilisez « Préférences de cookies » dans le pied de page.</p>

        <h3 style={styles.h3}>11.4 Droit à la portabilité des données</h3>
        <p style={styles.text}>Vous pouvez exporter vos données de trading via la fonction d'export intégrée (PDF, et CSV/JSON pour les utilisateurs Premium).</p>

        <h3 style={styles.h3}>11.5 Droit d'opposition</h3>
        <p style={styles.text}>Vous pouvez vous opposer au traitement à des fins d'analyse ou au traitement fondé sur l'intérêt légitime en refusant les cookies (Web) ou en cessant d'utiliser l'application et en supprimant votre compte (App).</p>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Vous pouvez également vous désinscrire à tout moment de notre e-mail de relance produit via le lien en un clic qu'il contient ou à l'adresse <a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>. Cela arrête les e-mails promotionnels sans supprimer votre compte ni affecter les e-mails transactionnels/de sécurité.</p>

        <h3 style={styles.h3}>11.6 Droit de retirer le consentement</h3>
        <p style={styles.text}>Vous pouvez retirer votre consentement à tout moment. Pour l'analyse du Site, utilisez « Préférences de cookies » dans le pied de page. Pour les données de l'App, supprimez votre compte.</p>

        <h3 style={styles.h3}>11.7 Droit d'introduire une réclamation auprès d'une autorité de contrôle</h3>
        <p style={styles.text}>Si vous estimez que vos droits sur les données ont été violés, vous avez le droit de déposer une réclamation auprès d'une autorité de protection des données. En Roumanie, il s'agit de :</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong><br />
          <a style={styles.link} href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>
        </p>
        <p style={styles.text}>Si vous résidez dans un autre État membre de l'UE, vous pouvez saisir votre autorité locale de protection des données.</p>
        <p style={styles.text}>Pour exercer l'un de ces droits, contactez-nous à <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>. Nous répondrons sous 30 jours.</p>

        <h2 style={styles.h2}>12. Confidentialité des enfants et condition d'âge</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> L'Application est destinée aux utilisateurs âgés de 18 ans et plus. Nous ne collectons pas sciemment d'informations auprès de personnes de moins de 18 ans.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Le Site est accessible au public (sans inscription) et ne collecte pas sciemment de données personnelles auprès de qui que ce soit, y compris des mineurs. Nous recommandons une supervision parentale pour les enfants consultant du contenu financier.</p>
        <p style={styles.text}>Si vous êtes parent ou tuteur et pensez que votre enfant nous a fourni des informations personnelles, veuillez nous contacter et nous supprimerons ces informations.</p>

        <h2 style={styles.h2}>13. Transferts internationaux de données</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Les données de l'App sont stockées dans l'UE (région eur3). Lorsque Google Firebase achemine du trafic hors de l'UE, des clauses contractuelles types s'appliquent.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Google Analytics peut transférer les données d'analyse du Site vers les États-Unis dans le cadre du Data Privacy Framework UE–États-Unis, que la Commission européenne a jugé offrir un niveau de protection adéquat.</p>

        <h2 style={styles.h2}>14. Modifications de cette politique de confidentialité</h2>
        <p style={styles.text}>Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous publierons la nouvelle version sur <a style={styles.link} href="https://kmfjournal.com/privacy-policy">kmfjournal.com/privacy-policy</a> et dans l'Application, et mettrons à jour la date « Dernière mise à jour ».</p>
        <p style={styles.text}>Pour les changements importants affectant la manière dont nous traitons vos données, nous fournirons un avis visible. Votre utilisation continue après la publication des changements vaut acceptation.</p>

        <h2 style={styles.h2}>15. Nous contacter</h2>
        <p style={styles.text}>Pour toute question sur cette politique de confidentialité ou pour exercer vos droits :</p>
        <p style={styles.text}>
          <strong style={styles.strong}>E-mail :</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Responsable :</strong> Ionel Aanei (développeur individuel)<br />
          <strong style={styles.strong}>Localisation :</strong> Roumanie (Union européenne)
        </p>
        <p style={styles.text}>Nous répondrons sous 30 jours.</p>
      </div>
    </div>
  );
}

function PrivacyPolicyRu() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Политика конфиденциальности</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — сайт и мобильное приложение</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Последнее обновление: 26 мая 2026 г.</p>
        </div>

        <h2 style={styles.h2}>1. Введение и сфера действия</h2>
        <p style={styles.text}>K.M.F. Trading Journal разрабатывается и управляется <strong style={styles.strong}>Ionel Aanei</strong>, индивидуальным разработчиком (индивидуальным предпринимателем) из Румынии («мы» или «нас»). Настоящая Политика конфиденциальности охватывает:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Сайт по адресу <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> («Сайт»).</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> Мобильное приложение K.M.F. Trading Journal в Google Play («Приложение»).</li>
        </ul>
        <p style={styles.text}>Эта Политика охватывает КАК Сайт, ТАК И Приложение. В каждом разделе указано, к чему он относится. Используя любой из них, вы соглашаетесь со сбором и использованием информации, описанными ниже.</p>

        <h2 style={styles.h2}>2. Контакты и оператор данных</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Оператор данных:</strong> Ionel Aanei (индивидуальный разработчик)<br />
          <strong style={styles.strong}>Эл. почта:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Местоположение:</strong> Румыния (Европейский союз)
        </p>

        <h2 style={styles.h2}>3. Информация, собираемая на Сайте <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 Никаких прямых персональных данных</h3>
        <p style={styles.text}>На Сайте нет формы регистрации, формы обратной связи, рассылки и обработки платежей. Мы не собираем ваше имя, эл. почту, пароль, адрес или любые персональные идентификаторы через сам Сайт.</p>

        <h3 style={styles.h3}>3.2 Аналитика (только с вашего согласия)</h3>
        <p style={styles.text}>Если вы нажмёте <strong style={styles.strong}>«Принять»</strong> в баннере согласия на cookie, мы загрузим Google Analytics 4 (GA4) для сбора анонимной статистики использования:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Просмотренные страницы и время на странице</li>
          <li style={styles.li}>Тип браузера, ОС, категория устройства</li>
          <li style={styles.li}>Примерное местоположение (только страна/регион — IP анонимизируется через <code style={styles.code}>anonymize_ip</code>)</li>
          <li style={styles.li}>Источник перехода (какой сайт привёл вас сюда)</li>
          <li style={styles.li}>События: клики по кнопкам, использование калькуляторов, смена языка</li>
        </ul>
        <p style={styles.text}>Если вы нажмёте <strong style={styles.strong}>«Отклонить»</strong> или ваш браузер отправит сигнал Do Not Track, GA4 <strong style={styles.strong}>не загружается</strong> и cookie аналитики не устанавливаются.</p>

        <h3 style={styles.h3}>3.3 Cookie, устанавливаемые Сайтом</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Cookie</th>
                <th style={styles.th}>Назначение</th>
                <th style={styles.th}>Хранение</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>_ga</code></td><td style={styles.td}>Идентификатор пользователя Google Analytics 4</td><td style={styles.td}>2 года</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>_ga_CTE9Y21S1L</code></td><td style={styles.td}>Состояние сессии GA4</td><td style={styles.td}>2 года</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Оба cookie устанавливаются только после нажатия «Принять». Вы можете изменить свой выбор в любой момент через ссылку <strong style={styles.strong}>«Настройки cookie»</strong> в нижнем колонтитуле Сайта.</p>

        <h3 style={styles.h3}>3.4 Локальное хранилище в вашем браузере</h3>
        <p style={styles.text}>Сайт хранит небольшой объём данных в localStorage вашего браузера, чтобы сохранять ваши настройки между визитами. Эти данные <strong style={styles.strong}>никогда не покидают ваше устройство</strong> и недоступны нам:</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Ключ</th>
                <th style={styles.th}>Назначение</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}><code style={styles.code}>kmf-lang</code></td><td style={styles.td}>Выбранный вами язык интерфейса</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_consent_v1</code></td><td style={styles.td}>Ваше решение о согласии на cookie</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_exchange_rates</code></td><td style={styles.td}>Кэшированные курсы USD для калькулятора лота (обновляются раз в час)</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_v1</code></td><td style={styles.td}>Ваше персональное содержимое чек-листа перед сделкой</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_pretrade_started</code></td><td style={styles.td}>Отметка о том, начали ли вы чек-лист</td></tr>
              <tr><td style={styles.td}><code style={styles.code}>kmf_fav_symbols</code></td><td style={styles.td}>Ваши избранные торговые символы в калькуляторе лота</td></tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Вы можете удалить эти данные в любой момент через опцию «Очистить данные сайта» в браузере.</p>

        <h2 style={styles.h2}>4. Сторонние сервисы, используемые Сайтом <span style={styles.pillWeb}>WEB</span></h2>
        <p style={styles.text}>Сайт загружает ресурсы или данные у следующих третьих сторон. Каждая может получить ваш IP-адрес в рамках стандартного HTTP-запроса:</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Сервис</th>
                <th style={styles.th}>Назначение</th>
                <th style={styles.th}>Конфиденциальность</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Google Analytics 4 (Google LLC)</td>
                <td style={styles.td}>Анонимизированная аналитика (после согласия)</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
              <tr>
                <td style={styles.td}>SaasHunt (saashunt.best)</td>
                <td style={styles.td}>Изображение бейджа «Top 1 Daily Winner» в подвале</td>
                <td style={styles.td}>—</td>
              </tr>
              <tr>
                <td style={styles.td}>Product Hunt (producthunt.com)</td>
                <td style={styles.td}>Изображение бейджа «Featured» в подвале</td>
                <td style={styles.td}><a style={styles.link} href="https://www.producthunt.com/legal/privacy" target="_blank" rel="noopener noreferrer">PH</a></td>
              </tr>
              <tr>
                <td style={styles.td}>ExchangeRate-API (open.er-api.com)</td>
                <td style={styles.td}>Курсы USD для калькулятора лота</td>
                <td style={styles.td}><a style={styles.link} href="https://www.exchangerate-api.com/privacy-policy" target="_blank" rel="noopener noreferrer">ER-API</a></td>
              </tr>
              <tr>
                <td style={styles.td}>Google Play (play.google.com)</td>
                <td style={styles.td}>Цель ссылки и бейдж «Скачать в Google Play»</td>
                <td style={styles.td}><a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>Сайт <strong style={styles.strong}>НЕ</strong> использует: Facebook Pixel, рекламные сети, пиксели ретаргетинга, скрипты социальных плагинов, Hotjar, Sentry, PostHog или аналогичные трекеры.</p>

        <h2 style={styles.h2}>5. Информация, собираемая мобильным Приложением <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>Мобильное Приложение собирает больше данных, чем Сайт, поскольку работает на основе аккаунта. Следующее применяется только после создания аккаунта и входа.</p>

        <h3 style={styles.h3}>5.1 Персональная информация</h3>
        <p style={styles.text}>При создании аккаунта Приложение собирает:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Адрес эл. почты (необходим для аутентификации)</li>
          <li style={styles.li}>Пароль (хешируется Firebase Authentication — никогда не хранится в открытом виде)</li>
        </ul>
        <p style={styles.text}>Для управления вашим аккаунтом и email-коммуникацией мы также храним: выбранный язык приложения, дату регистрации, отметки и метки времени о том, какие письма вам отправлены, ваш статус отписки и уникальный токен отписки, используемый для безопасной обработки ссылок отписки в один клик.</p>

        <p style={styles.text}><strong style={styles.strong}>Приложение НЕ собирает:</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Ваше имя (если вы не предоставите его добровольно)</li>
          <li style={styles.li}>Физический адрес</li>
          <li style={styles.li}>Номер телефона</li>
          <li style={styles.li}>Платёжную информацию (обрабатывается Google Play)</li>
          <li style={styles.li}>Личные фотографии (только связанные со сделками скриншоты, которые вы загружаете)</li>
        </ul>

        <h3 style={styles.h3}>5.2 Торговые данные</h3>
        <p style={styles.text}>Для обеспечения функциональности Приложение хранит:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Детали сделок (инструмент, цена входа, цена выхода, размер лота, прибыль/убыток)</li>
          <li style={styles.li}>Заметки к сделкам, оценки и эмоциональные оценки до/после сделки</li>
          <li style={styles.li}>Ответы чек-листа перед сделкой</li>
          <li style={styles.li}>Ответы еженедельного обзора</li>
          <li style={styles.li}>Фото/скриншоты, которые вы прикрепляете к сделкам</li>
          <li style={styles.li}>Информацию о балансе счёта (вводится вами)</li>
          <li style={styles.li}>Метки времени для всех действий</li>
        </ul>

        <h3 style={styles.h3}>5.3 Технические данные и данные об использовании</h3>
        <p style={styles.text}>Приложение автоматически собирает через Firebase Analytics и Crashlytics:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Модель устройства и версию операционной системы</li>
          <li style={styles.li}>Версию приложения</li>
          <li style={styles.li}>IP-адрес (временно, для целей аутентификации)</li>
          <li style={styles.li}>Журналы сбоев и отчёты об ошибках</li>
          <li style={styles.li}>Аналитику использования (просмотренные экраны, использованные функции, длительность сессии)</li>
          <li style={styles.li}>Уникальные идентификаторы устройства</li>
        </ul>

        <h2 style={styles.h2}>6. Автоматизированное принятие решений и профилирование <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>Приложение использует автоматический анализ предоставленных вами данных для создания выводов для вашего собственного использования. Ни одно из этих решений не имеет юридических или существенных последствий для вас — они носят исключительно рекомендательный характер.</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Trader Personality Profile:</strong> классифицирует ваше поведение по архетипам (Sniper, Robot, Momentum Rider, Wave Rider, Gambler, Revenge Trader) на основе паттернов сделок. Вычисляется локально и хранится с вашим аккаунтом.</li>
          <li style={styles.li}><strong style={styles.strong}>Tilt Detection:</strong> система предупреждений из 4 уровней, которая отмечает возможную эмоциональную торговлю на основе недавних убытков и заявленных вами эмоций. Запускает предупреждения в приложении; вы сохраняете полный контроль над каждой сделкой.</li>
          <li style={styles.li}><strong style={styles.strong}>Honesty Mirror:</strong> сопоставляет ваши собственные оценки качества сделок с фактической прибылью/убытком, чтобы выявить систематическую само­уверенность или неуверенность.</li>
        </ul>
        <p style={styles.text}>Согласно статье 22 GDPR, вы имеете право запросить рассмотрение любого автоматизированного решения человеком.</p>

        <h2 style={styles.h2}>7. Правовое основание обработки (статья 6 GDPR)</h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Данные</th>
                <th style={styles.th}>Область</th>
                <th style={styles.th}>Правовое основание</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>Эл. почта и пароль аккаунта</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Исполнение договора — ст. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>Торговые данные и заметки</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Исполнение договора — ст. 6(1)(b)</td></tr>
              <tr><td style={styles.td}>Аналитика и отчёты о сбоях приложения</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Законный интерес — ст. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>Email-коммуникация (приветствие + напоминание через 7 дней)</td><td style={styles.td}><span style={styles.pillApp}>APP</span></td><td style={styles.td}>Законный интерес — ст. 6(1)(f), с отпиской в один клик</td></tr>
              <tr><td style={styles.td}>Аналитика Сайта (GA4)</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Согласие — ст. 6(1)(a)</td></tr>
              <tr><td style={styles.td}>Сторонние бейджи/API Сайта</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Законный интерес — ст. 6(1)(f)</td></tr>
              <tr><td style={styles.td}>Настройки localStorage</td><td style={styles.td}><span style={styles.pillWeb}>WEB</span></td><td style={styles.td}>Законный интерес</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style={styles.h2}>8. Как мы используем вашу информацию</h2>

        <h3 style={styles.h3}>8.1 Для предоставления функциональности <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Аутентифицировать ваш аккаунт</li>
          <li style={styles.li}>Хранить и синхронизировать ваши торговые данные между устройствами</li>
          <li style={styles.li}>Рассчитывать торговую статистику и показатели эффективности</li>
          <li style={styles.li}>Генерировать PDF-отчёты</li>
          <li style={styles.li}>Отображать вашу историю торговли и аналитику</li>
        </ul>

        <h3 style={styles.h3}>8.2 Для улучшения сервиса <span style={styles.pillWeb}>WEB</span> <span style={styles.pillApp}>APP</span></h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Анализировать паттерны использования для улучшения функций</li>
          <li style={styles.li}>Выявлять и исправлять ошибки и сбои</li>
          <li style={styles.li}>Оптимизировать производительность</li>
        </ul>

        <h3 style={styles.h3}>8.3 Для связи с вами</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Отвечать на ваши запросы в поддержку</li>
          <li style={styles.li}>Отправлять важные обновления о Приложении (при необходимости)</li>
          <li style={styles.li}>Уведомлять вас об изменениях политики</li>
        </ul>

        <p style={styles.text}><strong style={styles.strong}>Мы НЕ используем ваши данные для:</strong></p>
        <ul style={styles.ul}>
          <li style={styles.li}>Сторонних рекламных сетей или таргетинга рекламы</li>
          <li style={styles.li}>Продажи или сдачи в аренду ваших данных третьим лицам</li>
          <li style={styles.li}>Несвязанных коммерческих целей</li>
          <li style={styles.li}>Межсайтового или межустройственного отслеживания сверх того, на что вы явно согласились</li>
        </ul>

        <h3 style={styles.h3}>8.4 Email-коммуникация <span style={styles.pillApp}>APP</span></h3>
        <p style={styles.text}>Когда вы создаёте аккаунт в Приложении, мы можем отправлять следующие письма на ваш зарегистрированный адрес:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Транзакционные письма</strong> — приветственное письмо при создании аккаунта, а также критически важные для сервиса сообщения (например, подтверждение эл. почты, сброс пароля, важные изменения политики). Они необходимы для работы вашего аккаунта, и от них нельзя отказаться, пока ваш аккаунт активен.</li>
          <li style={styles.li}><strong style={styles.strong}>Одно письмо-напоминание о продукте</strong> — примерно через 7 дней после регистрации, приглашающее оставить отзыв или поделиться мнением. Это единственное рекламное письмо, которое мы отправляем.</li>
        </ul>
        <p style={styles.text}>Каждое рекламное письмо содержит <strong style={styles.strong}>ссылку отписки в один клик</strong> (<a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>). Отписка останавливает только рекламные письма — она не влияет на транзакционные письма или письма безопасности и не удаляет ваш аккаунт.</p>

        <h2 style={styles.h2}>9. Сторонние сервисы Приложения <span style={styles.pillApp}>APP</span></h2>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <strong style={styles.strong}>Google Firebase (Google LLC)</strong> — аутентификация, облачная база данных (Firestore), хранение файлов, аналитика, отчёты о сбоях. Конфиденциальность: <a style={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
          </li>
          <li style={styles.li}>
            <strong style={styles.strong}>Twelve Data (Twelve Data Inc.)</strong> — рыночные цены в реальном времени и курсы валют внутри Приложения. Передаваемые данные: запрашиваемые торговые символы, IP-адрес. Персональные или торговые данные не передаются. Конфиденциальность: <a style={styles.link} href="https://twelvedata.com/privacy-policy" target="_blank" rel="noopener noreferrer">twelvedata.com/privacy-policy</a>
          </li>
        </ul>
        <p style={styles.text}>Мы также можем раскрыть информацию, если это требуется по закону или в ответ на правомерные запросы государственных органов.</p>

        <h2 style={styles.h2}>10. Хранение, сроки и безопасность данных</h2>

        <h3 style={styles.h3}>10.1 Место хранения</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Данные аккаунта, торговые данные и аналитика Приложения хранятся на серверах Google Cloud в Европейском союзе (регион eur3) по стандартам, соответствующим GDPR.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Аналитические данные Сайта (если вы согласны) обрабатываются Google Analytics, который может передавать данные на серверы Google в США в рамках EU–US Data Privacy Framework. Данные localStorage остаются полностью на вашем устройстве.</p>

        <h3 style={styles.h3}>10.2 Сроки хранения</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Данные</th>
                <th style={styles.th}>Хранение</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={styles.td}>Данные аккаунта и торговли приложения</td><td style={styles.td}>До удаления вашего аккаунта</td></tr>
              <tr><td style={styles.td}>Журналы сбоев приложения (Crashlytics)</td><td style={styles.td}>90 дней, затем агрегируются и анонимизируются</td></tr>
              <tr><td style={styles.td}>События аналитики приложения</td><td style={styles.td}>14 месяцев (по умолчанию Firebase)</td></tr>
              <tr><td style={styles.td}>Данные GA4 на уровне пользователя</td><td style={styles.td}>14 месяцев</td></tr>
              <tr><td style={styles.td}>Cookie GA4 в вашем браузере</td><td style={styles.td}>2 года (или до отклонения/очистки)</td></tr>
              <tr><td style={styles.td}>Записи localStorage</td><td style={styles.td}>До очистки данных браузера или изменения настроек</td></tr>
              <tr><td style={styles.td}>Резервные снимки</td><td style={styles.td}>До 30 дней после удаления</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={styles.h3}>10.3 Меры безопасности</h3>
        <ul style={styles.ul}>
          <li style={styles.li}>Шифрование при передаче (HTTPS/TLS)</li>
          <li style={styles.li}>Шифрование при хранении (Firebase Firestore зашифрован по умолчанию)</li>
          <li style={styles.li}>Безопасная аутентификация (Firebase Authentication)</li>
          <li style={styles.li}>Хеширование пароля (ваш пароль никогда не хранится в открытом виде)</li>
          <li style={styles.li}>Регулярные обновления безопасности</li>
        </ul>
        <p style={styles.text}>Однако ни один метод передачи или хранения не является на 100 % безопасным. Хотя мы стремимся защитить вашу информацию, мы не можем гарантировать абсолютную безопасность.</p>

        <h2 style={styles.h2}>11. Ваши права на данные по GDPR</h2>

        <h3 style={styles.h3}>11.1 Право на доступ</h3>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Вы можете в любой момент получить доступ ко всем своим данным через Приложение. <span style={styles.pillWeb}>WEB</span> По данным Сайта свяжитесь с нами — у нас их очень мало (в основном анонимизированная аналитика, если вы согласились).</p>

        <h3 style={styles.h3}>11.2 Право на исправление</h3>
        <p style={styles.text}>Вы можете редактировать или исправлять свои торговые данные, заметки и настройки в Приложении.</p>

        <h3 style={styles.h3}>11.3 Право на удаление («право быть забытым»)</h3>
        <p style={styles.text}>Вы можете запросить удаление вашего аккаунта и всех связанных данных:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>С помощью функции «Удалить аккаунт» в настройках Приложения</li>
          <li style={styles.li}>Связавшись с нами по адресу <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a></li>
        </ul>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> По cookie/аналитике Сайта нажмите «Отклонить» в баннере cookie или используйте «Настройки cookie» в подвале.</p>

        <h3 style={styles.h3}>11.4 Право на переносимость данных</h3>
        <p style={styles.text}>Вы можете экспортировать свои торговые данные через встроенную функцию экспорта (PDF, а также CSV/JSON для Premium-пользователей).</p>

        <h3 style={styles.h3}>11.5 Право на возражение</h3>
        <p style={styles.text}>Вы можете возразить против обработки в целях аналитики или обработки на основании законного интереса, отклонив cookie (Web) или прекратив использование и удалив аккаунт (App).</p>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Вы также можете в любой момент отписаться от нашего письма-напоминания о продукте через ссылку в один клик в этом письме или по адресу <a style={styles.link} href="https://kmfjournal.com/unsubscribe">kmfjournal.com/unsubscribe</a>. Это останавливает рекламные письма без удаления аккаунта и без влияния на транзакционные письма/письма безопасности.</p>

        <h3 style={styles.h3}>11.6 Право отозвать согласие</h3>
        <p style={styles.text}>Вы можете отозвать согласие в любой момент. Для аналитики Сайта используйте «Настройки cookie» в подвале. Для данных Приложения удалите свой аккаунт.</p>

        <h3 style={styles.h3}>11.7 Право подать жалобу в надзорный орган</h3>
        <p style={styles.text}>Если вы считаете, что ваши права на данные были нарушены, вы имеете право подать жалобу в орган по защите данных. В Румынии это:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong><br />
          <a style={styles.link} href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>
        </p>
        <p style={styles.text}>Если вы проживаете в другом государстве — члене ЕС, вы можете обратиться в свой местный орган по защите данных.</p>
        <p style={styles.text}>Чтобы воспользоваться любым из этих прав, свяжитесь с нами по адресу <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>. Мы ответим в течение 30 дней.</p>

        <h2 style={styles.h2}>12. Конфиденциальность детей и возрастное требование</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Приложение предназначено для пользователей в возрасте 18 лет и старше. Мы сознательно не собираем информацию от лиц младше 18 лет.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Сайт общедоступен (без регистрации) и сознательно не собирает персональные данные ни у кого, включая несовершеннолетних. Мы рекомендуем родительский контроль для детей, просматривающих финансовый контент.</p>
        <p style={styles.text}>Если вы родитель или опекун и считаете, что ваш ребёнок предоставил нам персональную информацию, свяжитесь с нами, и мы удалим эту информацию.</p>

        <h2 style={styles.h2}>13. Международная передача данных</h2>
        <p style={styles.text}><span style={styles.pillApp}>APP</span> Данные Приложения хранятся в ЕС (регион eur3). Там, где Google Firebase направляет трафик за пределы ЕС, применяются стандартные договорные положения.</p>
        <p style={styles.text}><span style={styles.pillWeb}>WEB</span> Google Analytics может передавать аналитические данные Сайта в США в рамках EU–US Data Privacy Framework, который Европейская комиссия признала обеспечивающим адекватный уровень защиты.</p>

        <h2 style={styles.h2}>14. Изменения настоящей Политики</h2>
        <p style={styles.text}>Мы можем время от времени обновлять настоящую Политику конфиденциальности. Мы опубликуем новую версию по адресу <a style={styles.link} href="https://kmfjournal.com/privacy-policy">kmfjournal.com/privacy-policy</a> и в Приложении, а также обновим дату «Последнее обновление».</p>
        <p style={styles.text}>При существенных изменениях, влияющих на способ обработки ваших данных, мы предоставим заметное уведомление. Продолжение использования после публикации изменений означает их принятие.</p>

        <h2 style={styles.h2}>15. Свяжитесь с нами</h2>
        <p style={styles.text}>По вопросам настоящей Политики конфиденциальности или для реализации ваших прав на данные:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Эл. почта:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Оператор:</strong> Ionel Aanei (индивидуальный разработчик)<br />
          <strong style={styles.strong}>Местоположение:</strong> Румыния (Европейский союз)
        </p>
        <p style={styles.text}>Мы ответим в течение 30 дней.</p>
      </div>
    </div>
  );
}

const styles = {
  h2: { fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 36, marginBottom: 12 },
  h3: { fontSize: 16, fontWeight: 600, color: '#E0E0E0', marginTop: 24, marginBottom: 10 },
  text: { fontSize: 15, lineHeight: 1.7, color: '#C0C0C0', marginBottom: 16 },
  strong: { color: '#E0E0E0' },
  link: { color: '#4FC3F7', textDecoration: 'underline' },
  ul: { paddingLeft: 20, marginBottom: 16 },
  li: { fontSize: 15, lineHeight: 1.7, color: '#C0C0C0', marginBottom: 8 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 14px', fontSize: 13, fontWeight: 600, color: '#4FC3F7', borderBottom: '1px solid #1E2538' },
  td: { padding: '10px 14px', fontSize: 14, color: '#C0C0C0', borderBottom: '1px solid #1E2538', verticalAlign: 'top' },
  code: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13, background: 'rgba(79,195,247,0.08)', padding: '1px 6px', borderRadius: 4, color: '#4FC3F7' },
  pillWeb: { display: 'inline-block', fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.04em', background: '#4FC3F7', color: '#0F1115', marginRight: 4 },
  pillApp: { display: 'inline-block', fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.04em', background: '#FFB300', color: '#1A1200', marginRight: 4 },
};

export default PrivacyPolicyPage;
