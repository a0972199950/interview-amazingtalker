<template>
  <div class="section-schedule">
    <Card :title="t('title')">
      <!-- 週曆 filter -->
      <div class="section-schedule__filter">

        <div class="section-schedule__week-picker">
          <div class="button-group order-2 md:order-1">
            <button
              class="btn-primary-outline"
              :disabled="displayWeek <= currentWeek"
              @click="prev"
            >
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
    
            <button
              class="btn-primary-outline"
              @click="next"
            >
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
          </div>

          <span class="order-1 md:order-2">
            {{ startDayOfDisplayWeek.format('YYYY-MM-DD') }} - 
            {{ 
              $moment(startDayOfDisplayWeek).isSame(endDayOfDisplayWeek, 'month')
                ? endDayOfDisplayWeek.format('DD')
                : endDayOfDisplayWeek.format('YYYY-MM-DD') 
            }}
          </span>
        </div>

        <span>
          {{ 
            t('note', {
              timezone: `${$moment().format('z')} (${$moment().format('Z')})`
            }) 
          }}
        </span>

      </div>

      <!-- 週曆 -->
      <WidgetWeekCalendar
        v-if="ready"
        :schedule-data="weekScheduleData[displayWeek]"
      />
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Getter } from 'nuxt-property-decorator'

@Component({
  components: {
    Card: () => import('~/components/Sections/index.vue'),
    WidgetWeekCalendar: () => import('~/components/Widgets/WeekCalendar.vue')
  }
})
export default class CSectionsSchedule extends Vue {
  @Prop({ type: String, required: true }) teacherId!: string

  ready: boolean = false
  weekScheduleData: IWeekScheduleData = {}
  preFetchWeeks: number = 1
  displayWeek: number = this.$moment().week()
  currentWeek: number = this.$moment().week()

  get startDayOfDisplayWeek () {
    return this.$moment().week(this.displayWeek).startOf('week')
  }

  get endDayOfDisplayWeek () {
    return this.$moment().week(this.displayWeek).endOf('week')
  }

  async created () {
    this.ready = false

    try {
      await this.fillWeekScheduleData()
      this.ready = true
    } catch (e) {
      console.log(e)
    }
  }

  fillWeekScheduleData () {
    const { displayWeek, preFetchWeeks } = this

    const weekQueue: number[] = []
    for (let week = displayWeek; week <= displayWeek + preFetchWeeks; week++) {
      weekQueue.push(week)
    }
    return Promise.all(weekQueue.map(async (week) => {
      if (this.weekScheduleData[week]) { return }

      const weekData = await this.fetchAndParseWeekData(week)
      this.weekScheduleData = Object.assign({}, this.weekScheduleData, {
        [week]: weekData
      })
    }))
  }

  async fetchAndParseWeekData (week: number): Promise<IScheduleData[]> {
    const { $moment, currentWeek } = this

    const startTimestamp = week > currentWeek
      ? $moment().week(week).startOf('week').valueOf()
      : $moment().valueOf()

    const endTimestamp = $moment().week(week).endOf('week').valueOf()

    const { data: resSchedule } = await this.$axios.$get<{data: IResSchedule}>('/api/schedule', {
      params: {
        startTimestamp, endTimestamp,
        teacherId: this.teacherId
      }
    })

    return this.parseWeekData(resSchedule, week)
  }

  parseWeekData (resSchedule: IResSchedule, week: number) {
    const { $moment } = this

    const blankSchedule: IScheduleData[] = []
    for(let weekday = 0; weekday < 7; weekday++) {
      blankSchedule.push({
        date: $moment().week(week).weekday(weekday).format('YYYY-MM-DD'),
        schedule: []
      })
    }

    const schedules = Object
      .entries(resSchedule)
      .reduce((accumulator, [status, schedules]) => {
        const mappedSchedules = schedules.map((schedule: ITimeset) => ({
          status: status.toUpperCase(),
          ...schedule
        }))

        return accumulator.concat(mappedSchedules)
      }, ([] as IScheduleData['schedule']))
      .sort((a, b) => {
        const startTimestampA = $moment(a.start).valueOf()
        const startTimestampB = $moment(b.start).valueOf()

        if (startTimestampA < startTimestampB) { return -1 }
        if (startTimestampA > startTimestampB) { return 1 }
        return 0
      })
      .reduce((accumulator, schedule) => {
        const date = $moment(schedule.start).format('YYYY-MM-DD')
        const dateItem = accumulator.filter(item => item.date === date)[0]

        if (dateItem) {
          dateItem.schedule.push(schedule)
        }

        return accumulator
      }, blankSchedule)

    return schedules
  }

  prev () {
    this.displayWeek--
    this.fillWeekScheduleData()
  }

  next () {
    this.displayWeek++
    this.fillWeekScheduleData()
  }

  t (node: string, payload?: object) {
    return this.$helpers.parseTranslation('components.Cards.CardSchedule', node, { ...payload })
  }
}
</script>
