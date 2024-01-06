
import react, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import ChatPage from './Component/ChatPage';
import Register from './Component/Register';
import Forget from './Component/forgetPassword';
import 'react-toastify/dist/ReactToastify.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage, onBackgroundMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA90T8oDNvJAJSUvFjvpWGB-wMchhq1mJ0",
  authDomain: "chat-007-650b5.firebaseapp.com",
  projectId: "chat-007-650b5",
  storageBucket: "chat-007-650b5.appspot.com",
  messagingSenderId: "442594491458",
  appId: "1:442594491458:web:74b4aeb793e361f8fa01db",
  measurementId: "G-2ZMMH7WNHX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  

const authentication = getAuth();
const messaging = getMessaging(app);
let FCM = '';

const isSupported = () => 
'Notification' in window &&
'serviceWorker' in navigator &&
'PushManager' in window

if(isSupported()) {
Notification
.requestPermission()
.then((permission) => {
if (permission === "granted") {
  console.log('Notification permission granted.');
  return getToken(messaging, { vapidKey: 'BMa0gpeuELvCuCeLR7smXU5EiChPHBuuepE80bP9YaEAelP8atHrUx0fNqX6ATUB-20AzcZhiXer0647Ub3gHzU' });
} else {
  throw new Error('Notification permission denied.');
}
})
.then((token) => {
console.log('FCM Token:', token);
FCM = token;
if(localStorage.getItem("currentUserData")) {
let userItem = JSON.parse(localStorage.getItem("currentUserData"));
let body = {
  "fcmToken": token,
  "user_id": userItem.id,
}
}
})
.catch((error) => {
console.error('Permission error:', error);
});
}

onMessage(messaging, (payload) => {
console.log('Message received. ', payload);
if (Notification.permission === 'granted') {
  const notification = new Notification('Reflectnews Tamil', {
    body: payload.data?.message,
  });

  // Add an event listener to handle user interaction with the notification
  notification.addEventListener('click', () => {
    window.open(payload.fcmOptions?.link);
    // Handle the click event, e.g., navigate to a specific page
  });
}
});

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

export {App, authentication, messaging, FCM};