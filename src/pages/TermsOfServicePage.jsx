import { useEffect } from 'react';

const TermsOfServicePage = () => {
  useEffect(() => {
    document.title = 'Terms of Service — K.M.F. Trading Journal';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Terms of Service for K.M.F. Trading Journal — covers the kmfjournal.com website and the Android app. Plain language. Romanian law.'
      );
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Terms of Service</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Website &amp; Mobile App</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Last updated: May 23, 2026</p>
        </div>

        <p style={styles.text}>
          These Terms of Service ("Terms") constitute a legally binding agreement between you and Ionel Aanei, an individual developer (sole trader) based in Romania ("we", "us", or "our"), concerning your use of:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> The website at <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> (the "Website")</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> The K.M.F. Trading Journal mobile application on Google Play (the "App")</li>
        </ul>
        <p style={styles.text}>
          <strong style={styles.strong}>By using the Website or App, you agree to be bound by these Terms. If you do not agree, do not use them.</strong>
        </p>

        <h2 style={styles.h2}>1. Description of Service</h2>
        <p style={styles.text}>
          K.M.F. Trading Journal is a trading performance tracking and analysis tool. The Website provides marketing information, blog articles, free calculators, and the Privacy Policy / Terms. The App allows you to log trades, analyze performance, use pre-trade checklists, generate PDF reports, and sync data across devices.
        </p>
        <p style={styles.text}>Both are provided "as is" and are intended for personal trading record-keeping, education, and analysis only.</p>

        <h2 style={styles.h2}>2. Not Financial Advice</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>K.M.F. Trading Journal is a tracking, analysis, and educational tool only. We do not provide financial advice, investment recommendations, or trading signals.</strong>
        </p>
        <p style={styles.text}>All content — blog articles, calculator outputs, App statistics, the Pre-Trade Checklist, the Risk of Ruin tool — is for <strong style={styles.strong}>informational and educational purposes only</strong>.</p>
        <p style={styles.text}>You acknowledge that:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Trading carries substantial risk of loss and may not be suitable for all investors.</li>
          <li style={styles.li}>You may lose all or more than your invested capital.</li>
          <li style={styles.li}>Past performance does not guarantee future results.</li>
          <li style={styles.li}>You are solely responsible for all trading decisions.</li>
          <li style={styles.li}>We are not licensed financial advisors, brokers, or dealers.</li>
          <li style={styles.li}>You should consult with a qualified financial professional before making investment decisions.</li>
          <li style={styles.li}>We do not guarantee the accuracy or completeness of any calculator, statistic, or educational content.</li>
          <li style={styles.li}>You should only trade with money you can afford to lose.</li>
        </ul>

        <h2 style={styles.h2}>3. Website Use <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 No Account Required</h3>
        <p style={styles.text}>The Website is publicly accessible. No account, signup, or payment is required to browse content, use calculators, or read the blog.</p>

        <h3 style={styles.h3}>3.2 Free Tools</h3>
        <p style={styles.text}>The calculators on the Website (Lot Size, Risk of Ruin, Win Rate vs R:R Matrix, Compound, Pre-Trade Checklist) are free to use. All calculations are performed in your browser. Outputs are informational only and are not investment advice.</p>

        <h3 style={styles.h3}>3.3 Acceptable Use</h3>
        <p style={styles.text}>You may use the Website for personal, non-commercial purposes. You agree not to:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Scrape, copy, or extract content using automated means without permission</li>
          <li style={styles.li}>Republish blog articles or calculator outputs as your own work</li>
          <li style={styles.li}>Attempt to interfere with the Website's functionality</li>
          <li style={styles.li}>Use the Website in any way that violates applicable laws</li>
        </ul>

        <h2 style={styles.h2}>4. App Account &amp; Use <span style={styles.pillApp}>APP</span></h2>

        <h3 style={styles.h3}>4.1 Account Creation</h3>
        <p style={styles.text}>To use the App, you must:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Provide a valid email address</li>
          <li style={styles.li}>Create a secure password</li>
          <li style={styles.li}>Be at least 18 years of age (or legal age in your jurisdiction)</li>
          <li style={styles.li}>Agree to these Terms and our Privacy Policy</li>
        </ul>

        <h3 style={styles.h3}>4.2 Account Security</h3>
        <p style={styles.text}>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized access. We are not liable for any loss or damage resulting from your failure to protect your account information.</p>

        <h3 style={styles.h3}>4.3 Acceptable App Use</h3>
        <p style={styles.text}>You may use the App solely for personal, non-commercial trading record-keeping and analysis. You agree NOT to:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Use the App for any illegal purpose</li>
          <li style={styles.li}>Reverse engineer, decompile, or disassemble the App</li>
          <li style={styles.li}>Interfere with or disrupt the App's functionality or servers</li>
          <li style={styles.li}>Use automated scripts, bots, or similar tools without authorization</li>
          <li style={styles.li}>Share your account credentials with others</li>
          <li style={styles.li}>Upload malicious code, viruses, or harmful content</li>
          <li style={styles.li}>Abuse, harass, or harm other users</li>
          <li style={styles.li}>Violate any third-party rights</li>
          <li style={styles.li}>Use the App to provide services to third parties commercially</li>
        </ul>

        <h3 style={styles.h3}>4.4 Consequences of Violation</h3>
        <p style={styles.text}>Violation may result in immediate suspension or termination of your account, legal action where applicable, and reporting to appropriate authorities.</p>

        <h2 style={styles.h2}>5. Intellectual Property</h2>
        <p style={styles.text}>The Website and App — including all content, designs, logos, blog articles, calculator implementations, code, text, and graphics — is the property of Ionel Aanei and is protected by international copyright, trademark, and other intellectual property laws.</p>
        <p style={styles.text}>We grant you a limited, non-exclusive, non-transferable, revocable license to use the App for personal purposes and to read the Website's content. You may not:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Copy, modify, or distribute the App or any part of it</li>
          <li style={styles.li}>Reverse engineer, decompile, or disassemble the App</li>
          <li style={styles.li}>Use our design, branding, or content for commercial purposes</li>
          <li style={styles.li}>Create derivative works based on the App or Website</li>
        </ul>
        <p style={styles.text}>
          You retain ownership of all trading data, notes, and content you create in the App ("Your Content"). By using the App, you grant us a license to store, process, and display Your Content solely for the purpose of providing the App's functionality. We will not share, sell, or use Your Content for any other purpose, except as required by law.
        </p>

        <h2 style={styles.h2}>6. Subscriptions and Payments <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>The App offers both free features and Premium features available through subscription.</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Subscriptions are billed through Google Play</li>
          <li style={styles.li}>Subscriptions automatically renew unless canceled</li>
          <li style={styles.li}>You can cancel anytime through Google Play settings</li>
          <li style={styles.li}>No refunds for partial periods (subject to Google Play refund policy)</li>
          <li style={styles.li}>Prices are subject to change with notice</li>
        </ul>
        <p style={styles.text}>All payments are processed by Google Play. We do not store or have access to your payment information.</p>

        <h2 style={styles.h2}>7. Data and Privacy</h2>
        <p style={styles.text}>Your use of the Website and App is also governed by our <a style={styles.link} href="/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference.</p>
        <p style={styles.text}>Key points:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> The Website does not collect personal data directly. Analytics cookies are loaded only after explicit consent.</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> The App collects data necessary to provide functionality (email, trading data, analytics).</li>
          <li style={styles.li}>App data is stored in the European Union (eur3 region).</li>
          <li style={styles.li}>We do not sell your data to third parties.</li>
          <li style={styles.li}>You can request deletion of your account and data at any time.</li>
        </ul>

        <h2 style={styles.h2}>8. Disclaimer of Warranties</h2>
        <p style={styles.text}>
          The Website and App are provided <strong style={styles.strong}>"as is"</strong> and <strong style={styles.strong}>"as available"</strong>, without warranties of any kind, whether express or implied, including:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Implied warranties of merchantability</li>
          <li style={styles.li}>Fitness for a particular purpose</li>
          <li style={styles.li}>Accuracy or reliability of calculations, statistics, or educational content</li>
          <li style={styles.li}>Uninterrupted or error-free operation</li>
          <li style={styles.li}>Prompt correction of defects</li>
          <li style={styles.li}>Permanent retention of any data (though we implement backup measures)</li>
        </ul>

        <h2 style={styles.h2}>9. Limitation of Liability</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>To the maximum extent permitted by law, Ionel Aanei is not liable for any:</strong>
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Trading losses or financial damages of any kind</li>
          <li style={styles.li}>Lost profits or business opportunities</li>
          <li style={styles.li}>Data loss or corruption (though we implement backups)</li>
          <li style={styles.li}>Indirect, incidental, consequential, special, or punitive damages</li>
          <li style={styles.li}>Damages resulting from unauthorized access to your account</li>
          <li style={styles.li}>Damages caused by third-party services (Firebase, Google Cloud, Google Analytics, Google Play, Twelve Data)</li>
        </ul>
        <p style={styles.text}>This limitation applies regardless of the theory of liability (contract, tort, negligence, or otherwise), even if we have been advised of the possibility of such damages.</p>
        <p style={styles.text}>Our total liability to you for all claims shall not exceed the total amounts paid by you to us in the twelve (12) months preceding the claim. For Website users who have not paid us, our maximum liability is limited to €100.</p>

        <h2 style={styles.h2}>10. User Responsibility</h2>
        <p style={styles.text}>You acknowledge that:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>You are solely responsible for your trading decisions.</li>
          <li style={styles.li}>We have no control over financial markets.</li>
          <li style={styles.li}>App statistics and calculator outputs are based on data YOU provide.</li>
          <li style={styles.li}>You should verify all calculations independently.</li>
          <li style={styles.li}>You should back up important data.</li>
        </ul>

        <h2 style={styles.h2}>11. Indemnification</h2>
        <p style={styles.text}>
          You agree to indemnify, defend, and hold harmless Ionel Aanei from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Website or App, your violation of these Terms, your violation of any law or third-party rights, or your trading activities and decisions.
        </p>

        <h2 style={styles.h2}>12. Termination</h2>

        <h3 style={styles.h3}>12.1 Termination by You</h3>
        <p style={styles.text}>You may terminate your App account at any time by:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Using the "Delete Account" feature in the App Settings</li>
          <li style={styles.li}>Contacting us at <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a></li>
        </ul>
        <p style={styles.text}>For the Website, you may stop visiting at any time without notice.</p>

        <h3 style={styles.h3}>12.2 Termination by Us</h3>
        <p style={styles.text}>We may suspend or terminate your account immediately, without notice, if you violate these Terms, engage in fraudulent or illegal activities, abuse the App or other users, or where required by law. We may also discontinue the App with reasonable notice.</p>

        <h2 style={styles.h2}>13. Modifications to Terms</h2>
        <p style={styles.text}>We may modify these Terms at any time. We will notify you of material changes by updating the "Last Updated" date, posting a notice in the App, or sending an email to your registered address (for significant App account changes). Your continued use after changes are posted constitutes acceptance of the modified Terms.</p>

        <h2 style={styles.h2}>14. Governing Law and Disputes</h2>
        <p style={styles.text}>These Terms are governed by the laws of Romania, without regard to conflict of law principles.</p>
        <p style={styles.text}>Any disputes shall be resolved through (in order):</p>
        <ol style={{ ...styles.ul, listStyleType: 'decimal' }}>
          <li style={styles.li}>Good faith negotiations between parties</li>
          <li style={styles.li}>Mediation, if negotiations fail</li>
          <li style={styles.li}>Romanian courts, if mediation fails</li>
        </ol>

        <h2 style={styles.h2}>15. Miscellaneous</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and Ionel Aanei.<br />
          <strong style={styles.strong}>Severability:</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full effect.<br />
          <strong style={styles.strong}>Waiver:</strong> Our failure to enforce any provision does not constitute a waiver of that provision.<br />
          <strong style={styles.strong}>Assignment:</strong> You may not assign or transfer these Terms. We may assign our rights and obligations without your consent.
        </p>

        <h2 style={styles.h2}>16. Contact</h2>
        <p style={styles.text}>For questions about these Terms:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Email:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Developer:</strong> Ionel Aanei (individual developer)<br />
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
  pillWeb: { display: 'inline-block', fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.04em', background: '#4FC3F7', color: '#0F1115', marginRight: 4 },
  pillApp: { display: 'inline-block', fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.04em', background: '#FFB300', color: '#1A1200', marginRight: 4 },
};

export default TermsOfServicePage;
