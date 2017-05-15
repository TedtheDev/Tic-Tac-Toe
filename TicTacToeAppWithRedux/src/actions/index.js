import axios from 'axios';

export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';
export const DELETE_CHAT_MESSAGE = 'DELETE_CHAT_MESSAGE';
export const CREATE_CHAT_MESSAGE = 'CREATE_CHAT_MESSAGE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const CREATING_PLAYER = 'CREATING_PLAYER';

const ROOT_URL = 'http://localhost:3050/api';

export function fetchChatMessages() {
  const token = localStorage.getItem('token');
  const request = axios.get(`${ROOT_URL}/chatsystem/messages?token=${token}`);
  return {
    type: FETCH_CHAT_MESSAGES,
    payload: request
  };
}

export function deleteChatMessage(id) {
  const token = localStorage.getItem('token');
  const request = axios.delete(`${ROOT_URL}/chatsystem/messages/${id}?token=${token}`);
  return {
    type: DELETE_CHAT_MESSAGE,
    payload: request
  }
}

export function createChatMessage(user, message) {
  const token = localStorage.getItem('token');
  const reqBody = { user: user, message: message, token: token };
  const request = axios.post(`${ROOT_URL}/chatsystem/messages`, reqBody);
  return {
    type: CREATE_CHAT_MESSAGE,
    payload: request
  }
}


// handle account creation
// ----
export function createPlayer(player) {
  console.log(player);
  const { firstname, lastname, password, username, email } = player;
  const reqBody = { firstname, lastname, password, username, email}
  const request = axios.post(`${ROOT_URL}/account/create`, reqBody);
  return {
    type: CREATING_PLAYER,
    payload: request
  }
}



// ------------------------------
// to handle user authentication
// used in loginUser action creator below
function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(player) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: player.token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errorMessage: message
  }
}
// ----------------------------------

// --------
// handle logging in user
export function loginPlayer(creds) {
  const reqBody = { username: creds.username, password: creds.password };
  const config = { headers: { "Content-Type": "application/json" } };
  return (dispatch) => {
    dispatch(requestLogin(creds))

    return axios.post(`${ROOT_URL}/authenticate`, reqBody)
      .then((res) => {
        if (!res.status || res.status !== 200 || res.data.success === false) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(res.data.message))
          return Promise.reject(res.data.message);
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', res.data.token);
          // Dispatch the success action
          dispatch(receiveLogin(res.data.player))
          return Promise.resolve();
        }
      })
      .catch((err) => Promise.reject(err))
    }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token')
    dispatch(receiveLogout())
  }
}
