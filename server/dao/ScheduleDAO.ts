import moment from 'moment'
import { schedule } from '../util/dummyData'

interface IGetScheduleQuery {
  teacherId: string
  startTimestamp: number
  endTimestamp: number
}

class ScheduleDAO {
  public static get (query: IGetScheduleQuery) {
    const { startTimestamp, endTimestamp } = query

    schedule.avaliable = schedule.avaliable.filter(item => {
      const itemStartTimestamp = moment(item.start).valueOf()
      return itemStartTimestamp >= startTimestamp && itemStartTimestamp <= endTimestamp
    })

    schedule.booked = schedule.booked.filter(item => {
      const itemStartTimestamp = moment(item.start).valueOf()
      return itemStartTimestamp >= startTimestamp && itemStartTimestamp <= endTimestamp
    })

    return schedule
  }
}

export default ScheduleDAO
