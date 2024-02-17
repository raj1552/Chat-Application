import express from 'express'
import login from '../controller/loginUser.js'
import register from '../controller/registerUser.js'
import authenticateToken from '../middleware/authUser.js'
import authPassword from '../controller/authPassword.js'

const router = express.Router()

router.post('/login', authenticateToken,login.loginUser)
router.post('/register',authenticateToken, register.registerUser)
router.post('/forgetpassword', authPassword.forgetPassword)
router.post('/resetpassword', authPassword.resetPassword)

export default router;
