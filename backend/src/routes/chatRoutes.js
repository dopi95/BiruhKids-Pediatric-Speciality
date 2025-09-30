import express from 'express';
import { chatWithAI } from '../controllers/chatController.js';

const router = express.Router();

router.post('/chat', chatWithAI);
router.get('/chat/test', (req, res) => {
  res.json({ message: 'Chat route is working!' });
});

export default router;