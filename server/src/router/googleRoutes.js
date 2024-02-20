import express from 'express'
import authGoogle from '../controller/authGoogle.js'

const router = express.Router()

router.get('/google', authGoogle.authGoogle)
router.get('/google/callback', authGoogle.callbackGoogle)

export default router;

