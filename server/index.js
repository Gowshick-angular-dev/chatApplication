const express = require('express');
const router = require('express').Router()
// const http = require('http');
const cors = require('cors')
// const socketIo = require('socket.io');
const app = express();
const http = require('http').Server(app);
// const server = http.createServer(app);
// const io = socketIo(server);
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3001",
      // origin: "http://192.168.1.18:3001"
  }
});
let users = [];

app.use(cors())

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});


router.get('/get',(req,res)=> {
  res.json({messgae:"hello"})
  console.log("shgdsghd")
})

app.use('/', router)

http.listen(4000, () => {
  console.log('Server is running on port 4000');
});
