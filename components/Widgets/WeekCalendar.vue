<template>
  <div class="week-calendar">
    <!-- 週曆 -->
    <div class="week-calendar__week">
      <div
        v-for="dayData in scheduleData"
        :key="dayData.date"
        class="week-calendar__day"
        :class="{ 'past-day': $moment(dayData.date).isBefore($moment(), 'day') || dayData.schedule.length <= 0 }"
      >
        <div class="week-calendar__day-title">
          <p>{{ $moment(dayData.date).format('ddd') }}</p>
          <p>{{ $moment(dayData.date).format('DD') }}</p>
        </div>

        <p
          v-for="schedule in dayData.schedule"
          :key="$moment(schedule.start).unix()"
          :class="schedule.status === 'AVALIABLE' ? 'week-calendar__time--avaliable' : 'week-calendar__time--booked'"
        >
          {{ $moment(schedule.start).format('HH:mm') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Getter } from 'nuxt-property-decorator'

@Component
export default class CWidgetsWeekCalendar extends Vue {
  @Getter('timezone') currentTimezone!: string

  @Prop({ type: Array, default: () => [] }) scheduleData!: ISchedule[]
}
</script>
