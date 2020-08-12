/// <reference types="jest" />

import { shallowMount } from '@vue/test-utils'

import Section from '~/components/Sections/index.vue'

describe('Section', () => {
  test('正確渲染 prop 及 slot', () => {
    const wrapper = shallowMount(Section, {
      propsData: {
        title: 'Hello World'
      },

      slots: {
        default: '<div id="slot-stub" />'
      }
    })

    expect(wrapper.html()).toContain('Hello World')
    expect(wrapper.find('#slot-stub')).toBeTruthy()
  })
})