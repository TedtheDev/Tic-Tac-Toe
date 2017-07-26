import React, { Component } from 'react';
import VerifyAccount from '../components/verify_account';
import axios from 'axios';

class VerifyAccountWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { verified: false, isVerifying: true};
    this.redirectToLoginTimer = this.redirectToLoginTimer.bind(this);
  }

  componentDidMount() {
    // call to api to verify account with hash
    const { username, hash } = this.props.match.params;
    setTimeout(() => {
      axios.post(`http://localhost:3050/api/account/verify/${username}/${hash}`)
        .then((data) => {
          if(data.data.success) {
            this.setState({verified: true, isVerifying: false});
          } else {
            this.setState({verified: false, isVerifying: false});
          }
        })
        .catch((err) => {
          this.setState({verified: false, isVerifying: false});
        })
    }, 3000)

  }

  redirectToLoginTimer() {
    setTimeout(() => {
      this.props.history.push('/')
    },5000);
  }

  render() {
    return (
      <div>
        <VerifyAccount
          redirectToLoginTimer={this.redirectToLoginTimer}
          verified={this.state.verified}
          isVerifying={this.state.isVerifying}
        />
      </div>
    )
  }
}

export default VerifyAccountWrapper;
