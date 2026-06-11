import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function MetatraderPreTradeChecklistRo() {
  return (
    <BlogArticleLayout
      slug="metatrader-pre-trade-checklist"
      lang="ro"
      title="Cum Construiești un Pre-Trade Checklist pentru MetaTrader și cTrader (Cu 5 Reguli Care Chiar Rămân)"
      metaTitle="Pre-Trade Checklist MetaTrader: 5 Reguli Înainte de Fiecare Intrare | K.M.F."
      metaDescription="Un pre-trade checklist practic, specific platformei, pentru MetaTrader 4, MetaTrader 5, și cTrader. Cinci verificări obligatorii înainte de fiecare intrare în trade, cu exemple concrete."
      date="22 martie 2026"
      dateISO="2026-03-22"
      readTime="8 min citire"
      category="Disciplină"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Ce ar trebui să includă un pre-trade checklist pentru MetaTrader?', answer: 'Cinci verificări obligatorii: 1) Contextul pieței și direcția timeframe-ului superior, 2) Un trigger de intrare specific (nu doar „arată bine"), 3) Stop loss la un punct structural de invalidare, 4) Position size calculat cu un calculator de risc, și 5) Raport risk-reward minim 1:2 confirmat pe chart.' },
        { question: 'Cum setez un pre-trade checklist în MetaTrader?', answer: 'MetaTrader nu are o funcție de checklist încorporată. Cei mai mulți traderi folosesc un post-it fizic pe monitor, un fișier text deschis lângă platformă, sau o aplicație dedicată de trading journal ca K.M.F. care are o funcție de checklist încorporată pe care o completezi înainte să loghezi fiecare trade.' },
        { question: 'Care e diferența dintre un pre-trade checklist pentru MT4 și cTrader?', answer: 'Checklist-ul în sine e același — context de piață, trigger de intrare, stop loss, position size, risk-reward. Singura diferență e unde calculezi: cTrader are unelte de risc încorporate mai bune, în timp ce traderii MT4/MT5 au nevoie adesea de un calculator extern sau EA pentru dimensionarea precisă a lotului.' },
        { question: 'Câte puncte ar trebui să fie pe un checklist de trading?', answer: 'Cinci. Nu zece, nu cincisprezece. Cinci puncte pe care le poți verifica în sub 60 de secunde. Dacă checklist-ul tău ia mai mult de un minut, îl vei sări în zilele aglomerate — și exact alea sunt zilele când ai nevoie de el cel mai mult.' },
      ]}
      howToSteps={[
        { name: 'Verifică contextul timeframe-ului superior', text: 'Deschide chart-ul daily sau H4. Identifică trendul sau range-ul curent. Trade-ul tău trebuie să se alinieze cu acest context sau să aibă o justificare explicită de contra-trend.' },
        { name: 'Identifică un trigger de intrare specific', text: 'Definește pattern-ul exact de lumânare, semnalul de indicator, sau nivelul de preț care îți declanșează intrarea. „Arată bullish" nu e un trigger.' },
        { name: 'Marchează-ți stop loss-ul pe chart', text: 'Plasează o linie orizontală la nivelul tău de stop loss. Trebuie să fie la un punct structural de invalidare — în spatele support/resistance, dincolo de un buffer ATR, sau sub o lumânare de semnal.' },
        { name: 'Calculează position size-ul', text: 'Folosește un calculator de position size. Input: sold cont, procent de risc (1%), distanță stop loss în pips. Output: lot size exact. Niciodată nu rotunji în sus.' },
        { name: 'Confirmă raportul risk-reward', text: 'Trage o unealtă de risk-reward de la intrare la stop și target. Dacă raportul e sub 1:2, sari peste trade. Matematica nu îl susține.' },
      ]}
    >
      <Intro>
        Știi deja că ar trebui să ai un pre-trade checklist. Probabil ai și făcut unul înainte — poate după ce ai citit <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">ghidul nostru de checklist în 10 puncte</Link>. Avea douăsprezece puncte, era amănunțit, era profesionist. L-ai folosit patru zile și apoi te-ai oprit fiindcă a verifica douăsprezece lucruri înainte de fiecare trade pe MetaTrader se simțea ca a completa un formular fiscal în timp ce piața se mișca fără tine. Sună cunoscut? Nu ești leneș. Checklist-ul tău era prea lung.
      </Intro>

      <P>
        Acest ghid e diferit. Cinci puncte. Sub 60 de secunde. Specific felului în care MetaTrader (MT4/MT5) și cTrader chiar funcționează — cu butoanele, uneltele, și calculele exacte pe care trebuie să le folosești pe fiecare platformă. Fără teorie. Fără „ia în calcul starea ta emoțională" (asta e importantă, dar își are locul în jurnalul tău, nu într-un checklist de 60 de secunde). Doar cinci verificări concrete care previn cele mai comune cinci greșeli de trading.
      </P>

      <StatsStrip items={[
        { value: 5, decimals: 0, label: <>puncte de checklist —<br />punctul optim pentru conformitate</> },
        { value: 60, decimals: 0, suffix: 's', label: <>timp maxim înainte ca<br />presiunea să te facă să-l sari</> },
        { value: 2, decimals: 0, suffix: 'R', label: <>target minim — 1:2 R:R<br />sau sari peste trade</> },
      ]} />

      <Divider />

      <H2>De Ce Cinci Puncte, Nu Zece</H2>
      <P>
        Există un motiv pentru care checklist-urile de avion sunt scurte. Cercetarea NASA despre conformitatea cu checklist-urile a găsit că ratele de completare scad brusc după 5-7 puncte. Chirurgii folosesc WHO Surgical Safety Checklist — are trei secțiuni de 5-7 puncte fiecare, nu o secțiune de 19. Principiul: un checklist scurt pe care chiar îl folosești bate un checklist lung pe care îl abandonezi.
      </P>
      <P>
        În trading, asta contează și mai mult fiindcă ești adesea sub presiune de timp. Se formează un breakout. O lumânare se închide. Simți urgența să intri. Un checklist de 60 de secunde poate supraviețui acestei presiuni. Unul de 5 minute nu poate.
      </P>
      <Callout title="Regula de 60 de Secunde" color="#FFB300">
        Dacă checklist-ul tău ia mai mult de 60 de secunde, e prea lung. Taie-l. Cele cinci puncte de mai jos acoperă 90% din ce merge prost. Celelalte 10% nu merită să pierzi conformitatea pentru ele.
      </Callout>

      <Divider />

      <H2>Checklist-ul în 5 Puncte</H2>

      <H3>1. Context: Ce Face Timeframe-ul Superior?</H3>
      <P>
        Înainte să te uiți la timeframe-ul tău de intrare, treci la chart-ul daily (sau H4 dacă ești scalper). Pui o singură întrebare: e piața în trend, în range, sau în tranziție? Trade-ul tău ar trebui să se alinieze cu acest context.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Pe MetaTrader:</strong> Apasă butoanele de timeframe (D1 sau H4) din partea de sus a barei de unelte a chart-ului. Petrece 10 secunde uitându-te la ultimele 20-30 de lumânări. Există o direcție clară? Tranzacționezi cu ea sau împotriva ei?
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Pe cTrader:</strong> Același lucru — folosește dropdown-ul de timeframe sau scurtătura de tastatură. cTrader îți permite și să setezi un layout multi-timeframe (View → Multi-Symbol) ca timeframe-ul superior să fie mereu vizibil.
      </P>
      <P>
        Dacă timeframe-ul superior e agitat sau neclar, trade-ul tău are nevoie de un motiv foarte puternic ca să existe. De cele mai multe ori, „timeframe-ul superior e dezordonat" e un motiv valid să sari peste.
      </P>

      <H3>2. Trigger: Ce Anume Aștept?</H3>
      <P>
        Aici eșuează cei mai mulți traderi. Văd un „setup" — prețul e lângă support, RSI-ul e oversold, „arată bine" — și intră. Dar „arată bine" nu e un trigger. Un trigger e un eveniment specific, observabil:
      </P>
      <Ul items={[
        'O lumânare bullish engulfing care se închide peste nivelul de support',
        'O rupere și închidere peste trendline-ul descendent pe chart-ul de 15 minute',
        'Un pinbar care respinge EMA 200 cu wick-ul de cel puțin 2x corpul',
        'Divergență RSI confirmată de un higher low pe oscilator în timp ce prețul face un lower low',
      ]} />
      <P>
        Scrie-ți trigger-ul în jurnal sau pe un post-it înainte de trade. Dacă nu îl poți descrie într-o propoziție, nu ai un trigger — ai o senzație.
      </P>

      <H3>3. Stop: Unde Eșuează Ideea Mea?</H3>
      <P>
        Stop loss-ul tău ar trebui să fie la nivelul de preț unde teza trade-ului tău e invalidată. Nu un număr arbitrar de pips. Nu pe baza câtor bani ești dispus să pierzi. Stop-ul merge unde piața îți dovedește că greșești.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Pe MetaTrader:</strong> Folosește unealta de crosshair (Ctrl+F) ca să măsori distanța exactă de la intrare la stop în pips. Sau trage o linie orizontală la nivelul tău de stop și folosește „Data Window" (Ctrl+D) ca să citești prețul.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Pe cTrader:</strong> Click dreapta → „Measure" sau folosește unealta încorporată de <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">plasare a stop loss-ului</Link> care arată pips și sumă în dolari simultan.
      </P>
      <P>
        Metode comune de plasare a stop-ului:
      </P>
      <Table
        headers={['Metodă', 'Unde', 'Cel Mai Bun Pentru']}
        rows={[
          ['Pe bază de structură', 'Sub swing low / peste swing high + buffer de 5-10 pips', 'Swing trades, niveluri S/R clare'],
          ['Pe bază de ATR', '1.5× ATR sub intrare (buy) sau peste intrare (sell)', 'Piețe volatile, evenimente de știri'],
          ['Pe bază de lumânare', 'Sub low-ul lumânării de semnal + spread + buffer mic', 'Intrări intraday, pin bars'],
        ]}
      />

      <H3>4. Mărime: Cât Tranzacționez?</H3>
      <P>
        Aici își au originea cele mai multe conturi distruse. Nu din intrări proaste — din position size-uri greșite. Formula:
      </P>
      <Callout title="Formula de Position Size" color="#4FC3F7">
        Lot Size = (Sold Cont × Risc %) ÷ (Stop Loss în Pips × Valoare Pip)
      </Callout>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Pe MetaTrader:</strong> MT4/MT5 nu are un calculator de risc încorporat (da, chiar). Ai nevoie fie de: un calculator extern, un EA/indicator custom care face calculul, sau un trading journal cu un <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">calculator de lot size</Link>. K.M.F. are unul încorporat în aplicație — introduci mărimea contului, procentul de risc, distanța stop-ului, și îți dă lot size-ul exact. Mai rapid decât să faci matematica manual de fiecare dată.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Pe cTrader:</strong> cTrader are un calculator de position size încorporat (click dreapta pe tichetul de trade → „Risk %"). Setezi procentul de risc și calculează automat lot size-ul corect pe baza distanței stop-ului tău. Asta e o zonă unde cTrader chiar depășește MetaTrader.
      </P>
      <P>
        Regula: dacă faci acest calcul în cap, îl faci greșit. Folosește mereu un calculator. Matematica în minte sub presiune duce la lot size-uri „destul de aproape", iar „destul de aproape" e cum 1% risc devine 3% risc.
      </P>

      <H3>5. Recompensă: Merită Acest Trade Luat?</H3>
      <P>
        Target-ul tău trebuie să fie cel puțin 2× distanța stop loss-ului. Dacă stop-ul tău e 30 pips, target-ul tău e cel puțin 60 pips. Dacă matematica nu funcționează — dacă există un nivel major de resistance între intrarea ta și un target de 2R — sari peste trade. Nu merită riscul.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Pe MetaTrader:</strong> Folosește unealta Fibonacci sau Rectangle ca să marchezi vizual nivelurile tale de 1R, 2R, și 3R deasupra (sau dedesubtul) intrării. Unii traderi folosesc liniile de nivel „Trade" din MetaTrader care arată intrarea, SL, și TP cu distanța în pips.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Pe cTrader:</strong> Folosește unealta „Risk/Reward" (din bara de desen) ca să tragi de la intrare la stop și target. Arată raportul exact.
      </P>
      <P>
        Această verificare previne cea mai insidioasă clasă de trade-uri proaste: cele care „se simt corect" dar au matematică groaznică. Un setup la support cu un stop de 50 pips și 30 pips până la următorul resistance e un trade pe pierdere chiar dacă analiza ta e perfectă. Risk:reward-ul e 1:0.6. Trebuie să câștigi 63% dintre astea doar ca să fii pe zero. Sari peste el.
      </P>

      <Divider />

      <H2>Checklist-ul în Practică</H2>
      <Table
        headers={['#', 'Verificare', 'Timp', 'Dacă Nu']}
        rows={[
          ['1', 'Contextul TF superior susține direcția trade-ului?', '10 sec', { value: 'Sari sau ai nevoie de motiv puternic de contra-trend', color: 'red' }],
          ['2', 'Pot descrie trigger-ul de intrare într-o propoziție?', '10 sec', { value: 'Niciun trigger = niciun trade', color: 'red' }],
          ['3', 'Stop loss la invalidare structurală + buffer?', '15 sec', { value: 'Găsește nivelul potrivit sau sari', color: 'gold' }],
          ['4', 'Position size calculat cu o unealtă (nu matematică în cap)?', '15 sec', { value: 'Calculează corect întâi', color: 'gold' }],
          ['5', 'Risk:reward minim 1:2 confirmat pe chart?', '10 sec', { value: 'Sari — matematica spune nu', color: 'red' }],
        ]}
      />
      <P>
        Timp total: 60 de secunde. Cinci răspunsuri da/nu. Dacă vreun răspuns e „nu", trade-ul fie e ajustat, fie sărit. Fără excepții, fără „de data asta e diferit".
      </P>

      <Divider />

      <H2>Unde Să-ți Pui Checklist-ul</H2>
      <P>
        Checklist-ul e inutil dacă trăiește într-un Google Doc pe care nu îl deschizi niciodată. Iată cele trei metode care chiar funcționează:
      </P>
      <Ul items={[
        'Post-it fizic pe rama monitorului — nu poți evita să-l vezi. Înlocuiește-l săptămânal când se uzează.',
        'Un template de comentariu MT4 custom — scrie-ți cele 5 verificări în câmpul „Comment" al fiecărui trade. Te forțează să gândești înainte să intri.',
        'O aplicație de trading journal cu un checklist încorporat. K.M.F. are asta — bifezi punctele înainte să loghezi fiecare trade. Aplicația îți urmărește rata de conformitate în timp, ca să vezi cât de des sari peste checklist și ce se întâmplă cu rezultatele tale când o faci. (Spoiler: se înrăutățesc.)',
      ]} />

      <P>
        Indiferent ce metodă alegi, cheia e ca checklist-ul să fie între tine și trade. Ar trebui să fie imposibil să intri într-un trade fără să întâlnești întâi checklist-ul. Dacă trebuie să-l cauți activ, îl vei sări în zilele când ai nevoie de el cel mai mult — care sunt zilele când ești entuziasmat, frustrat, sau grăbit.
      </P>

      <Takeaways items={[
        'Cinci puncte, 60 de secunde. Conformitatea cu checklist-ul scade brusc după 5-7 puncte. O listă scurtă pe care o folosești bate o listă lungă pe care o abandonezi.',
        'Contextul întâi: 10 secunde pe chart-ul daily previn majoritatea trade-urilor proaste. Dacă timeframe-ul superior e dezordonat, trade-ul tău are nevoie de un motiv foarte puternic.',
        'Un trigger e un eveniment specific, nu o senzație. „Bullish engulfing peste support" e un trigger. „Arată bine" nu e.',
        'Stop loss la invalidare, nu la o sumă confortabilă în dolari. Folosește metode pe bază de structură, ATR, sau lumânare.',
        'Folosește mereu un calculator pentru position size. Matematica în cap sub presiune transformă 1% risc în 3% risc.',
        'Risk:reward sub 1:2 = sari. Indiferent cât de bun arată setup-ul, matematica spune că trade-ul nu merită luat.',
      ]} />
    </BlogArticleLayout>
  );
}
