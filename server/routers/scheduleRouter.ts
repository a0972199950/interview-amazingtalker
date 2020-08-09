import express from 'express'
import scheduleController from '../controllers/scheduleController'

const router = express.Router()

router.get('/', scheduleController.getSchedule)

export default router
