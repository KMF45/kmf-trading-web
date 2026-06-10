import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function ExcelVsTradingJournalRo() {
  return (
    <BlogArticleLayout
      slug="excel-vs-trading-journal-app"
      lang="ro"
      title="De Ce Excel Îți Omoară Încet Performanța de Trading"
      metaTitle="Excel vs Aplicație de Trading Journal: De Ce Spreadsheet-ul Te Costă Bani | K.M.F."
      metaDescription="Excel pare productiv dar îți afectează în tăcere trading-ul. Erori de calcul, logare inconsistentă și zero automatizare. Vezi de ce o aplicație dedicată de trading journal bate spreadsheet-urile."
      date="14 martie 2026"
      dateISO="2026-03-14"
      readTime="7 min citire"
      category="Progres"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'tradingview-kmf-workflow', title: 'TradingView + K.M.F. Journal: The Perfect Workflow for a Modern Trader', category: 'Improvement' },
        { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly Trading Review (With a Complete Template)', category: 'Improvement' },
        { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'E Excel destul de bun pentru un trading journal?', answer: 'Excel merge pentru logarea de bază a trade-urilor dar eșuează la automatizare, consistență și analiză. O rată de erori în formule de 1-5% înseamnă că statisticile tale pot fi greșite fără să știi.' },
        { question: 'Ce poate face o aplicație de trading journal și Excel nu poate?', answer: 'Aplicațiile dedicate oferă calcule automate (R-multiple, profit factor, expectancy), tracking emoțional, atașamente foto, sisteme de achievement-uri, pre-trade checklist-uri și backup în cloud.' },
        { question: 'Ar trebui să trec de la Excel la o aplicație de journal?', answer: 'Dacă tranzacționezi de mai mult de o lună și tot folosești Excel, da. Doar timpul economisit la introducerea manuală a datelor și mentenanța formulelor merită.' },
      ]}
    >
      <Intro>
        Să începem cu o mărturisire. Înțelegem. Excel se simte ca control. Ai construit acel spreadsheet singur, celulă cu celulă, cu propriile formule și propriul sistem de coduri de culori. Verde pentru câștiguri, roșu pentru pierderi, acea regulă de conditional formatting care ți-a luat 45 de minute să o pricepi. E copilul tău. Funcționează. În mare. În afară de acea singură dată când formula SUM a prins un rând în plus și ai crezut că ești profitabil trei săptămâni când de fapt nu erai. Dar despre asta nu vorbim.
      </Intro>

      <StatsStrip items={[
        { value: 88, decimals: 0, suffix: '%', label: <>din spreadsheet-uri conțin<br />erori de formule (studiul Panko)</> },
        { value: 26, decimals: 0, suffix: 'h', label: <>pe an petrecute întreținând<br />un sheet de journal făcut de tine</> },
        { value: 5, decimals: 0, suffix: '%', label: <>distorsiune tipică de win rate<br />de la o singură celulă greșită</> },
      ]} />

      <H2>Trading Journal-ul în Excel: O Poveste de Dragoste</H2>
      <P>
        Aproape fiecare trader începe cu Excel (sau Google Sheets — aceeași specie, grădină zoologică diferită). Are sens. E gratis, e familiar, și nimeni nu trebuie să se înscrie nicăieri. Creezi câteva coloane — Data, Pereche, Direcție, Intrare, Ieșire, P/L — și gata, ai un trading journal. Te simți organizat. Te simți profesionist. Adaugi chiar și un grafic.
      </P>
      <P>
        Luna de miere durează cam două săptămâni.
      </P>
      <P>
        Apoi vrei să-ți calculezi win rate-ul. Destul de ușor — COUNTIF pentru câștiguri împărțit la total. Apoi vrei <Link to="/blog/profit-factor-vs-win-rate" className="text-kmf-accent hover:underline">profit factor</Link>. Ok, SUMIF pentru profit brut, SUMIF pentru pierdere brută, împarte... stai, ține formula aia cont de trade-urile pe breakeven? Hai să verific. Apoi vrei să-ți vezi performanța pe sesiune de trading. Acum ai nevoie de o coloană nouă pentru ora sesiunii, un VLOOKUP ca să o categorisești, și un pivot table. Apoi vrei R-multiple per trade. Altă formulă. Apoi R-ul tău mediu pe tip de setup. Alt pivot table. Apoi cineva pe Reddit menționează analiza de drawdown și îți dai seama că trebuie să calculezi equity-ul cumulat pentru fiecare rând.
      </P>
      <P>
        Felicitări — acum petreci mai mult timp întreținându-ți spreadsheet-ul decât revizuindu-ți de fapt trade-urile. Unealta care trebuia să te ajute să tranzacționezi mai bine a devenit un al doilea job.
      </P>

      <Callout title="Capcana Spreadsheet-ului" color="#CE93D8">
        Problema fundamentală cu Excel pentru trading e asta: e o unealtă de uz general forțată într-un rol specializat. E ca și cum ai folosi un briceag de armată elvețiană ca să faci o operație — tehnic posibil, dar n-ai vrea să fii tu pacientul.
      </Callout>

      <Divider />

      <H2>Cele Cinci Moduri în Care Excel Îți Strică de Fapt Trading-ul</H2>

      <H3>1. Erori de Calcul Pe Care Nu Le Prinzi</H3>
      <P>
        Studiile lui Ray Panko de la Universitatea din Hawaii au găsit că 88% dintre spreadsheet-uri conțin erori. Nu „ar putea conține" — conțin. Într-un trading journal, asta înseamnă că win rate-ul, profit factor-ul, sau expectancy-ul tău ar putea fi greșite și nu ai ști niciodată. Iei decizii de strategie pe baza unor cifre care sunt în tăcere incorecte.
      </P>
      <P>
        Erori comune: formule care nu se extind la rândurile noi (așa că ultimele tale trade-uri nu sunt numărate), range-uri SUM care includ accidental celule de header, referințe de celule greșite după copy-paste, și clasicul — uiți să actualizezi o formulă când adaugi o coloană nouă. O singură celulă greșită și toată imaginea ta statistică e distorsionată.
      </P>
      <P>
        O aplicație dedicată de journal calculează totul automat din datele tale brute de trade-uri. Nicio formulă de stricat. Niciun range de uitat. Nicio referință de celulă care arată spre rândul greșit fiindcă ai inserat o coloană la mijloc.
      </P>

      <H3>2. Introducere Inconsistentă a Datelor</H3>
      <P>
        În Excel, nimic nu te oprește să scrii „eurusd" pe un rând, „EUR/USD" pe următorul, și „EU" trei rânduri mai jos. Sunt toate același instrument, dar Excel le tratează ca pe trei lucruri diferite. Analiza ta „performanță pe pereche" e acum gunoi fiindcă datele tale nu sunt normalizate.
      </P>
      <P>
        Aceeași problemă cu direcția trade-ului: „Long," „long," „L," „BUY" — toate în aceeași coloană. Cu datele: „14/03," „14-mar," „14 martie." Cu lot size-urile: uneori scrii „0.1," uneori „0.10," uneori uiți complet.
      </P>
      <P>
        O aplicație de journal îți dă inputuri structurate — dropdown-uri, date pickers, liste predefinite de instrumente. Datele sunt consistente prin design, nu prin disciplină. Și hai să fim sinceri: într-o vineri după-amiază după o săptămână grea de trading, disciplina ta pentru igiena spreadsheet-ului e aproximativ zero.
      </P>

      <H3>3. Fără Acces Mobil Când Ai Nevoie</H3>
      <P>
        Tocmai ai închis un trade pe telefon în drum spre serviciu. Setup-ul a fost un London breakout, te simțeai încrezător, și intrarea a fost curată. Momentul perfect să-l jurnalizezi — contextul e proaspăt, emoțiile sunt reale. Dar spreadsheet-ul tău e pe laptop acasă.
      </P>
      <P>
        „Îl loghez când ajung acasă," îți spui.
      </P>
      <P>
        Nu o faci. Niciodată nu o faci. Până seara, ai uitat prețul exact de intrare, starea emoțională, și de ce setup-ul arăta bine. Fie sari complet peste intrare, fie loghezi o înregistrare goală — data, perechea, P/L, gata. Fără notițe, fără emoții, fără screenshot. Cele mai valoroase puncte de date au dispărut pe veci.
      </P>
      <P>
        Da, Google Sheets merge pe mobil. Dacă îți place să editezi celule cu degetele mari pe un ecran de 6 inci în timp ce dropdown-ul de validare a datelor e mai mic decât un bob de orez. Am încercat. E o pedeapsă, nu un workflow.
      </P>

      <H3>4. Zero Automatizare</H3>
      <P>
        Fiecare metrică pe care o vrei din Excel, trebuie să o construiești singur. Win rate? Formulă. Profit factor? Formulă. R-multiple mediu? Formulă. Performanță pe sesiune? Pivot table. Defalcare lunară? Alt pivot table. Analiză de drawdown? Coloană custom cu calcule cumulate.
      </P>
      <P>
        Și de fiecare dată când adaugi o funcție nouă, introduci posibilitatea de a strica una existentă. E un castel de cărți de joc construit pe referințe de celule, și devine mai fragil pe măsură ce devine mai complex.
      </P>
      <P>
        O aplicație de journal calculează tot asta instant din momentul în care îți loghezi primul trade. Win rate, profit factor, <Link to="/blog/trading-expectancy-explained" className="text-kmf-accent hover:underline">expectancy</Link>, medii de <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-multiple</Link>, P/L pe sesiune, P/L pe instrument, drawdown, scoruri de disciplină, corelație cu emoția — toate automate. Adaugi un trade, statisticile se actualizează. Nu construiești nimic. Doar tranzacționezi și revizuiești.
      </P>

      <H3>5. Fără Tracking Psihologic</H3>
      <P>
        Aici Excel se prăbușește complet. Cele mai valoroase date dintr-un trading journal nu sunt cifrele — e psihologia. Cum te-ai simțit înainte de trade? Erai anxios, încrezător, plictisit? Ți-ai urmat planul? A fost ăsta un revenge trade?
      </P>
      <P>
        Poți adăuga coloane pentru asta în Excel. Dar nu există structură, nicio opțiune predefinită, nicio analiză deasupra. Vei scrie „ok" în coloana de emoții două săptămâni, apoi te oprești din a o completa fiindcă pare inutil. Exact ăsta e motivul <Link to="/blog/why-traders-fail-at-journaling" className="text-kmf-accent hover:underline">pentru care majoritatea traderilor eșuează la jurnalizare</Link> de la bun început. O aplicație dedicată de journal îți dă tracking emoțional structurat, îl corelează cu P/L-ul tău, îți arată pattern-uri („Pierzi bani 73% din timp când intri în trade-uri simțindu-te anxios"), și chiar te avertizează când detectează tilt.
      </P>
      <P>
        Încearcă să obții asta dintr-un VLOOKUP.
      </P>

      <Divider />

      <H2>Comparația Corectă</H2>
      <Table
        headers={['Funcție', 'Excel / Google Sheets', 'Aplicație Dedicată de Journal']}
        rows={[
          ['Preț', { value: 'Gratis', color: 'green' }, 'Gratis (de bază) / $5.99/lună Premium'],
          ['Timp de setup', { value: '2-4 ore (construit formule)', color: 'red' }, { value: '0 minute — loghează primul trade', color: 'green' }],
          ['Calcul win rate', { value: 'Formulă manuală', color: 'gold' }, { value: 'Automat', color: 'green' }],
          ['Profit factor', { value: 'Formulă manuală', color: 'gold' }, { value: 'Automat', color: 'green' }],
          ['Tracking R-multiple', { value: 'Formulă manuală + coloană custom', color: 'gold' }, { value: 'Automat per trade', color: 'green' }],
          ['Expectancy', { value: 'Formulă complexă', color: 'red' }, { value: 'Automat', color: 'green' }],
          ['P/L pe sesiune', { value: 'Pivot table', color: 'gold' }, { value: 'Grafic încorporat', color: 'green' }],
          ['Tracking emoțional', { value: 'Coloană text liber (nefolosită după săptămâna 1)', color: 'red' }, { value: 'Structurat cu analiză de corelație', color: 'green' }],
          ['Detecție de tilt', { value: 'Imposibil', color: 'red' }, { value: 'Avertizări automate', color: 'green' }],
          ['Logare pe mobil', { value: 'Chinuitoare', color: 'red' }, { value: 'Aplicație nativă, 60 de secunde', color: 'green' }],
          ['Scor de disciplină', { value: 'Imposibil', color: 'red' }, { value: 'Urmărit per trade și pe săptămână', color: 'green' }],
          ['Consistența datelor', { value: 'Depinde de disciplina ta', color: 'red' }, { value: 'Impusă prin design', color: 'green' }],
          ['Backup & sync', { value: 'Manual (sau auto-save Google)', color: 'gold' }, { value: 'Sync în cloud automat', color: 'green' }],
          ['Risc de eroare', { value: 'Mare (88% din spreadsheet-uri au erori)', color: 'red' }, { value: 'Niciunul (calculat din date brute)', color: 'green' }],
        ]}
      />

      <Divider />

      <H2>Când Excel Chiar Are Sens</H2>
      <P>
        Nu suntem aici ca să facem Excel praf — e o unealtă puternică. Iată unde chiar funcționează mai bine decât o aplicație de journal:
      </P>
      <Ul items={[
        'Backtesting custom: dacă construiești un model unic de backtest cu parametri specifici, Excel (sau Python) îți dă control complet.',
        'Proiecte de analiză unică: „vreau să analizez 5 ani de date sezoniere SPX" — ăsta e un job de Excel.',
        'Tracking la nivel de portofoliu: dacă gestionezi mai multe conturi, clase de active, sau poziții foarte complexe, un spreadsheet custom ar putea fi necesar.',
        'Chiar îți place să construiești spreadsheet-uri. Unora le place. Fără judecată. E hobby-ul tău și jurnalul tău.',
      ]} />
      <P>
        Dar pentru jurnalizarea zilnică a trade-urilor — actul de rutină de a loga trade-uri, a revizui performanța, a urmări emoțiile, și a te îmbunătăți în timp — o unealtă dedicată construită special pentru acest scop va depăși un spreadsheet de uz general de fiecare dată.
      </P>

      <H2>Costul Real al lui „Gratis"</H2>
      <P>
        Excel e gratis. Dar cât valorează timpul tău? Dacă petreci 30 de minute pe săptămână întreținându-ți spreadsheet-ul în loc să-ți revizuiești trade-urile, ăsta e 26 de ore pe an petrecute pe formule în loc de îmbunătățire. Dacă ratezi logarea a 3 trade-uri pe săptămână fiindcă spreadsheet-ul tău e pe laptop și tu ești pe telefon, ăstea sunt 150+ de trade-uri pe an fără înregistrare. Dacă o eroare de formulă îți distorsionează win rate-ul cu 5% și iei decizii de strategie pe baza lui trei luni înainte să o prinzi — cât a costat de fapt „gratis"?
      </P>
      <P>
        Cel mai bun trading journal e cel pe care chiar îl folosești. Constant. La fiecare trade. Cu date complete. Dacă Excel îți dă asta — grozav, continuă să-l folosești. Dar dacă ești sincer cu tine despre câte trade-uri sari, câte coloane sunt goale, și cât de încrezător ești în formulele tale... poate e timpul pentru un upgrade.
      </P>

      <Takeaways items={[
        'Excel pare productiv dar 88% dintre spreadsheet-uri conțin erori de calcul — statisticile tale de trading ar putea fi greșite fără să știi.',
        'Introducerea inconsistentă a datelor (EUR/USD vs eurusd vs EU) face analiza pe pereche nesigură.',
        'Logarea pe mobil în spreadsheet-uri e chinuitoare — iar trade-urile pe care nu le loghezi sunt cele cu cel mai valoros context.',
        'Fiecare metrică în Excel cere o formulă manuală. O aplicație de journal calculează win rate, profit factor, R-multiple, expectancy și altele automat.',
        'Tracking-ul emoțional și detecția de tilt sunt imposibile în Excel — dar sunt cele mai valoroase puncte de date pentru îmbunătățire.',
        'Excel e grozav pentru backtesting și analiză custom. Pentru jurnalizarea zilnică, o aplicație dedicată câștigă la viteză, acuratețe și consistență.',
      ]} />
    </BlogArticleLayout>
  );
}
