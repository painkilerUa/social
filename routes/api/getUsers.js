"use strict"


module.exports = function(req, res, next){
    if(req.user.scope){

    }
    //     let getCustomer = new Promise((resolve, reject) =>{
    //         let connection = manage.createConnection();
    //         let SQLquery = "SELECT id, customer_surname, customer_name, customer_patronymic, customer_main_phone, customer_add_phone, customer_add_1_phone, customer_email, customer_city, customer_del_name, customer_del_depart_num, customer_local_address, customer_comment FROM customers;";
    //         connection.query(SQLquery, (err, rows, fields) => {
    //             if (err) {
    //                 reject(err);
    //                 connection.end();
    //             }
    //             connection.end();
    //             resolve(rows);
    //         });
    //     })
    //     getCustomer.then(
    //         resolve => {
    //             res.send(resolve)
    //         }, reject => {
    //             log.info('some errors in getting customers from DB ' + reject);
    //             res.status(500).send('Customers were not gotten')
    //         })
    // }
}