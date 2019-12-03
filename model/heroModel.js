const mysql = require('mysql');
const sqlhelper = require('./sqlhelper');
const connection = mysql.createConnection(sqlhelper.connectionConfig);

const heroModel = {
    getAllHero(callback){
        let sql = 'select * from heros where isDelete = 0';
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    },
    addNewHero(heroData,callback){
        let sql = 'insert into heros set ?'
        connection.query(sql,heroData,(err,result)=>{
            callback(err,result);
        });
    },
    getHeroById(id,callback){
        let sql = 'select * from heros where id = ?'
        connection.query(sql,[id],(err,result)=>{
            callback(err,result);
        })
    },
    editHeroById(id,data,callback){
        let sql = 'update heros set ? where id = ?';
        connection.query(sql,[data,id],(err,result)=>{
            callback(err,result);
        })
    },
    deleteHeroById(id,callback){
        let sql = 'update heros set isDelete = 1 where id = ?';
        connection.query(sql,[id],(err,result)=>{
            callback(err,result);
        })
    }
}

module.exports = heroModel;