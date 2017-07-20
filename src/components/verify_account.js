import React from 'react';

const VerifyAccount = ({ verified, verifying }) => {
  // if verified account and done loading
  if(verified && !verifying) {
    return (
      <div>
        Verified!
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
