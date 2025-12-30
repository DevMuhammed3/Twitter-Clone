import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!


export const signToken = (payload : {userId : number}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn : "7d"})
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: number }
}
