import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userRoutes from './src/router/userRoutes.js'
import googleRoutes from './src/router/googleRoutes.js'

const app = express();
const PORT = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Hello Hello");
});

app.use('/user', userRoutes)
app.use('/auth', googleRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
