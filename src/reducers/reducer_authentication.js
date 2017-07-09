import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/index';

const INITIAL_STATE = { isFetching: false, isAuthenticated: false, errorMessage: '', creds: {}};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        errorMessage: '',
        creds: action.creds
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        creds: action.creds
      });
    case LOGIN_FAILURE:
      const { isFetching, isAuthenticated, errorMessage, creds } = action.payload;
      return {isFetching: isFetching, isAuthenticated: isAuthenticated, errorMessage: errorMessage, creds: creds}
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: '',
        creds: action.creds
      })
    default:
      return state;
  }
}
