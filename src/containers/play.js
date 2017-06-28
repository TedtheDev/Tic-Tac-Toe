import React, { Component } from 'react';

import Chat from './chat';
import TicTacToeGrid from './tic_tac_toe_grid';

class Play extends Component {
  render() {
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

export default Play;
