interface IResSchedule {
  avaliable: {
    start: string
    end: string
  }[]

  booked: {
    start: string
    end: string
  }[]
}