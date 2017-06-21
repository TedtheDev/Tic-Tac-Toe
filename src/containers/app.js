import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {  } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from '../containers/navbar';
import Home from '../containers/home';
import Play from '../containers/play';
import CreateAccount from '../containers/create_account';
import UpdateAccount from '../containers/update_account';
import FourOhFourNotFound from '../components/404';

class App extends Component {
  componentDidMount() {
    
  }

  render() {
    return(
      <div className="container-grid">
        <Navbar />
        <section className='main' >
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/play" component={Play}/>
            <Route path="/account" component={CreateAccount}/>
            <Route path="/update" component={UpdateAccount}/>
            <Route path="*" component={FourOhFourNotFound}/>
          </Switch>
        </section>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default App;
