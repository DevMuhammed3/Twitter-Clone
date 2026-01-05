import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/auth.routes'
import tweetsRoutes from './modules/tweets/tweets.routes'
import likesRoutes from './modules/likes/likes.routes'



const app = express()
const port = 4000

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.get('/health', (_, res) => {
  res.json({ ok: true })
})

app.use('/auth', authRoutes)

app.use('/tweets', tweetsRoutes)
app.use('/likes', likesRoutes)

app.listen(port, () => {
  console.log('Backend running on port 4000')
})

