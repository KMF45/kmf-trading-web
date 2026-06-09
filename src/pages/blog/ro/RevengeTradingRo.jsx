import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { RevengeTradingEquityCurve } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function RevengeTradingRo() {
  return (
    <BlogArticleLayout
      slug="revenge-trading"
      lang="ro"
      title="Revenge Trading: Ce Este, De Ce Apare și Cum Rupi Ciclul"
      metaTitle="Revenge Trading: Ucigașul #1 de Conturi — Cum Te Oprești la Timp | K.M.F."
      metaDescription="Revenge trading-ul e una dintre cele mai rapide căi de a-ți distruge contul. Înțelege psihologia din spate și învață tehnici practice ca să-l oprești înainte să înceapă."
      date="13 ianuarie 2026"
      dateISO="2026-01-13"
      dateModified="2026-03-23"
      readTime="7 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'ghost-trades-journaling-missed-opportunities', title: 'Ghost Trades: Why the Trades You Don\'t Take Are Costing You More Than the Ones You Lose', category: 'Psychology' },
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
        { slug: 'how-to-recover-from-losing-streak', title: 'How to Recover from a Losing Streak Without Blowing Your Account', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Ce este revenge trading-ul?', answer: 'Revenge trading-ul e tranzacționare impulsivă condusă de dorința de a recupera rapid pierderile. În loc să urmeze un plan, traderul își mărește position size-ul sau frecvența, ceea ce duce de obicei la pierderi și mai mari.' },
        { question: 'Cum mă opresc din revenge trading?', answer: 'Folosește o regulă de daily loss limit, ridică-te de la ecran după o serie de pierderi, jurnalizează fiecare trade cu notițe emoționale și folosește un pre-trade checklist ca să filtrezi intrările impulsive.' },
        { question: 'De ce e revenge trading-ul atât de periculos?', answer: 'Revenge trading-ul îți sare peste regulile de risk management. Duce la poziții supradimensionate, decizii emoționale și pierderi care se adună — transformând adesea o zi mică pe pierdere într-un drawdown care-ți amenință contul.' },
      ]}
    >
      <Intro>
        Revenge trading-ul e actul de a lua trade-uri impulsive cu motivația principală de a recupera banii pierduți într-un trade anterior — nu fiindcă există un setup valid. E unul dintre cele mai distructive pattern-uri din trading-ul retail, și e aproape universal. Aproape orice trader a făcut-o. Cei care supraviețuiesc pe termen lung sunt cei care învață să se oprească.
      </Intro>

      <StatsStrip items={[
        { value: 2, decimals: 0, suffix: '×', label: <>raportul de loss aversion<br />(Kahneman & Tversky)</> },
        { value: 30, decimals: 0, suffix: ' min', label: <>pauză obligatorie<br />după un trade pe pierdere</> },
        { value: 50, decimals: 0, suffix: '%', label: <>reducere de position size<br />după pierderi consecutive</> },
      ]} />

      <H2>Psihologia Din Spate</H2>
      <P>
        Revenge trading-ul nu e o problemă de strategie. E o problemă de psihologie, înrădăcinată în trei mecanisme care se suprapun:
      </P>
      <H3>Loss Aversion</H3>
      <P>
        Cercetările lui Daniel Kahneman și Amos Tversky au stabilit că durerea psihologică de a pierde $100 e aproximativ de două ori mai intensă decât plăcerea de a câștiga $100. În trading, asta înseamnă că pierderile dor disproporționat de tare, iar creierul vrea urgent să elimine acea durere — nu procesând-o, ci ștergând-o. Cea mai rapidă cale de a șterge o pierdere de $200, insistă creierul emoțional, e să faci la loc $200 imediat.
      </P>
      <H3>Ego-ul și Nevoia de a Avea Dreptate</H3>
      <P>
        Mulți traderi — mai ales cei noi pe piețe — își leagă inconștient valoarea de sine de rezultatele trade-urilor. Ăsta e unul dintre motivele de bază <Link to="/blog/why-traders-break-their-rules" className="text-kmf-accent hover:underline">pentru care traderii își încalcă propriile reguli</Link>. O pierdere nu e doar un eveniment financiar; se simte ca un eșec personal. Trade-ul de revenge e parțial o încercare de a dovedi că piața a greșit, sau că traderul nu e incompetent. E periculos fiindcă piețelor nu le pasă de ego-ul tău.
      </P>
      <H3>Recency Bias</H3>
      <P>
        După o pierdere, traderii se concentrează adesea prea mult pe acel setup sau instrument anume, convinși că acum îl înțeleg mai bine. Această falsă încredere duce la reintrarea în același trade sau unul similar, fără niciun motiv structural să o facă.
      </P>

      <Divider />

      <H2>Cum Începe Revenge Trading-ul: Secvența Declanșatoare</H2>
      <P>
        Pattern-ul e aproape mereu același: un trade valid lovește stop loss-ul → se acumulează frustrarea → în loc să aștepte, traderul reintră imediat, adesea cu o poziție mai mare ca să recupereze mai repede → al doilea trade pierde și el → starea emoțională se înrăutățește → urmează un al treilea trade, și mai mare, fără setup clar → sesiunea se termină cu o pierdere de câteva ori mai mare decât cea inițială.
      </P>
      <RevengeTradingEquityCurve />

      <Callout title="Problema Acumulării" color="#CE93D8">
        Trade-urile de revenge adună daune în două feluri: sunt luate de obicei fără edge (în afara strategiei tale) și sunt adesea supradimensionate. Combinația dintre niciun edge și o mărime mare e formula pentru distrugerea contului.
      </Callout>

      <H2>Semne Că Ești pe Cale Să Faci Revenge Trade</H2>
      <Ul items={[
        'Tocmai ai avut o pierdere și simți un impuls puternic să intri într-un trade nou în următoarele câteva minute.',
        'Te uiți la același instrument pe care tocmai ai pierdut, căutând un motiv să reintri.',
        'Iei în calcul să-ți mărești position size-ul ca să „recuperezi mai repede".',
        'Ai maxilarul încleștat, respirația scurtă sau te simți încordat fizic.',
        'Îți spui „ăsta e diferit" sau „piața îmi datorează".',
        'Găsești motive să intri într-un trade care nu se potrivește clar cu criteriile setup-ului tău.',
      ]} />

      <H2>De Ce Revenge Trading-ul Înrăutățește Mereu Lucrurile</H2>
      <P>
        Sunt trei motive structurale pentru care trade-urile de revenge pierd bani mai des decât trade-urile aleatorii:
      </P>
      <H3>Niciun edge</H3>
      <P>
        Strategia ta are edge fiindcă identifică condiții de piață specifice și repetabile. Un trade de revenge e luat din cauza stării tale emoționale, nu fiindcă acele condiții există. În esență, faci gambling.
      </P>
      <H3>Position size mărit</H3>
      <P>
        Instinctul de a mări mărimea ca să recuperezi mai repede amplifică fiecare greșeală. Dacă riscul tău normal e $100 și dublezi ca să recuperezi, o a doua pierdere te costă acum $200. Ai transformat o zi proastă de $100 într-o zi proastă de $300.
      </P>
      <H3>Capacitate cognitivă afectată</H3>
      <P>
        Activarea emoțională — frustrare, furie, anxietate — afectează măsurabil cortexul prefrontal, partea din creier responsabilă de deciziile raționale. Ești literalmente mai puțin capabil de analiză bună când ești activat emoțional. Pieței nu-i pasă.
      </P>

      <Divider />

      <H2>Tehnici Practice ca Să Rupi Ciclul</H2>
      <H3>1. Stabilește un daily loss limit</H3>
      <P>
        Decide din timp — înainte să deschizi vreun chart — maximul pe care îl vei pierde într-o singură sesiune de trading. O cifră comună e de 2–3 ori riscul tău normal per trade. Când atingi acea limită, ziua de trading s-a terminat. Fără excepții. Această regulă scoate decizia din momentul în care ești cel mai puțin capabil să o iei bine.
      </P>
      <H3>2. Pauză obligatorie după o pierdere</H3>
      <P>
        Pune o regulă personală: după orice trade pe pierdere, trebuie să aștepți minimum 15–30 de minute înainte să intri în altul. Ridică-te, depărtează-te de ecran, ieși puțin afară. Mișcarea fizică ajută la eliminarea cortizolului și adrenalinei care se acumulează în timpul pierderilor. Pauza creează și destulă distanță cât să te întrebi: următoarea mea intrare se bazează pe un setup, sau pe emoție?
      </P>
      <H3>3. Redu mărimea după pierderi</H3>
      <P>
        Mulți traderi profesioniști își reduc position size-ul după un trade pe pierdere — uneori la 50% din normal. E opusul instinctului de revenge. Logica e solidă: când performezi sub edge-ul tău, pariurile mai mici limitează dauna. Când revii la performanța normală, restaurează treptat mărimea normală. Pentru o privire mai amănunțită pe acest subiect, vezi ghidul nostru despre <Link to="/blog/how-to-recover-from-losing-streak" className="text-kmf-accent hover:underline">revenirea dintr-o serie de pierderi</Link>.
      </P>
      <H3>4. Scrie înainte să reintri</H3>
      <P>
        Înainte să intri în orice trade după o pierdere, notează: numele setup-ului, motivul intrării, nivelul de stop loss, target-ul și starea ta emoțională pe o scară de la 1 la 10 (10 fiind complet calm). Dacă nu poți articula un setup clar, sau dacă starea ta emoțională e peste 6, nu intra. Un <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklist</Link> structurat poate automatiza acest proces.
      </P>
      <H3>5. Închide platforma</H3>
      <P>
        Cea mai fiabilă tehnică e cea mai simplă. Închide platforma de trading. Efortul de a o redeschide, de a aștepta să se încarce și de a te reloga e adesea de ajuns ca să întrerupă ciclul de revenge. Nu poți face revenge trade pe o platformă închisă.
      </P>

      <H2>Abordarea Profesionistă: Independența Trade-urilor</H2>
      <P>
        Traderii profesioniști se antrenează să trateze fiecare trade ca pe un eveniment statistic independent. Rezultatul trade-ului anterior are zero efect asupra probabilității de succes a următorului. Soldul tău e un bazin de capital de risc care va crește pe sute de trade-uri — ce se întâmplă în următoarele zece minute e irelevant pentru rezultatul următoarelor câteva luni.
      </P>
      <P>
        Când internalizezi asta cu adevărat, nu doar intelectual, revenge trading-ul își pierde strânsoarea. Nu e nimic de recuperat. E doar următorul setup valid, luat la mărimea corectă, cu stop-ul corect.
      </P>
      <P>
        Dacă vrei un protocol concret, pas cu pas, pe care să-l urmezi mecanic când ești pe tilt, citește <Link to="/blog/revenge-trading-kill-switch" className="text-kmf-accent hover:underline">Revenge Trading Kill Switch</Link> — cinci reguli pre-programate bazate pe cercetarea despre cortizol, pe care le setezi când ești calm și le urmezi când nu ești.
      </P>

      <Takeaways items={[
        'Revenge trading-ul e condus de loss aversion și ego — nu de analiza pieței.',
        'Pattern-ul e previzibil: pierdere → frustrare → trade impulsiv supradimensionat → pierdere mai mare.',
        'Trade-urile de revenge sunt periculoase de două ori: nu au edge și sunt adesea supradimensionate.',
        'Un daily loss limit pre-definit scoate decizia din cel mai prost moment posibil.',
        'Pauzele fizice, pauzele obligatorii și jurnalizarea înainte de reintrare rup toate bucla emoțională.',
        'Mentalitatea profesionistă tratează fiecare trade ca independent — pierderea anterioară e irelevantă pentru următorul setup.',
      ]} />
    </BlogArticleLayout>
  );
}
