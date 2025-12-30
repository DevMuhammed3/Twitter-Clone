import bcrypt from "bcrypt"



const SALT_ROUNDS = 10

export const hashPassword = (pass : string) => {
  return bcrypt.hash(pass, SALT_ROUNDS)
}

export const comparePassword = (pass : string, hash: string) => {
  return bcrypt.compare(pass, hash)
}
