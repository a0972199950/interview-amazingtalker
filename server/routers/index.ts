import express from 'express'
import profileRouter from './profileRouter'
import scheduleRouter from './scheduleRouter'

const router = express.Router()

router.use('/profile', profileRouter)

router.use('/schedule', scheduleRouter)


export default router;