const api = require('./api');
const fs = require('fs');
const spaHandler = require('./spa-handler')
module.exports = (app) => {
    app.get('/', spaHandler)
    api(app)
}