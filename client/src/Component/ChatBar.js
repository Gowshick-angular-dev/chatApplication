import React, { useState, useEffect } from 'react';
import { getChatUsers } from './_requests';

const ChatBar = ({ socket, getUserMsg }) => {
  const [users, setUsers] = useState([]);
  const [socketData, setSocketData] = useState(null);
  const currentUserData = JSON.parse(localStorage.getItem('userData'));

  console.log("sheigrhebrtlertgeruy", socketData);

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      usersList();
      setSocketData(data);
    });
  }, [socket]);

  const usersList = async () => {
    const response = await getChatUsers();
    if(response.data?.status == 200) {
      setUsers(response.data?.data);
    } else {
      localStorage.removeItem('userData');
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
        {/* <h4 className="chat__header">ACTIVE USERS</h4> */}
        <div className="chat__users px-2">
          {users.map((user, i) => {
            if(currentUserData?.user_id != user.id) {
            return(
            <div className='card br_5 bs_10 border-0 p-2 d-flex flex-row' onClick={() => getUserMsg(user.id)} key={i}>
              <div className='prof_img_pre_chat border'>
                <img src={`${process.env.REACT_APP_API_URL}/uploads/users/profile_image/${user.id}/${user.image}`} className='profile_image w-100'/>
              </div>
              <div>
                <span className='mb-0 ps-2'>{user.user_name}</span>
              </div>
            </div>)}
          })}
        </div>
      </div>
    </div>
  );  
};

export default ChatBar;