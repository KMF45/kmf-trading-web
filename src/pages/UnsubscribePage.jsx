import { useEffect, useState } from 'react';

const FUNCTION_URL = 'https://us-central1-kmf-trading-journal.cloudfunctions.net/unsubscribeUser';

const TEXTS = {
  en: {
    title: 'Unsubscribe',
    loading: 'Processing your request...',
    successTitle: '✅ You have been unsubscribed',
    successBody: "You won't receive marketing emails from K.M.F. anymore. Transactional emails (verification, password reset) will still be sent.",
    alreadyTitle: 'ℹ️ Already unsubscribed',
    alreadyBody: 'This email address was already unsubscribed from our list.',
    invalidTitle: '⚠️ Invalid link',
    invalidBody: 'This unsubscribe link is invalid or has expired. If you continue to receive unwanted emails, please contact us.',
    errorTitle: '⚠️ Something went wrong',
    errorBody: 'We could not process your request right now. Please try again in a few minutes.',
    home: 'Back to kmfjournal.com',
    contact: 'Contact: contact@kmfjournal.com',
  },
  ro: {
    title: 'Dezabonare',
    loading: 'Procesăm cererea ta...',
    successTitle: '✅ Te-am dezabonat',
    successBody: 'Nu vei mai primi emailuri marketing de la K.M.F. Emailurile tranzacționale (verificare, resetare parolă) vor fi trimise în continuare.',
    alreadyTitle: 'ℹ️ Deja dezabonat',
    alreadyBody: 'Această adresă de email era deja dezabonată din lista noastră.',
    invalidTitle: '⚠️ Link invalid',
    invalidBody: 'Acest link de dezabonare este invalid sau a expirat. Dacă primești în continuare emailuri nedorite, contactează-ne.',
    errorTitle: '⚠️ A apărut o eroare',
    errorBody: 'Nu am putut procesa cererea ta acum. Încearcă din nou în câteva minute.',
    home: 'Înapoi la kmfjournal.com',
    contact: 'Contact: contact@kmfjournal.com',
  },
  de: {
    title: 'Abmelden',
    loading: 'Anfrage wird bearbeitet...',
    successTitle: '✅ Du wurdest abgemeldet',
    successBody: 'Du erhältst keine Marketing-E-Mails mehr von K.M.F. Transaktions-E-Mails (Verifizierung, Passwort-Reset) werden weiterhin gesendet.',
    alreadyTitle: 'ℹ️ Bereits abgemeldet',
    alreadyBody: 'Diese E-Mail-Adresse wurde bereits aus unserer Liste entfernt.',
    invalidTitle: '⚠️ Ungültiger Link',
    invalidBody: 'Dieser Abmeldelink ist ungültig oder abgelaufen. Wenn du weiterhin unerwünschte E-Mails erhältst, kontaktiere uns.',
    errorTitle: '⚠️ Ein Fehler ist aufgetreten',
    errorBody: 'Wir konnten deine Anfrage gerade nicht verarbeiten. Bitte versuche es in ein paar Minuten erneut.',
    home: 'Zurück zu kmfjournal.com',
    contact: 'Kontakt: contact@kmfjournal.com',
  },
  fr: {
    title: 'Se désabonner',
    loading: 'Traitement de ta demande...',
    successTitle: '✅ Tu as été désabonné',
    successBody: 'Tu ne recevras plus d\'emails marketing de K.M.F. Les emails transactionnels (vérification, réinitialisation de mot de passe) continueront d\'être envoyés.',
    alreadyTitle: 'ℹ️ Déjà désabonné',
    alreadyBody: 'Cette adresse email a déjà été désabonnée de notre liste.',
    invalidTitle: '⚠️ Lien invalide',
    invalidBody: 'Ce lien de désabonnement est invalide ou a expiré. Si tu continues à recevoir des emails indésirables, contacte-nous.',
    errorTitle: '⚠️ Une erreur est survenue',
    errorBody: "Nous n'avons pas pu traiter ta demande maintenant. Réessaie dans quelques minutes.",
    home: 'Retour à kmfjournal.com',
    contact: 'Contact : contact@kmfjournal.com',
  },
  ru: {
    title: 'Отписка',
    loading: 'Обработка запроса...',
    successTitle: '✅ Ты отписался',
    successBody: 'Ты больше не будешь получать маркетинговые письма от K.M.F. Транзакционные письма (верификация, сброс пароля) продолжат отправляться.',
    alreadyTitle: 'ℹ️ Уже отписан',
    alreadyBody: 'Этот email уже был отписан из нашего списка.',
    invalidTitle: '⚠️ Недействительная ссылка',
    invalidBody: 'Эта ссылка отписки недействительна или истекла. Если ты продолжаешь получать нежелательные письма, свяжись с нами.',
    errorTitle: '⚠️ Что-то пошло не так',
    errorBody: 'Мы не смогли обработать запрос сейчас. Попробуй снова через несколько минут.',
    home: 'Назад на kmfjournal.com',
    contact: 'Контакт: contact@kmfjournal.com',
  },
  ja: {
    title: '配信停止',
    loading: 'リクエストを処理中...',
    successTitle: '✅ 配信を停止しました',
    successBody: 'K.M.F.からマーケティングメールを受信することはなくなります。トランザクションメール（認証、パスワードリセット）は引き続き送信されます。',
    alreadyTitle: 'ℹ️ すでに配信停止済み',
    alreadyBody: 'このメールアドレスはすでに配信リストから削除されています。',
    invalidTitle: '⚠️ 無効なリンク',
    invalidBody: 'この配信停止リンクは無効または期限切れです。引き続き不要なメールを受信する場合は、お問い合わせください。',
    errorTitle: '⚠️ エラーが発生しました',
    errorBody: '現在リクエストを処理できませんでした。数分後にもう一度お試しください。',
    home: 'kmfjournal.comに戻る',
    contact: 'お問い合わせ: contact@kmfjournal.com',
  },
  zh: {
    title: '取消订阅',
    loading: '正在处理你的请求...',
    successTitle: '✅ 你已取消订阅',
    successBody: '你将不再收到 K.M.F. 的营销邮件。交易邮件（验证、密码重置）仍将发送。',
    alreadyTitle: 'ℹ️ 已取消订阅',
    alreadyBody: '此邮箱已从我们的列表中取消订阅。',
    invalidTitle: '⚠️ 链接无效',
    invalidBody: '此取消订阅链接无效或已过期。如果你继续收到不需要的邮件，请联系我们。',
    errorTitle: '⚠️ 发生错误',
    errorBody: '我们现在无法处理你的请求。请几分钟后重试。',
    home: '返回 kmfjournal.com',
    contact: '联系: contact@kmfjournal.com',
  },
};

