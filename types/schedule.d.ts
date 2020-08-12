interface IScheduleData {
  date: string
  schedule: {
    status: string,
    start: string
    end: string
  }[]
}

interface IWeeksScheduleData {
  [key: string]: IScheduleData[]
}