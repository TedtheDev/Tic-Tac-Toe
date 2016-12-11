const React = require('react');

const Main = React.createClass({
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
      </div>
    )
  }
});

module.exports = Main;
