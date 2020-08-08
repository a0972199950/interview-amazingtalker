<template>
  <div class="container border border-neutral-darkest border-solid">
    <CardCalendar :teacher-id="teacherId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    CardCalendar: () => import('~/components/Cards/Calendar.vue')
  }
})
export default class PIndex extends Vue {
  teacherId: string = 'uniqueTeacherId'

  // async created () {
  //   const data = await this.$axios.$get('/api/schedule')

  //   this.data = data

  //   this.$dayjs.locale('ja')

    

  //   console.log(this.$dayjs.locale())

  //   console.log(this.$dayjs.tz.guess())

  //   console.log(this.$dayjs('2018-05-05').format('LLLL'))
  // }
}
</script>
