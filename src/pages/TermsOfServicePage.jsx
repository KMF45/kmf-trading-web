import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const META = {
  en: {
    title: 'Terms of Service — K.M.F. Trading Journal',
    desc: 'Terms of Service for K.M.F. Trading Journal — covers the kmfjournal.com website and the Android app. Plain language. Romanian law.',
  },
  ro: {
    title: 'Termeni și Condiții — K.M.F. Trading Journal',
    desc: 'Termenii și condițiile pentru K.M.F. Trading Journal — acoperă site-ul kmfjournal.com și aplicația de Android. Limbaj simplu. Lege română.',
  },
  de: {
    title: 'Nutzungsbedingungen — K.M.F. Trading Journal',
    desc: 'Nutzungsbedingungen für K.M.F. Trading Journal — gelten für die Website kmfjournal.com und die Android-App. Einfache Sprache. Rumänisches Recht.',
  },
  fr: {
    title: 'Conditions d\'utilisation — K.M.F. Trading Journal',
    desc: 'Conditions d\'utilisation de K.M.F. Trading Journal — couvrent le site kmfjournal.com et l\'application Android. Langage clair. Droit roumain.',
  },
  ru: {
    title: 'Условия использования — K.M.F. Trading Journal',
    desc: 'Условия использования K.M.F. Trading Journal — охватывают сайт kmfjournal.com и приложение для Android. Простой язык. Право Румынии.',
  },
};

const TermsOfServicePage = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    const m = META[lang] || META.en;
    document.title = m.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', m.desc);
  }, [lang]);

  if (lang === 'ro') return <TermsOfServiceRo />;
  if (lang === 'de') return <TermsOfServiceDe />;
  if (lang === 'fr') return <TermsOfServiceFr />;
  if (lang === 'ru') return <TermsOfServiceRu />;

  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Terms of Service</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Website &amp; Mobile App</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Last updated: May 26, 2026</p>
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
        <p style={styles.text}>By creating an account, you agree that we may send service-critical (transactional) emails and one product follow-up email to your registered address. You can opt out of the follow-up email at any time via the one-click unsubscribe link it contains, without affecting transactional emails. See our <a style={styles.link} href="/privacy-policy">Privacy Policy</a> for details.</p>

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

