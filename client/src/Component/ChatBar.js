import React, { useState, useEffect } from 'react';
import { getChatUsers } from './_requests';

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [socketData, setSocketData] = useState(null);

  console.log("sheigrhebrtlertgeruy", socketData);

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      usersList();
      setSocketData(data);
    });
  }, [socket]);

  const usersList = async () => {
    const response = await getChatUsers();
    if(response.status == 200) {
      setUsers(response.data?.data);
    }
  }

  useEffect(() => {
    usersList();
  }, []);

  return (
    <div className="chat__sidebar">
      <div className='d-flex justify-content-center py-3'>
        <h3><span className='text_primary'>To</span> Chat</h3>
        <div className='chat-logo' >
          <img src='/to-chat.png' className='w-100' />
        </div>
      </div>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user, i) => (
            <p key={i}>{user.user_name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;