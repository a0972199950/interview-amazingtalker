import ScheduleDAO from '../dao/ScheduleDAO'

interface IGetScheduleQuery {
  teacherId: string
  startTimestamp: number
  endTimestamp: number
}

class ScheduleService {
  public static async getSchedule (query: IGetScheduleQuery) {
    const data = ScheduleDAO.get(query)

    return data
  }
}

export default ScheduleService
