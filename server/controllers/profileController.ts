import { Request, Response } from 'express'

class ProfileController {
  public static async setLocale (req: Request, res: Response) {
    const locale = req.body.locale

    if (!locale) {
      res.status(403).json({ message: 'Please provide locale' })
    }
  
    res.cookie('locale', locale, { domain: 'localhost' }).json({ ok: true })
  }

  public static async setTimezone (req: Request, res: Response) {
    const timezone = req.body.timezone

    if (!timezone) {
      res.status(403).json({ message: 'Please provide timezone' })
    }

    res.cookie('timezone', timezone, { domain: 'localhost' }).json({ ok: true })
  }
}

export default ProfileController
