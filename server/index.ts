import express from 'express'
import { schedule } from './util/dummyData'

const app = express()

app.get('/schedule', (req, res) => {
  const data = schedule

  res.json({ data })
})

export default { path: '/api', handler: app }