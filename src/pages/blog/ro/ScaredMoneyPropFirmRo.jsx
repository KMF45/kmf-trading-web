import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { ScaredMoneyChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function ScaredMoneyPropFirmRo() {
  return (
    <BlogArticleLayout
      slug="scared-money-prop-firm"
      lang="ro"
      title={'Trading cu „Scared Money": De Ce Contul Tău Prop de 100k Se Simte ca o Povară'}
      metaTitle="Scared Money în Trading: De Ce Frica Îți Pierde Contul de Prop Firm | K.M.F."
      metaDescription="Dacă îți verifici balanța la fiecare 30 de secunde, ai pierdut deja trade-ul. Neuroștiința trading-ului condus de frică și cum te detașezi de bani pe conturile de prop firm."
      date="22 martie 2026"
      dateISO="2026-03-22"
      readTime="9 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'static-vs-trailing-drawdown', title: 'Static vs Trailing Drawdown: The Prop Firm Rule That Kills Most Funded Accounts', category: 'Risk Management' },
        { slug: 'revenge-trading-kill-switch', title: 'The Revenge Trading Kill Switch: 5 Rules That Stop the Bleed', category: 'Psychology' },
        { slug: 'tilt-recovery-protocol', title: 'Tilt Recovery Protocol: What Top Traders Do in the First 60 Minutes After a Big Loss', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Ce înseamnă scared money în trading?', answer: 'Scared money înseamnă să tranzacționezi cu un nivel de frică ce îți distorsionează deciziile. Eziți pe setup-uri valide, ieși din câștigători prea devreme, sari peste trade-uri sau tranzacționezi prea mic — toate pentru că frica de a pierde îți depășește capacitatea de a-ți executa strategia.' },
        { question: 'De ce un cont de prop firm e mai stresant decât un cont personal?', answer: 'Pentru că pierderea nu înseamnă doar bani — înseamnă toată oportunitatea. Să pici un challenge sau să pierzi un cont finanțat înseamnă să pierzi taxa, timpul investit și sursa de venit. Psihologia asta de tip „totul sau nimic" declanșează gândirea de supraviețuire, incompatibilă cu trading-ul bun.' },
        { question: 'Cum scap de frica de a-mi pierde contul de prop firm?', answer: 'Privește contul ca pe o unealtă, nu ca pe o posesiune. Pre-acceptă pierderea zilnică maximă ca pe o cheltuială de business. Setează-ți o limită de pierdere zilnică la 50% din limita firmei. Și urmărește-ți starea emoțională înainte de fiecare trade — conștientizarea fricii e primul pas spre a o depăși.' },
        { question: 'Verificarea frecventă a balanței strică performanța în trading?', answer: 'Da. Cercetarea despre frecvența monitorizării arată că traderii care își verifică P/L-ul constant iau decizii mai impulsive, ies din câștigători mai devreme și țin pierzătorii mai mult. Afișajul P/L declanșează un răspuns emoțional la fiecare tick, care interferează cu gândirea strategică.' },
      ]}
      howToSteps={[
        { name: 'Setează-ți stopul zilnic personal la 50% din limita firmei', text: 'Dacă prop firm-ul permite 5% daily drawdown, limita ta personală e 2.5%. Asta creează o zonă-tampon care te ține departe de zona de pericol, unde frica escaladează exponențial.' },
        { name: 'Scrie-ți pierderea maximă acceptabilă înainte de sesiune', text: 'Înainte să deschizi MetaTrader, scrie pe hârtie: „Azi sunt dispus să pierd $X. Asta e o cheltuială de business." Să vezi cifra scrisă înainte să înceapă trading-ul reduce șocul emoțional dacă se întâmplă.' },
        { name: 'Ascunde afișajul P/L de pe platformă', text: 'Majoritatea platformelor îți permit să ascunzi P/L-ul flotant. Tranzacționează după niveluri și R-multiple în loc de sume în dolari. Verifică P/L-ul real doar după ce se termină sesiunea.' },
        { name: 'Loghează-ți starea emoțională înainte de fiecare trade', text: 'Punctează-ți nivelul de frică de la 1 la 5 înainte să apeși buy sau sell. K.M.F. îți loghează starea emoțională pre-trade — în timp, poți vedea dacă trade-urile cu frică mare au rezultate mai proaste decât cele calme.' },
        { name: 'După 3 pierderi consecutive, închide platforma', text: 'Nu negocia. Nu lua „încă unul". Închide laptopul, așteaptă minimum 4 ore și revino doar dacă poți spune sincer că nivelul tău de frică e sub 3 din 5.' },
      ]}
    >
      <Intro>
        Ai trecut challenge-ul. Ai primit finanțarea. $100,000 din capitalul altcuiva, în contul tău de MetaTrader, așteptând să-l tranzacționezi cum ai tranzacționat în timpul evaluării. Doar că acum, fiecare pip se simte altfel. Mouse-ul tău planează peste butonul de buy 30 de secunde în loc de 3. Închizi un câștigător la +12 pips în loc să-l lași să meargă spre ținta de 40 de pips pentru că „măcar nu am pierdut". Verifici balanța după fiecare trade — uneori în mijlocul trade-ului. Felicitări: tranzacționezi oficial cu scared money, și asta e pe cale să te coste contul.
      </Intro>

      <StatsStrip items={[
        { value: 50, decimals: 0, suffix: '%', label: <>din limita zilnică a firmei —<br />stopul personal pe care să-l folosești</> },
        { value: 3, decimals: 0, label: <>pierderi consecutive înainte<br />de închiderea platformei</> },
        { value: 4, decimals: 0, suffix: 'h', label: <>pauză minimă după<br />o oprire declanșată de tilt</> },
      ]} />

      <H2>Cum Arată De Fapt „Scared Money"</H2>
      <P>
        Scared money nu înseamnă să fii precaut. Precauția e bună — înseamnă că ai un plan și îți respecți limitele de risc. Scared money e altceva. E atunci când frica devine motorul principal de decizie, călcând peste strategia care te-a adus la finanțare în primul rând.
      </P>
      <P>
        Iată cum faci diferența:
      </P>
      <Table
        headers={['Comportament', 'Precaut (Sănătos)', 'Scared Money (Distructiv)']}
        rows={[
          ['Momentul intrării', { value: 'Aștepți confirmarea completă a setup-ului', color: 'green' }, { value: 'Eziți chiar și când setup-ul e perfect', color: 'red' }],
          ['Plasarea stopului', { value: 'Structurală, pre-calculată', color: 'green' }, { value: 'Mai strâns decât cere strategia, „pentru orice eventualitate"', color: 'red' }],
          ['Take profit', { value: 'La ținta pre-definită', color: 'green' }, { value: 'Închizi devreme pentru că „profitul e profit"', color: 'red' }],
          ['După o pierdere', { value: 'Analizezi, apoi continui conform planului', color: 'green' }, { value: 'Sari peste următoarele 3 setup-uri valide de frică', color: 'red' }],
          ['Verificarea balanței', { value: 'La finalul sesiunii', color: 'green' }, { value: 'După fiecare trade, uneori în timpul trade-ului', color: 'red' }],
          ['Position size', { value: 'Conform modelului de risc', color: 'green' }, { value: 'Mai mic decât planul pentru că „dar dacă"', color: 'red' }],
        ]}
      />

      <H2>Creierul Tău pe Frică: Neuroștiința</H2>
      <P>
        Când ți-e frică să nu pierzi contul prop, corpul tău activează axa hipotalamo-hipofizo-suprarenală (HPA) — același răspuns de stres care se declanșează când ești în pericol fizic. Cortizolul îți inundă sistemul. Iată ce face asta trading-ului tău:
      </P>
      <Ul items={[
        'Atenție îngustată: Te concentrezi pe cifra P/L în loc de chart. Analiza ta periferică — contextul pieței, alinierea timeframe-urilor, volumul — dispare.',
        'Orizont de timp scurtat: Nu poți ține un trade 2 ore pentru că fiecare lumânare de 5 minute pare o eternitate. Începi să gândești în tick-uri în loc de mișcări.',
        'Bias de confirmare amplificat: Fiecare retragere minoră pare o inversare. Fiecare wick spre stopul tău pare „piața care vine după tine".',
        'Paralizie decizională: Setup-uri valide apar și dispar în timp ce dezbați dacă să intri. Îngheți. Trade-ul pleacă fără tine. Apoi și următorul.',
      ]} />
      <P>
        Asta nu e un defect de personalitate. E biochimie. Creierul tău pur și simplu nu poate procesa corect informația din piață când e inundat de hormoni de stres. Strategia care te-a adus la finanțare are nevoie de un cortex prefrontal calm — dar scared money îți pune amigdala la volan.
      </P>

      <ScaredMoneyChart />

      <Divider />

      <H2>Cele 3 Minciuni Pe Care Ți le Spune Scared Money</H2>
      <H3>Minciuna #1: „Dacă Tranzacționez Mai Mic, Nu Pot Pierde Contul"</H3>
      <P>
        Să reduci position size-ul sub planul tău pare mai sigur, dar distruge matematica risc-recompensă de care depinde strategia ta. Dacă sistemul tău are nevoie de 1% risc per trade ca să genereze randamente cu sens și tu tranzacționezi la 0.3%, ai nevoie de trei ori mai multe trade-uri câștigătoare ca să acoperi același drawdown. Ironic, să tranzacționezi prea mic pe un cont prop face mai greu de atins țintele de profit, ceea ce creează mai multă presiune, care creează mai multă frică. Spirala se hrănește singură.
      </P>
      <H3>Minciuna #2: „Să Iei Profituri Rapide E Inteligent"</H3>
      <P>
        Să închizi la +0.5R „ca să securizezi profitul" se simte ca o victorie. Dar strategia ta a fost construită pentru ținte de 2-3R. Când tai fiecare câștigător pe jumătate, <Link to="/blog/trading-expectancy-explained" className="text-kmf-accent hover:underline">expectancy-ul</Link> tău se prăbușește. Un sistem cu expectancy de +0.60R la ținte complete poate deveni -0.10R (net pierzător) când iei profituri parțiale de frică. Nu „securizezi profitul". Sângerezi încet.
      </P>
      <H3>Minciuna #3: „Tranzacționez la Size-ul Normal După Ce Îmi Construiesc un Buffer"</H3>
      <P>
        Asta e cea mai seducătoare minciună. „Tranzacționez micuț până am un buffer de 3%, apoi tranzacționez normal." Dar buffer-ul nu pare niciodată destul de mare. La 3% profit, te gândești: „Dar dacă îl pierd?" La 5%: „Nu vreau să dau ăștia înapoi." Frica nu scade cu profitul. Crește, pentru că acum chiar ai ceva de pierdut.
      </P>

      <Callout title="Paradoxul Trading-ului la Prop Firm" color="#CE93D8">
        Prop firm-ul ți-a dat contul pentru că ai tranzacționat într-un anumit fel în timpul evaluării — probabil cu risc normal, ținte complete și fără interferențe emoționale. Acum că, în sfârșit, contul e „real", tranzacționezi într-un fel complet diferit. Și apoi te miri de ce rezultatele sunt diferite. Strategia nu s-a schimbat. Tu te-ai schimbat.
      </Callout>

      <Divider />

      <H2>Cum Tranzacționezi un Cont Prop Fără Ca Frica Să Te Distrugă</H2>
      <H3>1. Pre-Acceptă Pierderea</H3>
      <P>
        Înainte de primul trade al zilei, spune cu voce tare: „Sunt dispus să pierd [limita zilnică] azi. Asta e o cheltuială de business." Scrie cifra. Asta nu e pesimism — e pregătire mentală. Când pierderea e pre-acceptată, își pierde puterea de a declanșa un răspuns de panică. Te așteptai deja la ea. Face parte din plan.
      </P>
      <H3>2. Regula Tamponului de 50%</H3>
      <P>
        Dacă prop firm-ul permite un <Link to="/blog/static-vs-trailing-drawdown" className="text-kmf-accent hover:underline">drawdown</Link> zilnic de 5%, setează-ți limita personală la 2.5%. Asta te ține permanent în „zona calmă" — destul de departe de linia de pericol încât amigdala ta să nu se activeze. Scopul nu e să maximizezi cât poți pierde pe zi. E să-ți ții creierul funcțional în timp ce tranzacționezi.
      </P>
      <H3>3. Ascunde P/L-ul în Dolari</H3>
      <P>
        Sună radical, dar funcționează. Majoritatea platformelor te lasă să minimizezi sau să ascunzi afișajul P/L flotant. Tranzacționează după nivelurile de pe chart și după R-multiple. Când vezi „-$347" pe ecran, creierul tău îl procesează ca pe o amenințare. Când vezi „prețul e la 0.6R de stop" pe chart, creierul tău îl procesează ca pe o informație. Aceeași informație, răspuns neurologic complet diferit.
      </P>
      <H3>4. Regula Celor 3 Pierderi</H3>
      <P>
        După 3 pierderi consecutive într-o singură sesiune, închide platforma. Nu „după următorul setup". Nu „după încă o încercare". Acum. Nivelurile tale de cortizol după 3 pierderi sunt prea mari pentru analiză rațională. K.M.F. are un <Link to="/blog/revenge-trading-kill-switch" className="text-kmf-accent hover:underline">sistem integrat de detecție a tilt-ului</Link> cu 4 niveluri de avertizare — prinde pattern-ul înainte să intri în spirală. Dar chiar și fără o aplicație care să-ți spună, regula e simplă: 3 pierderi = gata pentru minimum 4 ore.
      </P>
      <H3>5. Tranzacționează Procesul, Măsoară Procesul</H3>
      <P>
        Nu mai măsura succesul după P/L-ul zilnic. În schimb, urmărește: Mi-am urmat <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">checklist-ul pre-trade</Link>? Am ținut până la țintă? Mi-am respectat stopul? Dacă ai executat 5 trade-uri perfect și ai pierdut $400, a fost o zi bună. Dacă ai făcut $600 din 3 trade-uri impulsive fără stop loss, a fost o zi groaznică — doar că încă nu știi asta.
      </P>

      <Callout title="Testul Detașării" color="#00C853">
        Înainte de fiecare trade, întreabă-te: „Dacă trade-ul ăsta lovește stop loss-ul pentru o pierdere completă de 1R, o să mi se facă rău sau o să fiu neutru?" Dacă răspunsul e rău, position size-ul tău e prea mare pentru starea ta emoțională curentă — nu pentru contul tău, pentru capul tău. Redu size-ul până când pierderea se simte plictisitoare. Plictisitor e profitabil. Palpitant e scump.
      </Callout>

      <Takeaways items={[
        'Scared money nu e precauție — e atunci când frica îți înlocuiește strategia ca motor de decizie. Rezultatul: ezitare, ieșiri premature, trade-uri sărite și o sângerare lentă.',
        'Cortizolul generat de frică îți îngustează atenția, îți scurtează orizontul de timp și îți amplifică bias-ul de confirmare. Creierul tău pur și simplu nu poate analiza piața corect când ți-e frică.',
        'Să tranzacționezi prea mic sau să iei profituri rapide „ca să fii în siguranță" face de fapt mai greu de atins țintele de profit, creând mai multă presiune și mai multă frică — o spirală care se auto-întreține.',
        'Pre-acceptă-ți în scris limita de pierdere zilnică înainte să tranzacționezi. Setează-ți stopul zilnic personal la 50% din limita firmei ca să rămâi în zona calmă.',
        'Ascunde afișajul P/L în dolari și tranzacționează după R-multiple și niveluri de pe chart. Aceeași informație prezentată diferit declanșează un răspuns neurologic complet diferit.',
        'După 3 pierderi consecutive, închide platforma. Nu după încă un trade. Acum. Nivelul tău de cortizol face analiza rațională imposibilă.',
      ]} />
    </BlogArticleLayout>
  );
}
