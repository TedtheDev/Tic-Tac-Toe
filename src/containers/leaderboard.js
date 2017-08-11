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

      this.state = {players: [], currentPage: 0, amountOfPages: 0}

      this.renderLeaderboard = this.renderLeaderboard.bind(this);
      this.fetchLeaderboard = this.fetchLeaderboard.bind(this);
      this.renderAmountOfButtons = this.renderAmountOfButtons.bind(this);
    }

    componentWillUnmount() {
      this.setState({players: []})
    }

    componentDidMount() {
      this.fetchLeaderboard(0);
    }

    fetchLeaderboard(page) {
      const token = localStorage.getItem('token');
      Helpers.getLeaderboard(page)
        .then((data) => {
          this.setState({players: data.data.players, amountOfPages: Math.ceil(data.data.totalCount / 10), currentPage: page});
        })
    }

    renderLeaderboard(players, currentPage) {
      return (
        players.map((player,index) => {
          return (
            <div className={"stat-row-"+(index + 1)} key={player._id} >
              <div>
                {Number((currentPage * 10) + (index + 1))}
              </div>
              <div>
                {player.username}
              </div>
              <div>
                {player.gamesWon}
              </div>
              <div>
                {player.gamesLost}
              </div>
              <div>
                {player.gamesDrawn}
              </div>
            </div>
          )
        })
      )
    }

    renderAmountOfButtons(pages) {
      let buttons = [];
      for(let i = 0; i < pages; i++) {
        buttons.push(<button className="pagination-button" key={i} onClick={() => this.fetchLeaderboard(i)}>{i + 1}</button>);
      }
      return buttons;
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
            <div style={{margin:"10%"}}>
              {this.renderAmountOfButtons(this.state.amountOfPages, () => this.fetchLeaderboard())}
            </div>
            <div className="leaderboard-stats">
              <div className='stat-row-0'>
                <div>Number</div>
                <div>Username</div>
                <div>Wins</div>
                <div>Losts</div>
                <div>Draws</div>
              </div>
              {this.renderLeaderboard(this.state.players, this.state.currentPage)}
            </div>
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
