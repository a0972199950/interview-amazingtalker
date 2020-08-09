import { Context } from '@nuxt/types'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekday from 'dayjs/plugin/weekday'

export default (ctx: Context) => {
  const $dayjs = ctx.$dayjs

  $dayjs.extend(localizedFormat)
  $dayjs.extend(utc)
  $dayjs.extend(timezone)
  $dayjs.extend(isoWeek)
  $dayjs.extend(weekOfYear)
  $dayjs.extend(weekday)

  $dayjs.locale(ctx.store.getters['locale'])
}