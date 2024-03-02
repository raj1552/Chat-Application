import express from 'express'
import authGoogle from '../controller/authGoogle.js'
import cors from 'cors';

const router = express.Router()
router.use(cors()); 

router.get('/google', authGoogle.authGoogle)
router.get('/google/callback', authGoogle.callbackGoogle)

export default router;

