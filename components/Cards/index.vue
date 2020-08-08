<template>
  <div class="card">
    <div class="card__header">
      <h1 class="card__title">{{ title }}</h1>
    </div>

    <div class="card__body">
      <slot />
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CCard extends Vue {
  @Prop({ type: String, default: null }) title?: string
}
</script>
