import { Request, Response } from 'express'
import { loginUser, registerUser } from './auth.service'
import { prisma } from '../../lib/prisma'

export async function register(req: Request, res: Response) {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const user = await registerUser({ email, username, password })

  return res.status(201).json({ user })
}

export async function login(req: Request, res:Response) {
  const {email, password} = req.body

  if (!password || !email) {
    return res.status(400).json({message: "Missing fields"})
  }

  try {
    const {token, user} = await loginUser(email, password)

    res.cookie("token", token, {
      httpOnly:true,
      sameSite:"lax",
    })

    return res.json({ user })

  } catch (err) {
    return res.status(401).json({message: "Invalid credentials"})
  }
}

export async function me(req: Request, res: Response) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({message: "Unauthorized"})
  }

  const user = await prisma.user.findUnique({
    where : {id : userId},
    select: {
      id: true,
      email: true,
      username:true,
      createdAt: true
    }
  })

  res.json({user})
}

export async function logout(_:Request , res: Response) {
  res.clearCookie("token")
  return res.status(200).json({ok: true})
}
