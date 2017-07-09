import axios from 'axios';

// Chat Message Types
export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';
export const DELETE_CHAT_MESSAGE = 'DELETE_CHAT_MESSAGE';
export const CREATE_CHAT_MESSAGE = 'CREATE_CHAT_MESSAGE';

// Login/logout Types
// login types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// logout types
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// Create Account/Player Types
export const CREATING_PLAYER = 'CREATING_PLAYER';
export const CREATED_PLAYER_ERROR = 'CREATED_PLAYER_ERROR';
export const CREATED_PLAYER_SUCCESS = 'CREATED_PLAYER_SUCCESS';
export const CREATED_PLAYER_CHANGE = 'CREATED_PLAYER_CHANGE';

// Update Player/Account Types
// update player/account info
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const UPDATING_PLAYER = 'UPDATING_PLAYER';
export const UPDATE_PLAYER_ERROR = 'UPDATE_PLAYER_ERROR';
export const UPDATE_PLAYER_SUCCESS = 'UPDATE_PLAYER_SUCCESS';
export const SET_PLAYER_INFO = 'SET_PLAYER_INFO';
// Update player/account wins, draws, loses
export const UPDATE_STATS = 'UPDATE_STATS';
export const UPDATE_STATS_ERROR = 'UPDATE_STATS_ERROR';

// Root url for api
// for now when deploying to prod
// (yes i know that's not good, need to research a better way)
// switch to ./api
// prod = ./api
// dev = http://localhost:3050/api
const ROOT_URL = './api';


// **********************************************************************************************
// Action Creators for creating, fetching, and deleting a message related to one player
// **********************************************************************************************
/**
 * [fetchChatMessages - fetch messages based on username]
 * @param  {[string]} username [username related to player]
 * @return {[action]} action [redux action]
 */
export function fetchChatMessages(username) {
  const token = localStorage.getItem('token');
  const request = axios.get(`${ROOT_URL}/chatsystem/messages/${username}?token=${token}`);
  return {
    type: FETCH_CHAT_MESSAGES,
    payload: request
  };
}

/**
 * [deleteChatMessage delete message based on username and ID of message]
 * @param  {[string]} username [username related to player]
 * @param  {[string]} id       [ID of message]
 * @return {[type]}          [redux action]
 */
export function deleteChatMessage(username, id) {
  const token = localStorage.getItem('token');
  const request = axios.delete(`${ROOT_URL}/chatsystem/messages/${username}/${id}?token=${token}`);
  return {
    type: DELETE_CHAT_MESSAGE,
    payload: request
  }
}

/**
 * [createChatMessage - create a message related to username and the message text to store]
 * @param  {[string]} username [username related to player]
 * @param  {[string]} message  [message text to save]
 * @return {[type]}          [redux action]
 */
export function createChatMessage(username, message) {
  const token = localStorage.getItem('token');
  const reqBody = { user: username, message: message, token: token };
  const request = axios.post(`${ROOT_URL}/chatsystem/messages/${username}`, reqBody);
  return {
    type: CREATE_CHAT_MESSAGE,
    payload: request
  }
}


// **********************************************************************************************
// Action Creators for creating a player
// **********************************************************************************************
/**
 * [creatingPlayer - redux action to update isCreating to true to render loading icon]
 * @return {[type]} [redux action]
 */
function creatingPlayer() {
  return {
    type: CREATING_PLAYER,
    payload: { isCreating: true, created: false, player: {}, errorMessage: '' }
  }
}

/**
 * [createdPlayerSuccess - action to return player created and update iscreating and created state]
 * @param  {[type]} player [information related to person playing on the site]
 * @return {[type]}        [redux action]
 */
function createdPlayerSuccess() {
  return {
    type: CREATED_PLAYER_CHANGE,
    payload: { isCreating: false, created: true, player: {}, errorMessage: '' }
  }
}

/**
 * [createdPlayerError - throw error message on error while creating a player]
 * @param  {[string]} errorMessage [error message text to show on screen]
 * @return {[type]}              [redux action]
 */
function createdPlayerError(errorMessage) {
  return {
    type: CREATED_PLAYER_ERROR,
    payload: { isCreating: false, created: false, player: {}, errorMessage: errorMessage }
  }
}

