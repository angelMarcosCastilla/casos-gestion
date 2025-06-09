import express from 'express';
import SocketManager from '#socket.js';
const router = express.Router();

router.post('/notify', (req, res) => {
  const data = req.body;
  SocketManager.emit('server:update-cases', data);
  res.json({ message: 'Hello World!', data });
});

export default router;
