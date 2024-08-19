import express from "express"
import { createServer } from "http"
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


/* ROUTES */
import userRouter from './routes/user.routes'

app.use('/api/v1/users' , userRouter)

const server = createServer(app)

export {
    server
}
