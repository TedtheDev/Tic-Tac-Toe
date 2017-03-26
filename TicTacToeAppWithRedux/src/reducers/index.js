import { combineReducers } from 'redux';
import ChatMessagesReducer from './reducer_chat_messages';

const rootReducer = combineReducers({
  chatMessages: ChatMessagesReducer
});

export default rootReducer;
