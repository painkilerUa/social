const api = require('./api');
const fs = require('fs');
const spaHandler = require('./spa-handler')
module.exports = (app) => {
    api(app)
    app.get('/', spaHandler)
}