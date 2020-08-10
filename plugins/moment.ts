import { Plugin } from '@nuxt/types'
import moment from 'moment-timezone'

const plugin: Plugin = (ctx, inject) => {
  inject('moment', moment)
}

export default plugin
