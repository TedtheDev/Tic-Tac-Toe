import { combineReducers } from 'redux';
import ChatMessagesReducer from './reducer_chat_messages';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  chatMessages: ChatMessagesReducer,
  form: formReducer
});

export default rootReducer;
