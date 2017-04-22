import axios from 'axios';

export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';
export const DELETE_CHAT_MESSAGE = 'DELETE_CHAT_MESSAGE';
export const CREATE_CHAT_MESSAGE = 'CREATE_CHAT_MESSAGE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

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
  return {
    type: DELETE_CHAT_MESSAGE,
    payload: request
  }
}

export function createChatMessage(user, message) {
  const reqBody = { user: user, message: message };
  const config = { headers: { "Content-Type": "application/json" } };
  const request = axios.post(`${ROOT_URL}/chatsystem/messages`, reqBody);
  return {
    type: CREATE_CHAT_MESSAGE,
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

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}
// ----------------------------------

// --------
// handle logging in user
export function loginUser(creds) {
  const reqBody = { username: creds.username, password: creds.password };
  const config = { headers: { "Content-Type": "application/json" } };
  //const request = axios.post(`${ROOT_URL}/login`, reqBody);

  return (dispatch) => {
    dispatch(requestLogin(creds))

    return axios.post(`${ROOT_URL}/authenticate`, reqBody)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
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
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}
