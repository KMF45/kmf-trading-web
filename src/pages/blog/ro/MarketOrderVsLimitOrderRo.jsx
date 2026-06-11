import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function MarketOrderVsLimitOrderRo() {
  return (
    <BlogArticleLayout
      slug="market-order-vs-limit-order"
      lang="ro"
      title="Market Order vs Limit Order: Costul Ascuns Care Îți Golește Contul în Tăcere"
      metaTitle="Market Order vs Limit Order: Costul Ascuns Care Îți Golește Contul | K.M.F."
      metaDescription="Market order-urile par rapide, dar plătesc în tăcere spread-ul și slippage-ul la fiecare trade. Costul real al market vs limit order — și când să folosești fiecare."
      date="7 iunie 2026"
      dateISO="2026-06-07"
      dateModified="2026-06-07"
      readTime="8 min citire"
      category="Managementul Riscului"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss That Actually Protects You', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Care e diferența dintre un market order și un limit order?', answer: 'Un market order se execută imediat la cel mai bun preț disponibil în acel moment — ai fill garantat, dar nu un preț specific. Un limit order se execută doar la prețul tău ales sau mai bun — controlezi prețul, dar fill-ul nu e garantat. Compromisul e viteză vs control al prețului.' },
        { question: 'Costă limit order-urile mai puțin decât market order-urile?', answer: 'De obicei da — dar nu din cauza comisioanelor. Un market order plătește spread-ul bid-ask și e expus la slippage la fiecare fill. Un limit order poate evita slippage-ul complet și, când cumperi la bid sau vinzi la ask, poate chiar câștiga spread-ul în loc să-l plătească. Pe multe exchange-uri, limit order-urile califică și pentru taxe „maker" mai mici.' },
        { question: 'De ce nu mi s-a executat limit order-ul?', answer: 'Fiindcă piața nu a tranzacționat niciodată la prețul tău, sau doar o parte din volumul disponibil a ajuns la nivelul tău (un fill parțial). Un limit order garantează prețul, nu execuția. Dacă prețul a fugit de la nivelul tău, ordinul tău pur și simplu stă neexecutat până e atins sau îl anulezi.' },
      ]}
    >
      <Intro>
        Pare cea mai banală alegere de pe tichetul de ordin: market sau limit. Cei mai mulți traderi apasă „market" fără să stea pe gânduri fiindcă se simte sigur — apeși buy, ești înăuntru, gata. Dar acel singur click e cel mai scump obicei din trading-ul retail. Un market order plătește în tăcere un cost la fiecare singur trade, iar pe parcursul a sute de trade-uri acel cost se compune într-o bucată semnificativă din contul tău. Înțelegerea diferenței nu e pedanterie — e diferența dintre a plăti piața și a face piața să-ți plătească ție.
      </Intro>

      <StatsStrip items={[
        { value: 2, decimals: 0, suffix: '×', label: <>spread-ul e plătit dus-întors<br />la fiecare trade cu market order</> },
        { value: 10, decimals: 0, prefix: '$', label: <>pierdut la doar 1 pip de slippage<br />pe un market order de lot standard</> },
        { value: 0, decimals: 0, label: <>slippage de preț cu un limit order<br />(dar fill-ul nu e garantat)</> },
      ]} />

      <H2>Ce Este un Market Order?</H2>
      <P>
        Un market order e o instrucțiune de a cumpăra sau vinde imediat la cel mai bun preț disponibil în acel moment. Singura lui promisiune e execuția: vei fi executat, aproape instant. Ce nu promite e prețul. Când trimiți un market buy, plătești ask-ul (prețul mai mare); când trimiți un market sell, primești bid-ul (prețul mai mic). Diferența dintre cele două — spread-ul bid-ask — e un cost pe care îl plătești în clipa în care intri, înainte ca trade-ul să se fi mișcat un singur tick.
      </P>
      <P>
        Într-o piață calmă, lichidă, acest cost e mic și previzibil. Într-o piață rapidă — o publicare de știri, o deschidere de sesiune, un instrument subțire — prețul pe care îl vezi și prețul pe care îl primești pot fi foarte diferite. Acea diferență e slippage-ul, iar un market order îl acceptă fără să întrebe.
      </P>

      <H2>Ce Este un Limit Order?</H2>
      <P>
        Un limit order e o instrucțiune de a cumpăra sau vinde doar la un preț specific sau mai bun. Un buy limit se execută la prețul tău sau mai jos; un sell limit se execută la prețul tău sau mai sus. Schimbi certitudinea execuției pentru control asupra prețului. Ordinul stă în order book până când piața ajunge la nivelul tău. Dacă nu ajunge niciodată, pur și simplu nu ești executat — ceea ce uneori e o calitate, nu un defect, fiindcă te ține în afara trade-urilor care au fugit de planul tău.
      </P>

      <Callout title="Taxa de Un Click" color="#FF5252">
        Fiecare market order plătește spread-ul la intrare și spread-ul din nou la ieșire. Pe o strategie care tranzacționează frecvent, acest cost dus-întors nu e o eroare de rotunjire — e o frână permanentă pe edge-ul tău pe care nicio analiză nu o poate recupera. Cea mai rapidă cale de a îmbunătăți o strategie de frecvență mare e adesea nu un semnal de intrare mai bun, ci un fill mai ieftin.
      </Callout>

      <H2>Costul Real: Spread și Slippage</H2>
      <P>
        Traderii sunt obsedați de comisioane fiindcă broker-ul le arată o cifră. Spread-ul și slippage-ul sunt invizibile prin comparație — sunt încorporate în prețul tău de fill — așa că majoritatea oamenilor nu le măsoară niciodată. Dar sunt de obicei mult mai mari decât comisionul.
      </P>
      <P>
        Ia în calcul un singur lot standard pe o pereche forex majoră, unde un pip valorează cam $10. Dacă intri cu un market order în timpul unui spike de știri și prinzi un pip de slippage, ăștia sunt $10 dispăruți instant — peste spread-ul pe care l-ai plătit deja. Doi pips de slippage pe o poziție de cinci loturi sunt $100, dispăruți înainte ca trade-ul să înceapă măcar să funcționeze. Nimic din asta nu apare pe extrasul tău de comisioane, totuși vine direct din expectancy-ul tău.
      </P>

      <Table
        headers={['Factor', 'Market Order', 'Limit Order']}
        rows={[
          ['Execuție', { value: 'Fill garantat', color: 'green' }, { value: 'Negarantat', color: 'gold' }],
          ['Control preț', { value: 'Niciunul — iei ce e acolo', color: 'red' }, { value: 'Preț exact sau mai bun', color: 'green' }],
          ['Cost la intrare', { value: 'Plătește spread + posibil slippage', color: 'red' }, { value: 'Fără slippage; poate câștiga spread-ul', color: 'green' }],
          ['Viteză', { value: 'Instant', color: 'green' }, { value: 'Așteaptă prețul tău', color: 'gold' }],
          ['Cazul cel mai prost', { value: 'Fill groaznic în știri sau un gap', color: 'red' }, { value: 'Mișcare ratată cât aștepți', color: 'gold' }],
        ]}
      />

      <Divider />

      <H2>Când un Market Order Este Alegerea Corectă</H2>
      <P>
        Market order-urile nu sunt dușmanul — folosirea lor orbește e. Există situații clare unde execuția garantată merită costul:
      </P>
      <Ul items={[
        'Trebuie să ieși ACUM: stop-ul tău e atins, știrile sparg împotriva ta, sau trebuie să ieși dintr-o poziție pe pierdere înainte să se înrăutățească. Certitudinea execuției bate câțiva ticks de preț.',
        'Instrumente foarte lichide cu spread-uri ultra-subțiri, unde riscul de slippage e neglijabil.',
        'Tranzacționezi un breakout rapid unde ratarea intrării costă mai mult decât spread-ul pe care îl plătești ca să-l urmărești.',
      ]} />

      <H2>Când un Limit Order Este Alegerea Corectă</H2>
      <P>
        Pentru majoritatea intrărilor planificate, un limit order e setarea implicită disciplinată. Funcționează cel mai bine când:
      </P>
      <Ul items={[
        'Ai un nivel de intrare pre-definit din analiza ta și ești dispus să aștepți ca piața să vină la tine.',
        'Tranzacționezi instrumente cu spread-uri mai largi sau lichiditate mai mică, unde slippage-ul pe un market order ar fi pedepsitor.',
        'Vrei ca ordinul în sine să impună disciplină — dacă prețul nu ajunge niciodată la nivelul tău, trade-ul pe care „trebuia să-l iei" pur și simplu nu se întâmplă niciodată.',
      ]} />
      <P>
        Ultimul punct e subevaluat. Un limit order e un dispozitiv de angajament. Elimină impulsul de a urmări un preț în mișcare și te forțează să onorezi <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">nivelurile pe care le-ai definit înainte să înceapă emoția</Link>.
      </P>

      <H2>Un Cuvânt Rapid Despre Stop Order-uri</H2>
      <P>
        Există un al treilea tip care merită numit fiindcă încurcă începătorii: un stop order. Un stop devine un market order odată ce un preț de trigger e atins — ceea ce înseamnă că stop loss-ul tău protector, când e declanșat, se execută la market și e expus la slippage exact ca orice alt market order. Un stop-limit devine în schimb un limit order, dându-ți control de preț dar riscând să nu existe niciun fill dacă prețul trece direct prin nivelul tău. Pentru un stop loss, cei mai mulți traderi acceptă slippage-ul unui stop simplu fiindcă a nu fi executat pe o ieșire protectoare e rezultatul mai periculos.
      </P>

      <H2>Cea Mai Bună Abordare a Începătorului</H2>
      <P>
        Dacă încă îți construiești baseline-ul, mergi implicit pe limit order-uri pentru intrări și stop order-uri simple pentru ieșirile protectoare. Setează-ți intrarea unde spune planul tău că ar trebui să fie, și lasă piața fie să vină la tine, fie să meargă mai departe fără tine. Apoi urmărește ce se întâmplă de fapt: loghează fill-ul tău intenționat față de fill-ul tău real, și îți vei vedea costul de slippage în dolari în loc să-l ghicești. Odată ce poți <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">dimensiona poziții</Link> și măsura execuția cinstit, decizia market-versus-limit încetează să fie un reflex și devine o parte deliberată din <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">procesul tău de risc</Link>.
      </P>

      <Takeaways items={[
        'Un market order garantează execuția dar nu prețul — plătește spread-ul la intrare și ieșire, plus orice slippage în piețe rapide.',
        'Un limit order garantează prețul dar nu execuția — poate evita slippage-ul complet și uneori câștigă spread-ul în loc să-l plătească.',
        'Spread-ul și slippage-ul sunt de obicei mai mari decât comisionul tău, totuși sunt invizibile fiindcă sunt încorporate în prețul de fill. Măsoară-le.',
        'Folosește market order-uri când certitudinea execuției contează cel mai mult: stop-out-uri, știri de ultimă oră, sau spread-uri ultra-subțiri.',
        'Folosește limit order-uri ca setare implicită disciplinată pentru intrările planificate — acționează și ca dispozitiv de angajament împotriva urmăririi prețului.',
        'Un stop loss simplu se execută la market când e declanșat, deci poartă același risc de slippage; acceptă-l, fiindcă a nu executa o ieșire protectoare e mai rău.',
      ]} />
    </BlogArticleLayout>
  );
}
