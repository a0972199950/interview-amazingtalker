import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'
import { Context } from '@nuxt/types'
import moment from 'moment-timezone'

export interface IState {
  locale: string
  timezone: string
}

export const state = (): IState => ({
  locale: 'zh-TW',
  timezone: 'Asia/Taipei'
})

export const getters: GetterTree<IState, IState> = {
  locale: (state: IState) => {
    return state.locale
  },

  timezone: (state: IState) => {
    return state.timezone
  }
}

export const mutations: MutationTree<IState> = {
  SET_LOCALE (state: IState, locale: string) {
    state.locale = locale
  },

  SET_TIMEZONE (state: IState, timezone: string) {
    state.timezone = timezone
  },
}

export const actions: ActionTree<IState, IState> = {
  nuxtServerInit (vuexContext: ActionContext<IState, IState>, ctx: Context) {
    // 假設有支 API 會告知使用者的所有偏好設定，則將其同步至 cookie
    // const { data: user } = await ctx.$axios.$get('/api/user')
    // const {
    //   locale = 'zh-TW',
    //   timezone: 'Asia/Taipei'
    // } = user
    // this.$cookies.set('locale', locale)
    // this.$cookies.set('timezone', timezone)

    const cookieLocale = this.$cookies.get('locale')
    const cookieTimezone = this.$cookies.get('timezone')

    if (cookieLocale) { vuexContext.commit('SET_LOCALE', cookieLocale) }
    if (cookieTimezone) { vuexContext.commit('SET_TIMEZONE', cookieTimezone) }
  }
}
