import React, { Component } from 'react';

import Chat from './chat';
import TicTacToeGrid from './tictactoegrid';

class Play extends Component {
  render() {

    //styles
    let setHeight = (percent) => {
      let style = {
        height: percent + '%'
      }
      return style;
    }

    return(
      <div style={setHeight(100)}>
        <div className='row' style={{height: '50%'}}>
          <div className='col-xs-2'></div>
          <div className='col-xs-8'><Chat /></div>
          <div className='col-xs-2'></div>
        </div>
        <div className='row' style={setHeight(50)}>
          <div className='col-xs-2'></div>
          <div className='col-xs-8'><TicTacToeGrid /></div>
          <div className='col-xs-2'></div>
        </div>
      </div>
    );
  };
};

export default Play;
