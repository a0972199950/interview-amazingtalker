import { Plugin } from '@nuxt/types'
import moment from 'moment-timezone'

declare module 'vue/types/vue' {
  interface Vue {
    $moment: any
  }
}

const plugin: Plugin = (ctx, inject) => {
  moment.tz.setDefault(ctx.store.getters['timezone'])
  moment.locale(ctx.store.getters['locale'])

  inject('moment', moment)
}

export default plugin
