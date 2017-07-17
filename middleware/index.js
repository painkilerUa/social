const config = require('../config');
const multer = require('multer');
const router = require('../routes');

module.exports = (app, express) => {





    app.use(express.static(config['public_dir']));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
    app.use(multer({}).any());
    router(app);
    app.use((err, req, res, next) => {
        if(err.name === 'UnauthorizedError'){
            res.status(401).send('You should be authorized');
        }else{
            res.status(501).send('Something broken');
        }
    })
};

