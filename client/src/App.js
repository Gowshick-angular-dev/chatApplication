// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000/');

// function App() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });
//   }, []);

//   const sendMessage = () => {
//     socket.emit('message', message);
//     setMessage('');
//   };

//   return (
//     <div>
//       <h1> Chat App</h1>
//       <div>
//         <div>
//           {messages.map((msg, index) => (
//             <div key={index}>{msg}</div>
//           ))}
//         </div>
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import ChatPage from './Component/ChatPage';
import Register from './Component/Register';
import socketIO from 'socket.io-client';

// const socket = socketIO.connect('http://localhost:4000');
const socket = socketIO.connect('http://localhost:4000');
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          <Route path="/signUp" element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;