import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function CryptoVsForexJournalingRo() {
  return (
    <BlogArticleLayout
      slug="crypto-vs-forex-journaling"
      lang="ro"
      title="Crypto vs Forex: De Ce Jurnalul Tău Are Nevoie de Reguli Diferite pentru Fiecare Piață"
      metaTitle="Crypto vs Forex: Greșelile de Jurnalizare Care Distrug Conturi pe Fiecare Piață | K.M.F."
      metaDescription="Forex și crypto arată similar pe chart dar se comportă complet diferit. Jurnalul, position sizing-ul și regulile de risc trebuie să se adapteze — sau vei distruge un cont învățând de ce."
      date="26 februarie 2026"
      dateISO="2026-02-26"
      readTime="8 min citire"
      category="Risk Management"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Ar trebui să jurnalizez diferit trade-urile de crypto și forex?', answer: 'Da. Piețele crypto sunt deschise 24/7 cu volatilitate mai mare, în timp ce forex-ul are sesiuni și mișcări medii mai mici. Jurnalul tău ar trebui să urmărească metrici diferite pentru fiecare piață.' },
        { question: 'Care e cea mai mare diferență de risc între crypto și forex?', answer: 'Crypto poate face gap de 10-20% în câteva minute din cauza lichidității mici și a lipsei circuit breaker-elor. Forex-ul rar se mișcă mai mult de 1-2% pe zi. Regulile de position sizing și stop loss trebuie să țină cont de această diferență de volatilitate.' },
        { question: 'Pot folosi același trading journal pentru ambele piețe?', answer: 'Da, dar configurează parametri de risc diferiți. K.M.F. Trading Journal suportă mai multe instrumente și îți permite să setezi reguli de risc per piață.' },
      ]}
    >
      <Intro>
        Tranzacționezi EUR/USD de opt luni. Sistemul tău funcționează. 1% risc per trade, stop loss de 30 pips, intrări curate pe chart-ul de 1 oră. Apoi un prieten îți arată contul lui de BTC/USD — plus 40% în trei săptămâni. Deschizi un cont de crypto, aplici aceleași reguli, și în cinci zile ai luat trei stop loss-uri care au părut că vin de nicăieri. Stop-ul tău de 30 pips, care merge perfect pe EUR/USD, e vânat de o singură lumânare de 4 minute pe Bitcoin. Aceleași reguli. Rezultat complet diferit. Bun venit la cea mai scumpă lecție din trading-ul pe mai multe piețe.
      </Intro>

      <StatsStrip items={[
        { value: 7, decimals: 0, suffix: '×', label: <>volatilitatea tipică a crypto<br />vs. perechile forex majore</> },
        { value: 1.5, decimals: 1, suffix: '× ATR', label: <>dimensionare stop universală —<br />merge pe ambele piețe</> },
        { value: 24, decimals: 0, suffix: '/7', label: <>orele pieței crypto —<br />fără plasă de siguranță peste noapte</> },
      ]} />

      <H2>Aceleași Chart-uri, Jocuri Diferite</H2>
      <P>
        Chart-urile de forex și crypto arată identic. Aceleași lumânări. Aceiași indicatori. Aceleași pattern-uri. Această asemănare vizuală e o capcană care prinde mii de traderi în fiecare an. Chart-urile arată la fel, dar piețele din spatele lor se comportă în moduri fundamental diferite — iar dacă jurnalul tău nu ține cont de aceste diferențe, datele tale te induc în eroare.
      </P>
      <P>
        Diferența de bază se rezumă la trei factori: volatilitate, lichiditate și orele pieței. Fiecare dintre ei afectează cum ar trebui să-ți dimensionezi pozițiile, să-ți plasezi stop-urile, să-ți setezi target-urile și să-ți evaluezi performanța. Un jurnal care tratează un câștig de 2R pe EUR/USD la fel ca un câștig de 2R pe SOL/USD compară mere cu grenade.
      </P>

      <Divider />

      <H2>Volatilitatea: Cifra Care Schimbă Totul</H2>
      <P>
        EUR/USD se mișcă în medie 50-80 pips pe zi. Bitcoin se mișcă 2-5% pe zi — ceea ce la un preț de $60,000 înseamnă $1,200 până la $3,000. În termeni de pips (dacă te gândești în pips pe crypto), ăsta e echivalentul a 1,200-3,000 pips. Ethereum, Solana și altcoin-urile mai mici sunt și mai volatile.
      </P>
      <P>
        Asta înseamnă că un stop loss perfect rezonabil pe forex — 30 pips pe EUR/USD, cam 0.25% din preț — ar fi absurd de strâns pe Bitcoin. O mișcare de 0.25% pe BTC se întâmplă în secunde, nu în ore. „Stop loss-ul tău disciplinat" devine zgomot. Piața îl va atinge, va întoarce, și va merge la target-ul tău în timp ce tu stai pe margine întrebându-te ce s-a întâmplat.
      </P>

      <H3>Ce Înseamnă Asta pentru Jurnalul Tău</H3>
      <P>
        Jurnalul tău trebuie să urmărească distanța stop loss-ului raportat la volatilitatea medie a instrumentului, nu ca număr absolut. Un stop de 30 pips pe EUR/USD (0.25% din preț) și un stop de 1,500 puncte pe BTC/USD (2.5% din preț) ar putea reprezenta aceeași calitate a trade-ului — stop-ul e plasat la un nivel structural logic, cu spațiu pentru price action normal. Dar dacă jurnalul tău arată doar „30 pips" vs „1,500 puncte", trade-ul de crypto pare o nebunie.
      </P>
      <P>
        Urmărește-ți stop-urile ca multiplu de ATR (Average True Range) în schimb. Un stop la 1.5× ATR pe EUR/USD și 1.5× ATR pe BTC/USD sunt echivalente în termeni de risc ajustat, chiar dacă cifrele brute sunt extrem de diferite.
      </P>

      <Callout title="Comparație stop pe bază de ATR" color="#00C853">
        ATR daily EUR/USD: ~60 pips. Un stop de 90 pips = 1.5× ATR. ATR daily BTC/USD: ~$2,000. Un stop de $3,000 = 1.5× ATR. Același risc relativ. Cifre brute complet diferite. Jurnalul tău ar trebui să normalizeze asta — altfel îți vei pune mereu la îndoială stop-urile de crypto că sunt „prea largi", când de fapt sunt proporțional identice cu stop-urile de forex.
      </Callout>

      <Divider />

      <H2>Position Sizing: Unde Sunt Distruși Traderii de Forex</H2>
      <P>
        Aici se decide totul. Pe un cont de forex de $10,000 care tranzacționează EUR/USD cu 1% risc și un stop loss de 30 pips, position size-ul tău e cam 0.33 loturi. Matematica e curată și familiară. Acum aplică 1% risc pe Bitcoin cu un stop de $3,000. Position size-ul tău maxim e $100 ÷ $3,000 per monedă = 0.033 BTC. La un preț de $60,000 pe BTC, asta e o poziție de $2,000 — doar 20% din contul tău.
      </P>
      <P>
        Mulți traderi de forex văd acea poziție de 20% și cred că sunt prea conservatori. Pe forex, sunt obișnuiți să controleze valută de $33,000 (0.33 loturi) cu un cont de $10,000 — leverage de 3.3×. Așa că își măresc poziția de crypto ca să „se simtă normal". Așa se distrug conturile. <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">Regula de 1% risc</Link> nu se schimbă de la o piață la alta, dar <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">position size-ul</Link> pe care îl produce se schimbă — dramatic. Ai încredere în matematică, nu în feeling.
      </P>

      <H3>Diferențe de Leverage</H3>
      <P>
        Brokerii de forex oferă de obicei leverage de 50:1 sau 100:1. Exchange-urile de crypto oferă de obicei 5:1 până la 20:1, unele mergând mai sus. Dar iată ce ratează cei mai mulți traderi: nu ai nevoie de același leverage pe crypto fiindcă volatilitatea de bază e deja de 5-10× mai mare decât forex-ul. A tranzacționa BTC la leverage de 10× e ca și cum ai tranzacționa EUR/USD la 50-100× leverage în termeni de risc real pe portofoliu.
      </P>
      <P>
        Jurnalul tău ar trebui să urmărească expunerea efectivă la volatilitate, nu doar leverage-ul. O poziție de BTC cu leverage 5× are cam aceeași oscilație de P/L zilnic ca o poziție de EUR/USD cu leverage 25-50×. Dacă ești obișnuit cu 30:1 pe forex și aplici 20:1 pe crypto, nu ai menținut același nivel de risc — l-ai înmulțit de trei sau patru ori.
      </P>

      <Divider />

      <H2>Orele Pieței: Problema 24/7</H2>
      <P>
        Forex-ul are sesiuni. London se deschide, New York se suprapune, Tokyo preia. Sunt ore liniștite și ore active. Poți lăsa o poziție peste noapte și să te aștepți rezonabil că prețul nu va face gap de 10% cât dormi — fiindcă, chiar și în sesiunea asiatică, perechile majore au destulă lichiditate cât să se miște lin.
      </P>
      <P>
        Crypto nu se închide niciodată. Nu există „after hours". Bitcoin se poate mișca 8% într-o duminică dimineața cât ești la brunch. Ethereum poate face gap într-o marți la 3 noaptea fiindcă un whale a aruncat $50 de milioane pe un order book subțire. Dacă ții poziții de crypto peste noapte — sau peste weekend — riscul tău e fundamental diferit de o poziție de forex ținută peste noapte. Ghidul nostru despre <Link to="/blog/weekend-gap-risk" className="text-kmf-accent hover:underline">riscul de gap în weekend</Link> acoperă cum să-ți protejezi contul de aceste scenarii.
      </P>

      <H3>Implicații pentru Jurnal</H3>
      <P>
        Jurnalul tău ar trebui să marcheze separat pozițiile de crypto ținute peste noapte și peste weekend. Urmărește rezultatele lor față de trade-urile intraday. Mulți traderi descoperă că pozițiile lor de crypto ținute peste noapte au randamente ajustate la risc semnificativ mai proaste din cauza riscului de gap. Soluția nu e să nu mai ții peste noapte — e să ajustezi position size-ul când o faci. Unii traderi reduc mărimea pe crypto cu 50% pentru orice poziție pe care plănuiesc s-o țină pe durata unui somn.
      </P>

      <Divider />

      <H2>Marcus: Un Sistem, Două Piețe, Lecții Grele</H2>
      <P>
        Marcus tranzacționa forex profitabil de paisprezece luni când a decis să adauge crypto. Sistemul lui era o strategie de pullback pe chart-ul de 4 ore — așteaptă un trend, așteaptă un pullback la EMA 20, intră pe o lumânare de confirmare, stop sub low-ul pullback-ului. Pe GBP/USD și EUR/JPY, acest sistem avea un win rate de 57% cu un câștigător mediu de 1.8R.
      </P>
      <P>
        A aplicat exact același sistem pe BTC/USD și ETH/USD. Aceleași reguli de intrare, aceeași logică de plasare a stop-ului, același 1% risc per trade. În prima lună, a luat 11 trade-uri de crypto. Win rate-ul lui a fost 27%. A pierdut $1,800 și a început să-și pună la îndoială toată strategia.
      </P>
      <P>
        Când și-a revizuit jurnalul, problema era evidentă. Stop-urile lui de forex erau în medie 1.2× ATR. Stop-urile lui de crypto erau în medie 0.4× ATR. Plasa stop-urile la aceeași distanță vizuală pe chart — sub low-ul pullback-ului — dar low-urile pullback-urilor pe crypto erau mult mai aproape de intrare decât pe forex, raportat la range-ul normal al instrumentului. Chart-ul de 4 ore pe Bitcoin produce pullback-uri care arată ca pullback-urile de forex dar sunt proporțional mult mai mici raportat la ATR.
      </P>
      <P>
        Soluția a fost simplă: a trecut pe chart-ul daily pentru intrările de crypto (oferindu-i pullback-uri mai largi, mai proporționale) și a verificat că fiecare stop era la cel puțin 1× ATR de la intrare. Win rate-ul lui de crypto a urcat la 51% în următorul trimestru. Sistemul funcționa — avea doar nevoie de un timeframe diferit ca să se potrivească cu structura volatilității.
      </P>

      <Callout title="Cum gestionează K.M.F. jurnalizarea pe mai multe piețe" color="#4FC3F7">
        K.M.F. Trading Journal urmărește fiecare trade cu instrumentul lui, lăsându-te să filtrezi statisticile pe piață. Poți compara win rate-ul de forex, R-ul mediu și profit factor-ul față de cifrele de crypto, una lângă alta. Calculatorul de lot size se ajustează pentru valori de pip și mărimi de contract diferite — așa că 1%-ul tău de risc e corect fie că tranzacționezi EUR/USD, BTC/USD, sau aur.
      </Callout>

      <Divider />

      <H2>Cum Construiești un Jurnal pentru Mai Multe Piețe</H2>
      <P>
        Dacă tranzacționezi și forex și crypto — sau orice două piețe cu caracteristici diferite — jurnalul tău trebuie să separe datele. Statisticile combinate sunt mai rele decât inutile; te induc activ în eroare. Un win rate general de 52% ar putea ascunde un win rate de 60% pe forex și 35% pe crypto. Cifra combinată nu-ți spune nimic. Cifrele separate îți spun totul.
      </P>

      <H3>Ce Să Urmărești Diferit</H3>
      <Ul items={[
        'Stop loss-ul în multipli de ATR, nu în pips sau puncte brute — permite o comparație corectă între instrumente.',
        'Position size ca % din cont — suma în dolari nu înseamnă nimic fără context. 0.033 BTC sună mic dar poate fi dimensionat perfect.',
        'Contextul sesiunii — pentru forex, notează sesiunea (London, NY, asiatică). Pentru crypto, notează ziua și ora, și marchează pozițiile ținute peste weekend/noapte.',
        'Regimul de volatilitate — e instrumentul într-o fază de volatilitate mare sau mică? O mișcare de 2% pe BTC într-o zi cu ATR de 1% e foarte diferită de o mișcare de 2% într-o zi cu ATR de 5%.',
      ]} />

      <H3>Ce Rămâne La Fel</H3>
      <Ul items={[
        'Riscul per trade (1-2% din cont) — această regulă e universală și nu se schimbă de la o piață la alta.',
        'Pre-trade checklist-ul — criteriile pot diferi per instrument, dar obiceiul de a rula un checklist înainte de fiecare intrare e nenegociabil.',
        'Jurnalizarea emoțională — frica, lăcomia, revenge-ul și plictiseala funcționează la fel fie că tranzacționezi yen sau Solana.',
        'Review-ul săptămânal — revizuiește fiecare piață separat, apoi uită-te la metricile de disciplină combinate.',
      ]} />

      <Divider />

      <H2>Mentalitatea de Adaptare</H2>
      <P>
        Cei mai buni traderi pe mai multe piețe nu folosesc un singur sistem rigid pe toate instrumentele. Folosesc un singur set de principii — identificarea trendului, intrări pe pullback, stop-uri pe bază de structură, risc calculat — și adaptează parametrii pentru fiecare piață. Principiul e același. Execuția e diferită.
      </P>
      <P>
        Jurnalul tău e instrumentul care îți spune dacă adaptarea ta funcționează. Când stop-urile tale normalizate la ATR, win rate-urile tale și R-multiplii tăi medii sunt similari pe toate piețele, știi că sistemul tău e calibrat corect. Când diverg — win rate crypto cu 30% mai mic decât forex, pierdere medie crypto de 2× mai mare — știi exact unde să te uiți. Nu la strategie. La parametri.
      </P>
      <P>
        Traderii care își distrug conturile trecând de la o piață la alta sunt cei care nu urmăresc aceste date. Aplică reguli de forex pe crypto, se întreabă de ce nu merge, concluzionează că „crypto e doar gambling", și se întorc la forex — ratând o piață complet viabilă fiindcă nu și-au ajustat uneltele. Nu fi acel trader. Lasă datele să-ți spună ce să schimbi.
      </P>

      <Takeaways items={[
        'Forex și crypto arată identic pe chart-uri dar diferă fundamental în volatilitate (5-10×), lichiditate, normele de leverage și orele pieței. Jurnalul tău trebuie să țină cont de aceste diferențe.',
        'Urmărește stop loss-urile în multipli de ATR, nu în pips bruți. Un stop de 1.5× ATR e dimensionat corect pe orice instrument — cifra brută e irelevantă.',
        'Position size-urile vor fi dramatic mai mici pe crypto pentru același procent de risc. Ai încredere în matematică. O poziție de 20% din cont pe BTC la 1% risc e corectă — nu o mări fiindcă „pare mică".',
        'Separă-ți statisticile pe piață. Win rate-urile combinate ascund diferențe critice între performanța ta pe forex și crypto.',
        'Folosește aceleași principii de risc pe toate piețele dar adaptează timeframe-urile și parametrii. Chart-ul daily pe crypto se potrivește adesea cu cel de 4 ore pe forex în termeni de structură a pullback-ului.',
      ]} />
    </BlogArticleLayout>
  );
}
