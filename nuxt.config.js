
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  serverMiddleware: [
    // Will register file from project api directory to handle /api/* requires
    { path: '/api', handler: '~/server/index.ts' }
  ],

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/dayjs',
    '~/plugins/font-awesome',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '~/assets/scss/app.scss'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    'nuxt-i18n'
  ],

  dayjs: {
    locales: ['en', 'zh-tw', 'ja'],
    defaultLocale: 'zh-tw'
  },

  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'zh-TW',
        iso: 'zh-TW',
        name: '繁體中文',
        iconClass: 'flag-icon flag-icon-tw'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'Engilsh',
        iconClass: 'flag-icon flag-icon-us'
      }
    ],
    defaultLocale: 'zh-TW',
    seo: false,
    loadLanguagesAsync: true,
    langDir: 'locales/',
    detectBrowserLanguage: true,
    useRedirectCookie: true,
    vueI18n: {
      fallbackLocale: 'zh-TW',
      messages: {
        'zh-TW': require('./locales/zh-TW.json'),
        'en': require('./locales/en.json')
      }
    }
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [
      'lodash-es'
    ],

    extend(config, ctx) {
      config.devServer = {
        disableHostCheck: true
      }
    }
  }
}
