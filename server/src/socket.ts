import { Server } from "socket.io"
import { server } from "./app"
import { viewChatHistory , saveMessage} from "./controllers/message.controller"

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})


io.on('connection', (socket) => {

    socket.on('joinGroup', async({ groupId }: { groupId: string }) => {
        socket.join(groupId)
        await viewChatHistory(groupId)
    })

    socket.on('sendMessage' , ({ groupId , msg , from}: { groupId: string  , msg: string , from: string}) => {
        saveMessage(groupId, from , msg)
        io.to(groupId).emit('recieveMessage' , {msg , from})
    })

    socket.on('leaveGroup', ({ groupId}: { groupId: string}) => {
        socket.leave(groupId)
    })

})
