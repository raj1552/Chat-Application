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
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`) 

  socket.on('private message', (anotherUserId, msg) => {
    messageController.createMessage(socket.id, anotherUserId, msg)
      .then(message => {
        socket.to(anotherUserId).emit('private message', message);
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  socket.on('message', (message) => { 
    console.log(message)
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    console.log(`${socket.id}`)
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
