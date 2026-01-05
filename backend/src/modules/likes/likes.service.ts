import { prisma } from '../../lib/prisma'

export async function likeTweet(userId: number, tweetId: number) {
  return prisma.like.create({
    data: { userId, tweetId },
  })
}

export async function unlikeTweet(userId: number, tweetId: number) {
  return prisma.like.delete({
    where: {
      userId_tweetId: {
        userId,
        tweetId,
      },
    },
  })
}

export async function countLikes(tweetId: number) {
  return prisma.like.count({
    where: { tweetId },
  })
}

