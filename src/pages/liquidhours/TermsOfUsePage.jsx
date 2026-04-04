import { useEffect } from 'react';

const TermsOfUsePage = () => {
  useEffect(() => {
    document.title = 'Terms of Use — LiquidHours';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Terms of Use for LiquidHours — Forex Session Clock app by KMF Development.');
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute('content', 'noindex');
    return () => {
      if (robots) robots.setAttribute('content', 'index, follow');
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#080E1A', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Terms of Use</h1>
          <p style={{ fontSize: 14, color: '#7B5EA7', fontWeight: 600 }}>LiquidHours</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Last updated: April 4, 2026</p>
        </div>

        <p style={styles.text}>
          Please read these Terms of Use ("Terms") carefully before using the LiquidHours application ("the App") developed by KMF Development ("we", "us", or "our").
        </p>
        <p style={styles.text}>
          By downloading, installing, or using the App, you agree to be bound by these Terms. If you do not agree, do not use the App.
        </p>

        <h2 style={styles.h2}>1. Description of the App</h2>
        <p style={styles.text}>
          LiquidHours is a free informational tool that displays forex (foreign exchange) market trading session times, session overlaps, and trading pair volatility information. The App provides a visual 24-hour clock showing when major forex sessions (Sydney, Tokyo, London, New York) are open, and a guide to trading pair activity across sessions.
        </p>

        <h2 style={styles.h2}>2. Not Financial Advice</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>The App does not provide financial advice, investment recommendations, or trading signals.</strong>
        </p>
        <p style={styles.text}>
          All information displayed in the App — including session times, overlap periods, and volatility indicators — is for <strong style={styles.strong}>informational and educational purposes only</strong>. The App is designed to help users understand forex market hours and session dynamics.
        </p>
        <p style={styles.text}>You acknowledge that:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Trading foreign exchange carries a high level of risk and may not be suitable for all investors.</li>
          <li style={styles.li}>Past performance and session patterns do not guarantee future results.</li>
          <li style={styles.li}>Any trading decisions you make are your sole responsibility.</li>
          <li style={styles.li}>We are not a financial advisor, broker, or dealer.</li>
          <li style={styles.li}>You should consult with a qualified financial professional before making any investment decisions.</li>
          <li style={styles.li}>We do not guarantee the accuracy, completeness, or timeliness of any information displayed in the App.</li>
        </ul>

        <h2 style={styles.h2}>3. Market Hours Accuracy</h2>
        <p style={styles.text}>
          The App displays forex market session hours based on standard schedules and adjusts for Daylight Saving Time (DST) changes automatically using timezone data from your device's operating system.
        </p>
        <p style={styles.text}>However, we do not guarantee that the displayed hours are accurate at all times. Market hours may differ due to:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>National or international holidays</li>
          <li style={styles.li}>Unexpected market closures</li>
          <li style={styles.li}>Broker-specific trading hours</li>
          <li style={styles.li}>Changes in DST rules by governments</li>
          <li style={styles.li}>Device timezone misconfiguration</li>
        </ul>
        <p style={styles.text}>You should always verify market hours with your broker before trading.</p>

        <h2 style={styles.h2}>4. Notifications and Alerts</h2>
        <p style={styles.text}>
          The App can send notifications before trading sessions open, based on your configured preferences. These alerts are scheduled locally on your device using Android's alarm system.
        </p>
        <p style={styles.text}>We do not guarantee that notifications will be delivered on time or at all. Notification delivery depends on:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Your device's battery optimization settings</li>
          <li style={styles.li}>Android system restrictions on background processes</li>
          <li style={styles.li}>Whether you have granted the necessary permissions</li>
          <li style={styles.li}>Device restarts between alarm scheduling and trigger time</li>
        </ul>
        <p style={styles.text}>Do not rely solely on the App's notifications for time-sensitive trading decisions.</p>

        <h2 style={styles.h2}>5. Paid App</h2>
        <p style={styles.text}>
          The App is available as a one-time paid purchase through the Google Play Store. The purchase price is set on the store listing at the time of download. There are no subscriptions, in-app purchases, or hidden fees beyond the initial purchase.
        </p>
        <p style={styles.text}>
          Refund policies are governed by the Google Play Store terms. We reserve the right to change the price in future, but any such change will not affect users who have already purchased the App.
        </p>

        <h2 style={styles.h2}>6. Intellectual Property</h2>
        <p style={styles.text}>
          All content in the App — including but not limited to the design, logo, clock interface, code, text, and graphics — is the property of KMF Development and is protected by applicable intellectual property laws.
        </p>
        <p style={styles.text}>You may not:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Copy, modify, or distribute the App or any part of it</li>
          <li style={styles.li}>Reverse engineer, decompile, or disassemble the App</li>
          <li style={styles.li}>Use the App's design, branding, or content for commercial purposes</li>
          <li style={styles.li}>Create derivative works based on the App</li>
        </ul>

        <h2 style={styles.h2}>7. User Conduct</h2>
        <p style={styles.text}>You agree to use the App only for its intended purpose: viewing forex market session information. You agree not to:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Attempt to interfere with the App's functionality</li>
          <li style={styles.li}>Use the App in any way that violates applicable laws</li>
          <li style={styles.li}>Distribute modified versions of the App</li>
        </ul>

        <h2 style={styles.h2}>8. Disclaimer of Warranties</h2>
        <p style={styles.text}>
          The App is provided <strong style={styles.strong}>"as is"</strong> and <strong style={styles.strong}>"as available"</strong> without warranties of any kind, whether express or implied, including but not limited to:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Implied warranties of merchantability</li>
          <li style={styles.li}>Fitness for a particular purpose</li>
          <li style={styles.li}>Accuracy or reliability of displayed information</li>
          <li style={styles.li}>Uninterrupted or error-free operation</li>
        </ul>

        <h2 style={styles.h2}>9. Limitation of Liability</h2>
        <p style={styles.text}>To the maximum extent permitted by applicable law, KMF Development shall not be liable for any:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Direct, indirect, incidental, special, or consequential damages</li>
          <li style={styles.li}>Loss of profits, data, or business opportunities</li>
          <li style={styles.li}>Financial losses resulting from trading decisions made based on information displayed in the App</li>
        </ul>
        <p style={styles.text}>This limitation applies regardless of the theory of liability (contract, tort, negligence, or otherwise), even if we have been advised of the possibility of such damages.</p>

        <h2 style={styles.h2}>10. Indemnification</h2>
        <p style={styles.text}>
          You agree to indemnify and hold harmless KMF Development from any claims, damages, losses, or expenses (including legal fees) arising from your use of the App or your violation of these Terms.
        </p>

        <h2 style={styles.h2}>11. Termination</h2>
        <p style={styles.text}>
          We reserve the right to discontinue the App at any time without notice. Upon discontinuation, these Terms will remain in effect for any period during which you continue to use a previously installed version.
        </p>
        <p style={styles.text}>You may terminate these Terms at any time by uninstalling the App from your device.</p>

        <h2 style={styles.h2}>12. Changes to These Terms</h2>
        <p style={styles.text}>
          We may update these Terms from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the App after any changes constitutes acceptance of the new Terms.
        </p>

        <h2 style={styles.h2}>13. Governing Law</h2>
        <p style={styles.text}>
          These Terms shall be governed by and construed in accordance with the laws of Romania, without regard to its conflict of law provisions.
        </p>

        <h2 style={styles.h2}>14. Severability</h2>
        <p style={styles.text}>
          If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
        </p>

        <h2 style={styles.h2}>15. Contact Us</h2>
        <p style={styles.text}>If you have questions about these Terms, contact us at:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Email:</strong> contact@kmfjournal.com<br />
          <strong style={styles.strong}>Developer:</strong> KMF Development
        </p>
      </div>
    </div>
  );
};

const styles = {
  h2: { fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 36, marginBottom: 12 },
  text: { fontSize: 15, lineHeight: 1.7, color: '#C0C0C0', marginBottom: 16 },
  strong: { color: '#E0E0E0' },
  ul: { paddingLeft: 20, marginBottom: 16 },
  li: { fontSize: 15, lineHeight: 1.7, color: '#C0C0C0', marginBottom: 8 },
};

export default TermsOfUsePage;
