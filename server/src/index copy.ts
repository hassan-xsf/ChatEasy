import express from "express"
import { createServer } from "http"
import {Server} from "socket.io"


const app = express()

const server = createServer(app)
const io = new Server(server , {
    cors: {
        origin: "*"
    }
})
io.on('connection' , (socket) => {
    console.log(socket.id)
    socket.on('joinRoom' , (room) => {
        socket.join(room)
        io.to(room).emit('msgRoom' , `UserID: ${socket.id} has joined the room`)
    }) 
    socket.on('disconnect' , () => {
        socket.rooms.forEach((room) => {
            if(room !== socket.id)  // The client itself, In socket basiccally whenever a client joins it sets it's room equal to it's ID.
                io.to(room).emit('msgRoom' , `UserID: ${socket.id} has left the room`)
        })
    })
    socket.on('msgRoom' , ({room , msg}) => {
        io.to(room).emit('msgRoom' , msg)
    })
})


server.listen(3000 , () => {
    console.log("Server is running on port: " +3000)
})