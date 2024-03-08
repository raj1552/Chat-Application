import express from 'express'
import messageController from '../controller/messageController.js'
import Contact from '../controller/contactController.js';

const router = express.Router()

router.get("/contacts", Contact.Contact)
router.post('/conversation', messageController.createConversation);
router.get('/conversation/:user_id', messageController.getUser);
router.post('/message', messageController.createMessage);
router.get('/message/:conversation_id', messageController.getConversation);

export default router;
