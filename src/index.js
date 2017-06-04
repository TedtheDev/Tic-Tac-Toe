import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/app';
import Home from './containers/home';
import Play from './containers/play';
import CreateAccount from './containers/create_account';

// Needed for onTouchTap
injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(
  promise,
  thunkMiddleware,
)(createStore);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('.app'));
