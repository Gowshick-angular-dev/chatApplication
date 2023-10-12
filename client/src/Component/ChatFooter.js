import React, { useState } from 'react';
import checkPageStatus from './function';
import {sendMessage} from './_requests';

const ChatFooter = ({ socket, userId }) => {
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem("userData"))
  // const handleTyping = () => socket.emit("typing",`${user.user_name} is typing`)

  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   if (message.trim() && localStorage.getItem('userName')) {
  //     socket.emit('message', {
  //       text: message,
  //       name: localStorage.getItem('userName'),
  //       id: `${socket.id}${Math.random()}`,
  //       socketID: socket.id,
  //     });

  //   }
  //   setMessage('');

  // };

  const messageSend = async (data) => {
    console.log("ejheugreurgeurg", data);
    let user = JSON.parse(localStorage.getItem("userData"));
    console.log("ejhihwerrhudfbjsdf", user);
    let body = {
      "messages": data,
      "user_to": userId
    }
    const response = await sendMessage(body)
    console.log("werhweirguwerguywer1", response);
  }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if(message.trim() && localStorage.getItem("userData")) {
        socket.emit("message",
            {
            text: message, 
            name: user.user_name, 
            id: user.user_id
            }) 
        messageSend(message);
        checkPageStatus(message, localStorage.getItem("userName")) 
        }
        setMessage("")
     }


  return     <div className="chat__footer">
  <form className="form" onSubmit={handleSendMessage}>
    {/* <input
      type="text"
      placeholder="Write message"
      className="form-control"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleTyping}
    /> */}
    <textarea className='form-control message_area' placeholder="Write message..." value={message} onChange={(e) => setMessage(e.target.value)} style={{'resize': 'none'}} />
    <button className="btn btn-icon">
      <div className='send_btn' >
        <img src='/to-chat.png' className='w-100' />
      </div>
    </button>
  </form>
</div>;
};

export default ChatFooter;