/**
 * [createPlayer - main function to initiate creating a player]
 * @param  {[player]} player [contains info related to account and player information]
 * @return {[type]}        [redux action]
 */
export function createPlayer(player) {
  const { password, username, email } = player;
  const reqBody = { password, username, email}
  return (dispatch) => {
    dispatch(creatingPlayer());
    return axios.post(`${ROOT_URL}/account/create`, reqBody)
      .then((request) => {
        const { data } = request
        if(data.success) {
          dispatch(createdPlayerSuccess(data.player));
          const created = true;
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
 * [updatingPlayer - simple action creator to initiate loading when updating]
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
 * [updatePlayerSuccess - update account state and pass player info to state
 * when updating info is a success]
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
 * [updatePlayer - updates a player's account information]
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

/**
 * [setPlayerInfo - action creator to update account state from authentication state]
 * @param {[object]} player [player info]
 * @return {[type]}       [redux action]
 */
function setPlayerInfo(player) {
  return {
    type: SET_PLAYER_INFO,
    payload: { isCreating: false, created: false, player: player, errorMessage: '' }
  }
}

/**
 * [updateStats - updates player stats such as gamesWon, gamesLost, gamesDrawn]
 * @param  {[type]} username     [username related to player/person signed in]
 * @param  {[type]} statToUpdate [action to handle which stat to update]
 * @return {[type]}              [redux action]
 */
export function updateStats(username, statToUpdate) {
  const token = localStorage.getItem('token');
  const reqBody = { statToUpdate: statToUpdate }
  return (dispatch) => {
    axios.put(`${ROOT_URL}/account/update/${username}/stats?token=${token}`, reqBody)
      .then((player) => {
        return {
          type: UPDATE_STATS,
          payload: player
        }
      })
      .catch((err) => { dispatch(updateStatsError(err))})
  }
}

/**
 * [updateStatsError - handles error when updating a stat]
 * @param  {[type]} err [errorMessage to pass on to front end related to updating a stat]
 * @return {[type]}     [description]
 */
function updateStatsError(err) {
  return {
    type: UPDATE_STATS_ERROR,
    payload: { errorMessage: err}
  }
}


// ******************************************************************************
// Action creators for logging in a player and handling errors
// ******************************************************************************
/**
 * [requestLogin - set isFetching to true to rending loading icon
 * and pass creds to state]
 * @param  {[object]} creds [password and username of player wrapped in an object]
 * @return {[type]}       [redux action]
 */
function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds: creds
  }
}

/**
 * [receiveLogin - ]
 * @param  {[object]} player [player info]
 * @return {[type]}        [redux action]
 */
function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    creds: {}
  }
}

/**
 * [loginError - throw login error and set errorMessage for onscreen]
 * @param  {[string]} message [error message for user]
 * @return {[type]}         [redux action]
 */
function loginError(message) {
  const payload = { isFetching: false, isAuthenticated: false, errorMessage: message };
  return {
    type: LOGIN_FAILURE,
    payload: payload,
    creds: {}
  }
}

/**
 * [loginPlayer - main function to initiate logging in a player]
 * @param  {[object of strings]} creds [player password and username]
 * @return {[type]}       [redux action]
 */
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
          dispatch(receiveLogin())
          dispatch(setPlayerInfo(res.data.player))
        }
      })
      .catch((err) => dispatch(loginError(err)))
    }
}


//***********************************************************************************
// Action Creators for logging out a player
//***********************************************************************************
/**
 * [requestLogout - update isFetching state when logging out]
 * @return {[type]} [redux action]
 */
function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    creds: {}
  }
}

/**
 * [receiveLogout - update isFetching and isAuthenticated to false to
 * reset login/logout state]
 * @return {[type]} [redux action]
 */
function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    creds: {}
  }
}

/**
 * [logoutUser - main function that logs out user by requesting
 * logout, removing token, and updating isFetching and isAuthenticated state]
 * @return {[type]} [redux dispatch]
 */
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    dispatch(setPlayerInfo({}));
    dispatch(receiveLogout());
  }
}
