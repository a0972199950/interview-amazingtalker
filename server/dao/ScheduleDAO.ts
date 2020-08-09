import moment from 'moment'
import { schedule } from '../util/dummyData'

interface IGetScheduleQuery {
  teacherId: string
  startTimestamp: string
  endTimestamp: string
}

class ScheduleDAO {
  public static get (query: IGetScheduleQuery) {
    const { startTimestamp, endTimestamp } = query

    const result = {
      avaliable: schedule.avaliable.filter(item => {
        const itemStartTimestamp = moment(item.start).valueOf()
        return itemStartTimestamp >= +startTimestamp && itemStartTimestamp <= +endTimestamp
      }),

      booked: schedule.booked.filter(item => {
        const itemStartTimestamp = moment(item.start).valueOf()
        return itemStartTimestamp >= +startTimestamp && itemStartTimestamp <= +endTimestamp
      })
    }

    return result
  }
}

export default ScheduleDAO
