<template>
  <div class="section-schedule">
    <Section :title="$t('components.Sections.SectionSchedule.title')">
      <!-- 週曆 filter -->
      <div class="section-schedule__filter">

        <div class="section-schedule__week-picker">
          <div class="button-group order-2 sm:order-1">
            <button
              data-jest="prev"
              class="btn-primary-outline"
              :disabled="displayWeek <= currentWeek"
              @click="prev"
            >
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
    
            <button
              data-jest="next"
              class="btn-primary-outline"
              @click="next"
            >
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
          </div>

          <span class="order-1 sm:order-2">
            {{ startDayOfDisplayWeek }} - {{ endDayOfDisplayWeek }}
          </span>
        </div>

        <span class="section-schedule__notes">
          {{ 
            $t('components.Sections.SectionSchedule.note', {
              timezone: `${$moment().format('z')} (${$moment().format('Z')})`
            }) 
          }}
        </span>

      </div>

      <!-- 週曆 -->
      <WidgetWeekCalendar
        v-if="ready"
        :schedule-data="weeksScheduleData[displayWeek]"
      />
    </Section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Getter } from 'nuxt-property-decorator'

@Component({
  components: {
    Section: () => import('~/components/Sections/index.vue'),
    WidgetWeekCalendar: () => import('~/components/Widgets/WeekCalendar.vue')
  }
})
export default class CSectionsSchedule extends Vue {
  @Prop({ type: String, required: true }) teacherId!: string

  ready: boolean = false
  weeksScheduleData: IWeeksScheduleData = {}
  preFetchWeeks: number = 1
  displayWeek: number = 0
  currentWeek: number = 0

  get startDayOfDisplayWeek () {
    return this.$moment().week(this.displayWeek).startOf('week').format('YYYY-MM-DD')
  }

  get endDayOfDisplayWeek () {
    const { startDayOfDisplayWeek, $moment } = this
    const endDayOfDisplayWeek = this.$moment().week(this.displayWeek).endOf('week')

    return $moment(startDayOfDisplayWeek).isSame(endDayOfDisplayWeek, 'month')
      ? endDayOfDisplayWeek.format('DD')
      : endDayOfDisplayWeek.format('MM-DD')
  }

  async created () {
    this.displayWeek = this.$moment().week()
    this.currentWeek = this.$moment().week()
    this.ready = false

    try {
      await this.fillWeeksScheduleData()
      this.ready = true
    } catch (e) {
      console.log(e)
    }
  }

  fillWeeksScheduleData () {
    const { displayWeek, preFetchWeeks } = this

    const weekQueue: number[] = []
    for (let week = displayWeek; week <= displayWeek + preFetchWeeks; week++) {
      weekQueue.push(week)
    }

    return Promise.all(weekQueue.map(async (week) => {
      if (this.weeksScheduleData[week]) { return }

      const weekData = await this.fetchAndParseWeekData(week)
      this.weeksScheduleData = Object.assign({}, this.weeksScheduleData, {
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
    this.fillWeeksScheduleData()
  }

  next () {
    this.displayWeek++
    this.fillWeeksScheduleData()
  }
}
</script>
