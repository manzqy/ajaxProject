const mysql = require('mysql');
const sqlhelper = require('./sqlhelper');
const connection = mysql.createConnection(sqlhelper.connectionConfig);

const userModel = {
    isUserNameExist(userName,callback){
        let sql = 'select count(*) as count from users where userName = ?'
        connection.query(sql,[userName],(err,results,fields)=>{
            if(err){
                callback(err)
            }
            callback(null,results[0]);
        })
    },
    doRegister(userData,callback){
        let sql = 'insert into users set ?';
        connection.query(sql,userData,(err,result,fields)=>{
            if(err){
                callback(err);
            }else {
                callback(null,result)
            }
        })
    },
    doLogin(userName,callback){
        let sql = 'select * from users where userName = ?';
        connection.query(sql,[userName],(err,result)=>{
            callback(err,result[0])
        })
    }
};
module.exports = userModel;