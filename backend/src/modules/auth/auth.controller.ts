import { Request, Response } from 'express'
import { loginUser, registerUser } from './auth.service'
import { prisma } from '../../lib/prisma'
import axios from 'axios'
import { signToken } from '../../lib/jwt'

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


export async function googleAuth (_: Request, res: Response) {

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: "http://localhost:4000/auth/google/callback",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent"
  })

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
}


export async function googleCallback(req: Request, res: Response) {
  const code = req.query.code as string
  if (!code) return res.status(400).json({ message: 'Missing code' })

  // 1) exchange code → access token
  const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:4000/auth/google/callback',
  })

  const accessToken = tokenRes.data.access_token

  const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const { id: googleId, email, name } = userInfoRes.data

  let user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    const baseUsername = email.split('@')[0]
    user = await prisma.user.create({
      data: {
        email,
        username: baseUsername,
        googleId,
      },
    })
  }

  const token = signToken({ userId: user.id })
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
  })

  res.redirect('http://localhost:3000')
}
