const React = require('react');

const MainChat = require('./chat/MainChat');

const Chat = React.createClass({
  render() {
    return(
      <div>
        <MainChat />
      </div>
    )
  }
});

module.exports = Chat;
