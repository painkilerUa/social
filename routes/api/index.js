"use strict"


const config = require('../../config');
const jwt = require('express-jwt');
const registration = require('./registration')
//const login = require('./login');

let jwtCheck = jwt({
    secret: config['jwt_secret'],
    audience: config['jwt_audience'],
    issuer: config['jwt_issuer']
});

module.exports = (app) => {
    app.post('/api/registration', registration);
    // app.post('/api/login', login);
    // app.get('/api/orders', jwtCheck, getOrders);
    // app.post('/api/orders', jwtCheck, createOrder);
    // app.get('/api/customers', jwtCheck, getCustomers);
    // app.post('/api/customers', jwtCheck, createCustomer);
    // app.get('/api/products', jwtCheck, getProducts);
    // app.post('/api/products', jwtCheck, createProduct);
}
