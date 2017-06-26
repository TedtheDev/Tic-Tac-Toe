import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateWins } from '../actions/index';
import { bindActionCreators } from 'redux';
import SvgIcon from 'material-ui/SvgIcon';
import GameBoardBox from './gameboardbox';

class GameBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      board: [
        ['','',''],
        ['','',''],
        ['','','']
      ],
      player: 'X'
    };

    this.play = this.play.bind(this);
    this.playComputer = this.playComputer.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
    this.checkPlayer = this.checkPlayer.bind(this);
    this.checkRows = this.checkRows.bind(this);
    this.checkColumns = this.checkColumns.bind(this);
  }

  playComputer(newBoard) {
    let generate = true;
    let counter = 0
    while(generate && counter < 1000) {
      const randomRow = Math.floor(Math.random() * (1000 - 0)) % 3;
      const randomBox = Math.floor(Math.random() * (1000 - 0)) % 3;
      if(newBoard[randomRow][randomBox] === '') {
        newBoard[randomRow][randomBox] = 'O';
        generate = false;
      }
      counter++;
    }
  }

  checkRows(player, board) {
    let won = false;
    for(let i = 0; i < 3; i++) {
      let countRow = 0;
      for(let k = 0; k < 3; k++) {
        if(board[i][k] === player) {
          countRow++;
          if(countRow === 3) {
            won = true;
          }
        }
      }
    }
    return won;
  }

  checkColumns(player, board) {
    let won = false;
    for(let i = 0; i < 3; i++) {
      let countColumn = 0;
      for(let k = 0; k < 3; k++) {
        if(board[k][i] === player) {
          countColumn++;
          if(countColumn === 3) {
            won = true;
          }
        }
      }
    }
    return won;
  }

  checkPlayer(player, board) {
    return this.checkColumns(player, board) || this.checkRows(player, board)
  }

  checkForWinner(newBoard) {
    let noMoreMoves = 0;
    newBoard.map((row) => {
      return row.map((box) => {
        if(box === '')
          noMoreMoves++;
      })
    })

    const XWin = this.checkPlayer('X', newBoard);
    const OWin = this.checkPlayer('O', newBoard);

    if(XWin || OWin || noMoreMoves === 0) {
      if(XWin || OWin) {
        if(XWin) {
          // add action win here
          alert('X Wins');
          this.props.updateWins(this.props.player.username);
        } else {
          // add action lose here
          alert('O Wins');
        }
      } else {
        // add action draw here
        alert('draw');
      }
      this.setState({board: [
        ['','',''],
        ['','',''],
        ['','','']
      ]});
    }
  }

  play(index, player){
    index = index.split(',')
    let newBoard = this.state.board;
    newBoard[index[0]][index[1]] = player;
    this.playComputer(newBoard);
    this.setState({board: newBoard})
    this.checkForWinner(this.state.board);
    //const updatePlayer = this.state.player === 'X' ? 'O' : 'X';
    //this.setState({player: updatePlayer});
  }

  render() {
    return (
      <div style={{height:"100%"}}>
        <div className='gameboard'>
          <GameBoardBox box={this.state.board[0][0]} index='0,0' player={this.state.player} play={this.play} className='col-1 row-1' />
          <GameBoardBox box={this.state.board[0][1]} index='0,1' player={this.state.player} play={this.play} className='col-1 row-2' />
          <GameBoardBox box={this.state.board[0][2]} index='0,2' player={this.state.player} play={this.play} className='col-1 row-3' />
          <GameBoardBox box={this.state.board[1][0]} index='1,0' player={this.state.player} play={this.play} className='col-2 row-1' />
          <GameBoardBox box={this.state.board[1][1]} index='1,1' player={this.state.player} play={this.play} className='col-2 row-2' />
          <GameBoardBox box={this.state.board[1][2]} index='1,2' player={this.state.player} play={this.play} className='col-2 row-3' />
          <GameBoardBox box={this.state.board[2][0]} index='2,0' player={this.state.player} play={this.play} className='col-3 row-1' />
          <GameBoardBox box={this.state.board[2][1]} index='2,1' player={this.state.player} play={this.play} className='col-3 row-2' />
          <GameBoardBox box={this.state.board[2][2]} index='2,2' player={this.state.player} play={this.play} className='col-3 row-3' />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.account.player
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateWins }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
