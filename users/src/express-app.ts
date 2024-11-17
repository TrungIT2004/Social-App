import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit';


const app = express()

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 1 minutes',
});

// Middlewares
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}))

app.use(helmet())

app.use(cookieParser())

app.use(limiter)

export default app

