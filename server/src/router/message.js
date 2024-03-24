import express from 'express'
import messageController from '../controller/messageController.js'
import groupController from '../controller/groupController.js'

const router = express.Router()

router.post('/conversation', messageController.createConversation);
router.get('/conversation/:user_id', messageController.getUser);
router.post('/message', messageController.createMessage);
router.get('/message/:conversationId', messageController.getConversation);
router.get('/user/:user_id', messageController.addUser)
router.post('/creategroup', groupController.createGroup)
router.post('/sendmessage', groupController.sendMessage)

export default router;
