import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import authRoutes from './routes/authRoutes'
import songRoutes from './routes/authRoutes'
import roomRoutes from './routes/authRoutes'
const app: Application = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1/rooms', roomRoutes)
app.use('/api/v1/songs', songRoutes)
app.use('/api/v1/auth', authRoutes)
export default app