function TermsOfServiceRo() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Termeni și Condiții</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Site &amp; Aplicație mobilă</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Ultima actualizare: 26 mai 2026</p>
        </div>

        <p style={styles.text}>
          Acești Termeni și Condiții („Termenii") formează un acord obligatoriu din punct de vedere legal între tine și Ionel Aanei, dezvoltator individual (persoană fizică) din România („noi" sau „al nostru"), privind folosirea:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Site-ul de la <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> („Site-ul")</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> Aplicația mobilă K.M.F. Trading Journal din Google Play („Aplicația")</li>
        </ul>
        <p style={styles.text}>
          <strong style={styles.strong}>Folosind Site-ul sau Aplicația, ești de acord să respecți acești Termeni. Dacă nu ești de acord, nu le folosi.</strong>
        </p>

        <h2 style={styles.h2}>1. Descrierea Serviciului</h2>
        <p style={styles.text}>
          K.M.F. Trading Journal este un instrument de urmărire și analiză a performanței în trading. Site-ul oferă informații de prezentare, articole de blog, calculatoare gratuite și Politica de Confidențialitate / Termenii. Aplicația îți permite să loghezi trade-uri, să analizezi performanța, să folosești checklist-uri pre-trade, să generezi rapoarte PDF și să sincronizezi datele între dispozitive.
        </p>
        <p style={styles.text}>Ambele sunt oferite „ca atare" și sunt destinate doar pentru ținerea personală a evidenței trade-urilor, educație și analiză.</p>

        <h2 style={styles.h2}>2. Nu Este Sfat Financiar</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>K.M.F. Trading Journal este doar un instrument de urmărire, analiză și educație. Nu oferim sfaturi financiare, recomandări de investiții sau semnale de trading.</strong>
        </p>
        <p style={styles.text}>Tot conținutul — articole de blog, rezultate ale calculatoarelor, statistici din Aplicație, Pre-Trade Checklist, instrumentul Risk of Ruin — are <strong style={styles.strong}>scop pur informativ și educativ</strong>.</p>
        <p style={styles.text}>Recunoști că:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Trading-ul implică un risc mare de pierdere și poate să nu fie potrivit pentru toți investitorii.</li>
          <li style={styles.li}>Poți pierde tot capitalul investit sau chiar mai mult.</li>
          <li style={styles.li}>Performanța din trecut nu garantează rezultate viitoare.</li>
          <li style={styles.li}>Ești singurul responsabil pentru toate deciziile de trading.</li>
          <li style={styles.li}>Nu suntem consultanți financiari, brokeri sau dealeri autorizați.</li>
          <li style={styles.li}>Ar trebui să consulți un profesionist financiar calificat înainte să iei decizii de investiții.</li>
          <li style={styles.li}>Nu garantăm acuratețea sau exhaustivitatea niciunui calculator, statistici sau conținut educativ.</li>
          <li style={styles.li}>Ar trebui să tranzacționezi doar cu bani pe care îți permiți să-i pierzi.</li>
        </ul>

        <h2 style={styles.h2}>3. Folosirea Site-ului <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 Fără Cont</h3>
        <p style={styles.text}>Site-ul este accesibil public. Nu e nevoie de cont, înregistrare sau plată ca să citești conținutul, să folosești calculatoarele sau să citești blogul.</p>

        <h3 style={styles.h3}>3.2 Instrumente Gratuite</h3>
        <p style={styles.text}>Calculatoarele de pe Site (Lot Size, Risk of Ruin, Win Rate vs R:R Matrix, Compound, Pre-Trade Checklist) sunt gratuite. Toate calculele se fac în browserul tău. Rezultatele sunt doar informative și nu reprezintă sfaturi de investiții.</p>

        <h3 style={styles.h3}>3.3 Folosire Acceptabilă</h3>
        <p style={styles.text}>Poți folosi Site-ul în scopuri personale, necomerciale. Ești de acord să nu:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Extragi sau copiezi conținut prin mijloace automate fără permisiune</li>
          <li style={styles.li}>Republici articolele de blog sau rezultatele calculatoarelor ca fiind munca ta</li>
          <li style={styles.li}>Încerci să afectezi funcționarea Site-ului</li>
          <li style={styles.li}>Folosești Site-ul într-un mod care încalcă legile aplicabile</li>
        </ul>

        <h2 style={styles.h2}>4. Contul și Folosirea Aplicației <span style={styles.pillApp}>APP</span></h2>

        <h3 style={styles.h3}>4.1 Crearea Contului</h3>
        <p style={styles.text}>Ca să folosești Aplicația, trebuie să:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Oferi o adresă de email validă</li>
          <li style={styles.li}>Creezi o parolă sigură</li>
          <li style={styles.li}>Ai cel puțin 18 ani (sau vârsta legală din jurisdicția ta)</li>
          <li style={styles.li}>Fii de acord cu acești Termeni și cu Politica noastră de Confidențialitate</li>
        </ul>
        <p style={styles.text}>Creând un cont, ești de acord să-ți trimitem email-uri esențiale pentru serviciu (tranzacționale) și un singur email de follow-up despre produs la adresa înregistrată. Te poți dezabona oricând de la email-ul de follow-up prin linkul de dezabonare cu un click pe care îl conține, fără să afecteze email-urile tranzacționale. Vezi <a style={styles.link} href="/privacy-policy">Politica de Confidențialitate</a> pentru detalii.</p>

        <h3 style={styles.h3}>4.2 Securitatea Contului</h3>
        <p style={styles.text}>Ești responsabil să păstrezi confidențialitatea datelor tale de cont și pentru toate activitățile din contul tău. Anunță-ne imediat dacă observi acces neautorizat. Nu suntem răspunzători pentru nicio pierdere sau daună rezultată din faptul că nu ți-ai protejat datele de cont.</p>

        <h3 style={styles.h3}>4.3 Folosirea Acceptabilă a Aplicației</h3>
        <p style={styles.text}>Poți folosi Aplicația doar pentru ținerea personală, necomercială a evidenței trade-urilor și pentru analiză. Ești de acord să NU:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Folosești Aplicația în vreun scop ilegal</li>
          <li style={styles.li}>Faci reverse engineering, decompilezi sau dezasamblezi Aplicația</li>
          <li style={styles.li}>Afectezi sau perturbi funcționarea Aplicației sau serverele</li>
          <li style={styles.li}>Folosești scripturi automate, boți sau unelte similare fără autorizare</li>
          <li style={styles.li}>Împarți datele tale de cont cu alții</li>
          <li style={styles.li}>Încarci cod rău intenționat, viruși sau conținut dăunător</li>
          <li style={styles.li}>Abuzezi, hărțuiești sau faci rău altor utilizatori</li>
          <li style={styles.li}>Încalci drepturile vreunui terț</li>
          <li style={styles.li}>Folosești Aplicația ca să oferi servicii comerciale către terți</li>
        </ul>

        <h3 style={styles.h3}>4.4 Consecințele Încălcării</h3>
        <p style={styles.text}>Încălcarea poate duce la suspendarea sau închiderea imediată a contului tău, la acțiuni legale acolo unde se aplică și la raportarea către autoritățile competente.</p>

        <h2 style={styles.h2}>5. Proprietate Intelectuală</h2>
        <p style={styles.text}>Site-ul și Aplicația — inclusiv tot conținutul, designul, logo-urile, articolele de blog, implementările calculatoarelor, codul, textul și grafica — sunt proprietatea lui Ionel Aanei și sunt protejate de legile internaționale privind drepturile de autor, mărcile comerciale și alte legi de proprietate intelectuală.</p>
        <p style={styles.text}>Îți acordăm o licență limitată, neexclusivă, netransferabilă și revocabilă de a folosi Aplicația în scopuri personale și de a citi conținutul Site-ului. Nu ai voie să:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Copiezi, modifici sau distribui Aplicația sau orice parte din ea</li>
          <li style={styles.li}>Faci reverse engineering, decompilezi sau dezasamblezi Aplicația</li>
          <li style={styles.li}>Folosești designul, brandul sau conținutul nostru în scopuri comerciale</li>
          <li style={styles.li}>Creezi lucrări derivate pe baza Aplicației sau a Site-ului</li>
        </ul>
        <p style={styles.text}>
          Rămâi proprietarul tuturor datelor de trading, notițelor și conținutului pe care le creezi în Aplicație („Conținutul Tău"). Folosind Aplicația, ne acorzi o licență de a stoca, procesa și afișa Conținutul Tău doar în scopul de a oferi funcționalitatea Aplicației. Nu vom partaja, vinde sau folosi Conținutul Tău în alt scop, cu excepția cazurilor cerute de lege.
        </p>

        <h2 style={styles.h2}>6. Abonamente și Plăți <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>Aplicația oferă atât funcții gratuite, cât și funcții Premium disponibile prin abonament.</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Abonamentele sunt facturate prin Google Play</li>
          <li style={styles.li}>Abonamentele se reînnoiesc automat dacă nu sunt anulate</li>
          <li style={styles.li}>Poți anula oricând din setările Google Play</li>
          <li style={styles.li}>Fără rambursări pentru perioade parțiale (în limita politicii de rambursare Google Play)</li>
          <li style={styles.li}>Prețurile se pot schimba cu notificare prealabilă</li>
        </ul>
        <p style={styles.text}>Toate plățile sunt procesate de Google Play. Nu stocăm și nu avem acces la informațiile tale de plată.</p>

        <h2 style={styles.h2}>7. Date și Confidențialitate</h2>
        <p style={styles.text}>Folosirea Site-ului și a Aplicației este guvernată și de <a style={styles.link} href="/privacy-policy">Politica de Confidențialitate</a>, care este inclusă în acești Termeni prin referință.</p>
        <p style={styles.text}>Puncte cheie:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Site-ul nu colectează date personale direct. Cookie-urile de analiză se încarcă doar după consimțământ explicit.</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> Aplicația colectează datele necesare pentru a oferi funcționalitatea (email, date de trading, analiză).</li>
          <li style={styles.li}>Datele din Aplicație sunt stocate în Uniunea Europeană (regiunea eur3).</li>
          <li style={styles.li}>Nu vindem datele tale către terți.</li>
          <li style={styles.li}>Poți cere oricând ștergerea contului și a datelor tale.</li>
        </ul>

        <h2 style={styles.h2}>8. Renunțarea la Garanții</h2>
        <p style={styles.text}>
          Site-ul și Aplicația sunt oferite <strong style={styles.strong}>„ca atare"</strong> și <strong style={styles.strong}>„în limita disponibilității"</strong>, fără garanții de niciun fel, fie ele explicite sau implicite, inclusiv:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Garanții implicite de vandabilitate</li>
          <li style={styles.li}>Potrivire pentru un scop anume</li>
          <li style={styles.li}>Acuratețea sau fiabilitatea calculelor, statisticilor sau conținutului educativ</li>
          <li style={styles.li}>Funcționare neîntreruptă sau fără erori</li>
          <li style={styles.li}>Corectarea promptă a defectelor</li>
          <li style={styles.li}>Păstrarea permanentă a vreunor date (deși implementăm măsuri de backup)</li>
        </ul>

        <h2 style={styles.h2}>9. Limitarea Răspunderii</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>În măsura maximă permisă de lege, Ionel Aanei nu este răspunzător pentru niciun fel de:</strong>
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Pierderi din trading sau daune financiare de orice fel</li>
          <li style={styles.li}>Profituri pierdute sau oportunități de afaceri ratate</li>
          <li style={styles.li}>Pierderea sau coruperea datelor (deși implementăm backup-uri)</li>
          <li style={styles.li}>Daune indirecte, incidentale, consecvente, speciale sau punitive</li>
          <li style={styles.li}>Daune rezultate din accesul neautorizat la contul tău</li>
          <li style={styles.li}>Daune cauzate de servicii terțe (Firebase, Google Cloud, Google Analytics, Google Play, Twelve Data)</li>
        </ul>
        <p style={styles.text}>Această limitare se aplică indiferent de temeiul răspunderii (contract, delict, neglijență sau altele), chiar dacă am fost avertizați despre posibilitatea unor astfel de daune.</p>
        <p style={styles.text}>Răspunderea noastră totală față de tine pentru toate revendicările nu va depăși sumele totale plătite de tine către noi în cele douăsprezece (12) luni dinaintea revendicării. Pentru utilizatorii Site-ului care nu ne-au plătit nimic, răspunderea noastră maximă este limitată la 100 €.</p>

        <h2 style={styles.h2}>10. Responsabilitatea Utilizatorului</h2>
        <p style={styles.text}>Recunoști că:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Ești singurul responsabil pentru deciziile tale de trading.</li>
          <li style={styles.li}>Nu avem niciun control asupra piețelor financiare.</li>
          <li style={styles.li}>Statisticile Aplicației și rezultatele calculatoarelor se bazează pe datele pe care le oferi TU.</li>
          <li style={styles.li}>Ar trebui să verifici toate calculele independent.</li>
          <li style={styles.li}>Ar trebui să-ți faci backup la datele importante.</li>
        </ul>

        <h2 style={styles.h2}>11. Despăgubire</h2>
        <p style={styles.text}>
          Ești de acord să despăgubești, să aperi și să-l protejezi pe Ionel Aanei de orice revendicări, daune, pierderi, răspunderi și cheltuieli (inclusiv onorarii legale) care apar din folosirea Site-ului sau a Aplicației, din încălcarea acestor Termeni, din încălcarea vreunei legi sau a drepturilor unui terț, sau din activitățile și deciziile tale de trading.
        </p>

        <h2 style={styles.h2}>12. Încetare</h2>

        <h3 style={styles.h3}>12.1 Încetarea de Către Tine</h3>
        <p style={styles.text}>Îți poți închide oricând contul din Aplicație:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Folosind funcția „Șterge Contul" din Setările Aplicației</li>
          <li style={styles.li}>Contactându-ne la <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a></li>
        </ul>
        <p style={styles.text}>Pentru Site, poți să nu-l mai vizitezi oricând, fără notificare.</p>

        <h3 style={styles.h3}>12.2 Încetarea de Către Noi</h3>
        <p style={styles.text}>Putem suspenda sau închide contul tău imediat, fără notificare, dacă încalci acești Termeni, te implici în activități frauduloase sau ilegale, abuzezi Aplicația sau alți utilizatori, sau acolo unde legea o cere. Putem de asemenea să întrerupem Aplicația cu o notificare rezonabilă.</p>

        <h2 style={styles.h2}>13. Modificări ale Termenilor</h2>
        <p style={styles.text}>Putem modifica acești Termeni oricând. Te vom anunța despre schimbările importante actualizând data „Ultima actualizare", afișând o notificare în Aplicație sau trimițând un email la adresa ta înregistrată (pentru schimbări importante de cont). Continuarea folosirii după ce schimbările sunt publicate înseamnă acceptarea Termenilor modificați.</p>

        <h2 style={styles.h2}>14. Legea Aplicabilă și Disputele</h2>
        <p style={styles.text}>Acești Termeni sunt guvernați de legile României, fără a ține cont de principiile privind conflictul de legi.</p>
        <p style={styles.text}>Orice dispută va fi rezolvată prin (în această ordine):</p>
        <ol style={{ ...styles.ul, listStyleType: 'decimal' }}>
          <li style={styles.li}>Negocieri de bună credință între părți</li>
          <li style={styles.li}>Mediere, dacă negocierile eșuează</li>
          <li style={styles.li}>Instanțele din România, dacă medierea eșuează</li>
        </ol>

        <h2 style={styles.h2}>15. Diverse</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Acordul Complet:</strong> Acești Termeni, împreună cu Politica de Confidențialitate, formează acordul complet dintre tine și Ionel Aanei.<br />
          <strong style={styles.strong}>Separabilitate:</strong> Dacă vreo prevedere din acești Termeni este găsită invalidă sau inaplicabilă, restul prevederilor rămân pe deplin în vigoare.<br />
          <strong style={styles.strong}>Renunțare:</strong> Faptul că nu aplicăm o prevedere nu înseamnă că renunțăm la ea.<br />
          <strong style={styles.strong}>Cesiune:</strong> Tu nu poți cesiona sau transfera acești Termeni. Noi putem cesiona drepturile și obligațiile noastre fără acordul tău.
        </p>

        <h2 style={styles.h2}>16. Contact</h2>
        <p style={styles.text}>Pentru întrebări despre acești Termeni:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Email:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Dezvoltator:</strong> Ionel Aanei (dezvoltator individual)<br />
          <strong style={styles.strong}>Locație:</strong> România (Uniunea Europeană)
        </p>
        <p style={styles.text}>Vom răspunde în termen de 30 de zile.</p>
      </div>
    </div>
  );
}

