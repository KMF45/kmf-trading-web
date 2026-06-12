import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { DrawdownComparisonChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function StaticVsTrailingDrawdownRo() {
  return (
    <BlogArticleLayout
      slug="static-vs-trailing-drawdown"
      lang="ro"
      title="Static vs Trailing Drawdown: Regula Prop Firm Care Omoară în Tăcere Conturile Finanțate"
      metaTitle="Static vs Trailing Drawdown: De Ce Ți-a Fost Închis Contul Finanțat | K.M.F."
      metaDescription="Cele mai multe eșecuri la prop firm vin din faptul că traderii nu înțeleg diferența dintre static și trailing drawdown. Află cum se calculează fiecare, de ce trailing drawdown e o capcană și cum supraviețuiești amândurora."
      date="22 martie 2026"
      dateISO="2026-03-22"
      readTime="9 min citire"
      category="Managementul Riscului"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-daily-drawdown-guide', title: 'How to Never Break the Daily Drawdown Rule Again', category: 'Risk Management' },
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Care e diferența dintre static și trailing drawdown?', answer: 'Static drawdown e o limită fixă calculată din balanța inițială a contului — nu se mișcă niciodată. Trailing drawdown urmărește cea mai mare balanță atinsă (high-water mark) și urcă pe măsură ce contul crește, dar nu coboară niciodată înapoi. Trailing drawdown e mai greu de gestionat pentru că trade-urile câștigătoare îți micșorează buffer-ul rămas.' },
        { question: 'De ce e trailing drawdown mai greu decât static drawdown?', answer: 'Pentru că de fiecare dată când faci profit, limita trailing urcă odată cu tine. Dacă contul tău de $100K atinge un vârf de $106K, limita ta trailing de 5% e acum $100,700 — adică mai poți pierde doar $5,300 de la acel vârf înainte de închiderea contului. Cu static drawdown, limita rămâne la $95,000 indiferent cât profit faci.' },
        { question: 'Care prop firm-uri folosesc trailing drawdown?', answer: 'Multe prop firm-uri mai noi folosesc trailing drawdown în faza de challenge. FTMO folosește static drawdown. E8 Funding, MyFundedFX și altele folosesc trailing drawdown în cel puțin una dintre fazele challenge-ului. Citește mereu cu atenție documentul de reguli înainte să începi.' },
        { question: 'Trailing drawdown se calculează pe balanță sau pe equity?', answer: 'Depinde de firmă. Unele calculează pe balanță (doar trade-uri închise), altele pe equity (inclusiv P/L-ul flotant al pozițiilor deschise). Trailing drawdown pe equity e cel mai dur — un profit flotant care se retrage poate declanșa închiderea contului chiar dacă închizi trade-ul pe breakeven.' },
        { question: 'Trailing drawdown se oprește vreodată din urcat?', answer: 'Majoritatea prop firm-urilor blochează trailing drawdown-ul odată ce limita atinge balanța ta inițială. De exemplu, pe un cont de $100K cu trailing drawdown de 5%, odată ce limita ajunge la $100,000, se oprește din mișcat și devine practic statică. Asta se numește uneori watermark lock. Verifică mereu regula la firma ta.' },
      ]}
      howToSteps={[
        { name: 'Identifică tipul tău de drawdown', text: 'Citește documentul de reguli al prop firm-ului tău. Stabilește dacă drawdown-ul tău e static sau trailing, și dacă se calculează pe balanță sau pe equity.' },
        { name: 'Calculează-ți buffer-ul real', text: 'Pentru trailing drawdown, scade limita trailing din balanța ta curentă — nu din balanța inițială. Asta e camera de manevră reală pe care o ai.' },
        { name: 'Setează-ți o marjă personală de siguranță', text: 'Folosește doar 60% din buffer-ul disponibil. Dacă ai $5,000 până la închiderea contului, tratează $3,000 ca limita ta absolută.' },
        { name: 'Urmărește-ți high-water mark-ul', text: 'După fiecare trade câștigător, recalculează limita trailing. Noteaz-o în jurnal înainte de următoarea sesiune.' },
        { name: 'Redu size-ul după profituri', text: 'Contraintuitiv, redu position size-ul după o serie profitabilă pe conturile cu trailing drawdown. Buffer-ul tău s-a micșorat raportat la balanță.' },
      ]}
    >
      <Intro>
        Să-ți spun povestea a doi traderi. Amândoi au trecut challenge-ul prop firm-ului. Amândoi au primit cont finanțat de $100,000. Amândoi erau disciplinați. Amândoi și-au pierdut conturile în trei săptămâni. Primul trader a avut ghinion — o serie de pierderi legitimă într-o piață agitată. Se mai întâmplă. Al doilea trader era de fapt profitabil. A făcut $6,000 în primele două săptămâni. Apoi a avut două zile proaste, a dat înapoi $5,500 și a primit un email care începea cu „We regret to inform you". S-a uitat la balanța lui: $100,500. Tot pe profit. Tot peste capitalul de start. Cont închis. Ce s-a întâmplat?
      </Intro>

      <P>
        S-a întâmplat trailing drawdown-ul. Și dacă nu înțelegi diferența dintre trailing și static drawdown — să o înțelegi cu adevărat, nu doar „am citit regulile" — o să ajungi exact ca el. E cea mai prost înțeleasă regulă din trading-ul la prop firm-uri, și a omorât mai multe conturi finanțate decât strategiile proaste, ghinionul și psihologia proastă la un loc.
      </P>

      <StatsStrip items={[
        { value: 5, decimals: 0, suffix: '%', label: <>drawdown maxim tipic<br />pe conturile prop firm</> },
        { value: 60, decimals: 0, suffix: '%', label: <>din buffer de folosit ca<br />marjă personală de siguranță</> },
        { value: 100, decimals: 0, suffix: 'K', prefix: '$', label: <>mărimea standard a contului<br />finanțat din această analiză</> },
      ]} />

      <Divider />

      <H2>Static Drawdown: Cel Simplu</H2>
      <P>
        Static drawdown e ceea ce majoritatea traderilor cred că sunt toate regulile de drawdown. Funcționează așa:
      </P>
      <Ul items={[
        'Începi cu $100,000.',
        'Drawdown-ul maxim e 10% (de exemplu).',
        'Nivelul tău de închidere a contului e $90,000.',
        'Nu contează dacă contul ajunge la $120,000. Limita rămâne la $90,000. Pentru totdeauna.',
      ]} />
      <P>
        Static drawdown e previzibil. Îți poți calcula scenariul cel mai negru din prima zi, și nu se schimbă niciodată. Dacă ești la $112,000 după o lună excelentă, știi că ai $22,000 cameră de manevră. Dacă ai o săptămână groaznică și cobori la $95,000, știi că ți-au rămas $5,000. Matematica nu te surprinde niciodată.
      </P>
      <Callout title="Static Drawdown = Prietenul Tău" color="#00C853">
        Cu static drawdown, fiecare dolar pe care îl faci îți mărește buffer-ul de siguranță. Cu cât tranzacționezi mai bine, cu atât devine mai greu să-ți pierzi contul. Așa ar trebui să funcționeze drawdown-ul.
      </Callout>

      <Divider />

      <H2>Trailing Drawdown: Capcana</H2>
      <P>
        Trailing drawdown urmărește cea mai mare balanță atinsă de contul tău — <strong>„high-water mark"</strong>. De fiecare dată când contul atinge un vârf nou, limita trailing urcă odată cu el. <strong>Urcă doar, nu coboară niciodată.</strong>
      </P>
      <P>
        Același exemplu:
      </P>
      <Ul items={[
        'Începi cu $100,000. Limita de trailing drawdown e 5% = $95,000.',
        'Faci $3,000. Contul e $103,000. Noua limită trailing: $97,850 (5% sub $103K).',
        'Mai faci $3,000. Contul e $106,000. Noua limită trailing: $100,700.',
        'Acum ai o săptămână proastă. Pierzi $5,500. Contul e $100,500.',
        'Ești încă pe profit. Ești peste balanța de start. Dar $100,500 e sub $100,700.',
        'Cont închis.',
      ]} />
      <P>
        Citește cifrele alea din nou. Traderul a făcut $6,000, a dat înapoi $5,500 și era tot pe plus. Dar limita trailing urcase la $100,700 în timpul seriei câștigătoare — și nu a mai coborât niciodată. Propriile profituri ale traderului au construit zidul care l-a omorât.
      </P>

      <Callout title="Important: Majoritatea Firmelor Blochează Trail-ul la Balanța de Start" color="#4FC3F7">
        Vestea bună: majoritatea prop firm-urilor opresc trailing drawdown-ul odată ce limita atinge balanța ta inițială. În exemplul nostru, odată ce limita trailing ajunge la $100,000, se blochează acolo permanent — devenind practic static drawdown din acel punct. Asta înseamnă că primul tău obiectiv pe un cont cu trailing e să acumulezi destul profit încât trail-ul să „prindă din urmă" balanța de start. După aia, fiecare dolar suplimentar de profit e buffer adevărat. Verifică regulile firmei tale — unele îi spun „watermark lock" sau pur și simplu menționează că trailing-ul se transformă în static după atingerea balanței inițiale.</Callout>

      <DrawdownComparisonChart />

      <H2>Matematica pe Care Nu o Face Nimeni</H2>
      <P>
        Aici e partea care îți va salva contul. Hai să vedem ce se întâmplă cu buffer-ul tău real — distanța dintre balanță și nivelul de închidere a contului — pe măsură ce contul crește.
      </P>
      <Table
        headers={['Balanță', 'Limită Static (10%)', 'Buffer Static', 'Limită Trailing (5%)', 'Buffer Trailing']}
        rows={[
          ['$100,000', '$90,000', { value: '$10,000', color: 'green' }, '$95,000', { value: '$5,000', color: 'gold' }],
          ['$103,000', '$90,000', { value: '$13,000', color: 'green' }, '$97,850', { value: '$5,150', color: 'gold' }],
          ['$106,000', '$90,000', { value: '$16,000', color: 'green' }, '$100,700', { value: '$5,300', color: 'gold' }],
          ['$108,000', '$90,000', { value: '$18,000', color: 'green' }, '$102,600', { value: '$5,400', color: 'gold' }],
          ['$104,000 (retragere)', '$90,000', { value: '$14,000', color: 'green' }, '$102,600', { value: '$1,400', color: 'red' }],
        ]}
      />
      <P>
        Uită-te la ultimul rând. După o retragere normală de la $108K la $104K, traderul cu static mai are $14,000 buffer. Traderul cu trailing are $1,400. Încă un trade prost și s-a terminat.
      </P>
      <Callout title="Paradoxul Crud" color="#FF5252">
        Cu trailing drawdown, cu cât tranzacționezi mai bine în primele săptămâni, cu atât lațul se strânge mai tare. O serie mare de câștiguri se simte grozav — dar îți ridică podeaua de sub picioare. Apoi o retragere normală, inevitabilă, îți închide contul. Propriul tău succes a construit capcana.
      </Callout>

      <Divider />

      <H2>Equity vs Balanță: A Doua Capcană din Interiorul Primei</H2>
      <P>
        Ca și cum trailing drawdown-ul nu era destul de complicat, unele firme îl calculează pe equity, nu pe balanță. Diferența:
      </P>
      <H3>Pe balanță</H3>
      <P>
        Contează doar trade-urile închise. Dacă ai o poziție care e pe plus cu $2,000 dar e încă deschisă, limita trailing nu se mișcă. Se mișcă doar când închizi trade-ul și realizezi profitul.
      </P>
      <H3>Pe equity</H3>
      <P>
        Pozițiile deschise contează. Dacă contul tău e la $100,000 și ai un trade deschis cu +$3,000 profit nerealizat, limita trailing urcă la 5% sub $103,000 = $97,850. Dacă trade-ul ăla se retrage apoi și închizi pe breakeven, limita ta e tot la $97,850. Profitul tău flotant a ridicat podeaua, iar închiderea pe breakeven contează acum ca un drawdown de $2,850.
      </P>
      <P>
        Da, e exact atât de brutal pe cât sună. Și da, traderii pierd conturi finanțate în felul ăsta în mod regulat.
      </P>

      <H3>Exemplu Practic</H3>
      <Table
        headers={['Ora', 'Acțiune', 'Balanță', 'Equity', 'Limită Trailing (Equity)', 'Buffer']}
        rows={[
          ['9:30', 'Început de sesiune', '$100,000', '$100,000', '$95,000', { value: '$5,000', color: 'gold' }],
          ['10:15', 'Buy EUR/USD, flotant +$2,800', '$100,000', '$102,800', '$97,660', { value: '$5,140', color: 'gold' }],
          ['11:00', 'Trade-ul se retrage, flotant +$400', '$100,000', '$100,400', '$97,660', { value: '$2,740', color: 'red' }],
          ['11:30', 'Închidere pe breakeven', '$100,000', '$100,000', '$97,660', { value: '$2,340', color: 'red' }],
          ['12:00', 'Următorul trade, pierdere -$1,200', '$98,800', '$98,800', '$97,660', { value: '$1,140', color: 'red' }],
        ]}
      />
      <P>
        Traderul a început ziua cu un buffer de $5,000. Nu a făcut niciun ban. A închis un trade pe breakeven și a luat o pierdere mică. Buffer-ul lui e acum $1,140. Încă o pierdere normală și contul e mort — pentru că un profit flotant pe care nu l-a realizat niciodată a ridicat podeaua permanent.
      </P>

      <Divider />

      <H2>Cum Supraviețuiești Trailing Drawdown-ului</H2>
      <P>
        Bine, gata cu poveștile de groază. Iată ce poți face concret. Astea nu sunt sugestii teoretice — sunt reguli care țin conturile finanțate în viață.
      </P>

      <H3>1. Știi-ți Cifrele în Fiecare Dimineață</H3>
      <P>
        Înainte să deschizi platforma de trading, notează trei cifre în jurnal:
      </P>
      <Ul items={[
        'Balanța curentă',
        'Limita trailing curentă (cea mai mare balanță × 0.95, sau care e procentul tău)',
        'Buffer-ul rămas (balanța minus limita trailing)',
      ]} />
      <P>
        Dacă nu știi cifrele astea, zbori orbește. Și a zbura orbește lângă marginea unei prăpăstii e exact felul în care conturile se închid în zile „normale".
      </P>

      <H3>2. Redu Size-ul După Serii Câștigătoare</H3>
      <P>
        Sună contraintuitiv. Câștigi, deci ar trebui să tranzacționezi mai mare, nu? Greșit — cel puțin cu trailing drawdown. Fiecare dolar nou de profit îți micșorează buffer-ul relativ. După o serie câștigătoare de $5,000 pe un cont de $100K, limita ta trailing a urcat cu $4,750. Buffer-ul tău a crescut doar cu $250. Tranzacționează mai mic ca să-l protejezi.
      </P>

      <H3>3. Fii Atent cu Țintele de Take Profit</H3>
      <P>
        Pe trailing drawdown calculat pe equity, un trade care arată +$3,000 profit nerealizat și apoi se închide la +$500 te-a costat efectiv buffer. Limita a urcat cu $2,850 (de la vârful flotant), dar tu ai realizat doar $500. Buffer-ul tău net a scăzut cu $2,350 dintr-un trade câștigător.
      </P>
      <P>
        Soluția: dacă ești semnificativ pe plus pe un trade, ori ia profitul complet, ori setează un <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">trailing stop strâns</Link>. Nu lăsa profituri flotante mari să se retragă aproape de breakeven. Pe conturile calculate pe equity, asta e mai rău decât să nu fi avut trade-ul deloc.
      </P>

      <H3>4. Urmărește Tot</H3>
      <P>
        Dashboard-ul prop firm-ului îți arată drawdown-ul curent. Nu îți arată pattern-uri. Nu îți arată că ultimele trei zile de marți au început bine și s-au terminat cu overtrading agresiv. Nu îți arată că dai înapoi profituri constant între 11 și 12.
      </P>
      <P>
        Pentru asta există un <Link to="/blog/prop-firm-trading-journal" className="text-kmf-accent hover:underline">trading journal</Link>. K.M.F. urmărește drawdown-ul maxim de la vârful de balanță și îți arată graficul de evoluție a balanței — ca să vezi exact unde apar retragerile și dacă se înrăutățesc. Îți urmărește și <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-multiple-urile</Link>, ca să știi dacă pierderile tale sunt în plan sau le lași să fugă prea departe. Aplicația nu poate calcula limita specifică de trailing drawdown a firmei tale (fiecare firmă are reguli diferite), dar îți dă datele brute ca să o calculezi singur în fiecare dimineață. Fă calculul. Scrie-l în intrarea de jurnal de dinaintea sesiunii. Durează 60 de secunde și s-ar putea să-ți salveze contul.
      </P>

      <H3>5. Ia în Calcul Întâi Firmele cu Static Drawdown</H3>
      <P>
        Dacă îți iei primul cont finanțat, gândește-te serios să începi cu o firmă care folosește static drawdown. Da, taxa de challenge poate fi mai mare. Da, profit split-ul poate fi puțin mai prost. Dar probabilitatea de a păstra contul destul de mult încât să faci bani cu adevărat e semnificativ mai mare. Poți trece la firme cu trailing drawdown după ce ai dovedit că poți gestiona riscul consistent.
      </P>

      <Divider />

      <H2>Fișa de Buzunar</H2>
      <Table
        headers={['', 'Static Drawdown', 'Trailing Drawdown']}
        rows={[
          ['Limita bazată pe', { value: 'Balanța inițială', color: 'green' }, { value: 'Cea mai mare balanță atinsă', color: 'gold' }],
          ['Urcă atunci când profiți?', { value: 'Nu — rămâne fixă', color: 'green' }, { value: 'Da — urcă permanent', color: 'red' }],
          ['Buffer după o serie câștigătoare', { value: 'Crește', color: 'green' }, { value: 'Crește abia puțin (sau scade relativ)', color: 'red' }],
          ['Grad de dificultate', { value: 'Previzibil', color: 'green' }, { value: 'Progresiv mai greu', color: 'red' }],
          ['Cea mai bună strategie', { value: 'Trading normal, lasă-l să compună', color: 'cyan' }, { value: 'Profituri mici, constante, securizate devreme', color: 'cyan' }],
          ['Cel mai mare ucigaș', { value: 'Revenge trading după pierderi', color: 'red' }, { value: 'Retragere normală după o serie câștigătoare', color: 'red' }],
        ]}
      />

      <Takeaways items={[
        'Static drawdown e o limită fixă față de balanța de start — nu se schimbă niciodată. Fiecare dolar de profit îți mărește buffer-ul de siguranță.',
        'Trailing drawdown urmărește cea mai mare balanță atinsă și nu coboară niciodată înapoi. Propriile tale profituri construiesc podeaua care îți poate închide contul.',
        'Trailing drawdown pe equity e cel mai dur: chiar și profiturile flotante (nerealizate) ridică limita permanent.',
        'După serii câștigătoare pe conturi cu trailing, redu position size-ul. Buffer-ul tău relativ s-a micșorat chiar dacă balanța e mai mare.',
        'Știi-ți cele trei cifre în fiecare dimineață: balanța curentă, limita trailing, buffer-ul rămas. Scrie-le în jurnal înainte să tranzacționezi.',
        'Dacă ești nou la prop firm-uri, începe cu o firmă cu static drawdown. Învață jocul înainte să joci pe modul greu.',
      ]} />
    </BlogArticleLayout>
  );
}
