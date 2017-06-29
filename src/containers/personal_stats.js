import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';


const paperStyle = {
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems: "flex-start",
  padding: "1rem"
}

class PersonalStats extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    return (
      <div>
        <Paper zDepth={5} style={paperStyle}>
          <div>Win Rate: {((parseInt(this.props.player.gamesWon) / parseInt(this.props.player.gamesPlayed)) * 100).toPrecision(4)}%</div>
          <div>Wins: {this.props.player.gamesWon}</div>
          <div>Loses: {this.props.player.gamesLost}</div>
          <div>Draws: {this.props.player.gamesDrawn}</div>
          <div>Total Games Played: {this.props.player.gamesPlayed}</div>
          <div>Longest Game Played: 3 min</div>
          <div>Shortest Game Played: 2 sec</div>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.account.player
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}
export default connect(mapStateToProps, null)(PersonalStats)
