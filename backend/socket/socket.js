import { Server } from 'socket.io';
import http from 'http';
import express from 'express';


const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
  }
});



let activeUsers = [];

export const getReceiverSocketId = (receiverId) => {

  const receiver = activeUsers.find(item => item.userId === receiverId)
  return receiver ? receiver.socketId : null
}
io.on("connection", (ioSocket) => {
  console.log('user connected', ioSocket.id);

  ioSocket.on("onlineUsers", (userId) => {
    const isUserExist = activeUsers.find(item => item.userId === userId)
    if (!isUserExist) {
      const onlineUser = { userId, socketId: ioSocket.id }
      activeUsers.push(onlineUser)
      io.emit('onlineUsers', activeUsers)
    }
  })


  ioSocket.on('disconnect', () => {
    console.log('user disconnected', ioSocket.id);
    activeUsers = activeUsers.filter(item => item.socketId !== ioSocket.id)
    io.emit('onlineUsers', activeUsers)
  });
});



export { app, io, server };
