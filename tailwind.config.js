export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kmf: {
          bg: '#0F1115',
          panel: '#1A1D24',
          surface: '#252931',
          divider: '#263238',
          accent: '#4FC3F7',
          'accent-light': '#81D4FA',
          'accent-bright': '#03A9F4',
          secondary: '#26C6DA',
          text: {
            primary: '#FFFFFF',
            secondary: '#B0BEC5',
            tertiary: '#B8CAD4',
          },
          profit: '#00E676',
          loss: '#FF5252',
          pending: '#FFB74D',
          breakeven: '#78909C',
          star: '#FFD740',
          logo: '#D4C9B0',
          'logo-light': '#E8E0D0',
        }
      },
      boxShadow: {
        'glow': '0 0 10px rgba(79,195,247,0.3), 0 0 20px rgba(79,195,247,0.2)',
        'glow-hover': '0 0 20px rgba(79,195,247,0.6), 0 0 40px rgba(79,195,247,0.4)',
        'glow-strong': '0 0 15px rgba(79,195,247,0.5), 0 0 30px rgba(79,195,247,0.3)',
        'glow-profit': '0 0 10px rgba(0,230,118,0.3), 0 0 20px rgba(0,230,118,0.15)',
        'glow-loss': '0 0 10px rgba(255,82,82,0.3), 0 0 20px rgba(255,82,82,0.15)',
        'glow-gold': '0 0 10px rgba(255,179,0,0.3), 0 0 20px rgba(255,179,0,0.15)',
        'card': '0 4px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(79,195,247,0.05)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.3), 0 0 20px rgba(79,195,247,0.08)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.4s ease-out',
        'fadeInSlow': 'fadeIn 0.7s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'slideIn': 'slideIn 0.3s ease-out',
        'slideDown': 'slideDown 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'gradient-x': 'gradientX 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(79,195,247,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(79,195,247,0.6), 0 0 40px rgba(79,195,247,0.2)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '60%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
