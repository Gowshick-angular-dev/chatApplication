
import react, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import ChatPage from './Component/ChatPage';
import Register from './Component/Register';
import Forget from './Component/forgetPassword';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = localStorage.getItem('userData');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <ChatPage /> : <Home />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
        <Route path="/signUp" element={<Register />}></Route>
        <Route path="/forget" element={<Forget />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;