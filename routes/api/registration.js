"use strict"
const mysql = require('../../manageSQL.js')
const config = require('../../config');
const crypto = require('crypto');




module.exports = function(req, res){
    const login = req.body.login;
    const pass = req.body.password;
    const hash = crypto.createHmac('sha256', pass).update(config['secret_string']).digest('hex');

    new Promise((resolve, reject) => {
        let SQLquery = "INSERT INTO users (user_login, user_hash, user_role, user_name) VALUES ('" + login + "', '" + hash + "', 'user', '" + login +"')";
        mysql(SQLquery, (err, rows) => {
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    }).then((resolve) => {
        resolve
    }).catch((err) => {
        err
    })














//     const connection = manage.createConnection();
//     const SQL = "SELECT hash, role from authorization where login='" + login + "'";
//     connection.query(SQL, (error, results, fields) => {
//         if (error){
//             console.log(error)
//         }
//         // console.log(hash)
//         // console.log(results[0].hash)
//         results
//         if(!results.length){
//             res.status(401).send('Login was not find')
//         }else{
//             if(hash === results[0].hash){
//                 res.send({
//                     id_token: createIdToken({
//                         login: login
//                     }),
//                     access_token: createAccessToken(results[0].role)
//                 })
//             }else{
//                 res.status(401).send('Incorrect password')
//             }
//         }
//     });
//     connection.end();
// }
//
// function createIdToken(user) {
//     return jwt.sign({data: user.login}, config.get('jwt_secret'), { expiresIn: 60*60*5 });
// }
//
// function createAccessToken(role) {
//     return jwt.sign({
//         iss: config.get('jwt_issuer'),
//         aud: config.get('jwt_audience'),
//         exp: Math.floor(Date.now() / 1000) + (60 * 60),
//         scope: role,
//         sub: "some desc",
//         jti: genJti(),
//         alg: 'HS256'
//     }, config.get('jwt_secret'));
// }
//
// function genJti() {
//     let jti = '';
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < 16; i++) {
//         jti += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//
//     return jti;
}
