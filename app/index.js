const React = require('react');
const ReactDOM = require('react-dom');
const routes = require('./config/routes');

const HelloWorld = React.createClass({
  render() {
    return(
      <div>
        <p>hello world</p>
      </div>
    )
  }
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('app')
);
