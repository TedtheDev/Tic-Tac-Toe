import React, { Component } from 'react'
import { connect } from 'react-redux';
import { } from '../actions/index';
import { bindActionCreators } from 'redux';
import SvgIcon from 'material-ui/SvgIcon';
import GameBoardO from './gameboardO';

class GameBoard extends Component {
  constructor(props) {
    super(props)

    this.state = { col1row1: false}
    this.placeX = this.placeX.bind(this);
  }

  placeX(event){
  }

  render() {
    return (
      <div style={{height:"100%"}}>
        <div className='gameboard'>
          <GameBoardO className='col-1 row-1' onClick={this.place} />
          <GameBoardO className='col-1 row-2' onClick={this.place} />
          <GameBoardO className='col-1 row-3' onClick={this.place} />
          <GameBoardO className='col-2 row-1' onClick={this.place} />
          <GameBoardO className='col-2 row-2' onClick={this.place} />
          <GameBoardO className='col-2 row-3' onClick={this.place} />
          <GameBoardO className='col-3 row-1' onClick={this.place} />
          <GameBoardO className='col-3 row-2' onClick={this.place} />
          <GameBoardO className='col-3 row-3' onClick={this.place}  />
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
