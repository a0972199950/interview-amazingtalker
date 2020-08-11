<template>
  <div class="section-schedule">
    <Card :title="t('title')">
      <!-- 週曆 filter -->
      <div class="section-schedule__filter">

        <div class="section-schedule__week-picker">
          <div class="button-group">
            <button
              class="btn-primary-outline"
              :disabled="week <= currentWeek"
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

          <span>{{ startOfWeek }} - {{ endOfWeek }}</span>
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
        :schedule-data="scheduleData"
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
  @Getter('timezone') currentTimezone!: string

  @Prop({ type: String, required: true }) teacherId!: string

  ready: boolean = false
  currentWeek: number = this.$moment().week()
  week: number = this.$moment().week()
  scheduleData: ISchedule[] = []

  get startOfWeek () {
    const { currentTimezone, week, $moment } = this

    return $moment().week(week).startOf('week').format('YYYY-MM-DD')
  }

  get endOfWeek () {
    const { currentTimezone, startOfWeek, week, $moment } = this
    const endOfWeek = $moment().week(week).endOf('week')

    if ($moment(startOfWeek).isSame(endOfWeek, 'month')) {
      return endOfWeek.format('DD')
    } else {
      return endOfWeek.format('YYYY-MM-DD')
    }
  }

  async created () {
    this.ready = false

    try {
      await this.fetchData()
      this.ready = true
    } catch (e) {
      console.log(e)
    }
  }

  async fetchData () {
    const { $moment, week, currentWeek, currentTimezone } = this

    const startTimestamp = week > currentWeek
      ? $moment().week(week).startOf('week').valueOf()
      : $moment().valueOf()

    const endTimestamp = $moment().week(week).endOf('week').valueOf()

    const { data: resSchedule } = await this.$axios.$get('/api/schedule', {
      params: {
        startTimestamp, endTimestamp,
        teacherId: this.teacherId
      }
    })

    this.scheduleData = this.mapData(resSchedule)
  }

  mapData (resSchedule: IResSchedule) {
    const { $moment, week, currentTimezone } = this

    const blankSchedule: ISchedule[] = []
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
      }, ([] as ISchedule['schedule']))
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

  async prev () {
    this.week--
    this.ready = false

    try {
      await this.fetchData()
      this.ready = true
    } catch (e) {
      console.log(e)
    }
  }

  async next () {
    this.week++
    this.ready = false

    try {
      await this.fetchData()
      this.ready = true
    } catch (e) {
      console.log(e)
    }
  }

  t (node: string, payload?: object) {
    return this.$helpers.parseTranslation('components.Cards.CardSchedule', node, { ...payload })
  }
}
</script>