function TermsOfServiceDe() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Nutzungsbedingungen</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Website &amp; mobile App</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Zuletzt aktualisiert: 26. Mai 2026</p>
        </div>

        <p style={styles.text}>
          Diese Nutzungsbedingungen („Bedingungen") stellen eine rechtsverbindliche Vereinbarung zwischen dir und Ionel Aanei, einem Einzelentwickler (Einzelunternehmer) mit Sitz in Rumänien („wir" oder „uns"), bezüglich deiner Nutzung dar von:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Der Website unter <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> (die „Website")</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> Der mobilen App K.M.F. Trading Journal bei Google Play (die „App")</li>
        </ul>
        <p style={styles.text}>
          <strong style={styles.strong}>Durch die Nutzung der Website oder der App erklärst du dich mit diesen Bedingungen einverstanden. Wenn du nicht einverstanden bist, nutze sie nicht.</strong>
        </p>

        <h2 style={styles.h2}>1. Beschreibung des Dienstes</h2>
        <p style={styles.text}>
          K.M.F. Trading Journal ist ein Werkzeug zur Verfolgung und Analyse der Trading-Leistung. Die Website stellt Marketinginformationen, Blogartikel, kostenlose Rechner sowie die Datenschutzerklärung / Bedingungen bereit. Die App ermöglicht es dir, Trades zu protokollieren, die Leistung zu analysieren, Pre-Trade-Checklisten zu nutzen, PDF-Berichte zu erstellen und Daten geräteübergreifend zu synchronisieren.
        </p>
        <p style={styles.text}>Beide werden „wie besehen" bereitgestellt und sind ausschließlich für die persönliche Aufzeichnung von Trades, zur Bildung und zur Analyse bestimmt.</p>

        <h2 style={styles.h2}>2. Keine Finanzberatung</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>K.M.F. Trading Journal ist ausschließlich ein Werkzeug zur Verfolgung, Analyse und Bildung. Wir bieten keine Finanzberatung, Anlageempfehlungen oder Trading-Signale.</strong>
        </p>
        <p style={styles.text}>Alle Inhalte — Blogartikel, Rechnerergebnisse, App-Statistiken, die Pre-Trade-Checkliste, das Risk-of-Ruin-Werkzeug — dienen <strong style={styles.strong}>ausschließlich Informations- und Bildungszwecken</strong>.</p>
        <p style={styles.text}>Du erkennst an, dass:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Trading ein erhebliches Verlustrisiko birgt und möglicherweise nicht für alle Anleger geeignet ist.</li>
          <li style={styles.li}>Du dein gesamtes eingesetztes Kapital oder mehr verlieren kannst.</li>
          <li style={styles.li}>Vergangene Ergebnisse keine künftigen Ergebnisse garantieren.</li>
          <li style={styles.li}>Du allein für alle Trading-Entscheidungen verantwortlich bist.</li>
          <li style={styles.li}>Wir keine zugelassenen Finanzberater, Broker oder Händler sind.</li>
          <li style={styles.li}>Du vor Anlageentscheidungen einen qualifizierten Finanzfachmann konsultieren solltest.</li>
          <li style={styles.li}>Wir die Richtigkeit oder Vollständigkeit von Rechnern, Statistiken oder Bildungsinhalten nicht garantieren.</li>
          <li style={styles.li}>Du nur mit Geld handeln solltest, dessen Verlust du dir leisten kannst.</li>
        </ul>

        <h2 style={styles.h2}>3. Nutzung der Website <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 Kein Konto erforderlich</h3>
        <p style={styles.text}>Die Website ist öffentlich zugänglich. Es ist kein Konto, keine Anmeldung und keine Zahlung erforderlich, um Inhalte anzusehen, Rechner zu nutzen oder den Blog zu lesen.</p>

        <h3 style={styles.h3}>3.2 Kostenlose Werkzeuge</h3>
        <p style={styles.text}>Die Rechner auf der Website (Lot Size, Risk of Ruin, Win Rate vs R:R Matrix, Compound, Pre-Trade-Checkliste) sind kostenlos nutzbar. Alle Berechnungen werden in deinem Browser durchgeführt. Die Ergebnisse dienen nur der Information und stellen keine Anlageberatung dar.</p>

        <h3 style={styles.h3}>3.3 Zulässige Nutzung</h3>
        <p style={styles.text}>Du darfst die Website für persönliche, nicht-kommerzielle Zwecke nutzen. Du verpflichtest dich, NICHT:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Inhalte ohne Erlaubnis mit automatisierten Mitteln zu scrapen, zu kopieren oder zu extrahieren</li>
          <li style={styles.li}>Blogartikel oder Rechnerergebnisse als eigenes Werk erneut zu veröffentlichen</li>
          <li style={styles.li}>Zu versuchen, die Funktionalität der Website zu beeinträchtigen</li>
          <li style={styles.li}>Die Website auf eine Weise zu nutzen, die geltendes Recht verletzt</li>
        </ul>

        <h2 style={styles.h2}>4. App-Konto &amp; Nutzung <span style={styles.pillApp}>APP</span></h2>

        <h3 style={styles.h3}>4.1 Konto-Erstellung</h3>
        <p style={styles.text}>Um die App zu nutzen, musst du:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Eine gültige E-Mail-Adresse angeben</li>
          <li style={styles.li}>Ein sicheres Passwort erstellen</li>
          <li style={styles.li}>Mindestens 18 Jahre alt sein (oder das gesetzliche Alter in deiner Rechtsordnung)</li>
          <li style={styles.li}>Diesen Bedingungen und unserer Datenschutzerklärung zustimmen</li>
        </ul>
        <p style={styles.text}>Mit der Erstellung eines Kontos erklärst du dich damit einverstanden, dass wir dienstkritische (transaktionale) E-Mails und eine Produkt-Follow-up-E-Mail an deine registrierte Adresse senden dürfen. Du kannst die Follow-up-E-Mail jederzeit über den enthaltenen One-Click-Abmeldelink abbestellen, ohne dass dies transaktionale E-Mails beeinträchtigt. Einzelheiten findest du in unserer <a style={styles.link} href="/privacy-policy">Datenschutzerklärung</a>.</p>

        <h3 style={styles.h3}>4.2 Kontosicherheit</h3>
        <p style={styles.text}>Du bist dafür verantwortlich, die Vertraulichkeit deiner Konto-Zugangsdaten zu wahren, und für alle Aktivitäten unter deinem Konto. Benachrichtige uns unverzüglich über jeden unbefugten Zugriff. Wir haften nicht für Verluste oder Schäden, die daraus entstehen, dass du deine Kontoinformationen nicht geschützt hast.</p>

        <h3 style={styles.h3}>4.3 Zulässige Nutzung der App</h3>
        <p style={styles.text}>Du darfst die App ausschließlich für die persönliche, nicht-kommerzielle Aufzeichnung und Analyse von Trades nutzen. Du verpflichtest dich, NICHT:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Die App für illegale Zwecke zu nutzen</li>
          <li style={styles.li}>Die App per Reverse Engineering zurückzuentwickeln, zu dekompilieren oder zu disassemblieren</li>
          <li style={styles.li}>Die Funktionalität der App oder die Server zu beeinträchtigen oder zu stören</li>
          <li style={styles.li}>Automatisierte Skripte, Bots oder ähnliche Werkzeuge ohne Genehmigung zu verwenden</li>
          <li style={styles.li}>Deine Konto-Zugangsdaten mit anderen zu teilen</li>
          <li style={styles.li}>Schädlichen Code, Viren oder schädliche Inhalte hochzuladen</li>
          <li style={styles.li}>Andere Nutzer zu missbrauchen, zu belästigen oder zu schädigen</li>
          <li style={styles.li}>Rechte Dritter zu verletzen</li>
          <li style={styles.li}>Die App zu nutzen, um Dritten kommerziell Dienste anzubieten</li>
        </ul>

        <h3 style={styles.h3}>4.4 Folgen eines Verstoßes</h3>
        <p style={styles.text}>Ein Verstoß kann zur sofortigen Sperrung oder Kündigung deines Kontos, zu rechtlichen Schritten, soweit anwendbar, und zur Meldung an zuständige Behörden führen.</p>

        <h2 style={styles.h2}>5. Geistiges Eigentum</h2>
        <p style={styles.text}>Die Website und die App — einschließlich aller Inhalte, Designs, Logos, Blogartikel, Rechnerimplementierungen, des Codes, der Texte und Grafiken — sind Eigentum von Ionel Aanei und durch internationale Urheberrechts-, Marken- und sonstige Gesetze zum geistigen Eigentum geschützt.</p>
        <p style={styles.text}>Wir gewähren dir eine beschränkte, nicht-exklusive, nicht übertragbare und widerrufliche Lizenz, die App für persönliche Zwecke zu nutzen und die Inhalte der Website zu lesen. Du darfst nicht:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Die App oder Teile davon kopieren, ändern oder verbreiten</li>
          <li style={styles.li}>Die App per Reverse Engineering zurückentwickeln, dekompilieren oder disassemblieren</li>
          <li style={styles.li}>Unser Design, Branding oder unsere Inhalte für kommerzielle Zwecke nutzen</li>
          <li style={styles.li}>Abgeleitete Werke auf Basis der App oder Website erstellen</li>
        </ul>
        <p style={styles.text}>
          Du behältst das Eigentum an allen Trading-Daten, Notizen und Inhalten, die du in der App erstellst („Deine Inhalte"). Durch die Nutzung der App gewährst du uns eine Lizenz, Deine Inhalte zu speichern, zu verarbeiten und anzuzeigen, ausschließlich zum Zweck der Bereitstellung der App-Funktionalität. Wir werden Deine Inhalte nicht teilen, verkaufen oder für andere Zwecke verwenden, außer soweit gesetzlich vorgeschrieben.
        </p>

        <h2 style={styles.h2}>6. Abonnements und Zahlungen <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>Die App bietet sowohl kostenlose Funktionen als auch Premium-Funktionen, die per Abonnement verfügbar sind.</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Abonnements werden über Google Play abgerechnet</li>
          <li style={styles.li}>Abonnements verlängern sich automatisch, sofern sie nicht gekündigt werden</li>
          <li style={styles.li}>Du kannst jederzeit über die Google-Play-Einstellungen kündigen</li>
          <li style={styles.li}>Keine Erstattungen für Teilzeiträume (vorbehaltlich der Erstattungsrichtlinie von Google Play)</li>
          <li style={styles.li}>Preise können sich mit vorheriger Ankündigung ändern</li>
        </ul>
        <p style={styles.text}>Alle Zahlungen werden von Google Play abgewickelt. Wir speichern deine Zahlungsinformationen nicht und haben keinen Zugriff darauf.</p>

        <h2 style={styles.h2}>7. Daten und Datenschutz</h2>
        <p style={styles.text}>Deine Nutzung der Website und der App unterliegt zudem unserer <a style={styles.link} href="/privacy-policy">Datenschutzerklärung</a>, die durch Verweis Bestandteil dieser Bedingungen ist.</p>
        <p style={styles.text}>Wichtige Punkte:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Die Website erhebt keine personenbezogenen Daten direkt. Analyse-Cookies werden erst nach ausdrücklicher Einwilligung geladen.</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> Die App erhebt die zur Bereitstellung der Funktionalität notwendigen Daten (E-Mail, Trading-Daten, Analyse).</li>
          <li style={styles.li}>App-Daten werden in der Europäischen Union (Region eur3) gespeichert.</li>
          <li style={styles.li}>Wir verkaufen deine Daten nicht an Dritte.</li>
          <li style={styles.li}>Du kannst jederzeit die Löschung deines Kontos und deiner Daten verlangen.</li>
        </ul>

        <h2 style={styles.h2}>8. Gewährleistungsausschluss</h2>
        <p style={styles.text}>
          Die Website und die App werden <strong style={styles.strong}>„wie besehen"</strong> und <strong style={styles.strong}>„wie verfügbar"</strong> bereitgestellt, ohne jegliche Gewährleistung, ob ausdrücklich oder stillschweigend, einschließlich:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Stillschweigender Gewährleistungen der Marktgängigkeit</li>
          <li style={styles.li}>Eignung für einen bestimmten Zweck</li>
          <li style={styles.li}>Richtigkeit oder Zuverlässigkeit von Berechnungen, Statistiken oder Bildungsinhalten</li>
          <li style={styles.li}>Ununterbrochenem oder fehlerfreiem Betrieb</li>
          <li style={styles.li}>Umgehender Behebung von Mängeln</li>
          <li style={styles.li}>Dauerhafter Aufbewahrung von Daten (obwohl wir Backup-Maßnahmen umsetzen)</li>
        </ul>

        <h2 style={styles.h2}>9. Haftungsbeschränkung</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Im größtmöglichen gesetzlich zulässigen Umfang haftet Ionel Aanei nicht für:</strong>
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Trading-Verluste oder finanzielle Schäden jeglicher Art</li>
          <li style={styles.li}>Entgangene Gewinne oder Geschäftschancen</li>
          <li style={styles.li}>Datenverlust oder Datenbeschädigung (obwohl wir Backups umsetzen)</li>
          <li style={styles.li}>Indirekte, beiläufige, Folge-, besondere oder Strafschäden</li>
          <li style={styles.li}>Schäden infolge unbefugten Zugriffs auf dein Konto</li>
          <li style={styles.li}>Schäden, die durch Drittanbieter-Dienste verursacht werden (Firebase, Google Cloud, Google Analytics, Google Play, Twelve Data)</li>
        </ul>
        <p style={styles.text}>Diese Beschränkung gilt unabhängig von der Haftungsgrundlage (Vertrag, unerlaubte Handlung, Fahrlässigkeit oder anderweitig), selbst wenn wir auf die Möglichkeit solcher Schäden hingewiesen wurden.</p>
        <p style={styles.text}>Unsere Gesamthaftung dir gegenüber für alle Ansprüche übersteigt nicht die Gesamtbeträge, die du in den zwölf (12) Monaten vor dem Anspruch an uns gezahlt hast. Für Website-Nutzer, die uns nichts gezahlt haben, ist unsere maximale Haftung auf 100 € beschränkt.</p>

        <h2 style={styles.h2}>10. Verantwortung des Nutzers</h2>
        <p style={styles.text}>Du erkennst an, dass:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Du allein für deine Trading-Entscheidungen verantwortlich bist.</li>
          <li style={styles.li}>Wir keine Kontrolle über die Finanzmärkte haben.</li>
          <li style={styles.li}>App-Statistiken und Rechnerergebnisse auf den Daten beruhen, die DU bereitstellst.</li>
          <li style={styles.li}>Du alle Berechnungen unabhängig überprüfen solltest.</li>
          <li style={styles.li}>Du wichtige Daten sichern solltest.</li>
        </ul>

        <h2 style={styles.h2}>11. Freistellung</h2>
        <p style={styles.text}>
          Du erklärst dich bereit, Ionel Aanei von allen Ansprüchen, Schäden, Verlusten, Verbindlichkeiten und Kosten (einschließlich Anwaltskosten) freizustellen, zu verteidigen und schadlos zu halten, die sich aus deiner Nutzung der Website oder App, deinem Verstoß gegen diese Bedingungen, deinem Verstoß gegen Gesetze oder Rechte Dritter oder aus deinen Trading-Aktivitäten und -Entscheidungen ergeben.
        </p>

        <h2 style={styles.h2}>12. Kündigung</h2>

        <h3 style={styles.h3}>12.1 Kündigung durch dich</h3>
        <p style={styles.text}>Du kannst dein App-Konto jederzeit kündigen:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Über die Funktion „Konto löschen" in den App-Einstellungen</li>
          <li style={styles.li}>Indem du uns unter <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a> kontaktierst</li>
        </ul>
        <p style={styles.text}>Bei der Website kannst du jederzeit ohne Ankündigung aufhören, sie zu besuchen.</p>

        <h3 style={styles.h3}>12.2 Kündigung durch uns</h3>
        <p style={styles.text}>Wir können dein Konto sofort und ohne Ankündigung sperren oder kündigen, wenn du gegen diese Bedingungen verstößt, betrügerische oder illegale Aktivitäten betreibst, die App oder andere Nutzer missbrauchst oder soweit gesetzlich vorgeschrieben. Wir können die App auch mit angemessener Ankündigung einstellen.</p>

        <h2 style={styles.h2}>13. Änderungen der Bedingungen</h2>
        <p style={styles.text}>Wir können diese Bedingungen jederzeit ändern. Wir informieren dich über wesentliche Änderungen, indem wir das Datum „Zuletzt aktualisiert" aktualisieren, einen Hinweis in der App veröffentlichen oder eine E-Mail an deine registrierte Adresse senden (bei wesentlichen Änderungen des App-Kontos). Deine fortgesetzte Nutzung nach Veröffentlichung der Änderungen gilt als Annahme der geänderten Bedingungen.</p>

        <h2 style={styles.h2}>14. Anwendbares Recht und Streitigkeiten</h2>
        <p style={styles.text}>Diese Bedingungen unterliegen dem Recht Rumäniens, ungeachtet der Grundsätze des Kollisionsrechts.</p>
        <p style={styles.text}>Streitigkeiten werden in folgender Reihenfolge beigelegt:</p>
        <ol style={{ ...styles.ul, listStyleType: 'decimal' }}>
          <li style={styles.li}>Verhandlungen in gutem Glauben zwischen den Parteien</li>
          <li style={styles.li}>Mediation, falls die Verhandlungen scheitern</li>
          <li style={styles.li}>Rumänische Gerichte, falls die Mediation scheitert</li>
        </ol>

        <h2 style={styles.h2}>15. Sonstiges</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Gesamte Vereinbarung:</strong> Diese Bedingungen bilden zusammen mit unserer Datenschutzerklärung die gesamte Vereinbarung zwischen dir und Ionel Aanei.<br />
          <strong style={styles.strong}>Salvatorische Klausel:</strong> Sollte eine Bestimmung dieser Bedingungen ungültig oder nicht durchsetzbar sein, bleiben die übrigen Bestimmungen in vollem Umfang in Kraft.<br />
          <strong style={styles.strong}>Verzicht:</strong> Wenn wir eine Bestimmung nicht durchsetzen, stellt dies keinen Verzicht auf diese Bestimmung dar.<br />
          <strong style={styles.strong}>Abtretung:</strong> Du darfst diese Bedingungen nicht abtreten oder übertragen. Wir dürfen unsere Rechte und Pflichten ohne deine Zustimmung abtreten.
        </p>

        <h2 style={styles.h2}>16. Kontakt</h2>
        <p style={styles.text}>Bei Fragen zu diesen Bedingungen:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>E-Mail:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Entwickler:</strong> Ionel Aanei (Einzelentwickler)<br />
          <strong style={styles.strong}>Standort:</strong> Rumänien (Europäische Union)
        </p>
        <p style={styles.text}>Wir antworten innerhalb von 30 Tagen.</p>
      </div>
    </div>
  );
}

