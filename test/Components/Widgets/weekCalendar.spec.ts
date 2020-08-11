/// <reference types="jest" />

import { mount } from '@vue/test-utils'
import moment from 'moment-timezone'
import WeekCalendar from '@/components/Widgets/WeekCalendar.vue'
import { testTime, localeCodes, timezones } from '~/test/utils/variable'

const testTimeEn = moment(testTime).locale(localeCodes.en).tz(timezones.en).clone()
const testTimeZhTw = moment(testTime).locale(localeCodes.zhTw).tz(timezones.zhTw).clone()

describe('WeekCalendar', () => {
  test('正確渲染台灣時間', () => {
    moment.tz.setDefault(timezones.zhTw).locale(localeCodes.zhTw)

    const wrapper = mount(WeekCalendar, {
      propsData: {
        scheduleData: [
          {
            date: testTimeZhTw.format('YYYY-MM-DD'),
            schedule: [
              {
                status: 'AVALIABLE',
                start: testTime
              }
            ]
          }
        ]
      },

      mocks: {
        $moment: moment
      }
    })

    expect(wrapper.text()).toContain(testTimeZhTw.format('HH:mm'))
    expect(wrapper.text()).toContain(testTimeZhTw.format('ddd'))
  })

  test('正確渲染美國時間', () => {
    moment.tz.setDefault(timezones.en).locale(localeCodes.en)

    const wrapper = mount(WeekCalendar, {
      propsData: {
        scheduleData: [
          {
            date: testTimeEn.format('YYYY-MM-DD'),
            schedule: [
              {
                status: 'AVALIABLE',
                start: testTime
              }
            ]
          }
        ]
      },

      mocks: {
        $moment: moment
      }
    })

    expect(wrapper.text()).toContain(testTimeEn.format('HH:mm'))
    expect(wrapper.text()).toContain(testTimeEn.format('ddd'))
  })

  test('avaliable 時段為綠色', () => {
    const wrapper = mount(WeekCalendar, {
      propsData: {
        scheduleData: [
          {
            date: moment().format('YYYY-MM-DD'),
            schedule: [
              {
                status: 'AVALIABLE',
                start: testTime
              }
            ]
          }
        ]
      },

      mocks: {
        $moment: moment
      }
    })

    expect(wrapper.html()).toContain('week-calendar__time--avaliable')
  })

  test('booked 時段為灰色', () => {
    const wrapper = mount(WeekCalendar, {
      propsData: {
        scheduleData: [
          {
            date: moment().format('YYYY-MM-DD'),
            schedule: [
              {
                status: 'BOOKED',
                start: testTime
              }
            ]
          }
        ]
      },

      mocks: {
        $moment: moment
      }
    })

    expect(wrapper.html()).toContain('week-calendar__time--booked')
  })
})
