import { Router } from 'express'
import { postTweet, getTimeline, getUserTweets } from './tweets.controller'
import { requireAuth } from '../../middlewares/auth.middleware'

const router = Router()

router.post('/', requireAuth, postTweet)
router.get('/', getTimeline)
router.get('/user/:username', getUserTweets)

export default router

