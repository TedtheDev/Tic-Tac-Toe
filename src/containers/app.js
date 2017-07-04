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

function PrivateRoute({ component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
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
            <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/play" component={Play}/>
            <Route path="/account" component={CreateAccount}/>
            <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/update" component={UpdateAccount}/>
            <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/leaderboard" component={Leaderboard}/>
            <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/stats" component={PersonalStats}/>
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

export default withRouter(connect(mapStateToProps, null)(App));
