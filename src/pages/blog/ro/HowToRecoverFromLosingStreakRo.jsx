import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function HowToRecoverFromLosingStreakRo() {
  return (
    <BlogArticleLayout
      slug="how-to-recover-from-losing-streak"
      lang="ro"
      title="Cum Îți Revii Dintr-o Serie de Pierderi Fără Să-ți Distrugi Contul"
      metaTitle="Serie de Pierderi? Planul de Recuperare Pas cu Pas Care Îți Salvează Contul | K.M.F."
      metaDescription="Orice trader întâlnește serii de pierderi. Diferența dintre profesioniști și amatori e cum reacționează. Un ghid practic, pas cu pas, ca să supraviețuiești și să-ți revii."
      date="27 ianuarie 2026"
      dateISO="2026-01-27"
      readTime="7 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'execution-gap-backtest-vs-live-trading', title: 'The Execution Gap: Why Your Strategy Works in Backtesting But Fails Live', category: 'Psychology' },
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Cum îmi revin dintr-o serie de pierderi în trading?', answer: 'Întâi, redu-ți position size-ul cu 50%. Apoi analizează ultimele 20 de trade-uri ca să stabilești dacă pierderile vin din varianță sau dintr-un edge stricat. Ia o pauză de 1-2 zile, jurnalizează-ți starea emoțională și revino cu trading strict bazat pe checklist.' },
        { question: 'Câte pierderi la rând înseamnă o serie de pierderi?', answer: 'Orice secvență de 3+ pierderi consecutive poate părea o serie, dar statistic, chiar și o strategie cu 60% win rate va avea serii de 5-7 pierderi. Cheia nu e numărul, ci dacă îți respecți regulile în timpul pierderilor.' },
        { question: 'Ar trebui să mă opresc din trading în timpul unei serii de pierderi?', answer: 'Da, temporar. Ia cel puțin o zi întreagă de trading liberă ca să te resetezi emoțional. Folosește acel timp ca să analizezi trade-urile din journal. Când revii, tranzacționează cu mărime redusă până când ai 3 câștiguri consecutive urmând planul.' },
      ]}
    >
      <Intro>
        Seriile de pierderi nu sunt un semn că ai eșuat. Sunt o certitudine matematică — o trăsătură inevitabilă a oricărei strategii care operează sub incertitudine. Chiar și cele mai profitabile sisteme vor produce serii lungi de pierderi. Traderii care supraviețuiesc și prosperă pe termen lung nu sunt cei care nu au niciodată serii de pierderi. Sunt cei care au o reacție clară, repetată, când vine o serie de pierderi.
      </Intro>

      <StatsStrip items={[
        { value: 32, decimals: 0, suffix: '%', label: <>șansa unei serii de 8 pierderi<br />pe 200 de trade-uri la 60% win rate</> },
        { value: 50, decimals: 0, suffix: '%', label: <>reducere de position size<br />după 3–4 pierderi consecutive</> },
        { value: 80, decimals: 0, suffix: '%', label: <>pragul de respectare a regulilor<br />care semnalează varianță normală</> },
      ]} />

      <H2>Matematica: De Ce Seriile de Pierderi Sunt Inevitabile</H2>
      <P>
        Ia în calcul o strategie cu 60% win rate — adică 6 din fiecare 10 trade-uri sunt câștigătoare. Sună confortabil. Dar probabilitatea ca această strategie să producă 8 sau mai multe pierderi consecutive la un moment dat pe 200 de trade-uri e surprinzător de mare: aproximativ 32%. Pe 500 de trade-uri, e aproape sigur că se va întâmpla cel puțin o dată.
      </P>
      <P>
        Formula pentru probabilitatea a cel puțin unei serii de N pierderi în T trade-uri la loss rate L e: 1 − (1 − L^N)^(T − N + 1). Pentru scopuri practice, concluzia e simplă: dacă tranzacționezi destul timp cu orice strategie, vei înfrunta serii lungi de pierderi. Să planifici pentru ele nu e pesimism — e profesionalism.
      </P>
      <Callout title="Verificare de Perspectivă" color="#CE93D8">
        O serie de pierderi nu înseamnă că strategia ta e stricată. Dar s-ar putea. Cel mai important pas e să distingi între varianța statistică normală și o schimbare reală a condițiilor de piață sau a propriei tale execuții. Astea cer reacții complet diferite.
      </Callout>

      <H2>Pasul 1: Oprește-te și Evaluează</H2>
      <P>
        Prima reacție la o serie de pierderi n-ar trebui să fie să tranzacționezi prin ea. Ar trebui să fie să te oprești și să pui două întrebări: Asta e în varianța normală a strategiei mele? Sau s-a schimbat ceva?
      </P>
      <P>
        Scoate-ți ultimele 10 până la 20 de trade-uri și analizează fiecare în raport cu regulile tale. Pentru fiecare trade, răspunde la o singură întrebare binară: mi-am respectat regulile exact pe acest trade? Calculează procentul. Dacă 80% sau mai multe dintre trade-uri ți-au respectat regulile și tot au pierdut, probabil treci printr-o varianță normală — edge-ul tău se va reafirma. Dacă mai puțin de 70% ți-au respectat regulile, problema e execuția, nu strategia.
      </P>

      <H2>Pasul 2: Redu Imediat Position Size-ul</H2>
      <P>
        Indiferent de evaluarea ta, în momentul în care identifici o serie de pierderi, redu-ți position size-ul. Mergi la 50% din riscul tău normal per trade. Dacă seria continuă, ia în calcul să cobori la 25%.
      </P>
      <P>
        E contraintuitiv — pare că-ți reduci capacitatea de a recupera. Dar nu e așa. Îți protejezi capitalul într-o perioadă în care edge-ul tău poate fi temporar redus, fie de condițiile de piață, fie de o deteriorare subtilă a execuției cauzată de presiunea psihologică a seriei în sine. A urma <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">regula de 1% risc</Link> devine și mai critic în timpul drawdown-urilor. Nu poți gândi limpede când te lupți să recuperezi pierderi cu poziții de mărime întreagă.
      </P>
      <Table
        headers={['Risc normal %', 'Risc redus (50%)', 'Redus mai mult (25%)', 'Când aplici']}
        rows={[
          [{ value: '1.0%', color: 'green' }, { value: '0.5%', color: 'cyan' }, { value: '0.25%', color: 'gold' }, 'După 3–4 pierderi consecutive'],
          [{ value: '2.0%', color: 'gold' }, { value: '1.0%', color: 'green' }, { value: '0.5%', color: 'cyan' }, 'După 4–5 pierderi consecutive'],
          [{ value: '0.5%', color: 'green' }, { value: '0.25%', color: 'cyan' }, { value: '0.125%', color: 'gold' }, 'După 5+ pierderi consecutive'],
        ]}
      />

      <H2>Pasul 3: Întoarce-te la Elementele de Bază</H2>
      <P>
        În timpul unei serii de pierderi, setup-urile tale ar trebui să devină mai conservatoare, nu mai creative. Elimină orice setup în care nu ești complet încrezător. Dacă tranzacționezi mai multe instrumente, îngustează focusul la unul sau două pe care le cunoști cel mai bine. Tranzacționează doar setup-urile cu cea mai mare convingere, cele mai clar definite — cele pe care le poți identifica cu certitudine completă, fără ambiguitate dacă sunt îndeplinite criteriile.
      </P>
      <P>
        Instinctul în timpul unei serii de pierderi e adesea să încerci abordări noi, crezând că edge-ul tău curent a expirat. Asta rareori funcționează. Experimentarea ar trebui să se întâmple în medii cu miză mică, nu în timpul drawdown-urilor active.
      </P>

      <H2>Pasul 4: Rezolvă Elementele de Bază din Afara Trading-ului</H2>
      <P>
        Performanța în orice activitate bazată pe skill scade când fundamentele se deteriorează. Lipsa de somn afectează măsurabil luarea deciziilor în 24 de ore. Stresul ridicat crește cortizolul, care îngustează atenția și crește comportamentul de căutare a riscului. Consumul excesiv de știri creează zgomot emoțional care îți distorsionează interpretarea pieței.
      </P>
      <Ul items={[
        'Somn: Dormi 7–8 ore constant? Chiar și lipsa ușoară de somn afectează evaluarea riscului.',
        'Timp pe ecran: Te uiți la piață între sesiuni, creând o anxietate care se duce în orele de trading?',
        'Știri: Narațiunile macro creează un bias direcțional care îți depășește analiza tehnică?',
        'Mișcare: Activitatea fizică e unul dintre cei mai fiabili modulatori ai cortizolului și ai reglării emoționale.',
      ]} />

      <H2>Pasul 5: Analizează Datele din Journal pentru Pattern-uri</H2>
      <P>
        Istoricul trade-urilor tale conține aproape mereu răspunsul la de ce apare o serie de pierderi, dacă te uiți destul de atent. Sortează-ți trade-urile pierzătoare după instrument, oră din zi, tip de setup și zi a săptămânii. Caută grupări. Constatări frecvente:
      </P>
      <Ul items={[
        'Un setup anume care performează bine în piețe cu trend, dar eșuează în mediul actual blocat în range.',
        'Pierderi concentrate într-o sesiune anume (ex. primele 30 de minute după deschiderea pieței, când spread-urile sunt largi și volatilitatea e erratică).',
        'O creștere graduală a mărimii pozițiilor în ultimele două săptămâni, pe măsură ce s-a acumulat supraîncrederea în timpul unei serii câștigătoare.',
        'Intrări valide tehnic, dar care eșuează constant pe un instrument anume care și-a schimbat comportamentul.',
      ]} />

      <H2>Pasul 6: Întoarce-te Treptat la Mărimea Întreagă</H2>
      <P>
        Nu te întoarce la position size întreg după un singur trade câștigător. Aplică o întoarcere graduală: după 3 până la 5 trade-uri câștigătoare consecutive la mărime redusă, revino la jumătate din mărimea normală. După încă 3 până la 5 câștiguri, revino la mărimea întreagă. Această abordare previne pattern-ul mult prea frecvent de a reduce mărimea în timpul unei serii de pierderi, apoi a reveni imediat la mărime întreagă la prima victorie — doar ca să fii lovit de o altă pierdere la poziție întreagă.
      </P>

      <Divider />

      <H2>Ce Să NU Faci în Timpul unei Serii de Pierderi</H2>
      <Ul items={[
        'Nu mări position size-ul ca să recuperezi pierderile mai repede. Asta e calea directă spre distrugerea contului.',
        'Nu trece la instrumente sau strategii nefamiliare. Ai nevoie de un edge stabilit ca să te recuperezi, nu de experimente.',
        'Nu supra-analiza fiecare pierdere individuală căutând explicații unice. Caută pattern-uri de-a lungul seriei.',
        'Nu te opri din jurnalizare. Impulsul de a evita să te uiți la pierderi e de înțeles, dar contraproductiv — datele tale sunt cele mai valoroase acum.',
        'Nu lua o pauză decât dacă psihologia ta e grav afectată. Absența nu repară problemele mecanice.',
      ]} />

      <Takeaways items={[
        'Seriile de pierderi sunt matematic inevitabile — chiar și o strategie cu 60% win rate poate produce 8+ pierderi consecutive.',
        'Primul pas e mereu evaluarea: ți-ai respectat regulile? Dacă da, e varianță. Dacă nu, e execuție.',
        'Redu imediat position size-ul la 50% sau 25% din normal în timpul unei serii — protejează întâi capitalul.',
        'Întoarce-te doar la setup-urile tale cele mai clare, cu cea mai mare convingere. Nu e momentul pentru experimente.',
        'Analizează datele din journal ca să găsești pattern-uri în trade-urile pierzătoare — instrument, oră, tip de setup sau sesiune.',
        'Întoarce-te treptat la mărimea întreagă: 3–5 câștiguri la mărime redusă înainte să urci înapoi.',
      ]} />
    </BlogArticleLayout>
  );
}
