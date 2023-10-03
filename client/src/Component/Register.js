import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Register = ({socket}) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        "name": null,
        "password": null,
        "confirmPassword": null,
        "email": null,
        "profile": null
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
    //   localStorage.setItem('userName', userName);
      //sends the username and socket ID to the Node.js server
    //   socket.emit('newUser', { userName, socketID: socket.id });
    //   navigate('/chat');
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-100vh'>
      <div className='card br-15 bs-10'>
        <form className="login_form card-body" onSubmit={handleSubmit}>
          <h2 className="home__header text-center">Sign up to Open Chat</h2>
          <div className='form-group fv-row mb-3'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={userData.name}
              onChange={(e) => setUserData({...userData, "name": e.target.value})}
            />
          </div>
          <div className='form-group fv-row mb-3'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={userData.email}
              onChange={(e) => setUserData({...userData, "email": e.target.value})}
            />
          </div>
          <div className='form-group fv-row mb-3'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={userData.password}
              onChange={(e) => setUserData({...userData, "password": e.target.value})}
            />
          </div>
          <div className='w-100 text-center'>
            <button type='submit' className="btn btn-primary">SIGN UP</button>
          </div>
          {/* <Link to='' className='' >signup</Link> */}
        </form>
      </div>
    </div>
  );
};

export default Register;