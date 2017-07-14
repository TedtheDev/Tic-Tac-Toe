import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Helpers from '../helpers/helpers';
import Paper from 'material-ui/Paper';

const paperStyle = {
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems: "center",
  padding: "1rem"
}

class Leaderboard extends Component {
    constructor(props) {
      super(props);

      this.state = {players: []}

      this.renderLeaderboard = this.renderLeaderboard.bind(this);
    }

    componentDidMount() {
      const token = localStorage.getItem('token');
      Helpers.getLeaderboard()
        .then((data) => {
          this.setState({players: data.data.players});
        })
    }

    renderLeaderboard(players) {
      return (
        players.map((player) => {
          return <li key={player._id}>{player.username} {player.gamesWon} {player.gamesLost} {player.gamesDrawn}</li>
        })
      )
    }
    render() {
      if(!this.props.isAuthenticated) {
        return (
          <div>
            <Redirect to='/' />
          </div>
        )
      }
      return (
        <div>
          <Paper zDepth={5} style={paperStyle}>
            <h2>Leaderboard</h2>
            <ul>
              {this.renderLeaderboard(this.state.players)}
            </ul>
          </Paper>
        </div>
      )
    }
}

function mapStateToProps(state) {
  return  {
    isAuthenticated: state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps)(Leaderboard);
