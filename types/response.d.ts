interface ITimeset {
  start: string
  end: string
}

interface IResSchedule {
  avaliable: ITimeset[]
  booked: ITimeset[]
}