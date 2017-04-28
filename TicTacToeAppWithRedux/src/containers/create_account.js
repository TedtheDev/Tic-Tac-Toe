import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../actions/index';
import { bindActionCreators } from 'redux'

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onSubmitCreateForm = this.onSubmitCreateForm.bind(this);
  }

  onSubmitCreateForm(event) {
    event.preventDefault();
    
  }
  render() {
    return(
      <div>
        <h2>Create Your Account</h2>
        <form onSubmit={this.onSubmitCreateForm}>
          <label>First Name: </label>
          <input></input>
          <label>Last name: </label>
          <input></input>
          <label>Username: </label>
          <input></input>
          <label>Password: </label>
          <input></input>
          <label>Confirm Password: </label>
          <input></input>
          <button type="submit" className='btn btn-success'>Create Account</button>
        </form>
      </div>
    );
  };
};

export default CreateAccount
