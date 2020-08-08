<template>
  <div>
    <Card v-if="ready" :title="'授課時間'">
      <WidgetCalendar :schedule-data="scheduleData" />
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import flatMap from 'lodash-es/flatMap'

@Component({
  components: {
    Card: () => import('~/components/Cards/index.vue'),
    WidgetCalendar: () => import('~/components/Widgets/Calendar.vue')
  }
})
export default class CCardsCalendar extends Vue {
  @Prop({ type: String, required: true }) teacherId!: string

  ready: boolean = false
  scheduleData: ISchedule[] = []

  async created () {
    try {
      await this.fetchData()
      this.ready = true
    } catch (e) {
      console.log(e)
    }
  }

  async fetchData () {
    const { data: resSchedule } = await this.$axios.$get('/api/schedule', {
      params: {
        teacherId: this.teacherId,
        startDate: this.$dayjs().startOf('week').format('YYYY-MM-DD'),
        endDate: this.$dayjs().endOf('week').format('YYYY-MM-DD'),
        timezone: this.$dayjs.tz.guess()
      }
    })

    this.scheduleData = this.mapData(resSchedule)
  }

  mapData (resSchedule: IResSchedule) {
    const schedules = flatMap(resSchedule, (value, key) => {
      return value.map(item => ({
        status: key.toUpperCase(),
        ...item
      }))
    }).reduce((sum, schedule) => {
      const date = this.$dayjs(schedule.start).format('YYYY-MM-DD')
      const dateItem = sum.filter(item => item.date === date)[0]

      if (!dateItem) {
        sum.push({
          date,
          schedule: [ schedule ]
        })
      } else {
        dateItem.schedule.push(schedule)
      }

      return sum
    }, [] as ISchedule[])

    return schedules
  }
}
</script>
