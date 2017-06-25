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
export const CREATED_PLAYER_ERROR = 'CREATED_PLAYER_ERROR';
export const CREATED_PLAYER_SUCCESS = 'CREATED_PLAYER_SUCCESS';
export const CREATED_PLAYER_CHANGE = 'CREATED_PLAYER_CHANGE';


export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const UPDATING_PLAYER = 'UPDATING_PLAYER';
export const UPDATE_PLAYER_ERROR = 'UPDATE_PLAYER_ERROR';
export const UPDATE_PLAYER_SUCCESS = 'UPDATE_PLAYER_SUCCESS';
export const SET_PLAYER_INFO = 'SET_PLAYER_INFO';

const ROOT_URL = 'http://localhost:3050/api';

export function fetchChatMessages(username) {``
  const token = localStorage.getItem('token');
  const request = axios.get(`${ROOT_URL}/chatsystem/messages/${username}?token=${token}`);
  return {
    type: FETCH_CHAT_MESSAGES,
    payload: request
  };
}

export function deleteChatMessage(username, id) {
  const token = localStorage.getItem('token');
  const request = axios.delete(`${ROOT_URL}/chatsystem/messages/${username}/${id}?token=${token}`);
  return {
    type: DELETE_CHAT_MESSAGE,
    payload: request
  }
}

export function createChatMessage(username, message) {
  const token = localStorage.getItem('token');
  const reqBody = { user: username, message: message, token: token };
  const request = axios.post(`${ROOT_URL}/chatsystem/messages/${username}`, reqBody);
  return {
    type: CREATE_CHAT_MESSAGE,
    payload: request
  }
}


// handle account creation
// ----
function creatingPlayer() {
  return {
    type: CREATING_PLAYER,
    payload: { isCreating: true, created: false, player: {}, errorMessage: '' }
  }
}

function createdPlayerSuccess(player) {
  return {
    type: CREATED_PLAYER_CHANGE,
    payload: { isCreating: false, created: true, player: player, errorMessage: '' }
  }
}

function createdPlayerError(errorMessage) {
  return {
    type: CREATED_PLAYER_ERROR,
    payload: { isCreating: false, created: false, player: {}, errorMessage: errorMessage }
  }
}

export function createPlayer(player) {
  const { firstname, lastname, password, username, email } = player;
  const reqBody = { firstname, lastname, password, username, email}
  return (dispatch) => {
    dispatch(creatingPlayer());
    return axios.post(`${ROOT_URL}/account/create`, reqBody)
      .then((request) => {
        const { data } = request
        if(data.success) {
          dispatch(createdPlayerSuccess(data.player));
          dispatch(loginPlayer({username: username, password: password}))
        } else if(!data.success) {
          dispatch(createdPlayerError(data.message));
        }
      })
      .catch((err) => { dispatch(createdPlayerError(err)) })
  }

  return {
    type: CREATING_PLAYER,
    payload: request
  }
}

// ****************************************************************************
// Update Player Info functions
// to handle data and state
// ****************************************************************************
/**
 * [updatingPlayer - simple action creator to initiate loading]
 * @return {[action]} [description]
 */
function updatingPlayer() {
  return {
    type: UPDATING_PLAYER,
    payload: { isCreating: true, created: false, player: {}, errorMessage: '' }
  }
}

/**
 * [updatePlayerError - update state for reducer_account
 * when updating a player fails]
 * @param  {[errorMessage]}  [error message from api]
 * @return {[action]}        [redux action]
 */
function updatePlayerError(errorMessage) {
  return {
    type: UPDATE_PLAYER_ERROR,
    payload: { isCreating: false, created: false, errorMessage: errorMessage }
  }
}

/**
 * [updatePlayerSuccess - ]
 * @param  {[player]}  [player info of person playing the game]
 * @return {[action]}  [redux action]
 */
function updatePlayerSuccess(player) {
  return {
    type: UPDATE_PLAYER_SUCCESS,
    payload: { isCreating: false, created: false, player: player, errorMessage: '' }
  }
}

/**
 * [updatePlayer updates a player's account information]
 * @param  {[player]}  [player that is playing the game]
 * @return {[action]}  [redux action]
 */
export function updatePlayer(player) {
  const token = localStorage.getItem('token');
  const { username, email, oldPassword, newPassword } = player;
  let reqBody;
  if(oldPassword !== null && oldPassword !== undefined && newPassword !== null && newPassword !== undefined) {
    reqBody = { email, oldPassword, newPassword }
  } else {
    reqBody = { email }
  }
  return (dispatch) => {
    dispatch(updatingPlayer());
    return axios.put(`${ROOT_URL}/account/update/${player.username}?token=${token}`, reqBody)
      .then((request) => {
        const { data } = request;
        if(data.success) {
          dispatch(updatePlayerSuccess(data.player));
        } else {
          dispatch(updatePlayerError(data.message))
        }
      })
      .catch((err) => dispatch(createdPlayerError(err)))
  }

  return {
    type: UPDATE_PLAYER,
    payload: { isCreating: true }
  }
}

function setPlayerInfo(player) {
  return {
    type: SET_PLAYER_INFO,
    payload: { isCreating: false, created: false, player: player, errorMessage: '' }
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
    token: player.token,
    player: {}
  }
}

function loginError(message) {
  const payload = { isFetching: false, isAuthenticated: false, errorMessage: message };
  return {
    type: LOGIN_FAILURE,
    payload: payload,
    player: {}
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
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', res.data.token);
          // Dispatch the success action
          dispatch(receiveLogin(res.data.player))
          dispatch(setPlayerInfo(res.data.player))
        }
      })
      .catch((err) => dispatch(loginError(err)))
    }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    player: {}
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    player: {}
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
