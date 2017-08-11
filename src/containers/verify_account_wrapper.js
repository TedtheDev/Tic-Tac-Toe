import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../actions/index';
import VerifyAccount from '../components/verify_account';
import axios from 'axios';

class VerifyAccountWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { verified: false, isVerifying: true, alreadyVerified: false};
    this.redirectToLoginTimer = this.redirectToLoginTimer.bind(this);
  }

  componentDidMount() {
    // call to api to verify account with hash
    const { username, hash } = this.props.match.params;
    setTimeout(() => {
      axios.post(`./api/account/verify/${username}/${hash}`)
        .then((data) => {
          console.log(data)
          if(data.data.success) {
            console.log(data.data)
            if(data.data.message === 'Already Verified') {
              this.setState({alreadyVerified: true})
            }
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
          alreadyVerified={this.state.alreadyVerified}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch)
}

export default connect(null, mapDispatchToProps)(VerifyAccountWrapper);
