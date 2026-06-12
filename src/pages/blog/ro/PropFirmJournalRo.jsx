import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PropFirmJournalRo() {
  return (
    <BlogArticleLayout
      slug="prop-firm-trading-journal"
      lang="ro"
      title="Ucigașii de Conturi Prop Firm: Cum un Trading Journal Îți Salvează Contul Finanțat"
      metaTitle="Jurnal pentru Prop Firm: Sistemul Care Îți Ține Contul Finanțat în Viață | K.M.F."
      metaDescription="Cele mai multe eșecuri la prop firm nu sunt trade-uri proaste — sunt reguli încălcate. Află cum un trading journal cu calculator de risc și checklist-uri previne încălcarea daily drawdown-ului și îți ține contul finanțat în viață."
      date="23 februarie 2026"
      dateISO="2026-02-23"
      readTime="9 min citire"
      category="Managementul Riscului"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
      ]}
      faqItems={[
        { question: 'De ce eșuează majoritatea traderilor la prop firm-uri?', answer: 'Cele mai multe eșecuri nu vin din strategii proaste, ci din încălcări de reguli — depășirea limitelor de daily drawdown, overtrading după pierderi și lipsa urmăririi riscului în timp real.' },
        { question: 'Ce ar trebui să urmărească un trading journal pentru prop firm?', answer: 'Urmărește P/L-ul zilnic raportat la limita de drawdown, numărul de trade-uri pe zi, respectarea position size-ului, încălcările de reguli și starea emoțională.' },
        { question: 'Cum te ajută un jurnal să treci evaluările prop firm?', answer: 'Un jurnal impune consistență urmărind fiecare regulă din criteriile de evaluare: pierderea zilnică maximă, drawdown-ul total maxim, numărul minim de zile de trading și progresul spre ținta de profit.' },
      ]}
    >
      <Intro>
        Ai petrecut două săptămâni trecând Faza 1. Încă două săptămâni muncind prin Faza 2. În sfârșit primești contul finanțat — $50,000, bani reali, reguli reale. În ziua a patra, iei o poziție puțin prea mare pe GBP/JPY. Merge împotriva ta 80 de pips. Ești pe minus 3.2% pe zi. Limita de daily drawdown e 4%. Încă o lumânare proastă și s-a terminat. Tot ce ai muncit — dus în patru zile. Asta nu e o ipoteză. Asta e cea mai comună poveste de prop firm care există.
      </Intro>

      <StatsStrip items={[
        { value: 4, decimals: 0, suffix: '%', label: <>limita tipică de daily drawdown<br />pe conturile finanțate</> },
        { value: 60, decimals: 0, suffix: '%', label: <>din limita zilnică a firmei —<br />stopul tău personal absolut</> },
        { value: 1.5, decimals: 1, suffix: '%', label: <>risc maxim per trade<br />pe un cont de prop firm</> },
      ]} />

      <H2>De Ce Prop Firm-urile Sunt Altceva</H2>
      <P>
        Să tranzacționezi un cont personal și să tranzacționezi un cont de prop firm sunt jocuri fundamental diferite. Cu banii tăi, o zi cu drawdown de 5% doare, dar supraviețuiești. Cu un prop firm, o zi cu drawdown de 5% înseamnă că pierzi contul. Punct. Fără a doua șansă. Fără „recuperez mâine". Contul se închide, și dacă vrei să încerci din nou, plătești încă o taxă de evaluare.
      </P>
      <P>
        Majoritatea regulilor de prop firm arată cam așa: pierdere zilnică maximă de 4-5%, drawdown total maxim de 8-10%, număr minim de zile de trading, fără poziții ținute prin evenimente de știri. Regulile astea sunt stricte, neiertătoare și absolute. Și sunt construite să prindă exact genul de comportament impulsiv și nedisciplinat la care majoritatea traderilor retail recurg sub presiune.
      </P>
      <P>
        Traderii care trec evaluările și își păstrează conturile finanțate nu sunt cei cu cele mai bune strategii. Sunt cei cu cele mai bune sisteme de disciplină. Iar un trading journal bine configurat e cel mai eficient sistem de disciplină pe care îl poți construi.
      </P>

      <Divider />

      <H2>Cele Trei Feluri în Care Traderii Își Pierd Conturile Finanțate</H2>

      <H3>1. Revenge Trade-ul Supradimensionat</H3>
      <P>
        Începe cu o pierdere normală. -0.8% pe zi. În regulă. Apoi încă una: -0.5%. Acum ești pe minus 1.3% și simți presiunea. În loc să te oprești, îți dublezi următoarea poziție ca să „recuperezi rapid". Trade-ul ăla merge împotriva ta. Dintr-odată ești la -3.5% și la un stop loss distanță de încălcarea limitei. Ăsta e <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">revenge trading</Link> ca la carte — cel mai comun ucigaș de conturi din trading-ul la prop firm-uri.
      </P>

      <H3>2. Greșeala de Position Sizing</H3>
      <P>
        Pe un cont FTMO de $100,000 cu limită de daily drawdown de 5%, pierderea ta zilnică maximă e $5,000. Dacă iei trei trade-uri, fiecare poate risca maximum ~$1,650. Dar majoritatea traderilor calculează lot size-ul după „cum simt", nu după limita reală de drawdown. Riscă $2,500 per trade, iau trei trade-uri, și o sesiune proastă îi șterge. Matematica era greșită înainte ca primul trade să fie măcar plasat. Un <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">sistem corect de position sizing</Link> previne asta complet.
      </P>

      <H3>3. Spirala „Doar Încă un Trade"</H3>
      <P>
        Ți-ai atins limita de pierdere zilnică — sau ești periculos de aproape. Mutarea rațională e să închizi platforma. Dar se formează un setup perfect. Doar unul. De data asta o să meargă. Nu merge. Și acum contul e încălcat nu din cauza unui trading prost, ci pentru că nu ai avut un sistem care să te forțeze să te oprești.
      </P>

      <Callout title="Pattern-ul" color="#FF5252">
        Observă că niciunul dintre eșecurile astea nu e despre strategie. Sunt despre managementul riscului și disciplină. Setup-urile erau adesea perfect valide. Position size-urile, escaladarea emoțională și incapacitatea de a te opri — alea au fost ucigașii.
      </Callout>

      <Divider />

      <H2>Construiește-ți un Sistem de Supraviețuire pentru Prop Firm</H2>
      <P>
        Iată cum să-ți structurezi trading journal-ul ca să-ți protejezi contul finanțat. Gândește-te la el ca la o plasă de siguranță care te prinde înainte să încalci regula — nu după.
      </P>

      <H3>Înainte de Sesiune: Știi-ți Cifrele</H3>
      <P>
        Înainte să deschizi vreun chart, calculează trei cifre pentru azi:
      </P>
      <Ul items={[
        'Pierderea zilnică maximă în dolari (mărimea contului × % daily drawdown — ex. $50,000 × 4% = $2,000)',
        'Riscul maxim per trade în dolari (maximul zilnic ÷ numărul planificat de trade-uri — ex. $2,000 ÷ 3 = $666)',
        'Buffer-ul curent până la drawdown-ul total (cât loc mai ai înainte ca limita de drawdown maxim să fie încălcată)',
      ]} />
      <P>
        Scrie cifrele astea în jurnal înainte de sesiune. Ele sunt granițele tale. Fiecare decizie din restul zilei trebuie să încapă în ele.
      </P>

      <H3>Înainte de Trade: Checklist-ul de Prop Firm</H3>
      <P>
        Checklist-ul tău pre-trade pentru un cont finanțat trebuie să includă două puncte în plus de care conturile personale nu au nevoie:
      </P>
      <Ul items={[
        '„Dacă acest trade lovește stop loss-ul, mai sunt în limita mea de daily drawdown?" — Dacă răspunsul e nu, trade-ul nu poate fi luat, indiferent cât de bun e setup-ul.',
        '„Câte trade-uri am luat deja azi, și care e P/L-ul meu de până acum?" — Asta previne spirala „doar încă unul" forțându-te să-ți confrunți poziția curentă înainte să adaugi risc.',
      ]} />

      <Callout title="Cum gestionează K.M.F. asta" color="#4FC3F7">
        Calculatorul de lot size din K.M.F. calculează position size-uri exacte pe baza balanței contului, procentului de risc și distanței până la stop loss. Pentru un cont de prop firm, setează-ți riscul la maximum 1-1.5% per trade. Pre-trade checklist-ul verifică, înainte să plasezi ordinul, că fiecare intrare îți respectă criteriile — inclusiv criteriile de risc. Dacă sari peste un checkbox, checklist-ul e incomplet. E o protecție mecanică împotriva execuției impulsive.
      </Callout>

      <Divider />

      <H3>În Timpul Sesiunii: Regula Stopului Absolut</H3>
      <P>
        Decide dinainte: „Dacă ating X% pierdere zilnică, închid platforma. Nu după următorul trade. Acum." Pentru o detaliere a acestei abordări, vezi <Link to="/blog/prop-firm-daily-drawdown-guide" className="text-kmf-accent hover:underline">ghidul nostru de daily drawdown</Link>. Pentru majoritatea conturilor de prop firm, pragul ăsta trebuie setat la 60-70% din daily drawdown-ul permis. Dacă limita e 5%, stopul tău absolut e la 3%. Asta îți dă o zonă-tampon — pentru că în momentul în care îți atingi limita autoimpusă și pleci, mai ai 2% spațiu de respirat în caz de slippage sau de gap pe o poziție deschisă.
      </P>
      <P>
        Loghează regula asta în jurnal. După sesiune, scrie dacă ai respectat-o. Dacă nu — dacă ai continuat să tranzacționezi după ce ți-ai atins limita — ăla e cel mai important punct de date al zilei. Nu P/L-ul. Încălcarea de disciplină.
      </P>

      <H3>După Sesiune: Auditul Zilnic</H3>
      <P>
        La finalul fiecărei zile de trading, loghează trei lucruri în jurnal:
      </P>
      <Ul items={[
        'P/L-ul zilnic ca procent din cont — nu în dolari. Procentele țin regulile de drawdown în prim-plan.',
        'Numărul de trade-uri luate vs. maximul planificat — dacă ai planificat 3 trade-uri și ai luat 6, e un eșec de disciplină indiferent de rezultat.',
        'Starea emoțională la fiecare intrare — a fost vreun trade de azi condus de frustrare, revanșă sau plictiseală în loc de un setup valid?',
      ]} />

      <Divider />

      <H2>Povestea Mariei: Cum Jurnalizarea a Salvat un Cont de $100K</H2>
      <P>
        Maria a trecut evaluarea FTMO din a doua încercare. Pierduse deja un cont finanțat în prima ei lună — două revenge trade-uri într-o singură zi de joi i-au șters daily drawdown-ul. De data asta, era hotărâtă s-o facă altfel.
      </P>
      <P>
        Și-a construit o rutină strictă: în fiecare dimineață își scria în jurnal pierderea zilnică maximă ($5,000) și riscul per trade ($1,200). Trecea fiecare setup prin checklist. După două pierderi într-o zi, închidea platforma — fără excepții. Își loga starea emoțională înainte de fiecare trade: încrezătoare, neutră, anxioasă, frustrată.
      </P>
      <P>
        După șase săptămâni, ceva remarcabil a apărut în datele ei. În zilele marcate „anxioasă", win rate-ul ei era 31%. În zilele marcate „încrezătoare" sau „neutră", era 62%. Strategia era aceeași. Setup-urile erau aceleași. Singura variabilă era ea. Cu datele alea în mână, și-a făcut o regulă: dacă verificarea emoțională de dinainte de sesiune ieșea anxioasă sau frustrată, tranzacționa pe jumătate de size sau deloc.
      </P>
      <P>
        Trei luni mai târziu, e tot finanțată. Nu pentru că a găsit o strategie mai bună, ci pentru că a construit un sistem care protejează contul de ea însăși.
      </P>

      <Divider />

      <H2>Mentalitatea de Prop Firm</H2>
      <P>
        Traderii care își păstrează conturile finanțate pe termen lung au în comun un model mental: tratează regulile prop firm-ului nu ca pe restricții, ci ca pe strategia lor de trading. Limita de daily drawdown nu e un obstacol — e cea mai importantă regulă din planul lor. Limita de position size nu e o constrângere — e o funcție de management al riscului pe care nu și-o puteau impune singuri înainte.
      </P>
      <P>
        Un trading journal transformă aceste reguli externe în obiceiuri interne. Când loghezi fiecare trade raportat la limita de drawdown, când treci fiecare setup prin checklist, când verifici în fiecare săptămână dacă ți-ai respectat stopul absolut — regulile devin automate. Și atunci trading-ul la prop firm încetează să fie un test de stres și începe să fie o carieră.
      </P>

      <Takeaways items={[
        'Cele mai multe eșecuri la prop firm vin din erori de position sizing, revenge trading și incapacitatea de a te opri — nu din strategii proaste.',
        'Calculează-ți pierderea zilnică maximă și riscul per trade înainte de fiecare sesiune. Scrie-le. Ele sunt granițele tale absolute.',
        'Adaugă două puncte specifice prop firm-urilor în checklist-ul pre-trade: „Sunt în limita de daily drawdown?" și „Câte trade-uri am luat azi?"',
        'Setează un stop absolut la 60-70% din daily drawdown-ul permis. Închide platforma când îl atingi. Loghează dacă l-ai respectat.',
        'Urmărește starea emoțională per trade. Corelația dintre emoții și rezultate e cea mai valoroasă informație pe care o poate avea un trader de prop firm.',
      ]} />
    </BlogArticleLayout>
  );
}
