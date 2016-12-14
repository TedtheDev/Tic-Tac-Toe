//load modules to use React, ReactRouter
const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

//load components from app directory
const Main = require('../components/Main');
const Home = require('../components/Home');
const Play = require('../components/Play');

//set routes
const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='/play' component={Play} />
    </Route>
  </Router>
);

module.exports = routes;
