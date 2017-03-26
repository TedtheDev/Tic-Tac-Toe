import { FETCH_CHAT_MESSAGES } from '../actions/index';

const INITIAL_STATE = { messages: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CHAT_MESSAGES:
      const dater = { ...state, messages: action.payload.data };
      console.log( "dater", dater.messages.messages);
      return { ...state, messages: action.payload.data };
    default:
      return state;
  }
}
