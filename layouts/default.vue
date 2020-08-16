<template>
  <div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  head () {
    return this.$nuxtI18nSeo()
  }
})
export default class LDefault extends Vue {

}
</script>
