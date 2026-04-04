import { useEffect } from 'react';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    document.title = 'Privacy Policy — LiquidHours';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Privacy Policy for LiquidHours — Forex Session Clock app. LiquidHours does not collect any personal data and works entirely offline.');
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
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: '#7B5EA7', fontWeight: 600 }}>LiquidHours</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Last updated: April 4, 2026</p>
        </div>

        <p style={styles.text}>
          KMF Development ("we", "us", or "our") built the LiquidHours app as a paid application. This page informs you of our policies regarding the collection, use, and disclosure of information when you use our app.
        </p>

        <h2 style={styles.h2}>Information We Do Not Collect</h2>
        <p style={styles.text}>LiquidHours is designed with privacy as a core principle. The app:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Does not collect personal data</strong> — We do not collect your name, email address, phone number, location, device ID, or any other personally identifiable information.</li>
          <li style={styles.li}><strong style={styles.strong}>Does not use analytics or tracking</strong> — There is no Firebase Analytics, Google Analytics, Mixpanel, or any other tracking service integrated into the app.</li>
          <li style={styles.li}><strong style={styles.strong}>Does not include crash reporting</strong> — No crash reports are sent to us or any third party.</li>
          <li style={styles.li}><strong style={styles.strong}>Does not make network requests</strong> — The app functions entirely offline. It does not connect to the internet, does not communicate with any server, and does not transmit any data whatsoever.</li>
          <li style={styles.li}><strong style={styles.strong}>Does not contain advertisements</strong> — There are no ads, no advertising SDKs, and no ad-related tracking.</li>
          <li style={styles.li}><strong style={styles.strong}>Does not use third-party data collection SDKs</strong> — The app uses only official Android Jetpack libraries maintained by Google. No third-party libraries that collect user data are included.</li>
        </ul>

        <h2 style={styles.h2}>Information Stored Locally on Your Device</h2>
        <p style={styles.text}>
          LiquidHours stores a small amount of user preferences locally on your device using Android DataStore. This data never leaves your device (except through Android's optional backup system — see below). The stored preferences include:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Language preference</strong> (English or Romanian)</li>
          <li style={styles.li}><strong style={styles.strong}>Time display settings</strong> (UTC toggle, 12-hour or 24-hour format)</li>
          <li style={styles.li}><strong style={styles.strong}>Favorite trading pairs</strong> (which pairs you marked with a star)</li>
          <li style={styles.li}><strong style={styles.strong}>Notification alert settings</strong> (which session alerts are enabled, how many minutes before)</li>
          <li style={styles.li}><strong style={styles.strong}>Disclaimer acceptance status</strong> (whether you accepted the initial disclaimer)</li>
        </ul>
        <p style={styles.text}>This data is stored only on your device and is not accessible to us or any third party.</p>

        <h2 style={styles.h2}>Android Backup</h2>
        <p style={styles.text}>
          If you have Google Drive backup enabled on your Android device, your app preferences (language, favorites, display settings) may be automatically backed up to your Google account by the Android operating system. This is a standard Android feature controlled entirely by you. You can disable it in your device settings under <strong style={styles.strong}>Settings &gt; Google &gt; Backup</strong>.
        </p>
        <p style={styles.text}>We do not have access to your Google Drive backup data.</p>

        <h2 style={styles.h2}>Permissions</h2>
        <p style={styles.text}>LiquidHours requests the following Android permissions, each used solely for the stated purpose:</p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>Permission</th>
                <th style={styles.th}>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}><strong style={styles.strong}>Notifications</strong> (POST_NOTIFICATIONS)</td>
                <td style={styles.td}>To send you session opening alerts that you have configured in Settings. Only requested on Android 13 and above.</td>
              </tr>
              <tr>
                <td style={styles.td}><strong style={styles.strong}>Exact Alarms</strong> (SCHEDULE_EXACT_ALARM)</td>
                <td style={styles.td}>To schedule precise alerts before trading sessions open, at the exact minute you configured.</td>
              </tr>
              <tr>
                <td style={styles.td}><strong style={styles.strong}>Boot Completed</strong> (RECEIVE_BOOT_COMPLETED)</td>
                <td style={styles.td}>To reschedule your configured alerts after your device restarts, so you don't miss notifications.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={styles.text}>The app does <strong style={styles.strong}>not</strong> request permissions for internet access, location, camera, microphone, contacts, calendar, storage, or phone state.</p>

        <h2 style={styles.h2}>Contact and Feedback</h2>
        <p style={styles.text}>
          The app includes a "Contact / Feedback" option in Settings that opens your device's email app with a pre-filled template addressed to <strong style={styles.strong}>contact@kmfjournal.com</strong>. This action:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Opens your default email client — the app itself does not send any email.</li>
          <li style={styles.li}>Does not automatically include any device information — any details you share are typed by you voluntarily.</li>
          <li style={styles.li}>Does not store, read, or access your email address or email content.</li>
        </ul>
        <p style={styles.text}>If you choose to send us an email, we will only use your message to respond to your feedback. We will not add your email address to any mailing list or share it with third parties.</p>

        <h2 style={styles.h2}>Children's Privacy</h2>
        <p style={styles.text}>
          LiquidHours is a financial information tool intended for adults. We do not knowingly collect any data from children under the age of 13. Since the app does not collect any personal data from any user, no special measures for children's data are necessary.
        </p>

        <h2 style={styles.h2}>Links to External Sites</h2>
        <p style={styles.text}>The app contains links to:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong style={styles.strong}>Google Play Store</strong> (for rating the app)</li>
          <li style={styles.li}><strong style={styles.strong}>Privacy Policy page</strong> (this document)</li>
        </ul>
        <p style={styles.text}>When you follow these links, you leave our app and are subject to the privacy policies of those external sites. We have no control over and assume no responsibility for the content or privacy practices of any third-party sites.</p>

        <h2 style={styles.h2}>Changes to This Privacy Policy</h2>
        <p style={styles.text}>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this page periodically.
        </p>
        <p style={styles.text}>Since the app does not collect data and does not connect to the internet, changes to this policy will only take effect when you update the app to a new version.</p>

        <h2 style={styles.h2}>Contact Us</h2>
        <p style={styles.text}>If you have questions or concerns about this Privacy Policy, contact us at:</p>
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
  th: { textAlign: 'left', padding: '10px 14px', fontSize: 13, fontWeight: 600, color: '#7B5EA7', borderBottom: '1px solid #1E2538' },
  td: { padding: '10px 14px', fontSize: 14, color: '#C0C0C0', borderBottom: '1px solid #1E2538' },
};

export default PrivacyPolicyPage;
