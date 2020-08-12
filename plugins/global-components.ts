import Vue from 'vue'

const globalComponents = {
  VLoading: () => import('~/components/Global/VLoading.vue')
}

Object
  .entries(globalComponents)
  .forEach(([ key, component ]) => Vue.component(key, component))
