import { mount } from '@vue/test-utils'
import moment from 'moment-timezone'

import WeekCalendar from '@/components/Widgets/WeekCalendar.vue'

const testTime = '2020-08-15T00:00:00Z'

const enTimezone = 'America/New_York'
const zhtwTimezone = 'Asia/Taipei'

const enLocale = 'en'
const zhtwLocale = 'zh-tw'

const testTimeInEN = moment(testTime).locale(enLocale).tz(enTimezone).clone()
const testTimeInZhtw = moment(testTime).locale(zhtwLocale).tz(zhtwTimezone).clone()


describe('WeekCalendar', () => {
  test('正確渲染台灣時間', () => {
    moment.tz.setDefault(zhtwTimezone)
    moment.locale(zhtwLocale)

    const wrapper = mount(WeekCalendar, {
      propsData: {
        scheduleData: [
          {
            date: testTimeInZhtw.format('YYYY-MM-DD'),
            schedule: [
              {
                status: 'AVALIABLE',
                start: testTime,
                end: moment(testTime).add(30, 'minutes')
              }
            ]
          }
        ]
      },

      mocks: {
        $moment: moment
      }
    })

    expect(wrapper.text()).toContain(testTimeInZhtw.format('HH:mm'))
    expect(wrapper.text()).toContain(testTimeInZhtw.format('ddd'))
  })

  test('正確渲染美國時間', () => {
    moment.tz.setDefault(enTimezone)
    moment.locale(enLocale)

    const wrapper = mount(WeekCalendar, {
      propsData: {
        scheduleData: [
          {
            date: testTimeInEN.format('YYYY-MM-DD'),
            schedule: [
              {
                status: 'AVALIABLE',
                start: testTime,
                end: moment(testTime).add(30, 'minutes')
              }
            ]
          }
        ]
      },

      mocks: {
        $moment: moment
      }
    })

    expect(wrapper.text()).toContain(testTimeInEN.format('HH:mm'))
    expect(wrapper.text()).toContain(testTimeInEN.format('ddd'))
  })

  test('avaliable 時段為綠色', () => {
    const wrapper = mount(WeekCalendar, {
      propsData: {
        scheduleData: [
          {
            date: testTimeInZhtw.format('YYYY-MM-DD'),
            schedule: [
              {
                status: 'AVALIABLE',
                start: testTime,
                end: moment(testTime).add(30, 'minutes')
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
            date: testTimeInZhtw.format('YYYY-MM-DD'),
            schedule: [
              {
                status: 'BOOKED',
                start: testTime,
                end: moment(testTime).add(30, 'minutes')
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