function TermsOfServiceFr() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Conditions d'utilisation</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — Site web &amp; application mobile</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Dernière mise à jour : 26 mai 2026</p>
        </div>

        <p style={styles.text}>
          Les présentes conditions d'utilisation (« Conditions ») constituent un accord juridiquement contraignant entre vous et Ionel Aanei, développeur individuel (entrepreneur individuel) établi en Roumanie (« nous » ou « notre »), concernant votre utilisation de :
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Le site web à l'adresse <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> (le « Site »)</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> L'application mobile K.M.F. Trading Journal sur Google Play (l'« Application »)</li>
        </ul>
        <p style={styles.text}>
          <strong style={styles.strong}>En utilisant le Site ou l'Application, vous acceptez d'être lié par ces Conditions. Si vous n'êtes pas d'accord, ne les utilisez pas.</strong>
        </p>

        <h2 style={styles.h2}>1. Description du service</h2>
        <p style={styles.text}>
          K.M.F. Trading Journal est un outil de suivi et d'analyse de la performance de trading. Le Site fournit des informations marketing, des articles de blog, des calculateurs gratuits ainsi que la politique de confidentialité / les Conditions. L'Application vous permet d'enregistrer des trades, d'analyser votre performance, d'utiliser des checklists pré-trade, de générer des rapports PDF et de synchroniser vos données entre appareils.
        </p>
        <p style={styles.text}>Les deux sont fournis « en l'état » et destinés uniquement au suivi personnel des trades, à l'éducation et à l'analyse.</p>

        <h2 style={styles.h2}>2. Pas de conseil financier</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>K.M.F. Trading Journal est uniquement un outil de suivi, d'analyse et d'éducation. Nous ne fournissons pas de conseil financier, de recommandations d'investissement ni de signaux de trading.</strong>
        </p>
        <p style={styles.text}>Tout le contenu — articles de blog, résultats des calculateurs, statistiques de l'Application, checklist pré-trade, outil Risk of Ruin — est fourni <strong style={styles.strong}>à des fins purement informatives et éducatives</strong>.</p>
        <p style={styles.text}>Vous reconnaissez que :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Le trading comporte un risque de perte important et peut ne pas convenir à tous les investisseurs.</li>
          <li style={styles.li}>Vous pouvez perdre la totalité, voire plus, de votre capital investi.</li>
          <li style={styles.li}>Les performances passées ne garantissent pas les résultats futurs.</li>
          <li style={styles.li}>Vous êtes seul responsable de toutes vos décisions de trading.</li>
          <li style={styles.li}>Nous ne sommes pas des conseillers financiers, courtiers ou négociants agréés.</li>
          <li style={styles.li}>Vous devriez consulter un professionnel financier qualifié avant de prendre des décisions d'investissement.</li>
          <li style={styles.li}>Nous ne garantissons pas l'exactitude ou l'exhaustivité d'un calculateur, d'une statistique ou d'un contenu éducatif.</li>
          <li style={styles.li}>Vous ne devriez trader qu'avec de l'argent que vous pouvez vous permettre de perdre.</li>
        </ul>

        <h2 style={styles.h2}>3. Utilisation du Site <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 Aucun compte requis</h3>
        <p style={styles.text}>Le Site est accessible au public. Aucun compte, aucune inscription ni aucun paiement n'est requis pour consulter le contenu, utiliser les calculateurs ou lire le blog.</p>

        <h3 style={styles.h3}>3.2 Outils gratuits</h3>
        <p style={styles.text}>Les calculateurs du Site (Lot Size, Risk of Ruin, Win Rate vs R:R Matrix, Compound, checklist pré-trade) sont gratuits. Tous les calculs sont effectués dans votre navigateur. Les résultats sont purement informatifs et ne constituent pas un conseil en investissement.</p>

        <h3 style={styles.h3}>3.3 Utilisation acceptable</h3>
        <p style={styles.text}>Vous pouvez utiliser le Site à des fins personnelles et non commerciales. Vous acceptez de ne pas :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Extraire, copier ou récupérer du contenu par des moyens automatisés sans autorisation</li>
          <li style={styles.li}>Republier des articles de blog ou des résultats de calculateurs comme votre propre travail</li>
          <li style={styles.li}>Tenter de perturber le fonctionnement du Site</li>
          <li style={styles.li}>Utiliser le Site d'une manière qui enfreint les lois applicables</li>
        </ul>

        <h2 style={styles.h2}>4. Compte &amp; utilisation de l'Application <span style={styles.pillApp}>APP</span></h2>

        <h3 style={styles.h3}>4.1 Création de compte</h3>
        <p style={styles.text}>Pour utiliser l'Application, vous devez :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Fournir une adresse e-mail valide</li>
          <li style={styles.li}>Créer un mot de passe sécurisé</li>
          <li style={styles.li}>Être âgé d'au moins 18 ans (ou de l'âge légal dans votre juridiction)</li>
          <li style={styles.li}>Accepter ces Conditions et notre politique de confidentialité</li>
        </ul>
        <p style={styles.text}>En créant un compte, vous acceptez que nous puissions envoyer des e-mails essentiels au service (transactionnels) et un seul e-mail de relance produit à votre adresse enregistrée. Vous pouvez vous désinscrire de l'e-mail de relance à tout moment via le lien de désinscription en un clic qu'il contient, sans affecter les e-mails transactionnels. Voir notre <a style={styles.link} href="/privacy-policy">politique de confidentialité</a> pour les détails.</p>

        <h3 style={styles.h3}>4.2 Sécurité du compte</h3>
        <p style={styles.text}>Vous êtes responsable du maintien de la confidentialité de vos identifiants de compte et de toutes les activités effectuées sous votre compte. Informez-nous immédiatement de tout accès non autorisé. Nous ne sommes pas responsables des pertes ou dommages résultant de votre incapacité à protéger les informations de votre compte.</p>

        <h3 style={styles.h3}>4.3 Utilisation acceptable de l'Application</h3>
        <p style={styles.text}>Vous pouvez utiliser l'Application uniquement pour le suivi et l'analyse personnels et non commerciaux de vos trades. Vous acceptez de NE PAS :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Utiliser l'Application à des fins illégales</li>
          <li style={styles.li}>Faire de la rétro-ingénierie, décompiler ou désassembler l'Application</li>
          <li style={styles.li}>Perturber ou interrompre le fonctionnement de l'Application ou ses serveurs</li>
          <li style={styles.li}>Utiliser des scripts automatisés, bots ou outils similaires sans autorisation</li>
          <li style={styles.li}>Partager vos identifiants de compte avec d'autres</li>
          <li style={styles.li}>Téléverser du code malveillant, des virus ou du contenu nuisible</li>
          <li style={styles.li}>Maltraiter, harceler ou nuire à d'autres utilisateurs</li>
          <li style={styles.li}>Violer les droits de tiers</li>
          <li style={styles.li}>Utiliser l'Application pour fournir des services à des tiers à titre commercial</li>
        </ul>

        <h3 style={styles.h3}>4.4 Conséquences d'une violation</h3>
        <p style={styles.text}>Une violation peut entraîner la suspension ou la résiliation immédiate de votre compte, des poursuites judiciaires le cas échéant et un signalement aux autorités compétentes.</p>

        <h2 style={styles.h2}>5. Propriété intellectuelle</h2>
        <p style={styles.text}>Le Site et l'Application — y compris tout le contenu, les designs, logos, articles de blog, implémentations de calculateurs, code, textes et graphismes — sont la propriété de Ionel Aanei et protégés par les lois internationales sur le droit d'auteur, les marques et autres droits de propriété intellectuelle.</p>
        <p style={styles.text}>Nous vous accordons une licence limitée, non exclusive, non transférable et révocable d'utiliser l'Application à des fins personnelles et de lire le contenu du Site. Vous ne pouvez pas :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Copier, modifier ou distribuer l'Application ou une partie de celle-ci</li>
          <li style={styles.li}>Faire de la rétro-ingénierie, décompiler ou désassembler l'Application</li>
          <li style={styles.li}>Utiliser notre design, notre image de marque ou notre contenu à des fins commerciales</li>
          <li style={styles.li}>Créer des œuvres dérivées basées sur l'Application ou le Site</li>
        </ul>
        <p style={styles.text}>
          Vous conservez la propriété de toutes les données de trading, notes et contenus que vous créez dans l'Application (« Votre Contenu »). En utilisant l'Application, vous nous accordez une licence pour stocker, traiter et afficher Votre Contenu uniquement dans le but de fournir les fonctionnalités de l'Application. Nous ne partagerons, ne vendrons ni n'utiliserons Votre Contenu à d'autres fins, sauf si la loi l'exige.
        </p>

        <h2 style={styles.h2}>6. Abonnements et paiements <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>L'Application propose à la fois des fonctionnalités gratuites et des fonctionnalités Premium disponibles par abonnement.</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Les abonnements sont facturés via Google Play</li>
          <li style={styles.li}>Les abonnements se renouvellent automatiquement sauf annulation</li>
          <li style={styles.li}>Vous pouvez annuler à tout moment dans les réglages Google Play</li>
          <li style={styles.li}>Aucun remboursement pour les périodes partielles (sous réserve de la politique de remboursement de Google Play)</li>
          <li style={styles.li}>Les prix peuvent changer moyennant préavis</li>
        </ul>
        <p style={styles.text}>Tous les paiements sont traités par Google Play. Nous ne stockons pas et n'avons pas accès à vos informations de paiement.</p>

        <h2 style={styles.h2}>7. Données et confidentialité</h2>
        <p style={styles.text}>Votre utilisation du Site et de l'Application est également régie par notre <a style={styles.link} href="/privacy-policy">politique de confidentialité</a>, qui est intégrée à ces Conditions par référence.</p>
        <p style={styles.text}>Points clés :</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Le Site ne collecte pas de données personnelles directement. Les cookies d'analyse ne sont chargés qu'après un consentement explicite.</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> L'Application collecte les données nécessaires à la fourniture des fonctionnalités (e-mail, données de trading, analyse).</li>
          <li style={styles.li}>Les données de l'App sont stockées dans l'Union européenne (région eur3).</li>
          <li style={styles.li}>Nous ne vendons pas vos données à des tiers.</li>
          <li style={styles.li}>Vous pouvez demander la suppression de votre compte et de vos données à tout moment.</li>
        </ul>

        <h2 style={styles.h2}>8. Exclusion de garanties</h2>
        <p style={styles.text}>
          Le Site et l'Application sont fournis <strong style={styles.strong}>« en l'état »</strong> et <strong style={styles.strong}>« selon disponibilité »</strong>, sans garantie d'aucune sorte, expresse ou implicite, y compris :
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Garanties implicites de qualité marchande</li>
          <li style={styles.li}>Adéquation à un usage particulier</li>
          <li style={styles.li}>Exactitude ou fiabilité des calculs, statistiques ou contenus éducatifs</li>
          <li style={styles.li}>Fonctionnement ininterrompu ou sans erreur</li>
          <li style={styles.li}>Correction rapide des défauts</li>
          <li style={styles.li}>Conservation permanente des données (bien que nous mettions en place des mesures de sauvegarde)</li>
        </ul>

        <h2 style={styles.h2}>9. Limitation de responsabilité</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Dans toute la mesure permise par la loi, Ionel Aanei n'est pas responsable des :</strong>
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Pertes de trading ou dommages financiers de quelque nature que ce soit</li>
          <li style={styles.li}>Pertes de profits ou d'opportunités d'affaires</li>
          <li style={styles.li}>Perte ou corruption de données (bien que nous mettions en place des sauvegardes)</li>
          <li style={styles.li}>Dommages indirects, accessoires, consécutifs, spéciaux ou punitifs</li>
          <li style={styles.li}>Dommages résultant d'un accès non autorisé à votre compte</li>
          <li style={styles.li}>Dommages causés par des services tiers (Firebase, Google Cloud, Google Analytics, Google Play, Twelve Data)</li>
        </ul>
        <p style={styles.text}>Cette limitation s'applique quel que soit le fondement de la responsabilité (contrat, délit, négligence ou autre), même si nous avons été informés de la possibilité de tels dommages.</p>
        <p style={styles.text}>Notre responsabilité totale envers vous pour l'ensemble des réclamations ne dépassera pas les montants totaux que vous nous avez versés au cours des douze (12) mois précédant la réclamation. Pour les utilisateurs du Site qui ne nous ont rien versé, notre responsabilité maximale est limitée à 100 €.</p>

        <h2 style={styles.h2}>10. Responsabilité de l'utilisateur</h2>
        <p style={styles.text}>Vous reconnaissez que :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Vous êtes seul responsable de vos décisions de trading.</li>
          <li style={styles.li}>Nous n'avons aucun contrôle sur les marchés financiers.</li>
          <li style={styles.li}>Les statistiques de l'Application et les résultats des calculateurs sont basés sur les données que VOUS fournissez.</li>
          <li style={styles.li}>Vous devriez vérifier tous les calculs de manière indépendante.</li>
          <li style={styles.li}>Vous devriez sauvegarder vos données importantes.</li>
        </ul>

        <h2 style={styles.h2}>11. Indemnisation</h2>
        <p style={styles.text}>
          Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité Ionel Aanei contre toute réclamation, dommage, perte, responsabilité et dépense (y compris les frais juridiques) découlant de votre utilisation du Site ou de l'Application, de votre violation de ces Conditions, de votre violation de toute loi ou des droits de tiers, ou de vos activités et décisions de trading.
        </p>

        <h2 style={styles.h2}>12. Résiliation</h2>

        <h3 style={styles.h3}>12.1 Résiliation par vous</h3>
        <p style={styles.text}>Vous pouvez résilier votre compte d'Application à tout moment :</p>
        <ul style={styles.ul}>
          <li style={styles.li}>En utilisant la fonction « Supprimer le compte » dans les réglages de l'Application</li>
          <li style={styles.li}>En nous contactant à <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a></li>
        </ul>
        <p style={styles.text}>Pour le Site, vous pouvez cesser de le visiter à tout moment sans préavis.</p>

        <h3 style={styles.h3}>12.2 Résiliation par nous</h3>
        <p style={styles.text}>Nous pouvons suspendre ou résilier votre compte immédiatement, sans préavis, si vous enfreignez ces Conditions, vous livrez à des activités frauduleuses ou illégales, maltraitez l'Application ou d'autres utilisateurs, ou lorsque la loi l'exige. Nous pouvons également interrompre l'Application moyennant un préavis raisonnable.</p>

        <h2 style={styles.h2}>13. Modifications des Conditions</h2>
        <p style={styles.text}>Nous pouvons modifier ces Conditions à tout moment. Nous vous informerons des changements importants en mettant à jour la date « Dernière mise à jour », en publiant un avis dans l'Application ou en envoyant un e-mail à votre adresse enregistrée (pour les changements importants relatifs au compte d'Application). Votre utilisation continue après la publication des changements vaut acceptation des Conditions modifiées.</p>

        <h2 style={styles.h2}>14. Droit applicable et litiges</h2>
        <p style={styles.text}>Ces Conditions sont régies par le droit roumain, sans égard aux principes de conflit de lois.</p>
        <p style={styles.text}>Tout litige sera résolu (dans cet ordre) par :</p>
        <ol style={{ ...styles.ul, listStyleType: 'decimal' }}>
          <li style={styles.li}>Des négociations de bonne foi entre les parties</li>
          <li style={styles.li}>Une médiation, si les négociations échouent</li>
          <li style={styles.li}>Les tribunaux roumains, si la médiation échoue</li>
        </ol>

        <h2 style={styles.h2}>15. Dispositions diverses</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Intégralité de l'accord :</strong> Ces Conditions, avec notre politique de confidentialité, constituent l'intégralité de l'accord entre vous et Ionel Aanei.<br />
          <strong style={styles.strong}>Divisibilité :</strong> Si une disposition de ces Conditions est jugée invalide ou inapplicable, les dispositions restantes demeurent pleinement en vigueur.<br />
          <strong style={styles.strong}>Renonciation :</strong> Le fait de ne pas faire appliquer une disposition ne constitue pas une renonciation à celle-ci.<br />
          <strong style={styles.strong}>Cession :</strong> Vous ne pouvez pas céder ou transférer ces Conditions. Nous pouvons céder nos droits et obligations sans votre consentement.
        </p>

        <h2 style={styles.h2}>16. Contact</h2>
        <p style={styles.text}>Pour toute question sur ces Conditions :</p>
        <p style={styles.text}>
          <strong style={styles.strong}>E-mail :</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Développeur :</strong> Ionel Aanei (développeur individuel)<br />
          <strong style={styles.strong}>Localisation :</strong> Roumanie (Union européenne)
        </p>
        <p style={styles.text}>Nous répondrons sous 30 jours.</p>
      </div>
    </div>
  );
}

