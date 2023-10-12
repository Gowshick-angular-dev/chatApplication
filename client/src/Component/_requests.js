import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

export const POST_USERS_URL = `${API_URL}/save_user`
export const LOGIN_URL = `${API_URL}/login`
export const SEND_MESSAGE_URL = `${API_URL}/send_message`
export const GET_MESSAGES_URL = `${API_URL}/messages`
export const GET_USERS_URL = `${API_URL}/user`

export function loginUsers(data) {
    return axios.post(LOGIN_URL, data)
    .then((response => response.data))
}

export function saveUsers(data) {
    return axios.post(POST_USERS_URL, data)
    .then((response => response.data))
}

export function sendMessage(data) {
    return axios.post(SEND_MESSAGE_URL, data, {headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      }})
    .then((response => response))
}

export function reciveMessages(to) {
    return axios.get(GET_MESSAGES_URL+'?user_to='+to, {headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      }})
    .then((response => response))
}

export function getChatUsers() {
    return axios.get(GET_USERS_URL, {headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      }})
    .then((response => response))
}