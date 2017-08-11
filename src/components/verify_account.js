import React from 'react';
import LoadingIcon from '../components/loading_material_ui_circular';

const VerifyAccount = ({ redirectToLoginTimer, verified, isVerifying, alreadyVerified }) => {
  //style for divs with flexbox
  const flexStyle = {display:"flex",flexDirection:"column",alignItems:"center"};

  // if verified account and done loading
  if(verified && !isVerifying && !alreadyVerified) {
    return (
      <div style={flexStyle}>
        <h1>Verified! You will be redirected to the login screen shortly.</h1>
        { redirectToLoginTimer() }
      </div>
    )
  }
  // not verified yet, but loading
  else if(!verified && isVerifying && !alreadyVerified) {
    return (
      <div style={flexStyle}>
        <LoadingIcon />
        <h1 style={{marginTop:'3%'}}>Verifiying...</h1>
      </div>
    )
  } else if(alreadyVerified){
    return (
      <div style={flexStyle}>
        <h1>Your account has already been verified</h1>
        { redirectToLoginTimer() }
      </div>
    )
  } else {
    return (
      <div style={flexStyle}>
        <h1>Not Verified!</h1>
      </div>
    )
  }
}

export default VerifyAccount;
