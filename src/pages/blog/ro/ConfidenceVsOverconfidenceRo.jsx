import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function ConfidenceVsOverconfidenceRo() {
  return (
    <BlogArticleLayout
      slug="confidence-vs-overconfidence"
      lang="ro"
      title="Încredere vs Supraîncredere: Linia Invizibilă Care Separă Câștigătorii de Conturile Distruse"
      metaTitle="Încredere vs Supraîncredere în Trading: Linia Subțire Care Distruge Conturi | K.M.F."
      metaDescription="Învață diferența critică dintre încrederea sănătoasă construită pe date și supraîncrederea periculoasă alimentată de serii de câștiguri. Include un tabel de auto-evaluare și metode practice de urmărire."
      date="15 martie 2026"
      dateISO="2026-03-15"
      dateModified="2026-03-23"
      readTime="7 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Care e diferența dintre încredere și supraîncredere în trading?', answer: 'Încrederea e bazată pe date verificate — o strategie testată, un eșantion destul de mare, și un proces consistent. Supraîncrederea e bazată pe câștiguri recente, sentiment instinctiv, sau confirmation bias. Încrederea respectă regulile de risc; supraîncrederea le ignoră.' },
        { question: 'Cum știu dacă sunt supraîncrezător în trading-ul meu?', answer: 'Semnele de avertizare includ mărirea position size-ului după o serie de câștiguri, săritul peste pre-trade checklist, tranzacționarea de instrumente în afara expertizei tale, și senzația de certitudine despre rezultatul unui trade. Dacă te simți invincibil, ești supraîncrezător.' },
        { question: 'De ce sunt seriile de câștiguri periculoase pentru traderi?', answer: 'Seriile de câștiguri creează un fals sentiment de măiestrie. Creierul atribuie varianța favorabilă aleatorie priceperii personale, ducând la position size-uri mai mari, risk management mai lejer, și în cele din urmă o pierdere supradimensionată care șterge mai multe câștiguri.' },
      ]}
    >
      <Intro>
        Încrederea e esențială în trading. Fără ea, eziți pe setup-uri valide, ieși prea devreme, și pui la îndoială fiecare decizie. Dar încrederea are un geamăn întunecat — supraîncrederea — iar linia dintre ele e aproape invizibilă în timp real. Traderul care își mărește mărimea după patru câștiguri consecutive se simte exact ca traderul care are încredere într-un sistem bine testat. Diferența devine clară abia când vine următoarea pierdere.
      </Intro>

      <StatsStrip items={[
        { value: 100, decimals: 0, suffix: '+', label: <>trade-uri necesare înainte<br />ca un edge verificat să fie real</> },
        { value: 5, decimals: 0, label: <>câștiguri consecutive când<br />procesul ar trebui strâns, nu lejer</> },
        { value: 1, decimals: 0, suffix: '%', label: <>risc fix per trade —<br />constant, indiferent de serie</> },
      ]} />

      <H2>Încredere: Construită pe Dovezi</H2>
      <P>
        Încrederea reală în trading vine din trei surse: o strategie cu un edge verificat pe un eșantion semnificativ statistic (cel puțin 50–100 de trade-uri), execuția consistentă a acelei strategii fără abatere, și o relație cinstită cu rezultatele tale — inclusiv pierderile. Un trader încrezător ia o pierdere calm fiindcă știe că e o parte normală a unui sistem cu expectancy pozitiv. Nu are nevoie ca fiecare trade să câștige. Are nevoie ca procesul să fie corect.
      </P>
      <P>
        Încrederea spune: „Am luat acest setup de 80 de ori, și câștigă 55% din timp cu un reward-to-risk de 2:1. Acest trade specific ar putea pierde, dar edge-ul e real pe următoarele 100 de trade-uri." Asta e o afirmație ancorată în date, nu în emoție.
      </P>

      <H2>Supraîncredere: Construită pe Sentimente</H2>
      <P>
        Supraîncrederea arată identic din interior. Traderul se simte sigur, hotărât și limpede. Dar fundația e diferită. În loc de date, supraîncrederea e construită pe câștiguri recente, sentiment instinctiv, sau memorie selectivă. Traderul își amintește vivid ultimii cinci câștigători dar a uitat deja drawdown-ul de luna trecută. Ăsta e un exemplu de manual de <Link to="/blog/why-traders-break-their-rules" className="text-kmf-accent hover:underline">ce-i face pe traderi să-și încalce propriile reguli</Link> — starea emoțională anulează sistemul rațional.
      </P>

      <Divider />

      <H2>Efectul Dunning-Kruger în Trading</H2>
      <P>
        Efectul Dunning-Kruger descrie un bias cognitiv în care oamenii cu competență limitată într-un domeniu își supraestimează dramatic abilitatea. În trading, asta se manifestă cel mai periculos în două faze: începătorul care are o primă lună norocoasă și crede că a „descifrat piața", și traderul intermediar care a supraviețuit destul cât să se simtă experimentat dar nu a întâlnit încă o schimbare de regim sau un eveniment black swan.
      </P>
      <P>
        Cea mai periculoasă perioadă nu e începutul — e punctul în care un trader a avut destul succes cât să se simtă priceput dar nu destul eșec cât să se simtă smerit. Atunci cresc position size-urile, <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">regulile de risc</Link> încep să pară opționale, iar o singură săptămână proastă poate șterge luni de câștiguri.
      </P>

      <H2>Semnele de Avertizare ale Supraîncrederii</H2>
      <Ul items={[
        'Mărirea position size-ului după o serie de câștiguri fără nicio schimbare în strategia sau edge-ul tău.',
        'Săritul peste pre-trade checklist fiindcă „știi deja că setup-ul ăsta funcționează".',
        'Tranzacționarea mai multor instrumente decât de obicei — ramificarea în piețe pe care nu le-ai testat.',
        'Senzația de certitudine despre rezultatul unui trade. Certitudinea nu există în medii probabilistice.',
        'Ignorarea sau respingerea semnalelor care îți contrazic teza.',
        'A le povesti altora despre trade-urile tale înainte să se închidă — căutând validare, nu analiză.',
      ]} />

      <Callout title="Seriile de Câștiguri Sunt Cel Mai Periculos Moment" color="#CE93D8">
        După o serie de 5+ câștiguri, cei mai mulți traderi își schimbă inconștient comportamentul. Riscă mai mult, analizează mai puțin, și se simt invincibili. Dar seria în sine oferă zero informații despre următorul trade. Fiecare trade e statistic independent. Pieței nu-i pasă — și nici nu știe — că ai câștigat de cinci ori la rând.
      </Callout>

      <H2>Încredere vs Supraîncredere: O Comparație de Comportament</H2>
      <Table
        headers={['Comportament', 'Trader Încrezător', 'Trader Supraîncrezător']}
        rows={[
          ['Position sizing', { value: 'Urmează aceleași reguli de risc indiferent de rezultatele recente', color: 'green' }, { value: 'Mărește mărimea după câștiguri, „sunt în formă"', color: 'red' }],
          ['Pre-trade checklist', { value: 'Îl completează de fiecare dată, fără excepții', color: 'green' }, { value: 'Îl sare — „simt trade-ul ăsta"', color: 'red' }],
          ['Reacția la o pierdere', { value: 'Revizuiește procesul, nu rezultatul', color: 'green' }, { value: 'Dă vina pe piață sau pe ghinion', color: 'red' }],
          ['Conștientizarea eșantionului', { value: 'Știe că edge-ul cere 50–100+ trade-uri ca să fie validat', color: 'green' }, { value: 'Are încredere într-un pattern după 5–10 trade-uri', color: 'red' }],
          ['Instrumente noi', { value: 'Testează pe demo sau mărime mică înainte să se angajeze', color: 'green' }, { value: 'Sare cu mărime completă — „trading-ul e trading"', color: 'red' }],
          ['Urmărirea convingerii', { value: 'Notează nivelul de convingere și îl compară cu rezultatele', color: 'green' }, { value: 'Nu urmărește — se bazează pe instinct', color: 'red' }],
          ['Risk management', { value: 'Tratează regulile ca nenegociabile', color: 'green' }, { value: 'Tratează regulile ca ghiduri de anulat când e „sigur"', color: 'red' }],
        ]}
      />

      <Divider />

      <H2>Cum Măsori: Urmărirea Convingerii</H2>
      <P>
        Una dintre cele mai eficiente moduri de a detecta supraîncrederea e să-ți urmărești nivelul de convingere înainte de fiecare trade pe o scară simplă de la 1 la 5 (1 = încredere scăzută, 5 = certitudine absolută). După 50+ de trade-uri, compară scorurile tale de convingere cu rezultatele reale. Dacă trade-urile tale cu cea mai mare convingere (4–5) au un win rate mai mic decât cele cu convingere moderată (2–3), ai o problemă de supraîncredere măsurabilă. Instinctul tău nu e doar nesigur — e invers corelat cu realitatea.
      </P>
      <P>
        Aceste date transformă un bias psihologic invizibil într-o metrică vizibilă, urmăribilă. Cei mai mulți traderi care fac acest exercițiu sunt surprinși — și smeriți — de rezultate.
      </P>

      <H2>Cum Stai pe Partea Bună a Liniei</H2>
      <H3>1. Ancorează-te de datele tale, nu de sentimente</H3>
      <P>
        Înainte să mărești position size-ul, întreabă: mi s-a îmbunătățit chiar win rate-ul sau profit factor-ul pe ultimele 30 de trade-uri, sau doar simt că da? Dacă nu ai datele, nu ai răspunsul.
      </P>
      <H3>2. Tratează seriile de câștiguri ca pe un avertisment, nu ca pe o recompensă</H3>
      <P>
        Când atingi 5+ câștiguri consecutive, strânge-ți procesul în loc să-l lași lejer. E contraintuitiv dar esențial. Revenirea la medie vine — întrebarea e doar dacă vei fi dimensionat corect când o face. Noi numim asta <Link to="/blog/lotto-ticket-syndrome" className="text-kmf-accent hover:underline">Sindromul „Biletului de Loto"</Link> — dopamina câștigului face riscul invizibil.
      </P>
      <H3>3. Menține un position sizing constant</H3>
      <P>
        Până ai cel puțin 100 de trade-uri notate cu rezultate consistente, ține-ți procentul de risc fix. Fără ajustări „mă simt încrezător". <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">Regula de 1%</Link> există tocmai fiindcă judecata umană despre position sizing e nesigură sub influență emoțională.
      </P>

      <Takeaways items={[
        'Încrederea e construită pe date verificate și proces; supraîncrederea e construită pe câștiguri recente și sentiment instinctiv.',
        'Efectul Dunning-Kruger îi face pe cei mai periculoși traderi să se simtă cei mai siguri.',
        'Seriile de câștiguri sunt statistic inevitabile și oferă zero informații predictive despre următorul trade.',
        'Urmărește-ți nivelul de convingere (1–5) înainte de fiecare trade și compară-l cu rezultatele reale ca să detectezi supraîncrederea obiectiv.',
        'Semnele de avertizare includ mărirea mărimii după câștiguri, săritul peste checklist-uri, și tranzacționarea de instrumente nefamiliare.',
        'Cea mai sigură abordare: menține un position sizing fix și tratează seriile de câștiguri ca pe un semnal să-ți strângi procesul, nu să-l lași lejer.',
      ]} />
    </BlogArticleLayout>
  );
}
