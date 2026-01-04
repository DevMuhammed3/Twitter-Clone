import { Router } from 'express'
import { postTweet, getTimeline } from './tweets.controller'
import { requireAuth } from '../../middlewares/auth.middleware'

const router = Router()

router.post('/', requireAuth, postTweet)
router.get('/', getTimeline)

export default router

