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

        <span>{{ t('note', { timezone: '台北 (+08:00)' }) }}</span>

      </div>

      <WidgetWeekCalendar
        v-if="ready"
        :schedule-data="scheduleData"
      />
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Getter } from 'nuxt-property-decorator'
import flatMap from 'lodash-es/flatMap'

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
  currentWeek: number = this.$dayjs().week()
  week: number = this.$dayjs().week()
  scheduleData: ISchedule[] = []

  get startOfWeek () {
    const { currentTimezone, week, $dayjs } = this

    return $dayjs().week(week).startOf('week').format('YYYY-MM-DD')
  }

  get endOfWeek () {
    const { currentTimezone, startOfWeek, week, $dayjs } = this
    const endOfWeek = $dayjs().week(week).endOf('week')

    if ($dayjs(startOfWeek).isSame(endOfWeek, 'month')) {
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

  mounted () {
    Object.assign(window, { dayjs: this.$dayjs })
  }

  async fetchData () {
    const { $dayjs, week, currentWeek, currentTimezone } = this

    // 若檢視時間為當周，預計 API 不會 response 早於當下時間的資料
    const startTimestamp = week > currentWeek
      ? $dayjs().week(week).startOf('week').valueOf()
      : $dayjs().valueOf()

    const endTimestamp = $dayjs().week(week).endOf('week').valueOf()

    const { data: resSchedule } = await this.$axios.$get('/api/schedule', {
      params: {
        startTimestamp, endTimestamp,
        teacherId: this.teacherId
      }
    })

    this.scheduleData = this.mapData(resSchedule)
  }

  mapData (resSchedule: IResSchedule) {
    const { $dayjs, week, currentTimezone } = this

    const blankSchedule: ISchedule[] = []
    for(let weekday = 0; weekday < 7; weekday++) {
      blankSchedule.push({
        date: $dayjs().week(week).weekday(weekday).format('YYYY-MM-DD'),
        schedule: []
      })
    }

    const schedules = 
      flatMap(resSchedule, (value, key) => {
        return value
          // 只留未來的資料。因應 API 無腦吐假資料，不會做 query，這裡由前端做 filter
          .filter(item => $dayjs().isBefore(item.start, 'minute'))
          .map(item => ({
            status: key.toUpperCase(),
            ...item
          }))
      })
      .reduce((sum, schedule) => {
        const date = $dayjs(schedule.start).format('YYYY-MM-DD')
        const dateItem = sum.filter(item => item.date === date)[0]

        if (dateItem) {
          dateItem.schedule.push(schedule)
        }

        return sum
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
    return this.$helpers.mapI18nText('components.Cards.CardSchedule', node, { ...payload })
  }
}
</script>
