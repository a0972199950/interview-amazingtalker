import { Request, Response } from 'express'
import ScheduleService from '../services/ScheduleService'

class ScheduleController {
  public static async getSchedule (req: Request, res: Response) {
    const { teacherId, startTimestamp, endTimestamp } = req.query

    if (!teacherId || typeof teacherId !== 'string') {
      res.status(403).json({ message: `Wrong teacherId: ${teacherId}` })
      return
    }

    if (!startTimestamp || typeof startTimestamp !== 'number') {
      res.status(403).json({ message: `Wrong startTimestamp: ${startTimestamp}` })
      return
    }

    if (!endTimestamp || typeof endTimestamp !== 'number') {
      res.status(403).json({ message: `Wrong endTimestamp: ${endTimestamp}` })
      return
    }

    const data = ScheduleService.getSchedule({ teacherId, startTimestamp, endTimestamp })

    res.json({ data })
  }
}

export default ScheduleController
