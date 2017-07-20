import React, { Component } from 'react';
import VerifyAccount from '../components/verify_account';
import axios from 'axios';

class VerifyAccountWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { verified: false, isVerifying: true}
  }

  componentDidMount() {
    // call to api to verify account with hash
    // this.props.match.param.username
    // this.props.match.param.hash
    const { username, hash } = this.props.match.params;
    axios.post(`http://localhost:3050/api/account/verify/${username}/${hash}`)
      .then((data) => {
        console.log(data)
        if(data.data.success) {
          this.setState({verified: true, isVerifying: false});
        } else {
          this.setState({verified: false, isVerifying: false});
        }
      })
      .catch((err) => {
        this.setState({verified: false, isVerifying: false});
      })
  }

  render() {
    return (
      <div>
        <VerifyAccount verified={this.state.verified} verifying={this.state.verifying} />
      </div>
    )
  }
}

export default VerifyAccountWrapper;
