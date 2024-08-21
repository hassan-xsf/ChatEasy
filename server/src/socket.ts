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
        const data = await viewChatHistory(groupId)
        socket.emit('loadChats' , data)

    })

    socket.on('sendMessage' , ({ groupId , msg , from , name}: { groupId: string  , msg: string , from: string , name:string}) => {
        saveMessage(groupId, from , msg)
        io.to(groupId).emit('recieveMessage' , {msg , from})
    })
    socket.on('notifyUser' , ({groupId , from , toName} : {groupId: string , from: string , toName: string}) => {
        io.emit('updateSideChat' , {groupId , from , toName})
    })

    socket.on('leaveGroup', ({ groupId}: { groupId: string}) => {
        socket.leave(groupId)
    })

})
