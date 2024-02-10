import express from 'express'
import login from '../controller/loginUser.js'
import register from '../controller/registerUser.js'

const router = express.Router()

router.post('/login', login.loginUser)
router.post('/register', register.registerUser)

export default router;
