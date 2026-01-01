import { prisma } from '../../lib/prisma'
import { comparePassword, hashPassword } from '../../lib/hash'
import { signToken } from '../../lib/jwt'

type SignupInput = {
  email: string
  username: string
  password: string
}

export async function registerUser(data: SignupInput) {
  const hashed = await hashPassword(data.password)

  const user = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: hashed,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
    },
  })

  return user
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid credentials')

  const ok = await comparePassword(password, user.password)
  if (!ok) throw new Error('Invalid credentials')

  const token = signToken({ userId: user.id })

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
  }
}

