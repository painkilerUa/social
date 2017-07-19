"use strict"
const mysql = require('../../manageSQL.js')
const config = require('../../config');
const crypto = require('crypto');
const log = require('../../utils');



module.exports = (req, res) => {
    const username = req.body.username;
    if(!username){
        return res.status(401).send('You use incorrect login')
    }
    const pass = req.body.password;
    const hash = crypto.createHmac('sha256', pass).update(config['secret_string']).digest('hex');

    new Promise((resolve, reject) => {
        let SQLquery = "INSERT INTO users (user_login, user_hash, user_role, user_name) VALUES ('" + username + "', '" + hash + "', 'user', '" + username +"')";
        mysql(SQLquery, (err, rows) => {
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    }).then((resolve) => {
        return res.send('Your account has been successfully created')
    }).catch((err) => {
        if(err.errno === 1062){
            res.status(401).send('This username is already taken')
        }else{
            res.status(501).send('Some server error');
            log.info('Some server error ' + err);
        }
    })

}
