import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/index';

const INITIAL_STATE = { isFetching: false, isAuthenticated: localStorage.getItem('token') ? true : false, errorMessage: ''};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        player: action.creds
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
    case LOGIN_FAILURE:
      const { isFetching, isAuthenticated, errorMessage } = action.payload;
      return {isFetching: isFetching, isAuthenticated: isAuthenticated, errorMessage: errorMessage}
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
    default:
      return state;
  }
}
