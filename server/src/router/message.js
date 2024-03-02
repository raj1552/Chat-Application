import express from 'express'
import messageController from '../controller/messageController.js'

const router = express.Router()

router.post("/addmessage", messageController.addMessages);
router.post("/getmessage", messageController.getMessages);

export default router