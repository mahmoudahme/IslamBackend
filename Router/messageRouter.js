import express from "express" ;
import {replyMessage, sendMessage , getAllmessages , getOnemessages, getOnemessagesFroAdmin} from '../Controller/messageController.js';
import { verifyToken } from '../Utils/verifyToken.js';

const router = express.Router();
router.post('/send', verifyToken, sendMessage)
router.post('/reply/:id', verifyToken, replyMessage)
router.get('/admin', verifyToken, getAllmessages)
router.get('/:id', verifyToken, getOnemessagesFroAdmin)
router.get('/', verifyToken, getOnemessages)

export default router;