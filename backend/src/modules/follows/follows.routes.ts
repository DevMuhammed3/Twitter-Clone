import { Router } from 'express'
import { follow, unfollow, counts } from './follows.controller'
import { requireAuth } from '../../middlewares/auth.middleware'

const router = Router()

router.post('/:userId', requireAuth, follow)
router.delete('/:userId', requireAuth, unfollow)
router.get('/:userId/counts', counts)

export default router

