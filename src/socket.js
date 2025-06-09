export default class SocketManager {
  static io = null;

  static init(io) {
    SocketManager.io = io;

    io.on('connection', (socket) => {
      // console.log('Cliente conectado:', socket.id);

      socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
      });
    });
  }

  static emit(event, data) {
    if (SocketManager.io) {
      SocketManager.io.emit(event, data);
    } else {
      console.warn('Socket.IO no inicializado');
    }
  }
}
