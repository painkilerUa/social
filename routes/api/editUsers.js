"use strict"
const mysql = require('../../manageSQL.js')
const log = require('../../utils');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    if(req.user === undefined) return res.status(401).send('You should be authorized')
    let userScope = JSON.parse(req.user.scope);
    let payload = JSON.parse(req.body.data);
    let method = payload.method;
    switch (method) {
        case 'editProfile':
            editProfile()
            break;
        case 'lockUsers':
            lockUsers()
            break;
        default:
            return res.status(501).send('Unknown action for editing user')
    }

    function editProfile(){
        new Promise((resolve, reject) => {
            let SQLquery = "SELECT is_locked FROM users WHERE id=" + userScope.id;
            mysql(SQLquery, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows)
                }
            })
        }).then((resolve) => {
            if(resolve[0].is_locked === "TRUE"){
                let error = new Error('Forbidden editing profile');
                error.name = 'User error';
                error.code = 'forbidden_editing'
                throw error;
            }
            return new Promise((resolve, reject) => {
                if(req.files.length){
                    let name = userScope.id;
                    let ext = "." + req.files[0].mimetype.split('/')[1];
                    let filePath = path.format({
                        dir: './public/avatar/',
                        name: name,
                        ext: ext
                    });
                    fs.writeFile(filePath, req.files[0].buffer, (err) => {
                        if (err){
                            reject(err);
                        }else{
                            resolve(name + ext);
                        }
                    });
                }else{
                    resolve();
                }
            })
        }).then((resolve) => {
            let query = {};
            for (let key in payload.data){
                if(payload.data[key] && payload.data.hasOwnProperty(key)){
                    query[key] = payload.data[key];
                }
            }
            query['user_avatar_name'] = resolve;

            let SQLquery = "UPDATE users SET " + queryObjToString(query) +  " WHERE id=" + userScope.id;

            return new Promise((resolve, reject) => {
                mysql(SQLquery, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows)
                    }
                })
            })
        }).then((resolve) => {
            res.send('Your profile has been updated.')
        }).catch((err) => {
            if(err.code === 'forbidden_editing') return res.status(403).send('You profile locked.');
            res.status(501).send('Some server error');
            log.info('Some server error ' + err);
        })

    }
    function lockUsers(){
        if(!userScope.role === 'admin') return res.status(401).send('You should use another profile');
        let SQLquery = "UPDATE users SET is_locked= " + (payload.data.lock ? "'TRUE'" : "'FALSE'") + " WHERE id=" + payload.data.id;

        new Promise((resolve, reject) => {
            mysql(SQLquery, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        }).then((resolve) => {
            res.send('Status has been successfully changed');
        }).catch((err) => {
            res.status(501).send('Some server error');
            log.info('Some server error ' + err);
        })
    }
    function queryObjToString(query){
        let string = '';
        for(let key in query){
            string += key + "='" + query[key] + "', "
        }

        return string.slice(0, -2)
    }
}