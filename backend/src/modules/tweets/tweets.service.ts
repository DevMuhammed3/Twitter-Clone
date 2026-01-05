import { prisma } from '../../lib/prisma'

export async function createTweet(userId: number, content: string) {
  return prisma.tweet.create({
    data: {
      content,
      authorId: userId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })
}

export async function listTweets() {
  return prisma.tweet.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
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

export async function listTweetsByUsername(username: string) {
  return prisma.tweet.findMany({
    where:{
      author:{
        username,
      },
    },
    orderBy: {createdAt: 'desc'}
  })
}
