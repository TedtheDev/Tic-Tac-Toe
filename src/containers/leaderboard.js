import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    render() {
      if(!this.props.isAuthenticated) {
        return (
          <div>
            <Redirect to='/' />
          </div>
        )
      }
      return (
        <div>Leaderboards coming soon</div>
        // get all players. show games played, wins, win rate, fun stats
        // do a list, just a one call
        // will eventually make it sortabled maybe with a search?
        // do it ascending on win rate, but somehow incorporate games played too
        // include player logged in like in pubg
      )
    }
}

function mapStateToProps(state) {
  return  {
    isAuthenticated: state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps)(Leaderboard);
