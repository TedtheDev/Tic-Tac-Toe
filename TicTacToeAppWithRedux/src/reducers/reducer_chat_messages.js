import { FETCH_CHAT_MESSAGES, CREATE_CHAT_MESSAGE, DELETE_CHAT_MESSAGE } from '../actions/index';

const INITIAL_STATE = { messages: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CHAT_MESSAGES:
      return { ...state, messages: action.payload.data };
    case DELETE_CHAT_MESSAGE:
      const { data } = action.payload;
      const messages = state.messages.filter(message => message._id !== data._id)
      return { ...state, messages: messages };
    case CREATE_CHAT_MESSAGE:
      console.log('payload data', action.payload.data);
      return { ...state, messages: action.payload.data };
    default:
      return state;
  }
}
