import { prisma } from '../../lib/prisma'
import { hashPassword } from '../../lib/hash'

type RegisterInput = {
  email: string
  username: string
  password: string
}

export async function registerUser(data: RegisterInput) {
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

