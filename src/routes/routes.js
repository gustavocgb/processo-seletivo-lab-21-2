const { Router } = require('express');
const routes = Router();

const User = require('./User');
const Project = require('./Project');
const Auth = require('./Auth');
const Route = require('./Route');
const Point = require('./Point');

// default
routes.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

// auth
Auth.auth(routes)

// user
User.user(routes);

// project
Project.project(routes);

// route
Route.route(routes);

// point
Point.point(routes);


module.exports = routes;