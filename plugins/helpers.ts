import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $helpers: {
      parseTranslation: (path: string, node: string, payload?: object) => string
    }
  }
}

const plugin: Plugin = (ctx, inject) => {
  const helpers = {
    parseTranslation (path: string, node: string, payload?: any) {
      const text = String(ctx.app.i18n.t(`${path}.${node}`))

      if (!payload) {
        return text
      }

      return text.replace(/\${([^{}]*)}/g, (a, b) => {
        const r = payload[b]
        return r ? r : a
      })
    }
  }

  inject('helpers', helpers)
}

export default plugin
