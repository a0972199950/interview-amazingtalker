/// <reference types="jest" />

import { shallowMount, Wrapper } from '@vue/test-utils'
import moment from 'moment-timezone'
import flushPromises from 'flush-promises'
import { schedule } from '~/server/util/dummyData'

import SectionSchedule from '~/components/Sections/Schedule.vue'

describe('SectionSchedule', () => {
  let wrapper: Wrapper<any> | null = null

  beforeEach(() => {
    wrapper  = shallowMount(SectionSchedule, {
      stubs: {
        'Card': true,
        'WidgetWeekCalendar': true,
        'font-awesome-icon': true
      },

      propsData: {
        teacherId: 'uniqueTeacherId'
      },

      data () {
        return {
          displayWeek: 33,
          currentWeek: 33,
          preFetchWeeks: 1
        }
      },

      mocks: {
        $axios: {
          $get: () => Promise.resolve({ data: schedule })
        },

        $moment: moment,

        $helpers: {
          parseTranslation: () => true
        }
      }
    })
  })

  test('初始化時正確填充 weeksScheduleData', async () => {
    expect((wrapper!.vm as any).weeksScheduleData['32']).toBeFalsy()
    expect((wrapper!.vm as any).weeksScheduleData['33']).toBeTruthy()
    expect((wrapper!.vm as any).weeksScheduleData['34']).toBeTruthy()
    expect((wrapper!.vm as any).weeksScheduleData['35']).toBeFalsy()
  })

  test('點擊「下一週」按鈕後正確填充 weeksScheduleData', async () => {
    wrapper!.find('[data-jest="next"]').trigger('click')

    await flushPromises()

    expect((wrapper!.vm as any).weeksScheduleData['32']).toBeFalsy()
    expect((wrapper!.vm as any).weeksScheduleData['33']).toBeTruthy()
    expect((wrapper!.vm as any).weeksScheduleData['34']).toBeTruthy()
    expect((wrapper!.vm as any).weeksScheduleData['35']).toBeTruthy()
    expect((wrapper!.vm as any).weeksScheduleData['36']).toBeFalsy()
  })
})