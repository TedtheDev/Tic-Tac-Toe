import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Chat from './chat';
import TicTacToeGrid from './tic_tac_toe_grid';

class Play extends Component {
  render() {
    if(!this.props.isAuthenticated) {
      return (
        <div>
          <Redirect to='/' />
        </div>
      )
    }

    return(
      <div className="play" >
        <div className='chat' >
          <Chat />
        </div>
        <div className='tic-tac-toe-grid' >
          <TicTacToeGrid />
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Play);
