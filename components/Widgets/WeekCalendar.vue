<template>
  <div>
    <VLoading v-if="!scheduleData || scheduleData.length <= 0" />

    <div v-if="scheduleData && scheduleData.length > 0" class="week-calendar">
      <div
        v-for="dayData in scheduleData"
        :key="dayData.date"
        class="week-calendar__day"
        :class="{
          'past-day': !dayData.schedule.some(item => item.status === 'AVALIABLE')
        }"
      >
        <div class="week-calendar__day-title">
          <p>{{ $moment(dayData.date).format('dd') }}</p>
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
  @Prop({ type: Array, default: () => [] }) scheduleData!: IScheduleData[]
}
</script>
