import axios from 'axios';

export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';
export const DELETE_CHAT_MESSAGE = 'DELETE_CHAT_MESSAGE';
export const CREATE_CHAT_MESSAGE = 'CREATE_CHAT_MESSAGE';

const ROOT_URL = 'http://localhost:3050/api';

export function fetchChatMessages() {
  const request = axios.get(`${ROOT_URL}/chatsystem/messages`);
  return {
    type: FETCH_CHAT_MESSAGES,
    payload: request
  };
}

export function deleteChatMessage(id) {
  const request = axios.delete(`${ROOT_URL}/chatsystem/messages/${id}`);
  console.log('request', request);
  return {
    type: DELETE_CHAT_MESSAGE,
    payload: request
  }
}

export function createChatMessage(user, message) {
  const reqBody = { user: user, message: message };
  const config = { headers: { "Content-Type": "application/json" } };
  console.log('reqBody', reqBody)
  const request = axios.post(`${ROOT_URL}/chatsystem/messages`, reqBody);
  console.log('create messages request', request);
  return {
    type: CREATE_CHAT_MESSAGE,
    payload: request
  }
}
