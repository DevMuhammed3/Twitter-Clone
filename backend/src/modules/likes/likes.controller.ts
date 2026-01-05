import { Request, Response } from 'express'
import { likeTweet, unlikeTweet, countLikes } from './likes.service'

export async function like(req: Request, res: Response) {
  const userId = req.user?.id
  const tweetId = Number(req.params.tweetId)

  if (!userId) return res.status(401).json({ message: 'Unauthorized' })
  if (!tweetId) return res.status(400).json({ message: 'Invalid tweet id' })

  try {
    await likeTweet(userId, tweetId)
    return res.status(201).json({ ok: true })
  } catch {
    return res.status(400).json({ message: 'Already liked' })
  }
}

export async function unlike(req: Request, res: Response) {
  const userId = req.user?.id
  const tweetId = Number(req.params.tweetId)

  if (!userId) return res.status(401).json({ message: 'Unauthorized' })
  if (!tweetId) return res.status(400).json({ message: 'Invalid tweet id' })

  await unlikeTweet(userId, tweetId)
  return res.json({ ok: true })
}

export async function getLikesCount(req: Request, res: Response) {
  const tweetId = Number(req.params.tweetId)
  const count = await countLikes(tweetId)
  return res.json({ count })
}

