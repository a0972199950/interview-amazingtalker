<template>
  <div>
    <button
      v-for="locale in availableLocales"
      :key="locale.code"
      @click="$i18n.setLocale(locale.code)">
      {{ locale.name }}
    </button>

    <h1>{{ $t('title') }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { NuxtVueI18n } from 'nuxt-i18n'

@Component
export default class PTest extends Vue {
  created () {
    // console.log(this.setLocale)
    console.log(this.$i18n.setLocale)
    console.log(this.switchLocalePath)
  }
  get availableLocales () {
    return this.$i18n.locales!.filter(i => (i as NuxtVueI18n.Options.LocaleObject).code !== this.$i18n.locale)
  }
}
</script>