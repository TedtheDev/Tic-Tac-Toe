import React from 'react';

const VerifyAccount = ({ redirectToLoginTimer, history, verified, verifying }) => {
  // if verified account and done loading
  if(verified && !verifying) {
    return (
      <div>
        Verified! You will be redirected to the login screen shortly
        { redirectToLoginTimer() }
      </div>
    )
  }
  // not verified yet, but loading
  else if(!verified && verifying) {
    return (
      <div>
        Verifiying...
      </div>
    )
  } else {
    return (
      <div>
        Not Verified, something happened
      </div>
    )
  }
}

export default VerifyAccount;
