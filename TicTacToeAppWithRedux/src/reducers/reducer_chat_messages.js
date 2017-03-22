import { FETCH_CHAT_MESSAGES } from '../actions/index';

const INITIAL_STATE = { messages: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CHAT_MESSAGES:
      return {...state, messages: action.payload.data }
    default:
      return state;
  }
}
