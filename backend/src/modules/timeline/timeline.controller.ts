import { Request, Response } from 'express'
import { getSmartTimeline } from './timeline.service'

export async function timeline(req: Request, res: Response) {
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ message: 'Unauthorized' })

  const tweets = await getSmartTimeline(userId)
  return res.json({ tweets })
}

