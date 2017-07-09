import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingCircle = (props) => {
  return (
    <div className='loading-circle'>
      <CircularProgress size={80} thickness={7} />
    </div>
  )
}

export default LoadingCircle;
