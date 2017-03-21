import React, { Component } from 'react';
import Navbar from '../containers/navbar';
import styles from '../../style/stylejs';

class App extends Component {
  render() {
    return(
      <div style={ styles.mainHeight }>
        <Navbar />
        <div className='container-fluid' style={ styles.mainHeight }>
          {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
        </div>
      </div>
    );
  };
};

export default App;
