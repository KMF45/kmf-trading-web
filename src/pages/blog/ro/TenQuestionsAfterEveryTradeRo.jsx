import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function TenQuestionsAfterEveryTradeRo() {
  return (
    <BlogArticleLayout
      slug="10-questions-after-every-trade"
      lang="ro"
      title="10 Întrebări Pe Care Orice Trader Ar Trebui Să Și Le Pună După Fiecare Trade"
      metaTitle="10 Întrebări de Pus După Trade: Obiceiul de Review Care Îți Transformă Trading-ul | K.M.F."
      metaDescription="Întrebările pe care ți le pui după un trade contează mai mult decât rezultatul. Iată 10 întrebări de review post-trade care îți vor accelera dezvoltarea ca trader."
      date="30 ianuarie 2026"
      dateISO="2026-01-30"
      readTime="5 min citire"
      category="Progres"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'good-loss-vs-bad-win', title: 'Good Losses, Bad Wins: Why the Trade You\'re Proud of Might Be Your Worst', category: 'Improvement' },
        { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly Trading Review (With a Complete Template)', category: 'Improvement' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Ce ar trebui să revizuiesc după fiecare trade?', answer: 'Revizuiește trigger-ul de intrare, execuția ieșirii, starea emoțională, risk management-ul și dacă ți-ai urmat planul. Scopul e să evaluezi calitatea deciziilor, nu doar P/L-ul.' },
        { question: 'De ce e important un review post-trade?', answer: 'Fără un review structurat, traderii repetă aceleași greșeli luni întregi. Un review post-trade creează o buclă de feedback care accelerează învățarea și ajută la identificarea pattern-urilor de comportament.' },
        { question: 'Cât ar trebui să dureze un review post-trade?', answer: '2-5 minute per trade sunt de ajuns. Răspunde la întrebările de review imediat după ce închizi trade-ul, cât experiența e proaspătă.' },
      ]}
    >
      <Intro>
        Traderul retail mediu închide un trade, se uită la cifra de profit sau pierdere, și merge mai departe. Poate se simte bine. Poate se simte frustrat. Și apoi repetă aceleași pattern-uri săptămâna viitoare, luna viitoare, și anul viitor. Traderii care se îmbunătățesc rapid fac ceva diferit: interoghează fiecare trade cu întrebări specifice, structurate, care separă ce s-a întâmplat de de ce s-a întâmplat.
      </Intro>

      <StatsStrip items={[
        { value: 10, decimals: 0, label: <>întrebări structurate<br />după fiecare trade închis</> },
        { value: 2, decimals: 0, suffix: ' min', label: <>timp total de review<br />pentru tot setul de 10</> },
        { value: 7, decimals: 0, label: <>prag de rating emoțional<br />(1–10) — sub = proces degradat</> },
      ]} />

      <H2>De Ce Contează Review-ul Post-Trade</H2>
      <P>
        Iată adevărul incomod despre rezultatele trade-urilor: poți executa un trade perfect și să pierzi bani. Poți executa un trade groaznic și să faci bani. Pe termen scurt, rezultatele și calitatea execuției sunt doar slab corelate. Piața introduce zgomot — știri neașteptate, evenimente de lichiditate, fluctuații aleatorii de preț — care pot produce orice rezultat indiferent de procesul tău.
      </P>
      <P>
        Asta înseamnă că dacă evaluezi trade-urile doar după P/L, uneori vei întări obiceiuri proaste (când trade-urile norocoase câștigă) și uneori vei pedepsi obiceiuri bune (când trade-urile disciplinate pierd din cauza zgomotului). Review-ul post-trade e modul în care separi semnalul de zgomot și evaluezi calitatea reală a deciziilor tale.
      </P>
      <Callout title="Principiul de Bază" color="#FFB300">
        Un trade pe pierdere executat perfect conform regulilor tale e un trade mai bun decât un trade pe câștig luat impulsiv. Întrebările post-trade te ajută să vezi diferența — iar pe sute de trade-uri, îți redirecționează întărirea spre proces bun în loc de rezultate aleatorii.
      </Callout>

      <Divider />

      <H2>Cele 10 Întrebări</H2>

      <H3>1. Mi-am urmat criteriile de intrare exact?</H3>
      <P>
        Nu aproximativ — exact. Criteriile tale de intrare există fiindcă definesc condițiile de piață în care strategia ta are edge. O potrivire parțială înseamnă edge parțial, în cel mai bun caz. Această întrebare forțează un răspuns binar: da sau nu. Dacă nu, ce anume a fost diferit, și de ce ai intrat oricum?
      </P>

      <H3>2. Plasarea stop loss-ului a fost pe bază de structură sau arbitrară?</H3>
      <P>
        Un stop loss ar trebui plasat la un nivel de preț care îți invalidează categoric teza trade-ului — sub un nivel de support, peste un nivel de resistance, dincolo de un swing point. Un stop arbitrar plasat fiindcă „$50 pare o pierdere rezonabilă" nu e un stop loss. E o rugăciune. Această întrebare verifică dacă riscul tău a fost definit de logica pieței, nu de comoditate. Pentru un cadru complet pe asta, citește ghidul nostru despre <Link to="/blog/how-to-set-stop-loss">cum să setezi corect un stop loss</Link>.
      </P>

      <H3>3. Am dimensionat poziția corect pentru regulile mele de risc?</H3>
      <P>
        Calculează procentul real de risc pe care l-a reprezentat acest trade. S-a potrivit cu riscul intenționat? Dacă nu, abaterea a fost intenționată și justificată, sau ai dimensionat pe bază de feeling? Position sizing-ul consistent e una dintre cele mai importante — și mai des încălcate — reguli din trading.
      </P>

      <H3>4. Care a fost starea mea emoțională înainte să intru?</H3>
      <P>
        Punctează-ți starea emoțională pe o scară simplă de la 1 la 10 (1 = extrem de agitat, 10 = complet calm și concentrat). Cercetările arată că calitatea trading-ului se degradează pe măsură ce activarea emoțională crește, mai ales peste un prag pe care majoritatea traderilor l-ar plasa în jur de 6 sau 7. Urmărirea acestui număr în timp dezvăluie dacă starea emoțională se corelează cu rezultatele în trading-ul tău specific.
      </P>

      <H3>5. Am avut un plan de ieșire clar înainte să intru?</H3>
      <P>
        Înainte să intri în orice trade, ar trebui să știi exact unde vei ieși cu o pierdere (stop loss) și exact unde plănuiești să ieși cu un profit (target sau condiții). Dacă vreuna era nedefinită în momentul intrării, ăsta e un eșec semnificativ de proces. Ieșirile nedefinite duc la ieșiri conduse de emoție în timp real — exact condiția greșită.
      </P>

      <H3>6. Mi-am mutat stop loss-ul împotriva trade-ului? De ce?</H3>
      <P>
        Mutarea unui stop loss mai departe de intrare ca să eviți să fii scos din trade e unul dintre cele mai distructive comportamente din trading. Dacă ai făcut-o pe acest trade, notează cinstit și examinează justificarea pe care ți-ai dat-o în acel moment. „Setup-ul e încă valid" e adesea o raționalizare a speranței, nu o evaluare tehnică reală.
      </P>

      <H3>7. A fost condiția de piață potrivită pentru această strategie?</H3>
      <P>
        Majoritatea strategiilor funcționează bine în condiții de piață specifice și prost în altele. O strategie de breakout eșuează adesea în piețe agitate, blocate într-un range. O strategie de mean-reversion se chinuie în trenduri puternice. S-a potrivit condiția de piață din momentul intrării cu condițiile pentru care e construită strategia ta? Dacă nu, a fost potrivit să iei trade-ul?
      </P>

      <H3>8. Ce aș fi făcut diferit?</H3>
      <P>
        Asta nu e despre a te bate cu pumnii în piept. E despre a extrage o lecție specifică, pe care poți acționa. „Ar fi trebuit să aștept ca lumânarea să se închidă înainte să intru" e util. „Ar fi trebuit să fiu mai bun" nu e. O singură schimbare concretă de comportament per trade, notată în scris, e modul în care abilitățile chiar se dezvoltă în timp.
      </P>

      <H3>9. Ce am făcut bine, indiferent de rezultat?</H3>
      <P>
        Această întrebare e la fel de importantă ca oricare alta. Întărirea procesului bun e esențială, mai ales când procesul bun duce la o pierdere (ceea ce uneori se va întâmpla). Dacă ți-ai urmat checklist-ul perfect, ai dimensionat corect, ai plasat un stop logic, și trade-ul tot a pierdut — asta merită notat ca o execuție disciplinată, nu ca un eșec.
      </P>

      <H3>10. Care e R-multiple-ul meu pe acest trade?</H3>
      <P>
        Calculează <Link to="/blog/r-multiple-explained">R-multiple-ul</Link>: P/L-ul real împărțit la riscul tău inițial. Notează acest număr pentru fiecare trade. În timp, R-multiple-ul tău mediu dezvăluie dacă strategia ta are <Link to="/blog/trading-expectancy-explained">expectancy</Link> pozitiv și îți spune mult mai multe despre performanța ta decât P/L-ul în dolari.
      </P>

      <Divider />

      <H2>Cum Folosești Aceste Întrebări</H2>
      <P>
        Nu trebuie să scrii un eseu pentru fiecare întrebare. Câteva cuvinte sau o propoziție sunt de ajuns. Disciplina de a răspunde constant la aceste întrebări după fiecare trade construiește o bază de auto-cunoaștere care devine enorm de valoroasă în timp.
      </P>
      <Table
        headers={['Întrebare', 'Format Răspuns', 'Timp Necesar']}
        rows={[
          ['Criterii de intrare urmate?', 'Da / Nu + notă scurtă dacă Nu', '10 secunde'],
          ['Baza stop loss-ului?', 'Structură / Arbitrar', '5 secunde'],
          ['Position size corect?', '% real vs % țintă', '15 secunde'],
          ['Stare emoțională (1–10)?', 'Un singur număr', '5 secunde'],
          ['Plan de ieșire definit înainte de intrare?', 'Da / Nu', '5 secunde'],
          ['Stop mutat împotriva trade-ului?', 'Da / Nu + motiv dacă Da', '10 secunde'],
          ['Condiția de piață potrivită?', 'Da / Nu + descrierea condiției', '15 secunde'],
          ['Ce să fac diferit?', 'Un comportament specific', '20 secunde'],
          ['Ce s-a făcut bine?', 'Un comportament specific', '15 secunde'],
          ['R-multiple?', 'Număr (ex. +1.8R)', '15 secunde'],
        ]}
      />
      <P>
        Timp total: aproximativ 2 minute per trade. Pe parcursul unei cariere de trading, acele 2 minute per trade sunt diferența dintre stagnare și îmbunătățire sistematică. Combină aceste întrebări cu un <Link to="/blog/weekly-trading-review-template">review săptămânal</Link> structurat și efectul de compounding pe trading-ul tău e enorm.
      </P>

      <Takeaways items={[
        'Evaluarea trade-urilor doar după P/L întărește rezultate aleatorii, nu calitatea procesului.',
        'Întrebările post-trade separă ce poți controla (execuția) de ce nu poți (rezultatul pieței).',
        'Rating-ul de stare emoțională (1–10) per trade, urmărit în timp, dezvăluie dacă psihologia se corelează cu performanța ta.',
        'Notarea unui lucru specific de făcut diferit per trade creează un jurnal de îmbunătățire pe care poți acționa.',
        'Întrebarea despre R-multiple asigură că fiecare trade contribuie la datele de expectancy ale strategiei tale.',
        'Două minute de review structurat per trade se acumulează într-o îmbunătățire semnificativă de performanță în timp.',
      ]} />
    </BlogArticleLayout>
  );
}
