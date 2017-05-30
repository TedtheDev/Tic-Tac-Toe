import React, { Component } from 'react';
import Navbar from '../containers/navbar';

class App extends Component {
  render() {
    return(
      <div className="container-grid">
        <Navbar />
        <section className='main' >
          {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
        </section>
      </div>
    );
  };
};

export default App;
