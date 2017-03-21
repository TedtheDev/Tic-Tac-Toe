const React = require('react');
const ReactDOM = require('react-dom');
const routes = require('./config/routes');

const HelloWorld = React.createClass({
  render() {
    return(
      <div className='row'>
        <div className='col-xs-8'>hello world</div>
        <div className='col-xs-4'>hello world 2</div>
      </div>
    )
  }
});

ReactDOM.render(
  routes,
  document.getElementById('app')
);
