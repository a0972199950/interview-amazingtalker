<template>
  <div>
    <div class="row">
      <div class="col-4">
        美國
        <MomentEn />
      </div>

      <div class="col-4">
        台灣
        <MomentZhTw />
      </div>

      <div class="col-4">
        日本
        <MomentJa />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { NuxtVueI18n } from 'nuxt-i18n'

@Component({
  components: {
    MomentEn: () => import('~/components/Test/MomentEn.vue'),
    MomentZhTw: () => import('~/components/Test/MomentZhTw.vue'),
    MomentJa: () => import('~/components/Test/MomentJa.vue')
  }
})
export default class PTest extends Vue {
  mounted () {
    Object.assign(window, { moment: this.$moment })
  }
}
</script>

