<template>
  <div class="calendar">
    <!-- 週曆 filter -->
    <div class="calendar__filter">

      <div class="calendar__week-picker">
        <!-- https://stackoverflow.com/questions/17915865/how-to-make-borders-collapse-on-a-div -->
        <div class="button-group">
          <div class="button-group__row">
            <button class="btn-outline--primary">
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
            <button class="btn-outline--primary">
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
          </div>
        </div>

        <span>{{ startDate }} - {{ endDate }}</span>
      </div>

      <span>* 時間以 台北 (GMT+08:00) 顯示</span>

    </div>

    <!-- 週曆 -->
    <div class="calendar__weeks">
      <div
        v-for="dayData in scheduleData"
        :key="dayData.date"
        class="calendar__week"
      >
        <div class="calendar__week-title">
          <p class="calendar__day">{{ $dayjs(dayData.date).format('dd') }}</p>
          <p class="calendar__date">{{ $dayjs(dayData.date).format('DD') }}</p>
        </div>

        <p
          v-for="schedule in dayData.schedule"
          :key="$dayjs(schedule.start).unix()"
          :class="schedule.status === 'AVALIABLE' ? 'calendar__time--avaliable' : 'calendar__time--booked'"
        >
          {{ $dayjs(schedule.start).format('HH:mm') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CWidgetsCalendar extends Vue {
  @Prop({ type: Array, default: () => [] }) scheduleData!: ISchedule[]

  get startDate () {
    return this.$dayjs(this.scheduleData[0].date).format('YYYY/MM/DD')
  }

  get endDate () {
    const { scheduleData, startDate } = this

    const endDate = this.$dayjs(scheduleData[scheduleData.length - 1].date)

    if (this.$dayjs(startDate).isSame(endDate, 'month')) {
      return endDate.format('DD')
    } else {
      return endDate.format('YYYY-MM-DD')
    }
  }
}
</script>
