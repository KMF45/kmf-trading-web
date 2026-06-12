import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PropFirmDailyDrawdownRo() {
  return (
    <BlogArticleLayout
      slug="prop-firm-daily-drawdown-guide"
      lang="ro"
      title="Cum să Nu Mai Încalci Niciodată Regula de Daily Drawdown: Ghid de Supraviețuire la Prop Firm"
      metaTitle="Daily Drawdown la Prop Firm: Sistemul în 5 Reguli ca să Nu-l Mai Încalci | K.M.F."
      metaDescription="Regula de daily drawdown omoară mai multe conturi de prop firm decât trade-urile proaste. Află cum folosești un trading journal cu checklist-uri și management al riscului ca să-ți protejezi contul finanțat."
      date="14 martie 2026"
      dateISO="2026-03-14"
      readTime="9 min citire"
      category="Managementul Riscului"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Ce e regula de daily drawdown la prop firm-uri?', answer: 'Regula de daily drawdown limitează cât poți pierde într-o singură zi, de obicei 4-5% din balanța de start a zilei. Depășirea ei duce la închiderea imediată a contului.' },
        { question: 'Cum evit să încalc regula de daily drawdown?', answer: 'Setează-ți o limită personală de pierdere zilnică la 60-70% din limita firmei, folosește maximum 2-3 trade-uri pe zi, redu size-ul după fiecare pierdere și oprește-te imediat din tranzacționat când îți atingi limita personală.' },
        { question: 'Ce se întâmplă dacă încalc regula de daily drawdown?', answer: 'Majoritatea prop firm-urilor îți închid contul instant, fără a doua șansă. Pierzi accesul la contul finanțat și trebuie să plătești o nouă evaluare.' },
      ]}
    >
      <Intro>
        Ai studiat săptămâni întregi. Ai exersat pe demo. Ai trecut Faza 1 cu o curbă de equity superbă. Faza 2 — trecută și ea. Sosește emailul: „Felicitări, contul tău finanțat e gata." Simți că ai reușit. Ești profesionist acum. Șase zile de trading mai târziu, primești alt email: „Contul tău a fost închis din cauza unei încălcări de daily drawdown." Te uiți la ecran. Nu știi dacă vrei să plângi, să arunci laptopul, sau ambele. Partea cea mai rea? Nu un trade prost te-a omorât. Au fost trei trade-uri medii, unul după altul, într-o marți după-amiaza când erai frustrat din cauza primului. Bine ai venit în clubul daily drawdown. Aproape toată lumea intră măcar o dată.
      </Intro>

      <StatsStrip items={[
        { value: 5, decimals: 0, suffix: '%', label: <>limita tipică de daily drawdown<br />la majoritatea prop firm-urilor</> },
        { value: 3, decimals: 0, suffix: '%', label: <>stopul zilnic personal<br />(60% din limita firmei)</> },
        { value: 3, decimals: 0, label: <>trade-uri maximum pe zi<br />pentru siguranța contului finanțat</> },
      ]} />

      <H2>Ce E Regula de Daily Drawdown (Și De Ce Există)?</H2>
      <P>
        Dacă ești nou la prop firm-uri — firme de tranzacționare cu capital propriu — iată versiunea scurtă: companiile astea îți dau banii lor să tranzacționezi. În schimb, iau un procent din profiturile tale. Care-i partea proastă? Trebuie să le respecți regulile, altfel îți iau contul înapoi. Înțelegere simplă.
      </P>
      <P>
        Regula de daily drawdown e cea mai importantă. Spune: nu poți pierde mai mult de un procent fix din cont (sau din balanța de start a zilei respective) într-o singură zi de trading. Limite comune:
      </P>
      <Table
        headers={['Prop Firm', 'Limită Daily Drawdown', 'Metodă de Calcul']}
        rows={[
          ['FTMO', { value: '5%', color: 'gold' }, 'Pe balanța de la începutul zilei (sau equity, care e mai mare)'],
          ['MyFundedFX', { value: '5%', color: 'gold' }, 'Pe balanța de la începutul zilei'],
          ['The Funded Trader', { value: '5%', color: 'gold' }, 'Pe balanța inițială a contului'],
          ['True Forex Funds', { value: '5%', color: 'gold' }, 'Pe equity-ul de la începutul zilei'],
          ['E8 Funding', { value: '5%', color: 'gold' }, 'Pe balanța de la începutul zilei'],
        ]}
      />
      <P>
        Pe un cont finanțat de $100,000 cu limită de daily drawdown de 5%, nu poți pierde mai mult de $5,000 într-o singură zi. Sună mult? Nu e. Trei trade-uri pierzătoare cu risc de 1.5% fiecare te duc la -4.5% — încă un trade și s-a terminat. Două trade-uri cu risc de 2% fiecare plus un al treilea care sare cu gap peste stopul tău? Terminat. Un singur trade supraîncărcat pe NFP? Foarte terminat.
      </P>
      <Callout title="De Ce Au Prop Firm-urile Regula Asta" color="#00C853">
        Nu e ca să te pedepsească. E management al riscului — exact genul pe care ar trebui să-l faci oricum. Un trader care poate arunca în aer 5% într-o zi poate arunca în aer 20% într-o săptămână proastă. Prop firm-urile au învățat asta pe pielea lor. Regula de daily drawdown există pentru că, fără ea, o singură zi proastă a unui singur trader ar putea costa firma mai mult decât profiturile întregii cariere a acelui trader.
      </Callout>

      <Divider />

      <H2>De Ce Traderii Continuă să o Încalce (Indiciu: Nu E Matematica de Vină)</H2>
      <P>
        Dacă regula e simplă — „nu pierde mai mult de 5% azi" — de ce o încalcă atât de mulți traderi finanțați? Matematica e evidentă. Există calculatoare. Și totuși, datele de la prop firm-uri sugerează că încălcările de daily drawdown sunt motivul #1 pentru care conturile se închid, înaintea drawdown-ului total și a expirării limitei de timp.
      </P>
      <P>
        Motivul e psihologic, nu matematic. Iată secvența tipică:
      </P>
      <H3>Pattern-ul de Marți După-Amiaza</H3>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>9:30:</strong> Primul trade. Setup curat, intrare bună. Lovește stop loss-ul. -1.2%. Nu-i mare lucru. Asta e trading-ul.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>10:15:</strong> Al doilea trade. Tot un setup valid, dar poate nu l-ai fi luat dacă primul nu pierdea. E doar puțin mai agresiv decât intrările tale obișnuite. Stop lovit. -1.5%. Ok, acum ești pe minus 2.7% pe zi.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>11:00:</strong> Îți spui că o să „stai doar să te uiți". Te uiți 20 de minute. Apoi vezi un pattern de lumânări care seamănă a setup dacă te uiți cu ochii mijiți. Intri. Fără checklist, fără calcul de lot size, fără plan scris. Tranzacționezi pe frustrare deghizată în încredere. Stop lovit. -1.8%.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>11:30:</strong> Ești acum la -4.5%. Limita ta zilnică e 5%. Încă un trade — orice trade — și riști închiderea contului. Dar partea rațională a creierului tău a plecat acasă la 10:45. Acum revenge trader-ul e la volan. Mai intri o dată.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>11:47:</strong> Email de la prop firm.
      </P>
      <P>
        Matematica era simplă. Disciplina nu.
      </P>

      <Divider />

      <H2>Sistemul în 5 Reguli Care Previne Încălcările de Daily Drawdown</H2>
      <P>
        Iată un sistem concret pe care îl poți pune în aplicare de azi. Nu cere voință — cere angajament luat dinainte. Setezi regulile când ești calm și rațional, și le urmezi mecanic când nu ești.
      </P>

      <H3>Regula 1: Maximum 3 Trade-uri Pe Zi</H3>
      <P>
        Dacă riscul tău per trade e 1%, trei trade-uri te duc la maximum -3% într-o zi cu pierderi totale. Asta e cu 2% sub limita ta de 5% — un tampon de siguranță care acoperă slippage-ul, gap-urile și faptul că al treilea trade dintr-o zi pierzătoare e statistic cel mai prost al tău.
      </P>
      <P>
        „Dar dacă văd un setup perfect după trei trade-uri?" Atunci îl iei mâine. Setup-ul o să mai apară. Contul tău finanțat nu.
      </P>

      <H3>Regula 2: Limită de Pierdere Zilnică la 60% din Regula de Drawdown</H3>
      <P>
        Dacă limita ta de daily drawdown e 5%, setează-ți un stop personal absolut la 3%. Când atingi -3% pe zi, ziua de trading s-a terminat. Nu „mai stau să mă uit". Nu „încă un trade să ies pe zero". Terminat. Închide platforma. Ieși la o plimbare. Sun-o pe mama. Fă orice nu e trading.
      </P>
      <P>
        Tamponul de 40% există pentru că piețele pot face gap, stopurile pot aluneca, iar starea ta mentală la -3% e semnificativ mai proastă decât la 0%. Tamponul te protejează de tine însuți.
      </P>

      <H3>Regula 3: Risc Per Trade ≤ 1% din Cont</H3>
      <P>
        Pe un cont de $100,000, asta înseamnă $1,000 per trade. Maximum. Asta nu e conservator — e profesionist. Înseamnă că și trei pierderi complete consecutive (-3%) te lasă cu un cont de $97,000 și cu un mâine.
      </P>
      <P>
        Unii traderi folosesc 0.5% pe conturile finanțate, mai ales în prima lună. Da, profiturile sunt mai mici. Și contul rezistă mult, mult mai mult. Ce vrei: un câștig de $200 azi sau un cont finanțat care produce venit ani de zile?
      </P>

      <H3>Regula 4: Pre-Trade Checklist (La Absolut Fiecare Trade)</H3>
      <P>
        Înainte de fiecare trade pe un cont finanțat, treci printr-un checklist de 5 întrebări:
      </P>
      <Ul items={[
        'Se potrivește cu criteriile mele definite de setup? (Nu „oarecum" — exact)',
        'Mi-am calculat lot size-ul exact cu un calculator de risc?',
        'Care e pierderea mea totală de azi până acum? Dacă pierde, trade-ul ăsta îmi încalcă limita zilnică personală?',
        'Intru pentru că văd un setup, sau pentru că vreau să recuperez pierderi?',
        'Dacă trade-ul ăsta pierde, îl accept și mă opresc pe ziua de azi — sau o să mai vreau unul?',
      ]} />
      <P>
        Dacă nu poți răspunde sincer „da" la toate cele cinci întrebări, nu lua trade-ul. Checklist-ul durează 30 de secunde. Contul finanțat a durat săptămâni să-l câștigi.
      </P>

      <H3>Regula 5: Loghează Fiecare Trade în Timp Real</H3>
      <P>
        Loghează trade-ul în momentul în care intri. Nu mai târziu. Nu „la finalul zilei". Acum. De ce? Pentru că actul de a jurnaliza te forțează să încetinești, să-ți documentezi raționamentul și să-ți confrunți starea emoțională. E foarte greu să faci revenge trading când trebuie să scrii „Stare emoțională: frustrat, intru pentru că vreau să recuperez pierderi" și apoi să apeși pe salvare.
      </P>
      <P>
        Jurnalul tău devine un partener de responsabilizare în timp real. Când vezi trei trade-uri logate cu două pierderi, evidența vizuală face impulsul „încă un trade" mult mai greu de justificat.
      </P>

      <Divider />

      <H2>Rutina de Dimineață Care Îți Protejează Contul</H2>
      <P>
        Înainte să deschizi vreun chart, petrece 5 minute cu asta:
      </P>
      <Ul items={[
        'Verifică P/L-ul de ieri în jurnal — unde ești pe săptămâna asta?',
        'Notează calendarul economic de azi — evenimente cu impact mare? Ajustează riscul în consecință',
        'Scrie-ți limita zilnică: „Azi, pierderea mea maximă e $X. Dacă ating $Y (60%), mă opresc."',
        'Setează-ți numărul maxim de trade-uri: „Azi iau maximum 3 trade-uri."',
        'Punctează-ți starea emoțională de la 1 la 10. Sub 7? Redu riscul la 0.5% sau stai pe margine de tot.',
      ]} />
      <P>
        Scrie-le. În jurnal, pe un sticky note, pe frunte — ce funcționează. Ideea e angajamentul luat dinainte. Iei deciziile grele acum, înainte ca piața să se deschidă și emoțiile tale să aibă drept de vot.
      </P>

      <Callout title="Matematica Supraviețuirii" color="#4FC3F7">
        Un trader finanțat care riscă 1% per trade, ia maximum 3 trade-uri pe zi și se oprește la -3% pierdere zilnică va supraviețui aproximativ 16 zile pierzătoare consecutive înainte să atingă un drawdown total de 50% (pe care majoritatea firmelor nici nu-l permit). Ideea e: cu un risc per trade corect, regula de daily drawdown e aproape imposibil de încălcat din greșeală. Trebuie să alegi activ să fii nesăbuit. Sistemul previne alegerea aia.
      </Callout>

      <Divider />

      <H2>Ce Faci După Ce o Încalci (Da, Tot Se Poate Întâmpla)</H2>
      <P>
        Dacă totuși încalci regula de daily drawdown — și li se întâmplă și celor mai buni — nu irosi lecția scumpă:
      </P>
      <Ul items={[
        'Ia-ți 24-48 de ore pauză. Nu cumpăra imediat alt challenge. O să cari pagubele emoționale în el.',
        'Revizuiește ziua trade cu trade în jurnal. Identifică momentul exact în care ai trecut de la trading la gambling. E mereu acolo.',
        'Calculează: dacă respectai limita de 3 trade-uri, tot ți se închidea contul? (De obicei răspunsul e nu.)',
        'Întreabă-te: aveam un checklist? L-am folosit? Dacă da și tot ai încălcat regula, checklist-ul trebuie să fie mai strict. Dacă nu — uite-ți răspunsul.',
        'Ia un nou cont finanțat doar când poți descrie exact ce vei face diferit. „O să fiu mai disciplinat" nu se pune. Regulile specifice se pun.',
      ]} />

      <H2>Mentalitatea Traderului Finanțat</H2>
      <P>
        Iată schimbarea de mentalitate care îi separă pe traderii care își păstrează conturile finanțate de cei care le tot schimbă: <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>un cont finanțat nu e o ocazie să faci bani. E o licență de a tranzacționa, și poate fi revocată.</strong>
      </P>
      <P>
        Nu ai trece pe roșu la fiecare semafor doar pentru că ai permis de conducere. Ai conduce cu grijă, pentru că pierderea permisului costă mai mult decât timpul câștigat trecând pe roșu. Aceeași logică. O săptămână conservatoare care produce $500 profit și ține contul în viață e infinit mai bună decât o zi agresivă care produce $2,000 și declanșează închiderea contului.
      </P>
      <P>
        Regula de daily drawdown nu e dușmanul tău. E parapetul tău. Construiește-ți trading-ul în jurul ei în loc să testezi cât de aproape poți ajunge fără s-o atingi.
      </P>

      <Callout>
        Calculează-ți position size-ul exact pentru orice cont de prop firm cu <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">Calculatorul de Lot Size gratuit</Link> — rămâi în limitele de drawdown de fiecare dată.
      </Callout>

      <Takeaways items={[
        'Regula de daily drawdown (tipic 5%) e motivul #1 pentru care conturile de prop firm se închid — înaintea drawdown-ului total.',
        'Cele mai multe încălcări nu vin dintr-o pierdere mare — vin din 3-4 trade-uri care escaladează, conduse de frustrare și revenge trading.',
        'Setează-ți o limită personală de pierdere zilnică la 60% din regula prop firm-ului (ex. 3% dacă limita e 5%) ca tampon de siguranță.',
        'Limitează-te la maximum 3 trade-uri pe zi cu risc de 1% fiecare — asta face o încălcare de daily drawdown aproape imposibilă.',
        'Folosește un checklist pre-trade de 5 întrebări înainte de fiecare trade pe un cont finanțat. Cele 30 de secunde valorează cât săptămâni de evaluare.',
        'Loghează fiecare trade în timp real — evidența vizuală a pierderilor face revenge trading-ul mai greu psihologic.',
        'Un cont finanțat e o licență de a tranzacționa, nu o invitație la îmbogățire rapidă. Consistența conservatoare bate volatilitatea agresivă.',
      ]} />
    </BlogArticleLayout>
  );
}
