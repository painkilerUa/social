"use strict"
const mysql = require('../../manageSQL.js')
const log = require('../../utils');

module.exports = (req, res) => {
    if(req.user === undefined) return res.status(401).send('You should be authorized')
    let user = JSON.parse(req.user.scope);
    let SQLquery;
    switch (user.role) {
        case 'user':
            SQLquery = "SELECT id, user_login, user_role, user_name, user_age, user_avatar_name, is_locked FROM users WHERE id=" + user.id + ";";
            break;
        case 'admin':
            SQLquery = "SELECT id, user_login, user_role, user_name, user_age, user_avatar_name, is_locked FROM users;";
            break;
        default:
            return res.status(401).send('Unknown user role')
    }
    new Promise((resolve, reject) => {
        mysql(SQLquery, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    }).then((resolve) => {
        let customers = {group: []};
        for(let item of resolve){
            if(item.id === user.id){
                customers.cur_user = item;
                continue;
            }
            customers.group.push(item)
        }
        res.send(customers);
    }).catch((err) => {
        res.status(501).send('Some server error');
        log.info('Some server error ' + err);
    })
}