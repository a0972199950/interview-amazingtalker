<template>
  <div>
    <p>current time: {{ $moment().format('YYYY-MM-DD HH:mm:ss') }}</p>
    <p>current week: {{ $moment().week() }}</p>
    <p>first day of the 3rd week in this year: {{ $moment().week(3).startOf('week').format('YYYY-MM-DD HH:mm:ss') }}</p>
    <p>this Friday: {{ $moment().weekday(5) }}</p>
    <p>Friday in the 3rd week in this year: {{ $moment().week(3).weekday(5) }}</p>
    <p>weekday in local lang: {{ $moment().format('ddd') }}</p>
    <p>unix: {{ $moment().unix() }}</p>
    <p>locale format: {{ $moment().format('ll') }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CTestMomentJa extends Vue {
  created () {
    this.$moment.tz.setDefault('Asia/Tokyo')
    this.$moment.locale('ja')
    console.log('ja 的 locale: ', this.$moment.locale(), this.$moment().format('ll'))
  }
}
</script>
