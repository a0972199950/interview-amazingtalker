/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        neutral: {
          lighter: 'var(--color-neutral-lighter)',
          lightest: 'var(--color-neutral-lightest)',
          darkest: 'var(--color-neutral-darkest)'
        }
      }
    }
  },

  variants: {},

  plugins: [
    require('tailwind-bootstrap-grid')()
  ],

  corePlugins: {
    container: false,
  },

  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.ts',
      'nuxt.config.js'
    ]
  }
}
