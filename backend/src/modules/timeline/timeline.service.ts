import { prisma } from '../../lib/prisma'

export async function getSmartTimeline(userId: number) {
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  })

  const authorIds = [userId, ...following.map(f => f.followingId)]

  return prisma.tweet.findMany({
    where: {
      authorId: { in: authorIds },
    },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  })
}

