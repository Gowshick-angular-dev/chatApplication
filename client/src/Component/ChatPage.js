import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import socketIO from 'socket.io-client';
import { reciveMessages } from './_requests';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const socket = socketIO.connect(process.env.REACT_APP_API_URL);
  // const socket = socketIO.connect('http://localhost:4000');

  const messageSend = async (data) => {
    // console.log("ejheugreurgeurg", data);
    let user = JSON.parse(localStorage.getItem("userData"));
    // console.log("ejhihwerrhudfbjsdf", user);
    // let body = {
    //   "messages": data.text,
    //   "created_by": user.user_id,
    //   "user_to": 0
    // }
    const response = await reciveMessages()
    console.log("werhweirguwerguywer", response);
    if(response.status == 200) {
      setMessages(response.data?.data)
      document.getElementById('kfjerjthkejrtkejrt')
    } else if(response.status == 403) {
      localStorage.removeItem('userData');
    }
  }

  useEffect(() => {
    messageSend();
  }, []);

  useEffect(() => {
    socket.on('messageResponse', (data) => messageSend(data));
    // socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket]);

  return (
    <div className="chat d-flex">
      <div className="col-md-4 col-xl-3 col-xxl-2 p-0">
        <ChatBar socket={socket} />
      </div>
      <div className="chat__main col-md-8 col-xl-9 col-xxl-10 p-0">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;