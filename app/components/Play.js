const React = require('react');

const Chat = require('./Chat');
const TicTacToeGrid = require('./TicTacToeGrid');

const Play = React.createClass({
  render(){
    return(
      <div>
        <div className='row'>
          <div className='col-xs-2'></div>
          <div className='col-xs-8'><Chat /></div>
          <div className='col-xs-2'></div>
        </div>
        <div className='row'>
          <div className='col-xs-2'></div>
          <div className='col-xs-8'><TicTacToeGrid /></div>
          <div className='col-xs-2'></div>
        </div>
      </div>
    )
  }
});

module.exports = Play;
