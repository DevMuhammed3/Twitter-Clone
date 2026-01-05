import { Router } from 'express'
import { like, unlike, getLikesCount } from './likes.controller'
import { requireAuth } from '../../middlewares/auth.middleware'

const router = Router()

router.post('/:tweetId', requireAuth, like)
router.delete('/:tweetId', requireAuth, unlike)
router.get('/:tweetId/count', getLikesCount)

export default router

