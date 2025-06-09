import app from '#app.js';
import SocketManager from '#socket.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

SocketManager.init(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
