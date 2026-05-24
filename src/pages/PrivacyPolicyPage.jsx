import { useEffect } from 'react';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    document.title = 'Privacy Policy — K.M.F. Trading Journal';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Privacy Policy for K.M.F. Trading Journal — covers the kmfjournal.com website and the Android app. GDPR-compliant. Cookie usage and third-party services explained in plain language.'
      );
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Website &amp; Mobile App</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Last updated: May 23, 2026</p>
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
          <li style={styles.li}>Marketing or advertising purposes</li>
          <li style={styles.li}>Selling to third parties</li>
          <li style={styles.li}>Unrelated commercial purposes</li>
          <li style={styles.li}>Cross-site or cross-device tracking beyond what you explicitly consent to</li>
        </ul>

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
