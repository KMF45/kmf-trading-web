import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function GoodLossVsBadWinRo() {
  return (
    <BlogArticleLayout
      slug="good-loss-vs-bad-win"
      lang="ro"
      title="Pierderi Bune, Câștiguri Proaste: De Ce Trade-ul de Care Ești Mândru Poate Fi Cel Mai Prost"
      metaTitle="Pierderi Bune, Câștiguri Proaste: De Ce Cel Mai Bun Trade Poate Fi Cea Mai Proastă Decizie | K.M.F."
      metaDescription="Un stop loss disciplinat poate fi cel mai bun trade al săptămânii. Un take profit norocos fără plan poate fi cel mai prost. Învață cum să evaluezi calitatea unui trade dincolo de P/L."
      date="24 februarie 2026"
      dateISO="2026-02-24"
      readTime="7 min citire"
      category="Progres"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
        { slug: '10-questions-after-every-trade', title: '10 Questions Every Trader Should Ask After Every Trade', category: 'Improvement' },
        { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly Trading Review (With a Complete Template)', category: 'Improvement' },
      ]}
      faqItems={[
        { question: 'Ce este o pierdere bună în trading?', answer: 'O pierdere bună e un trade în care ți-ai urmat planul perfect — intrare corectă, position size corect, stop loss la nivelul potrivit — dar piața s-a mișcat împotriva ta. Procesul a fost corect, doar rezultatul a fost negativ.' },
        { question: 'Ce este un câștig prost în trading?', answer: 'Un câștig prost e un trade profitabil care ți-a încălcat regulile — fără semnal, stop loss mutat, sau poziție supradimensionată. Profitul a fost noroc, nu pricepere, iar repetarea comportamentului va duce în cele din urmă la pierderi mari.' },
        { question: 'Cum evaluez calitatea unui trade dincolo de profit?', answer: 'Punctează fiecare trade pe proces: Ai urmat criteriile de intrare? A fost position size-ul corect? Ai gestionat trade-ul conform planului? Un scor de proces de 5/5 e un trade bun indiferent de P/L.' },
      ]}
    >
      <Intro>
        Miercuri. Iei un short pe USD/CAD. Rupere de structură perfectă pe 1 oră, confirmare pe 15 minute, stop loss plasat peste ultimul swing high. Risk-to-reward 2.5:1. Prețul se mișcă 15 pips în direcția ta, apoi întoarce. Îți ia stop-ul. -$320. Te simți groaznic. Dar ăsta a fost un trade de manual. Acum uită-te la joi. Te plimbi prin chart-uri, plictisit, niciun setup real. Deschizi un long pe AUD/USD fiindcă „pare oversold". Niciun stop loss setat. Prețul sare 40 pips. Iei profit. +$480. Te simți excelent. Dar ăsta a fost gambling. Pierderea te-a făcut un trader mai bun. Câștigul te-a făcut unul mai periculos.
      </Intro>

      <StatsStrip items={[
        { value: 4, decimals: 0, label: <>cadrane în matricea<br />proces × rezultat</> },
        { value: 5, decimals: 0, label: <>rating de execuție per trade<br />(proces, nu P/L)</> },
        { value: 4.2, decimals: 1, label: <>scor de disciplină ce bate<br />un scor de 2.1 indiferent de P/L</> },
      ]} />

      <H2>Capcana Gândirii pe P/L</H2>
      <P>
        Creierul uman e construit să evalueze rezultate, nu procese. Cifră verde = bun. Cifră roșie = rău. Acest instinct ne ajută în mai toată viața. În trading, e o capcană care împiedică aproape orice trader în formare să se îmbunătățească.
      </P>
      <P>
        Când judeci fiecare trade după rezultatul lui, întărești orice comportament a produs acel rezultat — chiar dacă comportamentul a fost nesăbuit. Ăsta e unul dintre motivele de bază <Link to="/blog/why-traders-break-their-rules" className="text-kmf-accent hover:underline">pentru care traderii își încalcă propriile reguli</Link>. Câștigul aleatoriu pe AUD/USD îți învață creierul: „Vezi? Să ignori regulile funcționează." Între timp, pierderea disciplinată pe USD/CAD îți spune: „Să urmezi regulile aduce durere." Pe sute de trade-uri, acest condiționament îți erodează lent disciplina până ajungi să tranzacționezi complet pe impuls și să-i spui „intuiție".
      </P>

      <Divider />

      <H2>Cum Arată de Fapt o „Pierdere Bună"</H2>
      <P>
        O pierdere bună e un trade care a îndeplinit fiecare criteriu al planului tău de trading și totuși a pierdut. Setup-ul a fost valid. Intrarea a fost curată. Stop loss-ul a fost plasat la un nivel logic pe baza structurii pieței. Position size-ul a fost calculat corect. Ai urmat fiecare regulă — și piața a mers în cealaltă direcție. Asta se întâmplă. E menit să se întâmple. Nicio strategie nu câștigă 100% din timp.
      </P>
      <P>
        De ce e ăsta un trade „bun"? Fiindcă e repetabil. Dacă iei exact același setup de 100 de ori cu aceeași disciplină, vei fi profitabil — fiindcă edge-ul tău se manifestă pe serie. Fiecare apariție individuală poate câștiga sau pierde, dar procesul e solid. O pierdere bună e un depozit în contul consistenței pe termen lung.
      </P>

      <Callout title="Semnele unei pierderi bune" color="#00C853">
        Setup-ul s-a potrivit cu criteriile planului tău. Stop loss-ul a fost plasat la un nivel logic de structură (nu un număr arbitrar de pips). Position size-ul a fost în regulile tale de risc. Nu ți-ai mutat stop-ul și nici nu ai închis prea devreme. Poți lua exact același trade din nou mâine fără să schimbi nimic.
      </Callout>

      <Divider />

      <H2>Cum Arată de Fapt un „Câștig Prost"</H2>
      <P>
        Un câștig prost e un trade care ți-a încălcat regulile și a făcut bani oricum. Niciun setup real. Niciun <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklist</Link> completat. Stop loss prea strâns, prea larg, sau inexistent. Position size pe bază de „feeling" în loc de calcul. Ai intrat din cauza FOMO, plictiseală, sau un pont de pe un canal de Discord. Și ai câștigat.
      </P>
      <P>
        Ăsta e cel mai periculos rezultat din trading. Nu din cauza banilor — banii sunt reali, profitul e real. E periculos fiindcă îți învață creierul că regulile nu contează. Fiecare câștig prost îți erodează disciplina cu exact o crestătură. După destule câștiguri proaste, nu mai ai un sistem de trading. Ai un obicei de gambling cu noroc ocazional.
      </P>

      <H3>Cel Mai Prost Fel de Câștig Prost</H3>
      <P>
        Intri într-un trade fără stop loss. Merge imediat împotriva ta. Ești pe minus 2%, apoi 3%. Ții. „O să revină." Și revine — de data asta. Închizi cu un profit mic și simți o ușurare deghizată în pricepere. Acest trade te-a învățat cea mai proastă lecție posibilă: că să ții fără stop și să speri funcționează. Funcționează, până în singura dată în care nu funcționează — iar acea singură dată poate șterge luni de profit.
      </P>

      <Callout title="Semnele unui câștig prost" color="#FF5252">
        Nu poți explica clar de ce ai intrat. Nu ți-ai rulat pre-trade checklist-ul. Stop loss-ul a fost absent sau arbitrar. Nu ai recomanda acest trade altui trader. Simți ușurare, nu satisfacție. Știi că nu ai lua din nou exact acest trade.
      </Callout>

      <Divider />

      <H2>Cum Evaluezi Trade-urile ca un Profesionist</H2>
      <P>
        Traderii profesioniști folosesc un concept numit evaluare pe bază de proces. În loc să întrebe „Am făcut bani?", întreabă „Mi-am urmat sistemul?" Această schimbare subtilă schimbă totul în felul în care evoluezi ca trader.
      </P>

      <H3>Matricea 2x2</H3>
      <P>
        Fiecare trade cade într-unul din patru cadrane:
      </P>
      <Ul items={[
        'Proces bun + Câștig = Trade-ul ideal. Întărește acest comportament.',
        'Proces bun + Pierdere = O pierdere bună. E varianță normală. Nu schimba nimic.',
        'Proces prost + Câștig = Un câștig prost. Ăsta e cel periculos. Identifică ce a mers prost în procesul tău, în ciuda profitului.',
        'Proces prost + Pierdere = De așteptat. Procesul prost produce în cele din urmă rezultate proaste. Folosește-l ca lecție, nu ca pedeapsă.',
      ]} />
      <P>
        Cel mai important cadran e „proces prost + câștig". Aici traderii își pierd edge-ul în timp fără să-și dea seama. Extrasul de P/L arată verde. Contul de disciplină arată roșu. Dacă nu urmărești calitatea procesului separat de rezultate, nu vei vedea niciodată eroziunea cum se întâmplă.
      </P>

      <H3>Punctează-ți Trade-urile de la 1 la 5</H3>
      <P>
        După fiecare trade, punctează-l pe o scară de la 1 la 5 pe baza calității procesului — nu a profitului. Combină asta cu calcularea <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-multiple-ului</Link> per trade și ai două metrici care contează mult mai mult decât P/L-ul brut:
      </P>
      <Ul items={[
        '5 — Execuție perfectă. Setup, intrare, stop, mărime, gestionare — toate au urmat planul.',
        '4 — Abatere minoră. Ai urmat în mare planul, o singură ajustare mică.',
        '3 — Acceptabil dar neglijent. Trade-ul a fost valid dar execuția a fost imprecisă.',
        '2 — Abatere semnificativă. Ai încălcat o regulă majoră (mărime greșită, stop mutat etc.).',
        '1 — Niciun plan. Intrare impulsivă, niciun checklist, gambling.',
      ]} />
      <P>
        În timp, rating-ul tău mediu contează mai mult decât P/L-ul. Un trader cu un rating mediu de 4.2 și o lună pe pierdere e într-o poziție mult mai bună decât un trader cu un rating mediu de 2.1 și o lună pe câștig. Primul face lucrurile corect și va fi recompensat de matematică în cele din urmă. Al doilea împrumută noroc care va fi returnat cu dobândă.
      </P>

      <Callout title="Cum urmărește K.M.F. asta" color="#4FC3F7">
        K.M.F. Trading Journal include un sistem de rating pentru fiecare trade și o căsuță „am urmat planul". Review-ul tău săptămânal punctează disciplina separat de P/L — așa că poți vedea exact dacă îți îmbunătățești procesul chiar și în perioadele pe pierdere. Scorul de disciplină în timp e adevărata ta măsură a edge-ului.
      </Callout>

      <Divider />

      <H2>Efectul de Compounding pe Termen Lung</H2>
      <P>
        Imaginează-ți doi traderi. Amândoi au aceeași strategie cu un edge real de 55%. Traderul A evaluează pe P/L. După o săptămână pe pierdere, își ajustează strategia. După o săptămână pe câștig cu proces prost, nu face nimic. Pe un an, și-a modificat strategia de 14 ori și habar nu mai are ce funcționează.
      </P>
      <P>
        Traderul B evaluează pe proces. După o săptămână pe pierdere cu proces bun, nu schimbă nimic — edge-ul se va manifesta. După o săptămână pe câștig cu proces prost, revizuiește și corectează abaterile. Pe un an, a tranzacționat aceeași strategie consistent și are 400 de puncte de date curate de analizat.
      </P>
      <P>
        Care trader își cunoaște edge-ul real? Care trader se poate îmbunătăți? Care trader va mai tranzacționa peste doi ani? Răspunsul e evident — dar doar dacă încetezi să te uiți la coloana de P/L și începi să te uiți la coloana de proces.
      </P>

      <Takeaways items={[
        'O „pierdere bună" e un trade care ți-a urmat planul perfect dar a pierdut. E dovada că procesul tău funcționează — varianța e normală.',
        'Un „câștig prost" e un trade care ți-a încălcat regulile dar a făcut bani. E cel mai periculos rezultat fiindcă îți erodează disciplina invizibil.',
        'Punctează fiecare trade pe calitatea procesului (1-5), nu pe profit. Rating-ul tău mediu prezice performanța viitoare mai bine decât P/L-ul lunii curente.',
        'Folosește matricea 2x2: proces bun/prost × câștig/pierdere. Cadranul „proces prost + câștig" e unde cei mai mulți traderi își pierd în tăcere edge-ul.',
        'Urmărește disciplina separat de P/L în review-ul săptămânal. Un scor de disciplină mare într-o perioadă pe pierdere înseamnă că faci totul corect — rezultatele vor urma.',
      ]} />
    </BlogArticleLayout>
  );
}
