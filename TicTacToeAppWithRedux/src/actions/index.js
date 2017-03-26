import axios from 'axios';

export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';

const ROOT_URL = 'http://localhost:3050/api';

export function fetchChatMessages() {
  const request = axios.get(`${ROOT_URL}/chatsystem/messages`);
  return {
    type: FETCH_CHAT_MESSAGES,
    payload: request
  };
}
