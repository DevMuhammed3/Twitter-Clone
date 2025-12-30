import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

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

app.listen(port, () => {
  console.log('Backend running on port 4000')
})

