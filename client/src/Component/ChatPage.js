import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import socketIO from 'socket.io-client';
import { reciveMessages } from './_requests';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');

  const socket = socketIO.connect(process.env.REACT_APP_API_URL);
  // const socket = socketIO.connect('http://localhost:4000');

  const messageSend = async (data) => {
    setUserId(data);
    let user = JSON.parse(localStorage.getItem("userData"));
    const response = await reciveMessages(data)
    if(response.data?.status == 200) {
      setMessages(response.data?.data)
    } else {
      localStorage.removeItem('userData');
    }
  }

  useEffect(() => {
    // messageSend();
  }, []);

  useEffect(() => {
    socket.on('messageResponse', (data) => messageSend());
  }, [socket]);

  return (
    <div className="chat d-flex">
      <div className="col-md-4 col-xl-3 col-xxl-2 p-0">
        <ChatBar socket={socket} getUserMsg={messageSend} />
      </div>
      <div className="chat__main col-md-8 col-xl-9 col-xxl-10 p-0">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} userId={userId} />
      </div>
    </div>
  );
};

export default ChatPage;