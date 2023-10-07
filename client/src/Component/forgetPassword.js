import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Forget = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem('userName', userName);
      //sends the username and socket ID to the Node.js server
      // socket.emit('newUser', { userName, socketID: socket.id });
      // navigate('/chat');
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-100vh background_img'>
      <div className='card br-15 bs-10'>
        <form className="login_form card-body" onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center'>
            <h2 className="home__header text-center">Forget Password</h2>
            <div className='chat-logo' >
              <img src='/to-chat.png' className='w-100' />
            </div>
          </div>
          <div className='form-group fv-row mb-3'>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              minLength={6}
              name="username"
              id="username"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className='form-group fv-row mb-2'>
            <label htmlFor="password">Email</label>
            <input
              type="email"
              minLength={6}
              name="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group fv-row mb-2'>
            <label htmlFor="password">Email</label>
            <input
              type="email"
              minLength={6}
              name="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='text-end mb-2'>
            <Link to='/forget_password' className='fs-8' >forget password?</Link>
          </div>
          <div className='w-100 text-center'>
            <button type='submit' className="btn btn_primary">SIGN IN</button>
          </div>  
          <div className='mt-2'>        
            <span className='fs-8'>Don't have an account? </span>
            <Link to='/signUp' className='fs-7' >signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forget;