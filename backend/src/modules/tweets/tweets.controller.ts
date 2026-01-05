import { Request, Response } from 'express'
import { createTweet, listTweets, listTweetsByUsername } from './tweets.service'

export async function postTweet(req: Request, res: Response) {
  const userId = req.user?.id
  const { content } = req.body

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (!content || content.length > 280) {
    return res.status(400).json({ message: 'Invalid tweet content' })
  }

  const tweet = await createTweet(userId, content)
  return res.status(201).json({ tweet })
}

export async function getTimeline(_: Request, res: Response) {
  const tweets = await listTweets()
  return res.json({ tweets })
}

export async function getUserTweets(req: Request, res: Response) {
  const { username } = req.params

  if (!username) {
    return res.status(400).json({ message: 'Username is required' })
  }

  const tweets = await listTweetsByUsername(username)
  return res.json({ tweets })
}
