export default {
  mode: 'universal',

  target: 'server',

  serverMiddleware: [
    { path: '/api', handler: '~/server/index.ts' }
  ],

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

  css: [
  ],

  plugins: [
    '~/plugins/dayjs',
    '~/plugins/font-awesome',
    '~/plugins/helpers',
    '~/plugins/moment'
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/moment',
  ],

  moment: {
    localesToKeep: ['zh-tw', 'en', 'ja'],
    defaultLocale: 'zh-tw',
    timezone: {
      matchZones: ['Asia/Taipei', 'America/New_York', 'Asia/Tokyo'],
      startYear: 2000,
      endYear: 2030
    }
  },

  tailwindcss: {
    cssPath: '~/assets/scss/app.scss'
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    'nuxt-i18n',
    'cookie-universal-nuxt'
  ],

  dayjs: {
    locales: ['zh-tw', 'en', 'ja'],
    defaultLocale: 'zh-tw'
  },

  i18n: {
    locales: [
      { code: 'zh-TW', name: '中文', file: 'zh-TW.ts' },
      { code: 'en', name: 'English', file: 'en.ts' },
      { code: 'ja', name: '日本語', file: 'ja.ts' },
    ],

    strategy: 'no_prefix',

    lazy: true,

    langDir: 'locales/',

    defaultLocale: 'zh-TW',

    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: false,
      cookieKey: 'locale'
    }
  },

  axios: {},

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
