import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../lib/jwt'

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  try {
    const payload = verifyToken(token)
    req.user = { id: payload.userId }
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

