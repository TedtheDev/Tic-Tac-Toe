import React, { Component } from 'react';

import Chat from './chat';
import TicTacToeGrid from './tictactoegrid';

class Play extends Component {
  render() {
    return(
      <div style={{height: '100%'}}>
        <div className='' style={{height: '50%'}}>
          <Chat />
        </div>
        <div className='' style={{height: '50%'}}>
          <TicTacToeGrid />
        </div>
      </div>
    );
  };
};

export default Play;
