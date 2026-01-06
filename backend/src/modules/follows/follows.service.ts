import { prisma } from '../../lib/prisma'

export async function followUser(followerId: number, followingId: number) {
  if (followerId === followingId) {
    throw new Error('Cannot follow yourself')
  }

  const userExists = await prisma.user.findUnique({
    where: { id: followingId },
    select: { id: true },
  })

  if (!userExists) {
    throw new Error('User not found')
  }

  return prisma.follow.create({
    data: { followerId, followingId },
  })
}


export async function unfollowUser(followerId: number, followingId: number) {
  return prisma.follow.deleteMany({
    where: { followerId, followingId },
  })
}

export async function getFollowCounts(userId: number) {
  const [followers, following] = await Promise.all([
    prisma.follow.count({ where: { followingId: userId } }),
    prisma.follow.count({ where: { followerId: userId } }),
  ])
  return { followers, following }
}

