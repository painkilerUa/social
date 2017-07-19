const fs = require('fs')
const log = require('../utils');



module.exports = (req, res) => {
    fs.readFile('./public/spa/index.html', (err, data) => {
        if (err){
            res.status(501).send('Error 501')
            log.info('Error in process reading file ' + err)
        }else {
            res.end(data)
        }
    });
}
