import React, { Component } from 'react'
import { connect } from 'react-redux';
import { } from '../actions/index';
import { bindActionCreators } from 'redux';

class GameBoard extends Component {
  render() {
    return (
      <div>
        <div className='gameboard'>
          <div className='row-1'>
            <div>X</div>
            <div>X</div>
            <div>O</div>
          </div>
          <div className='row-2'>
            <div>O</div>
            <div>X</div>
            <div>X</div>
          </div>
          <div className='row-3'>
            <div>X</div>
            <div>O</div>
            <div>O</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
