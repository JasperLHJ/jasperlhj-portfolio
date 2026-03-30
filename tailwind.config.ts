import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/**/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: 'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        'ink-faint': 'var(--color-ink-faint)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        'tag-bg': 'var(--color-tag-bg)',
        cream: 'var(--color-bg)',
        'cream-alt': 'var(--color-bg-alt)',
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        hero: 'var(--text-hero)',
      },
      maxWidth: {
        contact: '680px',
      },
    },
  },
  plugins: [],
} satisfies Config
