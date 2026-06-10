import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WeekendGapRiskRo() {
  return (
    <BlogArticleLayout
      slug="weekend-gap-risk"
      lang="ro"
      title="Riscul de Gap în Weekend: Cum Îți Protejezi Contul de Surpriza Deschiderii de Luni"
      metaTitle="Riscul de Gap în Weekend: Ucigașul Tăcut de Conturi Pe Care Îl Ignori în Fiecare Vineri | K.M.F."
      metaDescription="Gap-urile de weekend pot trece prin stop loss-ul tău și să-ți distrugă contul peste noapte. Învață de ce apar, ce instrumente fac cel mai mult gap, și cum să-ți protejezi pozițiile înainte de weekend."
      date="15 martie 2026"
      dateISO="2026-03-15"
      readTime="7 min citire"
      category="Managementul Riscului"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Ce este un gap de weekend în trading?', answer: 'Un gap de weekend apare când un instrument se deschide luni la un preț semnificativ diferit față de închiderea de vineri. Asta se întâmplă fiindcă știrile și evenimentele continuă în weekend cât majoritatea piețelor sunt închise, creând o cerere sau ofertă acumulată care se rezolvă instant la deschidere.' },
        { question: 'Poate un stop loss să mă protejeze de un gap de weekend?', answer: 'Nu. Un stop loss se execută doar când piața e deschisă și tranzacționează la prețul tău specificat. Dacă piața face gap dincolo de stop loss-ul tău, ordinul tău se execută la primul preț disponibil — care poate fi mult mai prost decât nivelul de stop intenționat. Asta se numește slippage.' },
        { question: 'Ar trebui să închid toate pozițiile înainte de weekend?', answer: 'Depinde de strategia și toleranța ta la risc. Swing traderii care țin zile sau săptămâni acceptă riscul de gap ca parte a abordării lor, dar reduc adesea position size-ul ca să compenseze. Day traderii și scalperii își închid de obicei toate pozițiile înainte de închiderea de vineri.' },
      ]}
    >
      <Intro>
        Îți setezi stop loss-ul la -1% vineri după-amiază. Îți închizi laptopul și te bucuri de weekend. Luni dimineața, îți deschizi platforma și descoperi că poziția ta s-a deschis la -3.5%, trecând prin stop ca și cum n-ar fi existat. Ordinul tău de stop loss era acolo — piața pur și simplu a sărit peste el. Ăsta e riscul de gap în weekend, și e unul dintre cele mai puțin înțelese pericole din trading-ul retail.
      </Intro>

      <StatsStrip items={[
        { value: 48, decimals: 0, suffix: 'h', label: <>fereastra de weekend în care<br />știrile mișcă piața cât e închisă</> },
        { value: 50, decimals: 0, suffix: '%', label: <>reducere de position size<br />recomandată pentru pozițiile peste weekend</> },
        { value: 52, decimals: 0, label: <>expuneri la gap de weekend<br />acumulate pe an</> },
      ]} />

      <H2>Ce Cauzează Gap-urile de Weekend?</H2>
      <P>
        Majoritatea piețelor financiare se închid pentru aproximativ 48 de ore în fiecare weekend. Dar lumea nu se oprește. Evenimentele geopolitice, anunțurile băncilor centrale, dezastrele naturale, surprizele de earnings ale companiilor și alegerile politice continuă toate cât piețele de forex, acțiuni și mărfuri stau inactive. Când aceste piețe se redeschid duminică seara (forex) sau luni dimineața (acțiuni), toată informația acumulată se rezolvă instant într-un preț nou — adesea semnificativ diferit de închiderea de vineri.
      </P>
      <H3>Crypto: Excepția Ce Confirmă Regula</H3>
      <P>
        Piețele de crypto tranzacționează 24/7, ceea ce înseamnă că nu experimentează gap-uri de weekend în sensul tradițional. Totuși, tranzacționarea continuă a crypto creează o dinamică diferită: cât traderii de forex dorm în weekend, crypto se reevaluează activ — iar mișcările din crypto se pot revărsa în piețele corelate de forex și acțiuni la deschiderea de luni. Un crash mare de crypto sâmbătă poate prevesti un sentiment risk-off în acțiuni luni.
      </P>

      <Divider />

      <H2>De Ce Stop Loss-ul Tău Nu Te Poate Salva</H2>
      <P>
        Un stop loss e un ordin condiționat: „vinde când prețul atinge X." Dar se poate executa doar când piața e deschisă și tranzacționează activ la acel nivel de preț. Dacă piața se închide la 1.0800 vineri și se deschide la 1.0720 luni, stop loss-ul tău de la 1.0770 nu a fost niciodată declanșat — prețul a sărit peste el. Ordinul tău se execută la 1.0720, dându-ți 50 de pips de slippage dincolo de stop-ul intenționat. Pe o poziție dimensionată pentru un stop de 30 pips, asta e aproape de trei ori pierderea ta planificată. <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">Plasarea corectă a stop loss-ului</Link> trebuie să țină cont de această realitate.
      </P>

      <Callout title="Riscul Invizibil" color="#00C853">
        Riscul de gap în weekend e invizibil în backtesting. Majoritatea motoarelor de backtesting procesează stop loss-urile ca și cum s-ar executa la nivelul exact de preț, ignorând complet slippage-ul de gap. Asta înseamnă că rezultatele tale de backtest sunt sistematic mai optimiste decât realitatea dacă strategia ta ține poziții peste weekend.
      </Callout>

      <H2>Mărimi Medii ale Gap-urilor de Weekend pe Instrument</H2>
      <P>
        Nu toate instrumentele fac gap la fel. Tabelul de mai jos arată mărimile medii tipice ale gap-urilor de weekend pe baza datelor istorice. Gap-urile individuale pot fi semnificativ mai mari în timpul evenimentelor de știri cu impact mare.
      </P>
      <Table
        headers={['Instrument', 'Mărime Medie Gap', 'Gap Mare (Top 5%)', 'Frecvență Gap']}
        rows={[
          ['EUR/USD', { value: '10–20 pips', color: 'cyan' }, { value: '50–100+ pips', color: 'gold' }, 'Mai toate weekendurile'],
          ['GBP/JPY', { value: '25–50 pips', color: 'gold' }, { value: '100–200+ pips', color: 'red' }, 'Mai toate weekendurile'],
          ['USD/JPY', { value: '15–30 pips', color: 'cyan' }, { value: '60–150+ pips', color: 'gold' }, 'Mai toate weekendurile'],
          ['Aur (XAU/USD)', { value: '$3–8', color: 'gold' }, { value: '$15–40+', color: 'red' }, 'Mai toate weekendurile'],
          ['S&P 500 (ES)', { value: '0.3–0.8%', color: 'cyan' }, { value: '1.5–3%+', color: 'gold' }, 'Mai toate weekendurile'],
          ['Bitcoin (BTC)', { value: 'Fără gap (24/7)', color: 'green' }, { value: 'Fără gap (24/7)', color: 'green' }, 'N/A — continuu'],
          ['Acțiuni individuale', { value: '0.5–2%', color: 'gold' }, { value: '5–15%+ (earnings)', color: 'red' }, 'Variază după catalizator'],
        ]}
      />

      <Divider />

      <H2>Reguli de Ieșire de Vineri: Un Cadru</H2>
      <P>
        Cum gestionezi riscul de weekend depinde de stilul tău de trading. Iată trei abordări, ordonate de la cea mai conservatoare la cea mai agresivă:
      </P>
      <H3>1. Închide toate pozițiile înainte de închiderea de vineri</H3>
      <P>
        Asta elimină complet riscul de gap în weekend. E abordarea standard pentru day traderi și scalperi. Compromisul e că ocazional ratezi o deschidere favorabilă de luni — dar nici nu te trezești vreodată la un dezastru de gap. Dacă edge-ul strategiei tale vine din mișcările intraday, nu e niciun motiv să ții peste weekend.
      </P>
      <H3>2. Redu position size-ul pentru pozițiile peste weekend</H3>
      <P>
        Dacă strategia ta cere să ții poziții zile sau săptămâni, poți reduce <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">position size-ul</Link> vineri ca să ții cont de riscul de gap. O abordare comună: dacă riscul tău normal e 1% per trade, redu-l la 0.5% pentru orice poziție ținută peste weekend. Așa, chiar și un gap care îți dublează distanța stop loss-ului duce doar la o pierdere de 1% din cont — încă în parametri normali.
      </P>
      <H3>3. Hedge cu instrumente corelate</H3>
      <P>
        Unii traderi își acoperă (hedge) expunerea de weekend luând o poziție de compensare într-un instrument corelat care tranzacționează în weekend (cum ar fi crypto) sau folosind opțiuni ca să-și definească pierderea maximă. E o tehnică avansată și introduce propriile complexități, inclusiv ruperea corelației în timpul evenimentelor de stres — exact momentele când gap-urile sunt cele mai mari.
      </P>

      <H2>Ajustări de Position Sizing pentru Riscul de Weekend</H2>
      <P>
        Matematica e simplă. Dacă stop loss-ul tău normal e 30 pips și accepți că un gap de weekend ar putea adăuga încă 30 pips de slippage, distanța ta efectivă de risc e 60 pips. Dimensionează-ți poziția pentru scenariul cel mai prost, nu pentru cel mai bun. Asta înseamnă să-ți tai position size-ul la jumătate pentru pozițiile peste weekend — sau să accepți că riscul tău real e dublu față de cât sugerează stop loss-ul.
      </P>
      <P>
        Această ajustare nu e opțională. Ignorarea ei înseamnă că <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">regula ta de 1% risc</Link> devine o regulă de 2% în fiecare weekend — iar pe un an de 52 de weekenduri, acel risc necontabilizat se acumulează periculos.
      </P>

      <H2>Când Sunt Gap-urile Cele Mai Periculoase</H2>
      <Ul items={[
        'Alegeri și evenimente politice — rezultatele anunțate în weekend pot mișca valutele cu 200+ pips.',
        'Ședințe de urgență ale băncilor centrale — rare dar devastatoare când apar.',
        'Conflicte geopolitice — acțiuni militare, sancțiuni, sau rupturi diplomatice în weekend.',
        'Sezonul de earnings (acțiuni) — companii care raportează vineri după închidere sau luni înainte de deschidere.',
        'Ședințe OPEC și anunțuri de politică energetică — pot face gap mare la petrol și acțiunile din energie.',
        'Sfârșit de lună/trimestru — rebalansarea instituțională poate crea mișcări mari de luni.',
      ]} />

      <Takeaways items={[
        'Gap-urile de weekend apar fiindcă știrile și evenimentele continuă cât majoritatea piețelor sunt închise — creând salturi de preț la deschiderea de luni.',
        'Ordinele de stop loss nu te pot proteja de gap-uri. Prețul sare peste stop-ul tău, iar tu te execuți la primul preț disponibil.',
        'Instrumentele cu volatilitate de tip cross-pair, cum ar fi GBP/JPY, fac cel mai mult gap; crypto nu face gap fiindcă tranzacționează 24/7.',
        'Abordare conservatoare: închide toate pozițiile înainte de închiderea de vineri. Abordare moderată: redu position size-ul cu 50% pentru pozițiile peste weekend.',
        'Backtesting-ul nu surprinde slippage-ul de gap — rezultatele tale live vor fi mai proaste decât backtest-ul dacă ții peste weekend.',
        'Dimensionează-ți pozițiile pentru scenariul de gap cel mai prost, nu doar pentru nivelul stop loss-ului.',
      ]} />
    </BlogArticleLayout>
  );
}
