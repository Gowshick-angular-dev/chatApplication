import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ChatBody = ({ messages }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));
  console.log("wtlheijhrwijreijherkjwhe", user);
  const handleLeaveChat = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    if(localStorage.getItem('userData')) {
      let fgejfn = JSON.parse(localStorage.getItem('userData'));
      setUser(fgejfn.user_id);
    }
  },[localStorage.getItem('userData')]);

  useEffect(() => {
    const scrollableDiv = document.getElementById('efkwgeruwegribkjebr473684368y');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  }, [messages]);

  return (
    <>
      <header className="chat__mainHeader" id='kfjerjthkejrtkejrt'>
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container" id='efkwgeruwegribkjebr473684368y'>
        {messages.map((message) => 
          parseInt(message.created_by) === parseInt(user) ? (
            <div className="message__chats" key={message.id}>
              {/* <p className="sender__name">You</p> */}
              <div className="message__sender">
                <p className='mb-1'>{message.messages}</p>
                <small className='chat_time'>{moment(message.created_at).format('hh:mm a')}</small>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              {/* <p>{message.user_name}</p> */}
              <div className="message__recipient">
                <p className='mb-1'>{message.messages}</p>
                <small className='chat_time'>{moment(message.created_at).format('hh:mm a')}</small>
              </div>
            </div>
          )
        )}

        {/* <div className="message__status">
          <p>Someone is typing...</p>
        </div> */}
      </div>
    </>
  );
};

export default ChatBody;