const SUPPORTED = ['en', 'ro', 'de', 'fr', 'ru', 'ja', 'zh'];

const UnsubscribePage = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const langParam = (params.get('lang') || 'en').toLowerCase();
  const lang = SUPPORTED.includes(langParam) ? langParam : 'en';
  const t = TEXTS[lang];

  const [state, setState] = useState('loading'); // loading | success | already | invalid | error

  useEffect(() => {
    document.title = `${t.title} — K.M.F. Trading Journal`;
    document.documentElement.lang = lang;
  }, [lang, t.title]);

  useEffect(() => {
    if (!token || token.length < 32) {
      setState('invalid');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(FUNCTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        if (cancelled) return;

        if (res.status === 404) {
          setState('invalid');
          return;
        }
        if (!res.ok) {
          setState('error');
          return;
        }

        const data = await res.json();
        if (data.success && data.alreadyUnsubscribed) {
          setState('already');
        } else if (data.success) {
          setState('success');
        } else {
          setState(data.error === 'invalid_token' || data.error === 'token_not_found' ? 'invalid' : 'error');
        }
      } catch {
        if (!cancelled) setState('error');
      }
    })();

    return () => { cancelled = true; };
  }, [token]);

  const renderContent = () => {
    if (state === 'loading') {
      return (
        <div style={styles.statusBox}>
          <div style={styles.spinner} />
          <p style={styles.statusText}>{t.loading}</p>
        </div>
      );
    }
    if (state === 'success') {
      return (
        <div style={styles.statusBox}>
          <h2 style={styles.statusTitleGreen}>{t.successTitle}</h2>
          <p style={styles.statusText}>{t.successBody}</p>
        </div>
      );
    }
    if (state === 'already') {
      return (
        <div style={styles.statusBox}>
          <h2 style={styles.statusTitleCyan}>{t.alreadyTitle}</h2>
          <p style={styles.statusText}>{t.alreadyBody}</p>
        </div>
      );
    }
    if (state === 'invalid') {
      return (
        <div style={styles.statusBox}>
          <h2 style={styles.statusTitleAmber}>{t.invalidTitle}</h2>
          <p style={styles.statusText}>{t.invalidBody}</p>
        </div>
      );
    }
    return (
      <div style={styles.statusBox}>
        <h2 style={styles.statusTitleAmber}>{t.errorTitle}</h2>
        <p style={styles.statusText}>{t.errorBody}</p>
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.brand}>K.M.F. Trading Journal</h1>
          <p style={styles.pageTitle}>{t.title}</p>
        </div>

        {renderContent()}

        <div style={styles.footer}>
          <a href="https://kmfjournal.com" style={styles.link}>{t.home}</a>
          <span style={styles.dot}>·</span>
          <span style={styles.muted}>{t.contact}</span>
        </div>
      </div>

      <style>{`
        @keyframes kmf-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0F1115',
    color: '#E0E0E0',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  container: {
    maxWidth: 520,
    width: '100%',
    background: '#1A1D24',
    border: '1px solid #2A2D34',
    borderRadius: 12,
    padding: '40px 32px',
    textAlign: 'center',
  },
  header: {
    marginBottom: 32,
  },
  brand: {
    fontSize: 22,
    fontWeight: 700,
    color: '#4FC3F7',
    margin: 0,
    letterSpacing: 0.5,
  },
  pageTitle: {
    fontSize: 14,
    color: '#888',
    margin: '6px 0 0',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  statusBox: {
    margin: '32px 0',
  },
  statusTitleGreen: {
    fontSize: 20,
    fontWeight: 600,
    color: '#00C853',
    margin: '0 0 12px',
  },
  statusTitleCyan: {
    fontSize: 20,
    fontWeight: 600,
    color: '#4FC3F7',
    margin: '0 0 12px',
  },
  statusTitleAmber: {
    fontSize: 20,
    fontWeight: 600,
    color: '#FFB300',
    margin: '0 0 12px',
  },
  statusText: {
    fontSize: 15,
    color: '#B0BEC5',
    lineHeight: 1.6,
    margin: 0,
  },
  spinner: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '3px solid #2A2D34',
    borderTop: '3px solid #4FC3F7',
    margin: '0 auto 20px',
    animation: 'kmf-spin 0.9s linear infinite',
  },
  footer: {
    marginTop: 32,
    paddingTop: 24,
    borderTop: '1px solid #2A2D34',
    fontSize: 13,
    color: '#78909C',
  },
  link: {
    color: '#4FC3F7',
    textDecoration: 'none',
  },
  dot: {
    margin: '0 8px',
    color: '#444',
  },
  muted: {
    color: '#78909C',
  },
};

export default UnsubscribePage;
