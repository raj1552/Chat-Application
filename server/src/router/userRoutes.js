import express from 'express'
import login from '../controller/loginUser.js'

const router = express.Router()

router.post('/login', login.loginUser)

export default router;
