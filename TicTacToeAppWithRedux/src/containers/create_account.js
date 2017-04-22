import React, { Component } from 'react';

class CreateAccount extends Component {

  render() {
    return(
      <div>
        <h2>Create Your Account</h2>
        <form>
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
          <button type="submit" className='btn btn-success'>CREATE BRO</button>
        </form>
      </div>
    );
  };
};

export default CreateAccount
