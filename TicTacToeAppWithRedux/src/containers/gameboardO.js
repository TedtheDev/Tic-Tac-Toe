import React, { Component } from 'react';
import SvgIcon from 'material-ui/SvgIcon';

class GameBoardO extends Component {
  constructor(props) {
    super(props);

    this.state= {icon: false};

    this.changeIcon = this.changeIcon.bind(this);
  }

  changeIcon() {
    this.setState({icon: true})
  }

  render() {
    if(this.state.icon) {
      return (
        <svg className={this.props.className}>
          <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
        </svg>
      )
    } else {
      return (
        <div className={this.props.className} onClick={this.changeIcon}>asdfdsf</div>
      )
    }
  }
}

export default GameBoardO;
