import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function TradingViewKmfWorkflowRo() {
  return (
    <BlogArticleLayout
      slug="tradingview-kmf-workflow"
      lang="ro"
      title="TradingView + K.M.F. Journal: Workflow-ul Perfect pentru un Trader Modern"
      metaTitle="Workflow TradingView + Journal: Sistemul în 3 Pași Pe Care Îl Folosesc Pro Zilnic | K.M.F."
      metaDescription="Învață workflow-ul pas cu pas folosit de traderii disciplinați: analizezi pe TradingView, execuți pe broker, și jurnalizezi în K.M.F. — workflow-ul complet de trading modern."
      date="14 martie 2026"
      dateISO="2026-03-14"
      readTime="7 min citire"
      category="Progres"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: '10-questions-after-every-trade', title: '10 Questions Every Trader Should Ask After Every Trade', category: 'Improvement' },
        { slug: 'execution-gap-backtest-vs-live-trading', title: 'The Execution Gap: Why Your Strategy Works in Backtesting But Fails Live', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Care e cel mai bun workflow pentru un trader modern?', answer: 'Analizezi chart-urile pe TradingView, execuți trade-urile pe broker, și jurnalizezi totul într-o aplicație dedicată de trading journal. Acest workflow cu trei unelte separă analiza, execuția și review-ul pentru claritate maximă.' },
        { question: 'Cum folosesc TradingView cu un trading journal?', answer: 'Setează-ți analiza și alertele pe TradingView, fă screenshot la chart înainte să intri, apoi loghează trade-ul în jurnal cu screenshot-ul, motivul intrării, și parametrii de risc.' },
        { question: 'De ce ar trebui să separ analiza de jurnalizare?', answer: 'TradingView excelează la chart-uri dar nu are risk management, tracking emoțional, sau analize de performanță. Un jurnal dedicat umple aceste goluri și creează bucla de feedback care conduce la îmbunătățire.' },
      ]}
    >
      <Intro>
        Iată o scenă care se petrece în mii de camere de trading în fiecare zi: zărești un setup superb pe TradingView. Structură curată, confluență perfectă, intrare de manual. Treci la broker, plasezi trade-ul, și apoi... cam atât. Nicio înregistrare. Nicio notiță. Niciun screenshot. Trei săptămâni mai târziu, nu-ți amintești de ce ai intrat, care era planul tău, sau ce s-a întâmplat. Știi doar că ai pierdut $340 și ești destul de sigur că piața e măsluită. Sună cunoscut? Hai să reparăm asta.
      </Intro>

      <StatsStrip items={[
        { value: 3, decimals: 0, label: <>unelte, un workflow:<br />analizezi, execuți, revizuiești</> },
        { value: 60, decimals: 0, suffix: 's', label: <>fereastra de logare în jurnal<br />cât contextul e proaspăt</> },
        { value: 20, decimals: 0, suffix: ' min', label: <>review săptămânal care transformă<br />trade-urile în insight cumulat</> },
      ]} />

      <H2>De Ce Majoritatea Traderilor Au o Problemă de Workflow, Nu de Strategie</H2>
      <P>
        Dacă tranzacționezi de mai mult de câteva luni, probabil ai o strategie care funcționează — măcar pe hârtie. Ai văzut-o funcționând pe backtest-uri, ai văzut-o funcționând pe demo, și ai văzut-o funcționând pe anumite trade-uri live. Atunci de ce nu funcționează consistent?
      </P>
      <P>
        Fiindcă strategia e doar o treime din ecuație. Celelalte două treimi sunt execuția și review-ul. Poți avea cea mai bună rețetă din lume, dar dacă sari peste pași când gătești și nu guști niciodată rezultatul, cina o să fie dezamăgitoare. Mult.
      </P>
      <P>
        Traderii care performează bine constant nu sunt cei cu cei mai fancy indicatori sau cele mai complexe sisteme. Sunt cei cu un workflow repetabil care leagă analiza → execuția → review-ul într-o buclă închisă. Fiecare trade alimentează informația înapoi în sistem. Fiecare pierdere învață ceva specific. Fiecare câștig confirmă (sau nu) că procesul funcționează.
      </P>

      <Callout title="Setup-ul cu Trei Unelte" color="#FFB300">
        <strong>TradingView</strong> pentru analiză și planificare. <strong>Broker-ul tău</strong> (MetaTrader, cTrader, sau ce folosești) pentru execuție. <strong>K.M.F. Journal</strong> pentru înregistrare, review și îmbunătățire. Fiecare unealtă face un lucru bine — și împreună creează sistemul complet de trading.
      </Callout>

      <Divider />

      <H2>Pasul 1: Analiza Pre-Piață pe TradingView</H2>
      <P>
        Înainte să te gândești măcar să intri într-un trade, petrece 15-20 de minute pe analiza ta. Asta nu e „derulat prin chart-uri sperând că ceva sare în ochi" — aia e window shopping, nu analiză. Asta e o revizuire structurată a piețelor pe care le tranzacționezi.
      </P>
      <H3>Scanarea Timeframe-ului Superior (5 minute)</H3>
      <P>
        Începe cu chart-ul daily sau H4. Pune-ți trei întrebări: Unde e trendul? Unde sunt nivelurile cheie de support și resistance? Sunt evenimente majore azi care ar putea invalida setup-uri tehnice? Marchează aceste niveluri pe chart. Folosește uneltele de desen ale TradingView — linii orizontale pentru S/R, trendline-uri pentru canale. Ține-l curat. Dacă chart-ul tău arată ca o pictură de Jackson Pollock, complici lucrurile prea mult.
      </P>
      <H3>Scanarea de Setup-uri (10 minute)</H3>
      <P>
        Coboară la timeframe-ul tău de execuție (H1, M15, ce folosește strategia ta). Scanează-ți watchlist-ul — ideal 5-8 instrumente, nu 47. Caută setup-uri care se potrivesc cu criteriile tale specifice de intrare. Dacă nimic nu se potrivește, ăsta e un rezultat perfect valid. „Niciun setup azi" e și el o poziție — se numește prezervarea capitalului, și plătește dobândă compusă.
      </P>
      <H3>Planul (5 minute)</H3>
      <P>
        Pentru orice setup valid, scrie (da, chiar scrie) planul înainte să execuți. Folosește unealta de text încorporată în TradingView sau doar o notiță pe telefon:
      </P>
      <Ul items={[
        'Instrument și direcție (ex. EURUSD Long)',
        'Zona de intrare (nu un singur pip — o zonă unde te-ai simți confortabil să intri)',
        'Nivelul de stop loss și DE CE acel nivel invalidează trade-ul',
        'Nivelul (nivelurile) de target și DE CE te aștepți ca prețul să ajungă acolo',
        'Riscul în dolari sau procent din contul tău',
        'Orice condiții care ar anula trade-ul (ex. „nu mai e valid dacă prețul rupe peste X înainte să ajungă la intrarea mea")',
      ]} />
      <P>
        Acest plan ia 2 minute de scris și te scapă de 90% din intrările impulsive. Dacă nu poți articula planul clar, setup-ul nu e destul de clar cât să-l tranzacționezi. Pentru o abordare structurată, folosește <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklist-ul nostru în 10 puncte</Link>.
      </P>

      <Divider />

      <H2>Pasul 2: Execuția pe Broker-ul Tău</H2>
      <P>
        Acum — și abia acum — deschizi platforma broker-ului. Motivul e deliberat: TradingView e pentru gândit, broker-ul tău e pentru făcut. Amestecarea celor două duce la „doar voiam să verific chart-ul" transformându-se în „nu știu de ce tocmai am intrat pe GBPJPY".
      </P>
      <H3>Calculul de Lot Size</H3>
      <P>
        Înainte să plasezi ordinul, calculează-ți position size-ul exact. Asta nu e opțional și nu e ceva pe care îl aproximezi din ochi. Folosește un calculator de lot size (K.M.F. are unul încorporat) și introdu soldul contului, procentul de risc (1-2% e standard), prețul de intrare, și nivelul de stop loss. Calculatorul îți dă lot size-ul exact. Folosește-l. De fiecare dată.
      </P>
      <P>
        „De obicei tranzacționez 0.1 loturi" nu e risk management. E un obicei care eventual te va pune într-un trade unde 0.1 loturi reprezintă 5% risc fiindcă n-ai observat că stop-ul era mai larg decât de obicei.
      </P>
      <H3>Intrarea</H3>
      <P>
        Plasează trade-ul cu niveluri de stop loss și take profit pre-definite. Nu intra în trade plănuind să-l „gestionezi manual". Știi deja din experiență că „gestionatul manual" înseamnă să te holbezi la ecran patru ore, să-ți muți stop loss-ul de trei ori, și să iei profit în cel mai prost moment posibil fiindcă o lumânare roșie te-a speriat.
      </P>
      <P>
        Setează-l. Pleacă. Planul a fost făcut când erai calm și rațional — ai încredere în el.
      </P>

      <Divider />

      <H2>Pasul 3: Jurnalizează Trade-ul în K.M.F.</H2>
      <P>
        Aici rup majoritatea traderilor lanțul. Analizează pe TradingView, execută pe broker, și apoi... nimic. Trade-ul există în platformă, dar nu există nicio înregistrare a motivului pentru care a fost luat, care era planul, sau care era starea emoțională la intrare. Când își revizuiesc istoricul o lună mai târziu, se uită la o listă de cifre fără context.
      </P>
      <H3>Ce Să Înregistrezi (Ia 60 de Secunde)</H3>
      <Ul items={[
        'Elementele de bază: instrument, direcție, preț de intrare, stop loss, take profit, lot size',
        'Numele sau eticheta setup-ului tău — „London Breakout," „Support Bounce," „Fib Pullback," cum îi spui tu',
        'Starea ta emoțională înainte de trade (Calm? Încrezător? Anxios? Fii sincer)',
        'Un motiv într-o linie pentru trade — „Rupere curată a high-ului range-ului asiatic cu retest"',
        'Un screenshot al chart-ului tău de TradingView cu setup-ul marcat',
      ]} />
      <P>
        Cam atât. 60 de secunde. Loghezi trade-ul imediat după intrare cât contextul e proaspăt. Nu-ți spune că o vei face „mai târziu" — nu o vei face. Tu-cel-de-mai-târziu se uită la Netflix și nu-i pasă de setup-ul tău de EURUSD.
      </P>

      <H3>După Ce Se Închide Trade-ul</H3>
      <P>
        Când trade-ul îți atinge target-ul, stop loss-ul, sau ieși manual — întoarce-te la înregistrarea din jurnal și adaugă:
      </P>
      <Ul items={[
        'Rezultatul: P/L în dolari și R-multiple',
        'Starea ta emoțională după trade',
        'Ți-ai urmat planul? (Da/Nu — și fii brutal de sincer)',
        'Un lucru pe care l-ai învățat sau observat',
        'Un rating: ai lua din nou acest trade?',
      ]} />

      <Callout title={'Puterea Întrebării „Mi-am Urmat Planul?"'} color="#00C853">
        Această singură întrebare, urmărită pe 100 de trade-uri, îți va arăta ceva puternic: win rate-ul și R-multiple-ul tău când îți urmezi planul față de când nu o faci. Cei mai mulți traderi descoperă un decalaj masiv — gen 55% win rate când sunt disciplinați vs 30% când improvizează. Ăsta e felul de insight care schimbă cariere. (Explorăm acest concept în profunzime în <Link to="/blog/good-loss-vs-bad-win" className="text-kmf-accent hover:underline">Pierderi Bune, Câștiguri Proaste</Link>.)
      </Callout>

      <Divider />

      <H2>Pasul 4: Review-ul Săptămânal</H2>
      <P>
        În fiecare duminică (sau orice zi de sfârșit de săptămână ai), petrece 20 de minute revizuind săptămâna. Aici se întâmplă de fapt magia. Nu în trade-ul individual — în pattern-ul pe parcursul trade-urilor.
      </P>
      <Ul items={[
        'Câte trade-uri ai luat? A fost în intervalul tău planificat?',
        'Câte ți-au urmat planul? Câte au fost impulsive?',
        'Care a fost R-multiple-ul tău mediu pe săptămână?',
        'Care setup a performat cel mai bine? Care cel mai prost?',
        'Au fost trade-uri pe care ar fi trebuit să le iei dar nu le-ai luat? (Astea se numesc ghost trades — și sunt printre cele mai valoroase date ale tale.)',
        'Care e un lucru pe care te vei concentra să-l îmbunătățești săptămâna viitoare?',
      ]} />
      <P>
        Review-ul închide bucla. Analiză → Execuție → Jurnal → Review → Analiză Mai Bună. Fără pasul de review, doar colectezi date. Cu el, construiești un sistem de feedback care se acumulează în timp — ca dobânda, dar pentru pricepere. Ai nevoie de un template? <Link to="/blog/weekly-trading-review-template" className="text-kmf-accent hover:underline">Ghidul nostru de review săptămânal</Link> te ghidează pas cu pas.
      </P>

      <Divider />

      <H2>Workflow-ul Complet — Rezumat pe O Pagină</H2>
      <Table
        headers={['Pas', 'Unealtă', 'Timp', 'Scop']}
        rows={[
          ['1. Scanare pre-piață', 'TradingView', '15 min', 'Găsește setup-uri valide, marchează niveluri, scrie planul'],
          ['2. Calculează riscul', 'K.M.F. Lot Calculator', '30 sec', 'Lot size exact pe baza distanței stop-ului'],
          ['3. Execută', 'Broker (MT4/MT5/cTrader)', '1 min', 'Plasează trade-ul cu SL și TP pre-setate'],
          ['4. Înregistrare în jurnal', 'K.M.F. Journal', '60 sec', 'Loghează trade-ul, emoția, motivul, screenshot'],
          ['5. Update post-trade', 'K.M.F. Journal', '30 sec', 'Rezultat, respectarea planului, lecție învățată'],
          ['6. Review săptămânal', 'K.M.F. Journal', '20 min', 'Pattern-uri, performanță pe setup, îmbunătățiri'],
        ]}
      />

      <H2>De Ce Acest Workflow Chiar Funcționează</H2>
      <P>
        Trei motive:
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Separarea responsabilităților.</strong> A analiza și a executa în aceeași unealtă e ca a fi judecătorul și acuzatul în același proces. TradingView e laboratorul tău. Broker-ul tău e sala de operație. Jurnalul tău e fișa medicală. Fiecare unealtă are un singur job.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Deliberare forțată.</strong> A scrie un plan înainte să execuți adaugă fricțiune. Fricțiune bună — felul care previne intrările impulsive. Dacă îți ia 20 de minute de la zărirea unui setup până la plasarea trade-ului, deja ai filtrat majoritatea celor proaste.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Insight cumulat.</strong> După 3 luni de jurnalizare consistentă și review-uri săptămânale, îți vei cunoaște cifrele mai bine decât își cunosc majoritatea traderilor cifrele după 3 ani. Vei ști care sesiune e cea mai bună a ta, care setup are edge real, și care trade-uri sunt doar gambling deghizat.
      </P>

      <Takeaways items={[
        'Un workflow complet de trading are trei faze: Analiză (TradingView) → Execuție (Broker) → Review (Jurnal).',
        'Analiza pre-piață ar trebui să fie structurată: scanarea timeframe-ului superior, scanarea de setup-uri, plan scris — înainte să deschizi broker-ul.',
        'Calculează mereu position size-ul exact înainte să tranzacționezi. „De obicei tranzacționez X loturi" nu e risk management.',
        'Jurnalizează fiecare trade în 60 de secunde de la intrare — tu-cel-de-mai-târziu n-o va face.',
        'Urmărește „Mi-am urmat planul?" pe 100 de trade-uri ca să vezi impactul real al disciplinei pe rezultatele tale.',
        'Review-ul săptămânal închide bucla de feedback — fără el, colectezi date dar nu înveți din ele.',
      ]} />
    </BlogArticleLayout>
  );
}
