/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        bauhaus: {
          bg: '#F0EFE1',
          red: '#D63426',
          blue: '#2D68A8',
          yellow: '#EBB424',
          black: '#1A1A1A',
          white: '#FFFFFF',
        },
        hero: {
          sky: '#95c6d6',
          green: '#6c9a61',
          red: '#c07b67',
          wood: '#a2896b',
          dark: '#2d2427',
          sand: '#e6dcc8',
          surface: '#f3eee6',
        }
      },
      boxShadow: {
        'clay': '6px 6px 0 0 var(--clay-sh, #9c8cc0), inset 0 1px 0 0 rgba(255,255,255,0.55), inset 1px 0 0 0 rgba(255,255,255,0.35)',
        'clay-hover': '10px 10px 0 0 var(--clay-sh, #9c8cc0), inset 0 1px 0 0 rgba(255,255,255,0.55), inset 1px 0 0 0 rgba(255,255,255,0.35)',
        'clay-sm': '3px 3px 0 0 var(--clay-sh, #c8c0b8), inset 0 1px 0 rgba(255,255,255,0.6)',
        'clay-sm-hover': '5px 5px 0 0 var(--clay-sh, #c8c0b8), inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
