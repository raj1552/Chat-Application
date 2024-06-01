import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoutes from './src/router/userRoutes.js'
import googleRoutes from './src/router/googleRoutes.js'
import { Server } from 'socket.io'
import http from 'http'
import message from './src/router/message.js'
import messageController from"./src/controller/messageController.js"
import pool from './db/config.js'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors:{
    origin: "http://localhost:3000",
    credentials: true
  }
})

const PORT = 5000
app.use(cors({
  cors:{
    origin: "http://localhost:3000",
    credentials: true
  }
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send("Hello Hello");
});

app.use('/user', userRoutes)
app.use('/auth', googleRoutes)
app.use('/api', message)

let users = []
io.on('connection', (socket) => {
  console.log("User Connected", socket.id)

  socket.on("addUser", (userId) => {
    const userExist = users.find(user => user.userId === userId)
    if(!userExist){
      const user = { userId, socketId: socket.id }
      users.push(user)
      io.emit("getUsers", users)
    }
  })

  socket.on("sendMessage", ({ sender_id, message, conversation_id, receiver_id }) => {
    const receiver = users.find(user => user.userId === receiver_id);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", {
        sender_id,
        message,
        conversation_id,
        receiver_id
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id)
    users = users.filter(user => user.socketId !== socket.id)
    io.emit("getUsers", users)
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
