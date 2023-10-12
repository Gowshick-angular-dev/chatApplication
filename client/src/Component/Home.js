import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {loginUsers} from './_requests';
import { toast } from 'react-toastify';

const Home = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      let body = {
        "email": userName,
        "password": password
      }
      const response = await loginUsers(body)
      console.log("erjwehrwoehruweihrwerh", response);
      if(response.status == 200) {
        
        localStorage.setItem('token', response.data?.token);
        localStorage.setItem('userData', JSON.stringify(response.data));
        // toast.success(response.message, {
        //   position: "bottom-center",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        setTimeout(() => {
          setLoading(false);
          navigate('/chat');
        }, 2000)
      } else {
        setLoading(false);
        toast.warn(response.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      //sends the username and socket ID to the Node.js server
      // socket.emit('newUser', { userName, socketID: socket.id });
      // navigate('/chat');
    }
    
  return (
    <div className='d-flex justify-content-center align-items-center h-100vh background_img'>
      <div className='card br-15 bs-10'>
        <form className="login_form card-body" onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center'>
            <h2 className="home__header text-center">Sign in <span className='text_primary'>To</span> Chat</h2>
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
          <div className='text-end mb-2'>
            <Link to='/forget' className='fs-8' >forget password?</Link>
          </div>
          <div className='w-100 text-center'>
            <button type='submit' className="btn btn_primary">              
              {!loading && <span className='indicator-label'>SIGN IN</span>}
              {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                      Please Wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
              )}
              </button>
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

export default Home;