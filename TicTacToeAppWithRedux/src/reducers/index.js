import { combineReducers } from 'redux';
import ChatMessagesReducer from './reducer_chat_messages';
import AuthenticationReducer from './reducer_authentication';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  chatMessages: ChatMessagesReducer,
  form: formReducer,
  auth: AuthenticationReducer
});

export default rootReducer;
