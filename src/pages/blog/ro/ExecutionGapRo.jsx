import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function ExecutionGapRo() {
  return (
    <BlogArticleLayout
      slug="execution-gap-backtest-vs-live-trading"
      lang="ro"
      title="Execution Gap: De Ce Strategia Ta Funcționează în Backtesting Dar Eșuează Live"
      metaTitle="Execution Gap: De Ce Win Rate-ul de 70% din Backtest Scade la 40% Live | K.M.F."
      metaDescription="Strategia ta backtestată are un win rate de 70%. Live, ești la 40%. Problema nu e strategia — e distanța dintre a ști și a face. Iată cum o închizi."
      date="22 februarie 2026"
      dateISO="2026-02-22"
      readTime="8 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Ce este execution gap-ul în trading?', answer: 'Execution gap-ul e diferența dintre performanța strategiei tale în backtesting și rezultatele tale reale live. E cauzat de emoții, ezitare și factori psihologici care nu există în backtesting.' },
        { question: 'De ce eșuează strategia mea în trading-ul live?', answer: 'În backtesting nu ai frică, nici lăcomie, nici presiune. Trading-ul live introduce emoții care te fac să sari peste intrări, să ieși prea devreme și să te abați de la plan — toate îți erodează edge-ul.' },
        { question: 'Cum închid execution gap-ul?', answer: 'Folosește un pre-trade checklist ca să forțezi intrări sistematice, jurnalizează fiecare abatere de la plan, tranzacționează mărimi mai mici până se îmbunătățește execuția, și revizuiește-ți scorul de execuție săptămânal.' },
      ]}
    >
      <Intro>
        Te așezi într-o duminică, îți backtestezi strategia pe 200 de trade-uri, și cifrele sunt superbe. Win rate de 68%. Profit factor 1.9. Expectancy pozitiv. Te simți încrezător — ăsta e, ăsta e edge-ul. Vine luni dimineața. EUR/USD îți printează exact setup-ul. Intrare de manual. Și degetul îți planează peste butonul Buy... dar nu apasă. Lumânarea se mișcă. Setup-ul a dispărut. Îl privești atingându-și target-ul de take profit fără tine la bord. Sună cunoscut?
      </Intro>

      <StatsStrip items={[
        { value: 60, decimals: 0, suffix: '%', label: <>o strategie la 100% execuție bate<br />una de 75% la 50% execuție</> },
        { value: 5, decimals: 0, suffix: 's', label: <>fereastra de decizie înainte ca<br />ezitarea să inventeze scuze</> },
        { value: 50, decimals: 0, suffix: '%', label: <>tăiere tipică de position size<br />cât îți construiești încrederea în execuție</> },
      ]} />

      <H2>Gap-ul Despre Care Nimeni Nu Vorbește</H2>
      <P>
        Fiecare educator de trading vorbește despre găsirea unui edge. Găsește o strategie, backtesteaz-o, dovedește că funcționează, tranzacționeaz-o live. Simplu, nu? Dar e un gap masiv între pașii trei și patru pe care aproape nimeni nu îl adresează — execution gap-ul. E distanța dintre ce știi că ar trebui să faci și ce faci de fapt când sunt bani reali în joc.
      </P>
      <P>
        În backtesting, nu există frică. Apeși calm prin lumânări. Iei fiecare setup fiindcă nu există risc. Emoțiile tale sunt plate fiindcă rezultatul nu contează — deja s-a întâmplat. Dar în trading-ul live, fiecare dintre acele scuturi psihologice dispare. Setup-ul e același. Tu nu ești.
      </P>

      <Divider />

      <H2>De Ce Win Rate-ul Tău de 70% Scade la 40%</H2>
      <P>
        Matematica e brutal de simplă. Dacă strategia ta generează 10 setup-uri valide pe săptămână și iei doar 6 dintre ele fiindcă celelalte 4 „păreau greșite" sau „arătau riscante", nu îți mai tranzacționezi strategia. Tranzacționezi o versiune filtrată a ei — filtrată de frică, ezitare și bias subiectiv.
      </P>
      <P>
        Iată ce se întâmplă de obicei: sari peste setup-urile care arată incert (care sunt adesea cele cu cel mai bun raport risk-to-reward). Intri în cele care se simt confortabil (care sunt adesea cele evidente pe care le vede și toată lumea, și care tind să eșueze mai des). Rezultatul? Win rate-ul tău live se prăbușește — nu fiindcă s-a schimbat strategia, ci fiindcă s-a schimbat execuția ta.
      </P>

      <H3>Cele Trei Tipuri de Eșec de Execuție</H3>
      <Ul items={[
        'Sărituri din ezitare — Vezi setup-ul, știi că califică, dar aștepți. Până te decizi, intrarea a dispărut sau raportul risk-to-reward e stricat.',
        'Ieșiri premature — Intri corect, dar primul pullback declanșează panică. Închizi la breakeven sau o pierdere mică. Douăzeci de minute mai târziu, atinge target-ul tău inițial.',
        'Devieri de revenge — După o pierdere, abandonezi complet sistemul și începi să improvizezi. Iei setup-uri care nu califică fiindcă ai nevoie să „recuperezi".',
      ]} />

      <Divider />

      <H2>O Poveste Pe Care O Vei Recunoaște</H2>
      <P>
        Lasă-mă să-ți povestesc despre un trader pe care îl voi numi Andrei. Tranzacționa forex de doi ani. Strategia lui era curată — breakout pullback-uri pe chart-ul de 1 oră cu confirmare de pe 15 minute. A backtestat-o obsesiv. 312 trade-uri. Win rate de 64%. Câștigător mediu 1.8R, pierzător mediu 1R. Cifrele erau solide.
      </P>
      <P>
        Dar contul lui live spunea o altă poveste. După trei luni de trading live, win rate-ul lui real era 41%. Câștigătorul lui mediu era doar 1.1R fiindcă închidea trade-urile prea devreme. Și luase doar 47% din setup-urile pe care strategia lui chiar le-a generat — sărise peste mai mult de jumătate.
      </P>
      <P>
        Andrei nu avea o problemă de strategie. Avea o problemă de execuție. Iar partea frustrantă era că nu putea s-o vadă până când a început să jurnalizeze fiecare trade — inclusiv cele pe care nu le-a luat. Acele setup-uri neluate — ce numim <Link to="/blog/ghost-trades-journaling-missed-opportunities" className="text-kmf-accent hover:underline">ghost trades</Link> — s-au dovedit a fi cele mai valoroase date ale lui.
      </P>

      <Callout title="Adevărul incomod" color="#CE93D8">
        Cei mai mulți traderi care cred că au nevoie de o strategie mai bună au de fapt nevoie de o execuție mai bună a strategiei pe care o au deja. Niciun indicator, niciun serviciu de semnale, niciun curs nu va repara un execution gap. Doar conștientizarea de sine o va face.
      </Callout>

      <Divider />

      <H2>Cum Îți Măsori Propriul Execution Gap</H2>
      <P>
        Nu poți repara ce nu poți vedea. Primul pas e măsurarea cinstită. Iată cum o faci:
      </P>

      <H3>Pasul 1: Notează Fiecare Setup Valid — Luat sau Nu</H3>
      <P>
        Asta e cea mai importantă schimbare de obicei pe care o poți face. Când vezi un setup care califică conform regulilor tale, notează-l. Dacă l-ai luat, marchează-l ca luat. Dacă nu, scrie de ce. „M-am simțit nesigur." „Eram într-o ședință." „Aveam deja două pierderi azi." Fii cinstit. Nimeni nu citește asta în afară de tine.
      </P>

      <H3>Pasul 2: Compară Rezultatele Luate vs. Sărite</H3>
      <P>
        După o lună, întoarce-te și verifică: ce s-a întâmplat cu setup-urile peste care ai sărit? Și-au atins target-ul? Au făcut stop out? Aproape sigur vei descoperi că setup-urile sărite au performat la fel de bine ca — sau mai bine decât — cele pe care le-ai luat. Ăsta e momentul în care execution gap-ul devine vizibil și de netăgăduit.
      </P>

      <H3>Pasul 3: Urmărește-ți Starea Emoțională la Intrare</H3>
      <P>
        Înainte de fiecare trade, notează-ți starea emoțională. Încrezător? Anxios? Condus de revenge? Plictisit? În câteva săptămâni, apar pattern-uri. S-ar putea să descoperi că sari peste setup-uri când ești anxios dar iei setup-uri când ești supraîncrezător — și că setup-urile sărite din anxietate câștigă de fapt mai des.
      </P>

      <Callout title="Cum ajută K.M.F." color="#4FC3F7">
        K.M.F. Trading Journal îți urmărește emoția înainte de fiecare trade, o corelează cu rezultatele în statisticile tale, iar review-ul săptămânal te forțează să confrunți pattern-urile. Pre-trade checklist-ul prinde ezitarea înainte să te coste — dacă setup-ul trece toate cele 10 criterii, checklist-ul spune „ia-l". Sentimentele tale devin date, nu decizii.
      </Callout>

      <Divider />

      <H2>Cum Închizi Gap-ul: Tehnici Practice</H2>

      <H3>1. Regula de 5 Secunde</H3>
      <P>
        Când setup-ul tău se declanșează, dă-ți cinci secunde. Dacă îndeplinește criteriile tale — toate — intră. Nu zece secunde. Nu „lasă-mă să mai văd o lumânare". Cinci secunde. Un <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklist</Link> face asta binar: dacă fiecare căsuță e bifată, execuți. Ezitarea e o buclă de feedback: cu cât aștepți mai mult, cu atât creierul tău inventează mai multe motive să nu acționezi. Întrerupe bucla din scurt.
      </P>

      <H3>2. Pre-Angajează-te la Setup-urile Tale</H3>
      <P>
        Înainte să înceapă sesiunea de trading, scrie condițiile exacte care ar declanșa o intrare. „Dacă prețul face pullback la EMA 50 pe 1H și 15M se închide bullish cu volum peste medie, intru long cu stop sub low-ul pullback-ului." Când vine momentul, nu te decizi — execuți o decizie luată dinainte.
      </P>

      <H3>3. Redu Mărimea, Nu Frecvența</H3>
      <P>
        Dacă frica te face să sari peste setup-uri, problema ar putea fi că tranzacționezi prea mare. Taie-ți position size-ul la jumătate. Brusc, setup-ul care părea înfricoșător pare gestionabil. Ia fiecare setup la jumătate de mărime timp de o lună. Compară rezultatele cu backtest-ul tău. Odată ce vezi că strategia funcționează live — că lumânările nu știu dacă faci backtesting sau nu — crește treptat mărimea.
      </P>

      <H3>4. Revizuiește Trade-urile Sărite Săptămânal</H3>
      <P>
        În <Link to="/blog/weekly-trading-review-template" className="text-kmf-accent hover:underline">review-ul tău săptămânal</Link>, dedică o secțiune trade-urilor pe care nu le-ai luat. Care a fost rezultatul? De ce ai sărit? Există un pattern? Această confruntare săptămânală cu propria ezitare e inconfortabilă — dar e cea mai rapidă cale de a-ți construi încrederea în execuție.
      </P>

      <Divider />

      <H2>Schimbarea de Mentalitate</H2>
      <P>
        Iată adevărul pe care traderii experimentați îl internalizează în cele din urmă: nu ești plătit fiindcă ai dreptate. Ești plătit fiindcă execuți. O strategie de 60% executată la 100% din setup-uri va depăși mereu o strategie de 75% executată la 50% din setup-uri. Matematicii nu-i pasă de sentimentele tale.
      </P>
      <P>
        Execution gap-ul se închide când încetezi să tratezi fiecare trade ca pe un eveniment individual cu consecințe individuale, și începi să-l tratezi ca pe o singură repetiție într-o serie de sute. Niciun trade individual nu contează. Seria contează. Treaba ta nu e să câștigi acest trade. Treaba ta e să execuți sistemul fidel pe următoarele 200 de trade-uri și să lași edge-ul să se manifeste.
      </P>
      <P>
        Acea schimbare — de la „Va funcționa acest trade?" la „Îmi execut sistemul?" — e ce separă traderii care reușesc de cei care renunță cu un hard drive plin de backtest-uri și un cont gol.
      </P>

      <Takeaways items={[
        'Execution gap-ul — diferența dintre rezultatele de backtest și cele live — e cauzat de ezitare, ieșiri premature și devieri emoționale, nu de o strategie defectă.',
        'Notează fiecare setup valid, inclusiv cele peste care sari. Compararea rezultatelor sărite vs. luate face gap-ul vizibil.',
        'Urmărește-ți starea emoțională la intrare ca să găsești pattern-uri între sentimente și calitatea execuției.',
        'Folosește pre-trade checklist-uri ca să elimini deciziile în timp real — dacă califică, ia-l.',
        'Redu position size-ul dacă frica îți blochează execuția. Consistența la jumătate de mărime bate selectivitatea la mărime completă.',
      ]} />
    </BlogArticleLayout>
  );
}
