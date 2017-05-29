import React, { Component } from 'react';
import Navbar from '../containers/navbar';

class App extends Component {
  render() {
    return(
      <div className="container-grid">
        <Navbar />
        <div className='main' >
          {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
        </div>
      </div>
    );
  };
};

export default App;
