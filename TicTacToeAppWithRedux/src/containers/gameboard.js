import React, { Component } from 'react'
import { connect } from 'react-redux';
import { } from '../actions/index';
import { bindActionCreators } from 'redux';

class GameBoard extends Component {
  constructor(props) {
    super(props)

  }

  placeX(event){
  }

  render() {
    return (
      <div style={{height:"100%"}}>
        <div className='gameboard'>
          <div className='col-1 row-1'>col1row1</div>
          <div className='col-1 row-2'>col1row2</div>
          <div className='col-1 row-3'>col1row3</div>
          <div className='col-2 row-1'>col2row1</div>
          <div className='col-2 row-2'>col2row2</div>
          <div className='col-2 row-3'>col2row3</div>
          <div className='col-3 row-1'>col3row1</div>
          <div className='col-3 row-2'>col3row2</div>
          <div className='col-3 row-3'>col3row3</div>
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
