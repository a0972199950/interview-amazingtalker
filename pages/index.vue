<template>
  <div class="container">
    <!-- 語言切換 -->
    <select :value="currentLocale.code" @change="changeLocale($event.target.value)">
      <option :value="currentLocale.code">{{ currentLocale.name }}</option>

      <option
        v-for="locale in availableLocales"
        :key="locale.code"
        :value="locale.code"
      >
        {{ locale.name }}
      </option>
    </select>

    <!-- 時區切換 -->
    <select :value="currentTimezone" @change="changeTimezone($event.target.value)">
      <option value="Asia/Taipei">Asia/Taipei</option>
      <option value="America/New_York">America/New_York</option>
      <option value="Asia/Tokyo">Asia/Tokyo</option>
    </select>

    <!-- 主題切換 -->
    <select v-model="theme" @change="switchTheme">
      <option value="default">日間模式</option>
      <option value="dark">黑暗模式</option>
    </select>

    <div>
      <SectionSchedule :teacher-id="teacherId" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Getter } from 'nuxt-property-decorator'
import { NuxtVueI18n } from 'nuxt-i18n'

@Component({
  components: {
    SectionSchedule: () => import('~/components/Sections/Schedule.vue')
  }
})
export default class PIndex extends Vue {
  @Getter('timezone') currentTimezone!: string

  teacherId: string = 'uniqueTeacherId'
  theme: 'default' | 'dark' = 'default'

  get currentLocale () {
    return this.$i18n.locales!.find(i => (i as NuxtVueI18n.Options.LocaleObject).code === this.$i18n.locale)
  }

  get availableLocales () {
    return this.$i18n.locales!.filter(i => (i as NuxtVueI18n.Options.LocaleObject).code !== this.$i18n.locale)
  }

  switchTheme () {
    switch (this.theme) {
      case 'default':
        document.body.removeAttribute('data-theme')
        break

      case 'dark':
        document.body.setAttribute('data-theme', 'dark')
    }
  }

  async changeLocale (locale: string) {
    try {
      await this.$axios.$post('/api/profile/locale', { locale })
      this.$router.go(0)
    } catch (e) {
      console.log('切換語言失敗: ', e)
    }
  }

  async changeTimezone(timezone: string) {
    try {
      await this.$axios.$post('/api/profile/timezone', { timezone })
      this.$router.go(0)
    } catch (e) {
      console.log('切換時區失敗: ', e)
    }
  }
}
</script>
