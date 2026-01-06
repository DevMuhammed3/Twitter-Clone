import { Router } from 'express'
import { timeline } from './timeline.controller'
import { requireAuth } from '../../middlewares/auth.middleware'

const router = Router()
router.get('/', requireAuth, timeline)
export default router

