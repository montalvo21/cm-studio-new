import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0F19',
          secondary: '#111827',
          card: 'rgba(255,255,255,0.04)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
        },
        accent: {
          green: '#00E5A8',
          blue: '#3B82F6',
          amber: '#F59E0B',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.10)',
          subtle: 'rgba(255,255,255,0.06)',
          strong: 'rgba(255,255,255,0.18)',
        },
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'Space Grotesk', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,229,168,0.08) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
        'accent-gradient': 'linear-gradient(135deg, #00E5A8 0%, #3B82F6 100%)',
        'border-gradient': 'linear-gradient(135deg, rgba(0,229,168,0.3), rgba(59,130,246,0.3))',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'badge-pulse': 'badgePulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        badgePulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,229,168,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(0,229,168,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,229,168,0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(0,229,168,0.4)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,229,168,0.15)',
        'glow-green': '0 0 30px rgba(0,229,168,0.25)',
        'glow-blue': '0 0 30px rgba(59,130,246,0.25)',
        'btn-primary': '0 0 20px rgba(0,229,168,0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
