import React, { Component } from 'react';

class Play extends Component {
  //styles
  let setHeight = (percent) => {
    let style = {
      height: percent + '%',
    }
    return style;
  }

  render() {
    return(
      <div style={setHeight(100)}>
        <div className='row' style={setHeight(50)}>
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
