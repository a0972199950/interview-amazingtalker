import express from 'express'
import cookieParser from 'cookie-parser'
import router from "./routers/index"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/", router)

export default { path: '/api', handler: app }