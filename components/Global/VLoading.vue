<template>
  <div class="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CGlobalLoading extends Vue {

}
</script>
