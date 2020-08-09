import express from 'express'
import profileController from '../controllers/profileController'

const router = express.Router()

router.post('locale', profileController.setLocale)

router.post('timezone', profileController.setTimezone)

export default router