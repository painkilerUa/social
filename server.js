"use strict"
const express = require('express');
const app = express();
const middleware = require('./middleware')(app, express);
const config = require('./config');
const log = require('./utils');



const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
    log.info('Express server listening on port ' + PORT + '...');
});
