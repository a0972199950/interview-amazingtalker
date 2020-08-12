/// <reference types="jest" />

import { shallowMount } from '@vue/test-utils'

import VLoading from '~/components/Global/VLoading.vue'

describe('VLoading', () => {
  test('正確渲染 font-awesome-icon', () => {
    const wrapper = shallowMount(VLoading, {
      stubs: {
        'font-awesome-icon': true
      }
    })

    expect(wrapper.html()).toContain('<font-awesome-icon-stub icon="fas,spinner" class="fa-spin"></font-awesome-icon-stub>')
  })
})