import { combineReducers } from 'redux';
import ChatMessagesReducer from './reducer_chat_messages';
import AuthenticationReducer from './reducer_authentication';
import AccountReducer from './reducer_account';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  chatMessages: ChatMessagesReducer,
  form: formReducer,
  auth: AuthenticationReducer,
  account: AccountReducer
});

export default rootReducer;
