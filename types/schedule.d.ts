interface ISchedule {
  date: string
  schedule: {
    status: string,
    start: string
    end: string
  }[]
}