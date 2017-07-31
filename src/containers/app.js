import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import {  } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from '../containers/navbar';
import Home from '../containers/home';
import Play from '../containers/play';
import CreateAccount from '../containers/create_account';
import UpdateAccount from '../containers/update_account';
import Leaderboard from '../containers/leaderboard';
import PersonalStats from '../containers/personal_stats';
import FourOhFourNotFound from '../components/404';
import VerifyAccountWrapper from '../containers/verify_account_wrapper';
import ForgotPasswordWrapper from '../containers/forgot_password_wrapper';
import VerifyForgotPasswordWrapper from '../containers/verify_forgot_password_wrapper';

// tried to implement this but was  having issues with redirects and updating
// will work on at a later point
//
// to handle 'private routes', each component has its own check if isAuthenticated === false
// and not have a higher component
function PrivateRoute({ component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: { from: props.location } }} />}
      />
  )
}

class App extends Component {
  componentDidMount() {
    //refresh token action goes here
  }

  render() {
    return(
      <div className="container-grid">
        <Navbar />
        <section className='main' >
          <Switch>
            <Route exact path="/play" component={Play}/>
            <Route exact path="/account" component={CreateAccount}/>
            <Route exact path="/update" component={UpdateAccount}/>
            <Route exact path="/leaderboard" component={Leaderboard}/>
            <Route exact path="/stats" component={PersonalStats}/>
            <Route exact path="/verify/:username/:hash" component={VerifyAccountWrapper}/>
            <Route exact path="/resetpassword" component={ForgotPasswordWrapper}/>
            <Route exact path="/resetpassword/verify" component={VerifyForgotPasswordWrapper}/>
            <Route exact path="/" component={Home}/>
            <Route path="*" component={FourOhFourNotFound}/>
          </Switch>
        </section>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

//withRouter doesnt update isAuthenticated at this level but login isAuthenticated is updated to true
// if we take out withRouter, they update
// issue with redirects
// app js doesnt get update so redirects to / which then renders logincsreen which is isAuthenticated as true which then redirects to play which causes a loop
// ISSUE: isAuthenticated in app is not updated, isAuthenticated in login is updated cuases redirect loops
// withRouter might be making the connect not be connected to the store thus it isAuthenticated isn't updated
export default App;
