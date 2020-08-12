import { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance
  }
}

declare module 'vuex/types' {
  interface Store <S> {
    $cookies: any
  }
}
