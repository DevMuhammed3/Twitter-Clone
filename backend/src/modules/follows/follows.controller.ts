import { Request, Response } from 'express'
import { followUser, unfollowUser, getFollowCounts } from './follows.service'

export async function follow(req: Request, res: Response) {
  const followerId = req.user?.id
  const followingId = Number(req.params.userId)

  if (!followerId) return res.status(401).json({ message: 'Unauthorized' })
  if (!followingId) return res.status(400).json({ message: 'Invalid user id' })

  try {
    await followUser(followerId, followingId)
    return res.status(201).json({ ok: true })
  } catch (e: any) {
    return res.status(400).json({ message: e.message })
  }
}

export async function unfollow(req: Request, res: Response) {
  const followerId = req.user?.id
  const followingId = Number(req.params.userId)

  if (!followerId) return res.status(401).json({ message: 'Unauthorized' })
  if (!followingId) return res.status(400).json({ message: 'Invalid user id' })

  await unfollowUser(followerId, followingId)
  return res.json({ ok: true })
}

export async function counts(req: Request, res: Response) {
  const userId = Number(req.params.userId)
  const data = await getFollowCounts(userId)
  return res.json(data)
}

