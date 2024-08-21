import express from "express"
import { createServer } from "http"
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/pulse' , (req, res) => {
    res.send('Server is working')
})

/* ROUTES */
import userRouter from './routes/user.routes'

app.use('/api/v1/users' , userRouter)


import groupRouter from './routes/group.routes'

app.use('/api/v1/group' , groupRouter)


import messageRouter from './routes/message.routes'

app.use('/api/v1/message' , messageRouter)


const server = createServer(app)

export {
    server
}

import './socket'