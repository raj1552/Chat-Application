import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoutes from './src/router/userRoutes.js'
import googleRoutes from './src/router/googleRoutes.js'
import { Server } from 'socket.io'
import http from 'http'
import message from './src/router/message.js'
import messageController from './src/controller/messageController.js'

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
app.use('/message', message)

io.on('connect', socket =>{
  console.log("A user Connected",socket.id)

  socket.on('send-message', async data =>{
    try{
      const { from, to, message } = data;

      await messageController.addMessages({ body:{from, to, message}}, { json: () => {} })

      socket.to(to).emit('receiver-message', {senderId : from, message})
    }
    catch(error){
      console.error(error)
    }
  })

  socket.on('disconnect', () =>{
    console.log('user disconnected:', socket.id);
  })
})


server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
