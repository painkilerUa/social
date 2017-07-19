"use strict"


const config = require('../../config');
const jwt = require('express-jwt');
const registrationHander = require('./registration');
const loginHander = require('./login');
const getUsers =  require('./getUsers');
const editUsers = require('./editUsers');

let jwtCheck = jwt({
    secret: config['jwt_secret'],
    audience: config['jwt_audience'],
    issuer: config['jwt_issuer']
});

module.exports = (app) => {
    app.post('/api/registration', registrationHander);
    app.post('/api/login', loginHander);
    app.get('/api/profile', jwtCheck, getUsers);
    app.put('/api/profile', jwtCheck, editUsers);
}