function TermsOfServiceRu() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1115', color: '#E0E0E0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Условия использования</h1>
          <p style={{ fontSize: 14, color: '#4FC3F7', fontWeight: 600 }}>K.M.F. Trading Journal — сайт и мобильное приложение</p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Последнее обновление: 26 мая 2026 г.</p>
        </div>

        <p style={styles.text}>
          Настоящие Условия использования («Условия») представляют собой юридически обязывающее соглашение между вами и Ionel Aanei, индивидуальным разработчиком (индивидуальным предпринимателем) из Румынии («мы» или «нас»), относительно вашего использования:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Сайта по адресу <a style={styles.link} href="https://kmfjournal.com">kmfjournal.com</a> («Сайт»)</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> Мобильного приложения K.M.F. Trading Journal в Google Play («Приложение»)</li>
        </ul>
        <p style={styles.text}>
          <strong style={styles.strong}>Используя Сайт или Приложение, вы соглашаетесь соблюдать настоящие Условия. Если вы не согласны, не используйте их.</strong>
        </p>

        <h2 style={styles.h2}>1. Описание сервиса</h2>
        <p style={styles.text}>
          K.M.F. Trading Journal — это инструмент для отслеживания и анализа торговой эффективности. Сайт предоставляет маркетинговую информацию, статьи блога, бесплатные калькуляторы, а также Политику конфиденциальности / Условия. Приложение позволяет вести журнал сделок, анализировать эффективность, использовать чек-листы перед сделкой, генерировать PDF-отчёты и синхронизировать данные между устройствами.
        </p>
        <p style={styles.text}>Оба предоставляются «как есть» и предназначены только для личного ведения учёта сделок, обучения и анализа.</p>

        <h2 style={styles.h2}>2. Не финансовая консультация</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>K.M.F. Trading Journal — это только инструмент для отслеживания, анализа и обучения. Мы не предоставляем финансовых консультаций, инвестиционных рекомендаций или торговых сигналов.</strong>
        </p>
        <p style={styles.text}>Весь контент — статьи блога, результаты калькуляторов, статистика Приложения, чек-лист перед сделкой, инструмент Risk of Ruin — предоставляется <strong style={styles.strong}>исключительно в информационных и образовательных целях</strong>.</p>
        <p style={styles.text}>Вы признаёте, что:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Торговля сопряжена со значительным риском убытков и может подходить не всем инвесторам.</li>
          <li style={styles.li}>Вы можете потерять весь вложенный капитал или даже больше.</li>
          <li style={styles.li}>Прошлые результаты не гарантируют будущих результатов.</li>
          <li style={styles.li}>Вы несёте единоличную ответственность за все торговые решения.</li>
          <li style={styles.li}>Мы не являемся лицензированными финансовыми консультантами, брокерами или дилерами.</li>
          <li style={styles.li}>Перед принятием инвестиционных решений вам следует проконсультироваться с квалифицированным финансовым специалистом.</li>
          <li style={styles.li}>Мы не гарантируем точность или полноту какого-либо калькулятора, статистики или образовательного контента.</li>
          <li style={styles.li}>Торговать следует только теми деньгами, потерю которых вы можете себе позволить.</li>
        </ul>

        <h2 style={styles.h2}>3. Использование Сайта <span style={styles.pillWeb}>WEB</span></h2>

        <h3 style={styles.h3}>3.1 Аккаунт не требуется</h3>
        <p style={styles.text}>Сайт общедоступен. Для просмотра контента, использования калькуляторов или чтения блога не требуется аккаунт, регистрация или оплата.</p>

        <h3 style={styles.h3}>3.2 Бесплатные инструменты</h3>
        <p style={styles.text}>Калькуляторы на Сайте (Lot Size, Risk of Ruin, Win Rate vs R:R Matrix, Compound, чек-лист перед сделкой) бесплатны. Все вычисления выполняются в вашем браузере. Результаты носят только информационный характер и не являются инвестиционной консультацией.</p>

        <h3 style={styles.h3}>3.3 Допустимое использование</h3>
        <p style={styles.text}>Вы можете использовать Сайт в личных некоммерческих целях. Вы соглашаетесь не:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Извлекать, копировать или собирать контент автоматизированными средствами без разрешения</li>
          <li style={styles.li}>Повторно публиковать статьи блога или результаты калькуляторов как собственную работу</li>
          <li style={styles.li}>Пытаться нарушить работу Сайта</li>
          <li style={styles.li}>Использовать Сайт способом, нарушающим применимые законы</li>
        </ul>

        <h2 style={styles.h2}>4. Аккаунт и использование Приложения <span style={styles.pillApp}>APP</span></h2>

        <h3 style={styles.h3}>4.1 Создание аккаунта</h3>
        <p style={styles.text}>Чтобы использовать Приложение, вы должны:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Предоставить действующий адрес эл. почты</li>
          <li style={styles.li}>Создать надёжный пароль</li>
          <li style={styles.li}>Быть не моложе 18 лет (или совершеннолетним по законам вашей юрисдикции)</li>
          <li style={styles.li}>Согласиться с настоящими Условиями и нашей Политикой конфиденциальности</li>
        </ul>
        <p style={styles.text}>Создавая аккаунт, вы соглашаетесь на то, что мы можем отправлять критически важные для сервиса (транзакционные) письма и одно письмо-напоминание о продукте на ваш зарегистрированный адрес. Вы можете отписаться от письма-напоминания в любой момент через ссылку отписки в один клик в нём, без влияния на транзакционные письма. Подробности см. в нашей <a style={styles.link} href="/privacy-policy">Политике конфиденциальности</a>.</p>

        <h3 style={styles.h3}>4.2 Безопасность аккаунта</h3>
        <p style={styles.text}>Вы несёте ответственность за сохранение конфиденциальности учётных данных вашего аккаунта и за все действия под вашим аккаунтом. Немедленно уведомляйте нас о любом несанкционированном доступе. Мы не несём ответственности за убытки или ущерб, возникшие из-за того, что вы не защитили данные своего аккаунта.</p>

        <h3 style={styles.h3}>4.3 Допустимое использование Приложения</h3>
        <p style={styles.text}>Вы можете использовать Приложение исключительно для личного некоммерческого учёта и анализа сделок. Вы соглашаетесь НЕ:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Использовать Приложение в любых незаконных целях</li>
          <li style={styles.li}>Производить обратную разработку, декомпилировать или дизассемблировать Приложение</li>
          <li style={styles.li}>Нарушать или прерывать работу Приложения или серверов</li>
          <li style={styles.li}>Использовать автоматические скрипты, ботов или подобные инструменты без разрешения</li>
          <li style={styles.li}>Передавать учётные данные вашего аккаунта другим</li>
          <li style={styles.li}>Загружать вредоносный код, вирусы или вредоносный контент</li>
          <li style={styles.li}>Оскорблять, преследовать или причинять вред другим пользователям</li>
          <li style={styles.li}>Нарушать права третьих лиц</li>
          <li style={styles.li}>Использовать Приложение для предоставления услуг третьим лицам в коммерческих целях</li>
        </ul>

        <h3 style={styles.h3}>4.4 Последствия нарушения</h3>
        <p style={styles.text}>Нарушение может привести к немедленной приостановке или прекращению действия вашего аккаунта, судебным мерам, где применимо, и сообщению в соответствующие органы.</p>

        <h2 style={styles.h2}>5. Интеллектуальная собственность</h2>
        <p style={styles.text}>Сайт и Приложение — включая весь контент, дизайн, логотипы, статьи блога, реализации калькуляторов, код, тексты и графику — являются собственностью Ionel Aanei и защищены международными законами об авторском праве, товарных знаках и других правах интеллектуальной собственности.</p>
        <p style={styles.text}>Мы предоставляем вам ограниченную, неисключительную, непередаваемую и отзывную лицензию на использование Приложения в личных целях и чтение контента Сайта. Вы не можете:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Копировать, изменять или распространять Приложение или любую его часть</li>
          <li style={styles.li}>Производить обратную разработку, декомпилировать или дизассемблировать Приложение</li>
          <li style={styles.li}>Использовать наш дизайн, брендинг или контент в коммерческих целях</li>
          <li style={styles.li}>Создавать производные работы на основе Приложения или Сайта</li>
        </ul>
        <p style={styles.text}>
          Вы сохраняете право собственности на все торговые данные, заметки и контент, которые создаёте в Приложении («Ваш контент»). Используя Приложение, вы предоставляете нам лицензию на хранение, обработку и отображение Вашего контента исключительно с целью обеспечения функциональности Приложения. Мы не будем передавать, продавать или использовать Ваш контент в иных целях, за исключением случаев, требуемых законом.
        </p>

        <h2 style={styles.h2}>6. Подписки и платежи <span style={styles.pillApp}>APP</span></h2>
        <p style={styles.text}>Приложение предлагает как бесплатные функции, так и Premium-функции, доступные по подписке.</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Подписки оплачиваются через Google Play</li>
          <li style={styles.li}>Подписки продлеваются автоматически, если не отменены</li>
          <li style={styles.li}>Вы можете отменить подписку в любой момент в настройках Google Play</li>
          <li style={styles.li}>Без возврата средств за частичные периоды (в соответствии с политикой возврата Google Play)</li>
          <li style={styles.li}>Цены могут изменяться с уведомлением</li>
        </ul>
        <p style={styles.text}>Все платежи обрабатываются Google Play. Мы не храним и не имеем доступа к вашей платёжной информации.</p>

        <h2 style={styles.h2}>7. Данные и конфиденциальность</h2>
        <p style={styles.text}>Ваше использование Сайта и Приложения также регулируется нашей <a style={styles.link} href="/privacy-policy">Политикой конфиденциальности</a>, которая включена в настоящие Условия посредством ссылки.</p>
        <p style={styles.text}>Ключевые моменты:</p>
        <ul style={styles.ul}>
          <li style={styles.li}><span style={styles.pillWeb}>WEB</span> Сайт не собирает персональные данные напрямую. Cookie аналитики загружаются только после явного согласия.</li>
          <li style={styles.li}><span style={styles.pillApp}>APP</span> Приложение собирает данные, необходимые для обеспечения функциональности (эл. почта, торговые данные, аналитика).</li>
          <li style={styles.li}>Данные Приложения хранятся в Европейском союзе (регион eur3).</li>
          <li style={styles.li}>Мы не продаём ваши данные третьим лицам.</li>
          <li style={styles.li}>Вы можете запросить удаление вашего аккаунта и данных в любой момент.</li>
        </ul>

        <h2 style={styles.h2}>8. Отказ от гарантий</h2>
        <p style={styles.text}>
          Сайт и Приложение предоставляются <strong style={styles.strong}>«как есть»</strong> и <strong style={styles.strong}>«по мере доступности»</strong>, без каких-либо гарантий, явных или подразумеваемых, включая:
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Подразумеваемые гарантии товарной пригодности</li>
          <li style={styles.li}>Пригодность для конкретной цели</li>
          <li style={styles.li}>Точность или надёжность вычислений, статистики или образовательного контента</li>
          <li style={styles.li}>Бесперебойную или безошибочную работу</li>
          <li style={styles.li}>Быстрое устранение дефектов</li>
          <li style={styles.li}>Постоянное сохранение каких-либо данных (хотя мы применяем меры резервного копирования)</li>
        </ul>

        <h2 style={styles.h2}>9. Ограничение ответственности</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>В максимальной степени, разрешённой законом, Ionel Aanei не несёт ответственности за любые:</strong>
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Торговые убытки или финансовый ущерб любого рода</li>
          <li style={styles.li}>Упущенную прибыль или деловые возможности</li>
          <li style={styles.li}>Потерю или повреждение данных (хотя мы применяем резервное копирование)</li>
          <li style={styles.li}>Косвенный, случайный, последующий, специальный или штрафной ущерб</li>
          <li style={styles.li}>Ущерб в результате несанкционированного доступа к вашему аккаунту</li>
          <li style={styles.li}>Ущерб, причинённый сторонними сервисами (Firebase, Google Cloud, Google Analytics, Google Play, Twelve Data)</li>
        </ul>
        <p style={styles.text}>Это ограничение применяется независимо от основания ответственности (договор, деликт, неосторожность или иное), даже если мы были предупреждены о возможности такого ущерба.</p>
        <p style={styles.text}>Наша общая ответственность перед вами по всем требованиям не превысит общую сумму, уплаченную вами нам за двенадцать (12) месяцев, предшествующих требованию. Для пользователей Сайта, которые ничего нам не платили, наша максимальная ответственность ограничена 100 €.</p>

        <h2 style={styles.h2}>10. Ответственность пользователя</h2>
        <p style={styles.text}>Вы признаёте, что:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>Вы несёте единоличную ответственность за свои торговые решения.</li>
          <li style={styles.li}>Мы не контролируем финансовые рынки.</li>
          <li style={styles.li}>Статистика Приложения и результаты калькуляторов основаны на данных, которые предоставляете ВЫ.</li>
          <li style={styles.li}>Вам следует самостоятельно проверять все вычисления.</li>
          <li style={styles.li}>Вам следует создавать резервные копии важных данных.</li>
        </ul>

        <h2 style={styles.h2}>11. Возмещение убытков</h2>
        <p style={styles.text}>
          Вы соглашаетесь возмещать, защищать и ограждать Ionel Aanei от любых претензий, ущерба, убытков, обязательств и расходов (включая судебные издержки), возникающих из вашего использования Сайта или Приложения, вашего нарушения настоящих Условий, вашего нарушения любого закона или прав третьих лиц, либо вашей торговой деятельности и решений.
        </p>

        <h2 style={styles.h2}>12. Прекращение</h2>

        <h3 style={styles.h3}>12.1 Прекращение с вашей стороны</h3>
        <p style={styles.text}>Вы можете прекратить действие вашего аккаунта Приложения в любой момент:</p>
        <ul style={styles.ul}>
          <li style={styles.li}>С помощью функции «Удалить аккаунт» в настройках Приложения</li>
          <li style={styles.li}>Связавшись с нами по адресу <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a></li>
        </ul>
        <p style={styles.text}>Что касается Сайта, вы можете прекратить его посещение в любой момент без уведомления.</p>

        <h3 style={styles.h3}>12.2 Прекращение с нашей стороны</h3>
        <p style={styles.text}>Мы можем приостановить или прекратить действие вашего аккаунта немедленно, без уведомления, если вы нарушаете настоящие Условия, занимаетесь мошеннической или незаконной деятельностью, злоупотребляете Приложением или другими пользователями, либо где этого требует закон. Мы также можем прекратить работу Приложения с разумным уведомлением.</p>

        <h2 style={styles.h2}>13. Изменения Условий</h2>
        <p style={styles.text}>Мы можем изменять настоящие Условия в любой момент. Мы уведомим вас о существенных изменениях, обновив дату «Последнее обновление», разместив уведомление в Приложении или отправив письмо на ваш зарегистрированный адрес (для существенных изменений аккаунта Приложения). Продолжение использования после публикации изменений означает принятие изменённых Условий.</p>

        <h2 style={styles.h2}>14. Применимое право и споры</h2>
        <p style={styles.text}>Настоящие Условия регулируются законодательством Румынии, без учёта принципов коллизионного права.</p>
        <p style={styles.text}>Любые споры разрешаются (в следующем порядке):</p>
        <ol style={{ ...styles.ul, listStyleType: 'decimal' }}>
          <li style={styles.li}>Добросовестными переговорами между сторонами</li>
          <li style={styles.li}>Медиацией, если переговоры не удаются</li>
          <li style={styles.li}>Судами Румынии, если медиация не удаётся</li>
        </ol>

        <h2 style={styles.h2}>15. Прочее</h2>
        <p style={styles.text}>
          <strong style={styles.strong}>Полнота соглашения:</strong> настоящие Условия вместе с нашей Политикой конфиденциальности составляют полное соглашение между вами и Ionel Aanei.<br />
          <strong style={styles.strong}>Делимость:</strong> если какое-либо положение настоящих Условий признано недействительным или неисполнимым, остальные положения сохраняют полную силу.<br />
          <strong style={styles.strong}>Отказ от прав:</strong> неприменение нами какого-либо положения не является отказом от него.<br />
          <strong style={styles.strong}>Передача прав:</strong> вы не можете уступать или передавать настоящие Условия. Мы можем уступать наши права и обязанности без вашего согласия.
        </p>

        <h2 style={styles.h2}>16. Контакты</h2>
        <p style={styles.text}>По вопросам, касающимся настоящих Условий:</p>
        <p style={styles.text}>
          <strong style={styles.strong}>Эл. почта:</strong> <a style={styles.link} href="mailto:kmf45.ai@gmail.com">kmf45.ai@gmail.com</a>, <a style={styles.link} href="mailto:contact@kmfjournal.com">contact@kmfjournal.com</a><br />
          <strong style={styles.strong}>Разработчик:</strong> Ionel Aanei (индивидуальный разработчик)<br />
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
  pillWeb: { display: 'inline-block', fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.04em', background: '#4FC3F7', color: '#0F1115', marginRight: 4 },
  pillApp: { display: 'inline-block', fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.04em', background: '#FFB300', color: '#1A1200', marginRight: 4 },
};

export default TermsOfServicePage;
