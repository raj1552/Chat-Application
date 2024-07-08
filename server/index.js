import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoutes from './src/router/userRoutes.js'
import googleRoutes from './src/router/googleRoutes.js'
import { Server } from 'socket.io'
import http from 'http'
import message from './src/router/message.js'
const PORT = 5000

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors:{
    origin: "http://localhost:3000",
    credentials: true
  }
})

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

  socket.on('message', (data) => {
    console.log("Received message:", data);
    io.emit('messageResponse', {
      message: data.message,
      name: data.name,
      sender_id: data.sender_id,
      receiver_id: data.receiver_id
    })
  })

  socket.on('newUser', (data) => {
    users.push(data)
    io.emit('newUserResponse', users)
  })
  socket.on('disconnect', () => {
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit('newUserResponse', users);
    socket.disconnect();
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
