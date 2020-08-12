interface IScheduleData {
  date: string
  schedule: {
    status: string,
    start: string
    end: string
  }[]
}

interface IWeekScheduleData {
  [key: string]: IScheduleData[]
}