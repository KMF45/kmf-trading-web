import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { ProspectTheoryChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function ProspectTheoryTradingRo() {
  return (
    <BlogArticleLayout
      slug="prospect-theory-trading"
      lang="ro"
      title="De Ce Îți Închizi Câștigătorii Prea Devreme și Îți Lași Pierzătorii Să Curgă"
      metaTitle="Prospect Theory în Trading: De Ce Creierul Tău E Construit Să Piardă Bani | K.M.F."
      metaDescription="Creierul tău valorează evitarea unei pierderi de $100 de 2.25x mai mult decât câștigul a $100. Această asimetrie biologică e motivul pentru care tai câștigătorii și ții pierzătorii. Neuroștiința și cum o depășești."
      date="22 martie 2026"
      dateISO="2026-03-22"
      readTime="10 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'good-loss-vs-bad-win', title: 'Good Losses, Bad Wins: Why the Trade You\'re Proud of Might Be Your Worst', category: 'Improvement' },
        { slug: 'breakeven-stop-too-early', title: 'The $0.01 Gap: Why You Move Your Stop to Breakeven Too Early', category: 'Psychology' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Ce este prospect theory în trading?', answer: 'Prospect theory, dezvoltată de Daniel Kahneman și Amos Tversky, arată că oamenii simt pierderile de aproximativ 2.25 ori mai intens decât câștigurile echivalente. În trading, asta înseamnă că durerea de a pierde $100 e mult mai puternică decât plăcerea de a câștiga $100, ceea ce îi face pe traderi să taie câștigătorii prea devreme (ca să asigure câștigul) și să țină pierzătorii prea mult (ca să evite să simtă durerea).' },
        { question: 'De ce taie traderii câștigătorii devreme?', answer: 'Fiindcă un câștig realizat oferă certitudine și ușurare imediată. Creierul tratează un profit nerealizat ca instabil — ar putea dispărea. Așa că te împinge să-l „blochezi" chiar dacă target-ul tău nu a fost atins. Certitudinea unui câștig mic se simte mai bine decât incertitudinea unuia potențial mai mare.' },
        { question: 'De ce țin traderii trade-urile pe pierdere prea mult?', answer: 'Fiindcă închiderea unui trade pe pierdere face pierderea reală și permanentă. Cât timp trade-ul e deschis, mai există speranța că își va reveni — iar speranța se simte mai bine decât finalitatea unei pierderi realizate. Creierul preferă o pierdere incertă în desfășurare uneia certe, închise.' },
        { question: 'Cum depășesc bias-ul de prospect theory în trading-ul meu?', answer: 'Folosește stop loss-uri hard plasate înainte de intrare, urmărește R-multiplii în loc de sume în dolari, pre-angajează-te la reguli de ieșire, și revizuiește-ți jurnalul pentru pattern-uri de luare de profit prematură și de luare de pierderi târzie. Scopul e să automatizezi ieșirile ca bias-ul emoțional să nu poată interveni.' },
      ]}
      howToSteps={[
        { name: 'Plasează stop loss-ul și take profit-ul înainte de intrare', text: 'Setează atât stop loss-ul cât și take profit-ul ca ordine hard pe platformă înainte să apeși buy sau sell. Odată ce trade-ul e live, aceste niveluri sunt blocate — fără să muți take profit-ul mai aproape sau stop loss-ul mai departe.' },
        { name: 'Treci de la P/L în dolari la R-multipli', text: 'Nu mai măsura trade-urile în dolari. Măsoară-le în R-multipli: rezultatul real împărțit la riscul inițial. O pierdere de -1R și un câștig de +2R sună clinic și plictisitor — exact cum ar trebui să se simtă deciziile de trading.' },
        { name: 'Urmărește câștigătorul mediu vs pierzătorul mediu', text: 'În jurnalul tău, calculează mărimea medie a trade-ului câștigător și a celui pierzător în R. Dacă câștigătorul tău mediu e mai mic decât pierzătorul mediu, prospect theory îți conduce contul.' },
        { name: 'Aplică regula „nu atinge" pentru prima oră', text: 'După intrare, nu modifica trade-ul pentru o perioadă minimă (ex. 1 oră sau până se închide lumânarea curentă pe timeframe-ul tău). Asta previne impulsul de a închide la primul semn de verde.' },
        { name: 'Revizuiește-ți „pierzătorii ținuți" lunar', text: 'Filtrează-ți jurnalul pentru trade-urile unde ai mutat stop-ul mai departe sau ai închis un pierzător mult dincolo de stop-ul tău inițial. Calculează pierderea în plus din aceste modificări. Acest număr e „taxa ta de prospect theory".' },
      ]}
    >
      <Intro>
        Iată un joc. Îți ofer două opțiuni. Opțiunea A: îți dau $500 chiar acum, garantat. Opțiunea B: dau cu banul — cap iei $1,100, pajură nu iei nimic. Valoarea așteptată a Opțiunii B e $550 — matematic mai bună decât A. Dar ai lua $500. Aproape toată lumea o face. Acum inversul: îmi datorezi $500. Opțiunea A: plătești $500 chiar acum. Opțiunea B: dai cu banul — cap nu datorezi nimic, pajură datorezi $1,100. Acum cei mai mulți aleg pariul. Aceeași matematică, decizii opuse. Asta nu e o ghicitoare de logică. Ăsta e creierul tău. Și e același creier care îți tranzacționează banii.
      </Intro>

      <StatsStrip items={[
        { value: 2.25, decimals: 2, suffix: '×', label: <>raportul de loss-aversion<br />(Kahneman & Tversky, 1979)</> },
        { value: 50, decimals: 0, suffix: '%', label: <>mai probabil să vinzi câștigătorii<br />decât pierzătorii (disposition effect)</> },
        { value: 47, decimals: 0, suffix: '%', label: <>depășirea medie a pierderii<br />când folosești „stop-uri mintale"</> },
      ]} />

      <H2>Prospect Theory: Descoperirea Care a Câștigat un Nobel</H2>
      <P>
        În 1979, psihologii Daniel Kahneman și Amos Tversky au publicat ce avea să devină una dintre cele mai citate lucrări din istoria economiei. Descoperirea lor era simplă și devastatoare: oamenii nu evaluează câștigurile și pierderile simetric. O pierdere de $100 se simte de aproximativ 2.25 ori mai rău decât se simte de bine un câștig de $100.
      </P>
      <P>
        Asta nu e o trăsătură de personalitate. Nu e despre a fi „emoțional" sau „slab". E înrădăcinată în sistemul nervos uman de milioane de ani de evoluție. În termeni de supraviețuire, pierderea sursei de hrană (o pierdere) e o amenințare mai mare decât găsirea de hrană în plus (un câștig). Asimetria ți-a ținut strămoșii în viață. În trading, te lasă fără bani.
      </P>

      <ProspectTheoryChart />

      <P>
        Uită-te la curbă. Partea stângă (pierderi) e mai abruptă și mai adâncă decât partea dreaptă (câștiguri). Un câștig de $50 abia înregistrează valoare pozitivă. O pierdere de $50 se simte ca un pumn în stomac. Această asimetrie e cel mai important grafic din psihologia trading-ului — și nu are nicio legătură cu prețul.
      </P>

      <Divider />

      <H2>Cum Îți Distruge Asta Trading-ul: Două Scenarii</H2>
      <H3>Scenariul 1: Câștigătorul Pe Care Nu Îl Poți Ține</H3>
      <P>
        Intri long pe EUR/USD. Analiza ta spune că target-ul e la 60 pips. Trade-ul se mișcă 20 pips în favoarea ta. Creierul tău începe imediat o negociere:
      </P>
      <Ul items={[
        '„Ăia sunt $200 chiar acolo. Dacă revine?"',
        '„Vrabia din mână e mai bună decât cioara de pe gard."',
        '„Măcar închide jumătate. Blochează ceva."',
        '„M-aș înfuria așa de tare dacă asta se transformă în pierdere."',
      ]} />
      <P>
        Așa că închizi la +20 pips în loc de +60. Sau mai rău, îți <Link to="/blog/breakeven-stop-too-early" className="text-kmf-accent hover:underline">muți stop-ul la breakeven</Link> și ești scos la zero înainte ca prețul să-ți atingă target-ul. Oricum, ai lăsat două treimi din recompensa așteptată pe masă. Înmulțește asta cu 100 de trade-uri și trade-ul tău câștigător mediu e 0.8R în loc de 2.5R. <Link to="/blog/trading-expectancy-explained" className="text-kmf-accent hover:underline">Expectancy-ul</Link> strategiei tale trece de la pozitiv la negativ. Ești sistematic profitabil pe hârtie și sistematic falit în practică.
      </P>

      <H3>Scenariul 2: Pierzătorul Pe Care Nu Îl Poți Omorî</H3>
      <P>
        Intri short pe GBP/USD. Stop loss la -30 pips. Trade-ul se mișcă 25 pips împotriva ta. Stop-ul tău e la 5 pips distanță. Creierul tău trece într-un mod complet diferit:
      </P>
      <Ul items={[
        '„E deja atât de jos — ce mai contează încă 10 pips?"',
        '„Dacă închid acum, blochez această pierdere pentru totdeauna."',
        '„E support chiar dedesubt. Ar putea face bounce."',
        '„O să-mi mut stop-ul doar puțin mai departe. Doar de data asta."',
      ]} />
      <P>
        Așa că lărgești stop-ul de la -30 la -50 pips. Apoi la -70. Apoi îl scoți complet fiindcă „la momentul ăsta tot ce pot face e să aștept pullback-ul". Trade-ul care trebuia să te coste $300 te costă $900. O singură decizie de a ține ți-a triplat pierderea. Și partea cea mai crudă? Ai făcut-o ca să eviți să simți durerea unei pierderi de $300 — și ai ajuns să simți durerea unei pierderi de $900 în schimb.
      </P>

      <Callout title="Disposition Effect" color="#CE93D8">
        Cercetătorii numesc acest pattern „disposition effect": tendința de a vinde câștigătorii prea repede și de a ține pierzătorii prea mult. Studii pe date din conturi de brokeraj arată că investitorii individuali sunt cu 50% mai predispuși să vândă o poziție câștigătoare decât una pe pierdere. Și traderii profesioniști arată acest bias — doar mai puțin intens. Nimeni nu e imun. Singura apărare e un sistem care decide pentru tine.
      </Callout>

      <Divider />

      <H2>Matematica Luării Asimetrice de Decizii</H2>
      <P>
        Să vedem ce face prospect theory unei strategii reale pe 100 de trade-uri:
      </P>
      <Table
        headers={['Metrică', 'Cum E Construită', 'Cu Bias de Prospect Theory']}
        rows={[
          ['Win rate', '45%', '55% (mai multe câștiguri mici din ieșiri premature)'],
          ['Câștigător mediu', { value: '2.5R', color: 'green' }, { value: '0.9R (închis devreme)', color: 'red' }],
          ['Pierzător mediu', { value: '-1.0R', color: 'green' }, { value: '-1.8R (ținut prea mult, stop-uri lărgite)', color: 'red' }],
          ['Expectancy', { value: '+0.575R per trade', color: 'green' }, { value: '-0.31R per trade', color: 'red' }],
          ['După 100 de trade-uri', { value: '+$5,750', color: 'green' }, { value: '-$3,100', color: 'red' }],
        ]}
      />
      <P>
        Citește din nou. Traderul cu bias are un win rate mai mare — 55% vs 45%. „Câștigă" mai des. Se simte mai bine în legătură cu trading-ul lui. Le spune prietenilor despre win rate-ul lui. Și pierde bani. Win rate-ul a urcat fiindcă ia profituri rapide (câștiguri mici mai frecvente), dar câștigul mediu s-a micșorat atât de mult încât nu poate acoperi pierderea medie (care a crescut fiindcă ține pierzătorii).
      </P>
      <P>
        De-asta <Link to="/blog/profit-factor-vs-win-rate" className="text-kmf-accent hover:underline">win rate-ul e o metrică groaznică izolat</Link>. Un win rate de 55% cu câștig mediu de 0.9R și pierdere medie de 1.8R e o strategie pe pierdere purtând masca unui câștigător.
      </P>

      <H2>Soluția: Păcălește 2 Milioane de Ani de Evoluție</H2>
      <P>
        Nu îți poți reconfigura sistemul nervos. Asimetria e permanentă. Dar poți construi sisteme care iau decizii înainte să intervină emoția.
      </P>

      <H3>1. Stop-uri Hard, Target-uri Hard, Fără Excepții</H3>
      <P>
        Plasează-ți <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss-ul</Link> și take profit-ul ca ordine limit pe platformă înainte de intrare. Nu „stop-uri mintale" — alea se evaporă în clipa în care prețul se apropie de ele. Ordine fizice care se execută fie că te uiți, fie că dormi. Piața nu negociază. Nici ordinele tale n-ar trebui.
      </P>

      <Callout title="Stop-urile Mintale Sunt Minciuni Pe Care Ți Le Spui" color="#FF5252">
        „Am un stop mintal la -30 pips." Nu, nu ai. Ai o intenție vagă pe care amigdala ta o va anula în clipa în care prețul se apropie. Un studiu pe traderi retail de forex a găsit că cei care folosesc stop-uri mintale și-au depășit pierderea intenționată în medie cu 47%. Un stop mintal nu e un stop. E o speranță.
      </Callout>

      <H3>2. Gândește în R, Nu în Dolari</H3>
      <P>
        Când display-ul tău de P/L spune „-$347", creierul tău procesează o amenințare. Când jurnalul tău spune „-1.0R", creierul tău procesează date. Aceeași pierdere, răspuns neurologic complet diferit. <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-multiplii</Link> scot emoția din evaluarea trade-urilor. K.M.F. calculează și urmărește R-multiple-ul tău pe fiecare trade automat — așa că sesiunea ta de review e despre calitatea procesului, nu despre durerea sumei în dolari.
      </P>

      <H3>3. Regula „Nu Atinge"</H3>
      <P>
        După ce intri într-un trade, nu îl modifica pentru o perioadă prestabilită. Asta poate fi 1 oră, până se închide lumânarea curentă pe timeframe-ul tău, sau până prețul atinge un nivel specific. Ideea e să creezi o pauză între impulsul emoțional („închide-l acum!") și acțiune. În acea pauză, cortexul prefrontal are timp să anuleze amigdala.
      </P>

      <H3>4. Urmărește-ți Taxa de Prospect Theory</H3>
      <P>
        La sfârșitul fiecărei luni, calculează două cifre din jurnalul tău:
      </P>
      <Ul items={[
        'Costul ieșirilor premature: Pentru fiecare trade pe care l-ai închis înainte de target, calculează cât ar fi adus trade-ul dacă l-ai fi ținut. Adună totul. Ăștia sunt banii pe care te-a costat frica de a da înapoi profiturile.',
        'Costul ieșirilor târzii: Pentru fiecare trade unde ți-ai mutat stop-ul sau ai ținut dincolo de ieșirea planificată, calculează diferența dintre pierderea planificată și pierderea reală. Adună totul. Ăștia sunt banii pe care te-a costat frica de a realiza pierderi.',
      ]} />
      <P>
        Adună cele două cifre. Aceea e Taxa ta lunară de Prospect Theory — prețul exact pe care îl plătești pentru că ai un creier uman. Când vezi acel număr, conceptul abstract devine o sumă concretă în dolari. Iar sumele concrete în dolari sunt mult mai greu de ignorat.
      </P>

      <Divider />

      <H2>Paradoxul Traderului</H2>
      <P>
        Iată adevărul incomod: aceleași instincte care te fac o ființă umană funcțională te fac un trader disfuncțional. Prudența în jurul pierderilor ți-a ținut strămoșii în viață. Gratificarea rapidă din câștigurile mici oferea recompensă imediată. Astea sunt funcții ale creierului uman, nu defecte. Dar trading-ul e unul dintre puținele medii în care acele funcții produc opusul supraviețuirii. În trading, senzația „sigură" de a bloca un profit mic e alegerea periculoasă. Senzația „dureroasă" de a lua un stop loss complet e alegerea inteligentă.
      </P>
      <P>
        Nu vei înceta niciodată să simți asimetria. Pierderea de $100 va durea mereu mai mult decât se simte de bine câștigul de $100. Trucul nu e să elimini senzația — e să construiești un sistem care execută corect în ciuda senzației. Stop-uri hard. Target-uri hard. Urmărire în R-multipli. Audituri lunare de bias. Sistemul nu se sinchisește de sentimentele tale. Asta e cea mai mare calitate a lui.
      </P>

      <Takeaways items={[
        'Prospect theory (Nobel, 1979): oamenii simt pierderile de 2.25x mai intens decât câștigurile echivalente. E biologic, nu o slăbiciune emoțională. Nu poți ieși din asta cu „mentalitate".',
        'Disposition effect: traderii vând câștigătorii cu 50% mai des decât pierzătorii. Închizi la +20 pips din ușurare și ții la -60 pips din speranță.',
        'Un trader cu bias poate avea un win rate mai mare (55%) și totuși să piardă bani fiindcă câștigul mediu (0.9R) nu poate acoperi pierderea medie (1.8R). Win rate-ul singur nu înseamnă nimic.',
        'Stop-urile mintale nu sunt stop-uri. Traderii retail cu stop-uri mintale își depășesc pierderea intenționată în medie cu 47%. Folosește ordine hard pe platformă.',
        'Gândește în R-multipli, nu în dolari. „-1R" e dată. „-$347" e un declanșator emoțional. Aceeași informație, răspuns neurologic diferit.',
        'Calculează-ți Taxa lunară de Prospect Theory: suma costurilor ieșirilor premature și a celor târzii. Asta e suma concretă în dolari pe care te costă creierul tău uman.',
      ]} />
    </BlogArticleLayout>
  );
}
