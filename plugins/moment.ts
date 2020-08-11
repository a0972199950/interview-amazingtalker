import { Plugin } from '@nuxt/types'
import moment from 'moment-timezone'

declare module 'vue/types/vue' {
  interface Vue {
    $moment: any
  }
}

const plugin: Plugin = (ctx, inject) => {
  const storeTimezone = ctx.store.getters['timezone']
  const storeLocale = ctx.store.getters['locale']

  if (storeTimezone) { moment.tz.setDefault(storeTimezone) }
  if (storeLocale) { moment.locale(storeLocale) }

  inject('moment', moment)
}

export default plugin
