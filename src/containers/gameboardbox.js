import React, { Component } from 'react';

class GameBoardBox extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if(this.props.box !== '') {
      return (
        <div className={this.props.className} >{this.props.box}</div>
      )
    } else {
      return (
        <div className={this.props.className} onClick={() => {this.props.play(this.props.index, this.props.player)}}>{this.props.box}</div>
      )
    }
  }
}

export default GameBoardBox;
