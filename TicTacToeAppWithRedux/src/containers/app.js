import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../containers/navbar';
import Home from '../containers/home';
import Play from '../containers/play';
import CreateAccount from '../containers/create_account';

class App extends Component {
  render() {
    return(
      <div className="container-grid">
        <Navbar />
        <section className='main' >
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/play" component={Play}/>
            <Route exact path="/account" component={CreateAccount}/>
          </Switch>
        </section>
      </div>
    );
  };
};

export default App;
