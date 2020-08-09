import ScheduleDAO from '../dao/ScheduleDAO'

interface IGetScheduleQuery {
  teacherId: string
  startTimestamp: string
  endTimestamp: string
}

class ScheduleService {
  public static getSchedule (query: IGetScheduleQuery) {
    const data = ScheduleDAO.get(query)

    return data
  }
}

export default ScheduleService
