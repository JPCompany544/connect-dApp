/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clean Fintech Color System
        background: '#F9FAFB',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
          light: '#3B82F6',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
        },
        border: '#E5E7EB',
        success: '#10B981',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'page-title': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'section-title': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '6px',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'hover': '0 6px 16px rgba(0, 0, 0, 0.08)',
      },
      transitionDuration: {
        'fast': '200ms',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(90deg, #2563EB, #1E40AF)',
      },
    },
  },
  plugins: [],
}
