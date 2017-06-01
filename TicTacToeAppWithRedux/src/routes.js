import React from 'react';
import { Route } from 'react-router-dom';

import App from './containers/app';
import Home from './containers/home';
import Play from './containers/play';
import CreateAccount from './containers/create_account';

export default (
  <div>
    <Route exact path='/' component={App} />
    <Route path='play' component={Play} />
    <Route path='account' component={CreateAccount} />
  </div>
)
