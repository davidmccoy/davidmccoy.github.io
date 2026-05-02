/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              fontSize: 'inherit',
              backgroundColor: 'rgb(243 244 246)', // gray-100
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
              fontWeight: 'inherit',
            },
            'h1 code, h2 code, h3 code, h4 code': {
              fontSize: 'inherit',
            },
            'ol, ul': {
              paddingInlineStart: '2em',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
