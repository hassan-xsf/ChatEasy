import { server } from './app'
import { connectDB } from './database/index'
import { Server } from "socket.io";

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 3000, () => {
            console.log("Server is running on port: " + process.env.PORT || 3000)
        })
    })
    .catch((e) => {
        console.log("E:" +e)
    })
