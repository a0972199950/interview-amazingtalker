/// <reference types="jest" />

import { shallowMount } from '@vue/test-utils'
import moment from 'moment-timezone'
import { testTime, localeCodes, timezones } from '~/test/utils/variable'

import WeekCalendar from '~/components/Widgets/WeekCalendar.vue'

const testTimeEn = moment(testTime).locale(localeCodes.en).tz(timezones.en).clone()
const testTimeZhTw = moment(testTime).locale(localeCodes.zhTw).tz(timezones.zhTw).clone()

describe('WeekCalendar', () => {
  test('正確渲染台灣時間', () => {
    moment.tz.setDefault(timezones.zhTw).locale(localeCodes.zhTw)

    const wrapper = shallowMount(WeekCalendar, {
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
    expect(wrapper.text()).toContain(testTimeZhTw.format('dd'))
  })

  test('正確渲染美國時間', () => {
    moment.tz.setDefault(timezones.en).locale(localeCodes.en)

    const wrapper = shallowMount(WeekCalendar, {
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
    expect(wrapper.text()).toContain(testTimeEn.format('dd'))
  })

  test('正確渲染 avaliable time 為綠色；booked time 為灰色', () => {
    const avaliableTime = moment(testTime)
    const bookedTime = moment(testTime).add(1, 'hours')

    const wrapper = shallowMount(WeekCalendar, {
      propsData: {
        scheduleData: [
          {
            date: moment(testTime).format('YYYY-MM-DD'),
            schedule: [
              {
                status: 'AVALIABLE',
                start: avaliableTime.format()
              },
              {
                status: 'BOOKED',
                start: bookedTime.format()
              }
            ]
          }
        ]
      },

      mocks: {
        $moment: moment
      }
    })

    expect(wrapper.find('.week-calendar__time--avaliable').text()).toContain(avaliableTime.format('HH:mm'))
    expect(wrapper.find('.week-calendar__time--booked').text()).toContain(bookedTime.format('HH:mm'))
  })

  test('weekData 為空值時顯示 Loading', () => {
    const wrapper = shallowMount(WeekCalendar, {
      stubs: {
        'VLoading': true
      }
    })

    expect(wrapper.html()).toContain('<vloading-stub></vloading-stub>')
  })
})
