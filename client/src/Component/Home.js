import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Home = ({socket}) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem('userName', userName);
      //sends the username and socket ID to the Node.js server
      socket.emit('newUser', { userName, socketID: socket.id });
      navigate('/chat');
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-100vh'>
      <div className='card br-15 bs-10'>
        <form className="login_form card-body" onSubmit={handleSubmit}>
          <h2 className="home__header text-center">Sign in to Open Chat</h2>
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
          <div className='form-group fv-row mb-3'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              minLength={6}
              name="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='w-100 text-center'>
            <button type='submit' className="btn btn-primary">SIGN IN</button>
          </div>
          <Link to='/signUp' className='' >signup</Link>
        </form>
      </div>
    </div>
  );
};

export default Home;