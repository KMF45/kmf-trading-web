import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../i18n/LanguageContext';

const PAGE_URL = 'https://kmfjournal.com/tools';
const OG_IMAGE = 'https://kmfjournal.com/tools/og/trader-personality-test.png';

// Tool identity (route, colour, icon, English name) stays constant across
// languages — the names are proper nouns and match the navbar/footer. Only the
// descriptions, tags and page copy are translated, keyed by tool id.
const TOOLS = [
  { id: 'lot', to: '/tools/lot-size-calculator', name: 'Lot Size Calculator', color: '#00C853', tag: 'risk', icon: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' },
  { id: 'ror', to: '/tools/risk-of-ruin', name: 'Risk of Ruin Calculator', color: '#FF5252', tag: 'risk', icon: 'M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z' },
  { id: 'matrix', to: '/tools/win-rate-rr-matrix', name: 'Win Rate vs R:R Matrix', color: '#4FC3F7', tag: 'stats', icon: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z' },
  { id: 'compound', to: '/tools/compound-calculator', name: 'Compound Calculator', color: '#FFB300', tag: 'growth', icon: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z' },
  { id: 'checklist', to: '/tools/pre-trade-checklist', name: 'Pre-Trade Checklist Builder', color: '#4FC3F7', tag: 'discipline', icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' },
  { id: 'personality', to: '/tools/trader-personality-test', name: 'Trader Personality Test', color: '#CE93D8', tag: 'psychology', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
];

const T = {
  en: {
    pageTitle: 'Free Trading Tools — Calculators, Checklists & Tests | K.M.F.',
    pageDesc: 'Six free trading tools, no signup: lot size calculator, risk of ruin simulator, win rate vs R:R matrix, compound growth calculator, pre-trade checklist builder and the trader personality test.',
    badge: 'Free · No Signup',
    title: 'Free', titleAccent: 'Trading Tools',
    hero: 'Six calculators and tools that answer the questions traders actually ask — position size, survival odds, whether an edge is viable, and what kind of trader you are. Everything runs in your browser.',
    tags: { risk: 'Risk', stats: 'Statistics', growth: 'Growth', discipline: 'Discipline', psychology: 'Psychology' },
    desc: {
      lot: 'Work out the exact position size for your risk, on forex, crypto, stocks or indices.',
      ror: 'Monte Carlo simulation of your edge — the odds your account survives the losing streaks.',
      matrix: 'See which win rate and reward:risk combinations actually make money — and which never do.',
      compound: 'Project how a consistent edge compounds over months and years — with realistic drawdowns.',
      checklist: 'Build a checklist tailored to your strategy, so no trade gets taken on impulse.',
      personality: 'Sixteen questions reveal which of the 9 trader archetypes you are, plus your behavioral bias.',
    },
    ctaTitle: 'These tools answer one question at a time.',
    ctaP: 'The K.M.F. app answers them continuously — from your real trades. Position sizing, risk, statistics and behavioral patterns, tracked automatically as you journal.',
    ctaBtn: 'Get the free app →',
  },
  ro: {
    pageTitle: 'Instrumente Gratuite de Trading — Calculatoare, Checklist-uri & Teste | K.M.F.',
    pageDesc: 'Șase instrumente gratuite de trading, fără cont: calculator de lot, simulator risk of ruin, matrice win rate vs R:R, calculator de creștere compusă, constructor de checklist și testul de personalitate.',
    badge: 'Gratuit · Fără cont',
    title: 'Instrumente de Trading', titleAccent: 'Gratuite',
    hero: 'Șase calculatoare și instrumente care răspund la întrebările pe care traderii chiar și le pun — mărimea poziției, șansele de supraviețuire, dacă un edge e viabil și ce fel de trader ești. Totul rulează în browserul tău.',
    tags: { risk: 'Risc', stats: 'Statistici', growth: 'Creștere', discipline: 'Disciplină', psychology: 'Psihologie' },
    desc: {
      lot: 'Calculează mărimea exactă a poziției pentru riscul tău, pe forex, crypto, acțiuni sau indici.',
      ror: 'Simulare Monte Carlo a edge-ului tău — șansele ca contul să supraviețuiască seriilor de pierderi.',
      matrix: 'Vezi ce combinații de win rate și reward:risk fac de fapt bani — și care nu fac niciodată.',
      compound: 'Proiectează cum se compune un edge constant pe luni și ani — cu drawdown-uri realiste.',
      checklist: 'Construiește un checklist adaptat strategiei tale, ca niciun trade să nu fie luat impulsiv.',
      personality: 'Șaisprezece întrebări îți dezvăluie care dintre cele 9 arhetipuri de trader ești, plus bias-ul tău comportamental.',
    },
    ctaTitle: 'Aceste instrumente răspund la o întrebare pe rând.',
    ctaP: 'Aplicația K.M.F. răspunde la ele continuu — din trade-urile tale reale. Position sizing, risc, statistici și pattern-uri comportamentale, urmărite automat pe măsură ce jurnalizezi.',
    ctaBtn: 'Ia aplicația gratuită →',
  },
  de: {
    pageTitle: 'Kostenlose Trading-Tools — Rechner, Checklisten & Tests | K.M.F.',
    pageDesc: 'Sechs kostenlose Trading-Tools, ohne Anmeldung: Lot-Größen-Rechner, Risk-of-Ruin-Simulator, Win-Rate-vs-R:R-Matrix, Zinseszins-Rechner, Pre-Trade-Checklisten-Builder und der Trader-Persönlichkeitstest.',
    badge: 'Kostenlos · Ohne Anmeldung',
    title: 'Kostenlose', titleAccent: 'Trading-Tools',
    hero: 'Sechs Rechner und Tools, die die Fragen beantworten, die Trader wirklich stellen — Positionsgröße, Überlebenschancen, ob ein Edge tragfähig ist und welcher Typ Trader du bist. Alles läuft in deinem Browser.',
    tags: { risk: 'Risiko', stats: 'Statistik', growth: 'Wachstum', discipline: 'Disziplin', psychology: 'Psychologie' },
    desc: {
      lot: 'Berechne die exakte Positionsgröße für dein Risiko — auf Forex, Krypto, Aktien oder Indizes.',
      ror: 'Monte-Carlo-Simulation deines Edge — die Chance, dass dein Konto die Verlustserien überlebt.',
      matrix: 'Sieh, welche Win-Rate- und Reward:Risk-Kombinationen tatsächlich Geld verdienen — und welche nie.',
      compound: 'Projiziere, wie sich ein konstanter Edge über Monate und Jahre verzinst — mit realistischen Drawdowns.',
      checklist: 'Baue eine auf deine Strategie zugeschnittene Checkliste, damit kein Trade impulsiv eingegangen wird.',
      personality: 'Sechzehn Fragen zeigen, welcher der 9 Trader-Archetypen du bist, plus deinen Verhaltens-Bias.',
    },
    ctaTitle: 'Diese Tools beantworten eine Frage nach der anderen.',
    ctaP: 'Die K.M.F.-App beantwortet sie fortlaufend — aus deinen echten Trades. Positionsgrößen, Risiko, Statistik und Verhaltensmuster, automatisch erfasst, während du journalisierst.',
    ctaBtn: 'Hol dir die kostenlose App →',
  },
  fr: {
    pageTitle: 'Outils de Trading Gratuits — Calculatrices, Checklists & Tests | K.M.F.',
    pageDesc: 'Six outils de trading gratuits, sans inscription : calculatrice de lot, simulateur de risque de ruine, matrice win rate vs R:R, calculatrice d\'intérêts composés, générateur de checklist et le test de personnalité.',
    badge: 'Gratuit · Sans inscription',
    title: 'Outils de Trading', titleAccent: 'Gratuits',
    hero: 'Six calculatrices et outils qui répondent aux questions que les traders se posent vraiment — taille de position, chances de survie, si un edge est viable, et quel type de trader tu es. Tout tourne dans ton navigateur.',
    tags: { risk: 'Risque', stats: 'Statistiques', growth: 'Croissance', discipline: 'Discipline', psychology: 'Psychologie' },
    desc: {
      lot: 'Calcule la taille exacte de position pour ton risque, sur forex, crypto, actions ou indices.',
      ror: 'Simulation Monte-Carlo de ton edge — les chances que ton compte survive aux séries de pertes.',
      matrix: 'Vois quelles combinaisons de win rate et reward:risk gagnent vraiment de l\'argent — et lesquelles jamais.',
      compound: 'Projette comment un edge constant se compose sur des mois et des années — avec des drawdowns réalistes.',
      checklist: 'Construis une checklist adaptée à ta stratégie, pour qu\'aucun trade ne soit pris sur impulsion.',
      personality: 'Seize questions révèlent lequel des 9 archétypes de trader tu es, ainsi que ton biais comportemental.',
    },
    ctaTitle: 'Ces outils répondent à une question à la fois.',
    ctaP: 'L\'application K.M.F. y répond en continu — à partir de tes trades réels. Taille de position, risque, statistiques et schémas comportementaux, suivis automatiquement à mesure que tu journalises.',
    ctaBtn: 'Obtiens l\'appli gratuite →',
  },
  ru: {
    pageTitle: 'Бесплатные торговые инструменты — калькуляторы, чек-листы и тесты | K.M.F.',
    pageDesc: 'Шесть бесплатных торговых инструментов, без регистрации: калькулятор лота, симулятор риска разорения, матрица win rate и R:R, калькулятор сложного роста, конструктор чек-листа и тест личности трейдера.',
    badge: 'Бесплатно · Без регистрации',
    title: 'Бесплатные', titleAccent: 'торговые инструменты',
    hero: 'Шесть калькуляторов и инструментов, отвечающих на вопросы, которые трейдеры реально задают — размер позиции, шансы на выживание, жизнеспособность преимущества и какой ты трейдер. Всё работает в вашем браузере.',
    tags: { risk: 'Риск', stats: 'Статистика', growth: 'Рост', discipline: 'Дисциплина', psychology: 'Психология' },
    desc: {
      lot: 'Рассчитайте точный размер позиции под ваш риск — на форекс, крипте, акциях или индексах.',
      ror: 'Симуляция Монте-Карло вашего преимущества — шансы, что счёт переживёт серии убытков.',
      matrix: 'Посмотрите, какие сочетания win rate и reward:risk реально приносят деньги — а какие никогда.',
      compound: 'Спрогнозируйте, как стабильное преимущество накапливается за месяцы и годы — с реалистичными просадками.',
      checklist: 'Постройте чек-лист под вашу стратегию, чтобы ни одна сделка не бралась на импульсе.',
      personality: 'Шестнадцать вопросов покажут, какой из 9 архетипов трейдера вы — плюс ваше поведенческое искажение.',
    },
    ctaTitle: 'Эти инструменты отвечают на один вопрос за раз.',
    ctaP: 'Приложение K.M.F. отвечает на них постоянно — на основе ваших реальных сделок. Размер позиции, риск, статистика и поведенческие паттерны отслеживаются автоматически, пока вы ведёте журнал.',
    ctaBtn: 'Получить бесплатное приложение →',
  },
  ja: {
    pageTitle: '無料トレーディングツール — 計算ツール・チェックリスト・診断 | K.M.F.',
    pageDesc: '登録不要の無料トレーディングツール6種：ロットサイズ計算、破産確率シミュレーター、勝率とR:Rのマトリクス、複利計算、トレード前チェックリスト、トレーダー性格診断。',
    badge: '無料 · 登録不要',
    title: '無料', titleAccent: 'トレーディングツール',
    hero: 'トレーダーが実際に抱く疑問に答える6つの計算ツール — ポジションサイズ、生き残る確率、エッジが有効かどうか、そしてあなたがどんなトレーダーか。すべてブラウザ上で動作します。',
    tags: { risk: 'リスク', stats: '統計', growth: '成長', discipline: '規律', psychology: '心理' },
    desc: {
      lot: 'FX・仮想通貨・株式・指数で、あなたのリスクに応じた正確なポジションサイズを計算します。',
      ror: 'あなたのエッジのモンテカルロ・シミュレーション — 連敗を口座が生き残る確率。',
      matrix: 'どの勝率とリワード:リスクの組み合わせが実際に利益を生むか、どれが決して生まないかを確認します。',
      compound: '安定したエッジが数か月・数年でどう複利になるかを — 現実的なドローダウンとともに予測します。',
      checklist: '衝動的にトレードを取らないよう、あなたの戦略に合わせたチェックリストを作成します。',
      personality: '16の質問で、9つのトレーダー原型のどれかと、あなたの行動バイアスが分かります。',
    },
    ctaTitle: 'これらのツールは一度に一つの疑問に答えます。',
    ctaP: 'K.M.F.アプリはそれらに継続的に答えます — あなたの実際のトレードから。ポジションサイズ、リスク、統計、行動パターンを、記録するだけで自動的に追跡します。',
    ctaBtn: '無料アプリを入手 →',
  },
  zh: {
    pageTitle: '免费交易工具 — 计算器、清单与测试 | K.M.F.',
    pageDesc: '六款免费交易工具，无需注册：手数计算器、破产概率模拟器、胜率与盈亏比矩阵、复利计算器、交易前清单生成器和交易者性格测试。',
    badge: '免费 · 无需注册',
    title: '免费', titleAccent: '交易工具',
    hero: '六款计算器和工具，回答交易者真正会问的问题 — 仓位大小、生存几率、优势是否可行，以及你是哪种交易者。全部在你的浏览器中运行。',
    tags: { risk: '风险', stats: '统计', growth: '增长', discipline: '纪律', psychology: '心理' },
    desc: {
      lot: '为你的风险计算精确仓位，适用于外汇、加密货币、股票或指数。',
      ror: '对你优势的蒙特卡洛模拟 — 账户在连续亏损中存活的概率。',
      matrix: '看看哪些胜率与盈亏比组合真正赚钱 — 哪些永远不赚。',
      compound: '预测稳定的优势如何在数月和数年中复利增长 — 包含真实的回撤。',
      checklist: '构建贴合你策略的清单，让任何交易都不会冲动执行。',
      personality: '十六个问题揭示你属于9种交易者原型中的哪一种，以及你的行为偏差。',
    },
    ctaTitle: '这些工具一次回答一个问题。',
    ctaP: 'K.M.F. 应用持续回答它们 — 基于你的真实交易。仓位、风险、统计和行为模式，在你记录时自动追踪。',
    ctaBtn: '获取免费应用 →',
  },
};

export default function ToolsPage() {
  const { lang } = useLanguage();
  const t = T[lang] || T.en;

  useEffect(() => {
    document.title = t.pageTitle;
    const setMeta = (attr, val, content) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', t.pageDesc);
    setMeta('property', 'og:title', t.pageTitle);
    setMeta('property', 'og:description', t.pageDesc);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:url', PAGE_URL);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', t.pageTitle);
    setMeta('name', 'twitter:description', t.pageDesc);
    setMeta('name', 'twitter:image', OG_IMAGE);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', PAGE_URL);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'Free Trading Tools',
          url: PAGE_URL,
          description: t.pageDesc,
          isPartOf: { '@type': 'WebSite', name: 'K.M.F. Trading Journal', url: 'https://kmfjournal.com' },
        },
        {
          '@type': 'ItemList',
          itemListElement: TOOLS.map((tool, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: tool.name,
            url: `https://kmfjournal.com${tool.to}`,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kmfjournal.com' },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: PAGE_URL },
          ],
        },
      ],
    };
    let script = document.getElementById('tools-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'tools-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);
    return () => { script?.remove(); link?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-kmf-bg text-kmf-text-primary">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-kmf-accent bg-kmf-accent/10 border border-kmf-accent/20 rounded-full px-3 py-1 mb-5">
              {t.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              {t.title} <span className="text-kmf-accent">{t.titleAccent}</span>
            </h1>
            <p className="text-kmf-text-secondary text-lg max-w-2xl mx-auto">
              {t.hero}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.to}
                viewTransition
                to={tool.to}
                className="group bg-kmf-panel border border-white/5 rounded-xl p-5 transition-all hover:border-kmf-accent/40 hover:bg-white/[0.03] hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ background: `${tool.color}18`, color: tool.color }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={tool.icon} />
                    </svg>
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-semibold group-hover:text-kmf-accent transition-colors">{tool.name}</h2>
                      <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded" style={{ background: `${tool.color}18`, color: tool.color }}>
                        {t.tags[tool.tag]}
                      </span>
                    </div>
                    <p className="text-sm text-kmf-text-secondary leading-relaxed">{t.desc[tool.id]}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-2xl p-6 sm:p-8 text-center border border-kmf-accent/20 bg-gradient-to-b from-kmf-accent/10 to-transparent">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {t.ctaTitle}
            </h2>
            <p className="text-kmf-text-secondary text-sm mb-5 max-w-lg mx-auto">
              {t.ctaP}
            </p>
            <a
              href="/#download"
              className="inline-flex items-center gap-2 bg-kmf-accent hover:bg-kmf-accent/90 text-kmf-bg font-semibold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.03] active:scale-95"
            >
              {t.ctaBtn}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
