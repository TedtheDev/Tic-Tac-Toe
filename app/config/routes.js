//load modules to use React, ReactRouter
const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRouter;
const hashHistory = ReactRouter.hashHistory;

//load components from app directory
const Main = require('../components/Main')
const Home = require('../components/Home')

//set routes
const routes = (
  <Router history={hashHistory}>
    <Router path='/' component={Main}>
      <IndexRoute component={Home} />
    </Router>
  </Router>
);

module.exports = routes;
