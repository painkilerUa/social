"use strict"
const mysql = require('../../manageSQL.js')
const config = require('../../config');
const crypto = require('crypto');
const jwt     = require('jsonwebtoken');
const log = require('../../utils');



module.exports = (req, res) => {
    const login = req.body.login;
    const pass = req.body.password;

    const hash = crypto.createHmac('sha256', pass).update(config['secret_string']).digest('hex');

    new Promise((resolve, reject) => {
        let SQLquery = "SELECT id, user_hash, user_role FROM users where user_login='" + login + "'";
        mysql(SQLquery, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    }).then((resolve) => {
        if (resolve.length) {
            if (hash === resolve[0].user_hash) {
                res.send({
                    id_token: createIdToken({
                        id: resolve[0].id
                    }),
                    access_token: createAccessToken({
                        id: resolve[0].id,
                        role: resolve[0].user_role,

                    })
                })
            } else {
                res.status(401).send('Incorrect password')
            }
        } else {
            res.status(401).send('Login was not find')
        }
    }).catch((err) => {
        res.status(501).send('Some server error');
        log.info('Some server error ' + err);
    })

    function createIdToken(user) {
        return jwt.sign({data: user.id}, config['jwt_secret'], {expiresIn: 60 * 60 * 5});
    }

    function createAccessToken(user) {
        return jwt.sign({
            iss: config['jwt_issuer'],
            aud: config['jwt_audience'],
            exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60),
            scope: JSON.stringify(user),
            sub: "some desc",
            jti: genJti(),
            alg: 'HS256'
        }, config['jwt_secret']);
    }

    function genJti() {
        let jti = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 16; i++) {
            jti += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return jti;
    }

}
