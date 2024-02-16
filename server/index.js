import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userRoutes from './src/router/userRoutes.js'


const app = express();
const PORT = 3000
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000"
  }
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser());

io.on('connection', (socket) =>{
  console.log("A user is connected")
  socket.on('disconnect', () =>{
    console.log("User is disconnected")
  })
})

app.get('/', (req, res) => {
    res.send("Hello Hello");
});

app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
