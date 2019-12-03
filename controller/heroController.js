const heroModel = require('../model/heroModel');
const formidable = require('formidable');
const path = require('path');

const heroController = {
    getAllHero(req,res){
        heroModel.getAllHero((err,result)=>{
            // console.log(result);
            let response = null;
            if(err){
                response = {
                    code : 401,
                    msg : '获取数据出错'
                }
            }else if(result.length === 0){
                response = {
                    code : 401,
                    msg : '没有满足条件的数据'
                }
            }else {
                response = {
                    code : 200,
                    msg : '获取数据成功',
                    data : result
                }
            }
            res.send(response);
        })
    },
    uploadHeadImg(req,res){
        let form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname,'../static/images');
        form.keepExtensions = true;
        form.parse(req,(err,fields,files)=>{
            let response = null;
            if(err){
                response = {
                    code : 401,
                    msg : '上传失败'
                }
            }else {
                let filePath = files.pic.path;
                response = {
                    code : 200,
                    msg : '上传成功',
                    filePath :  filePath.substring(filePath.indexOf('upload')),
                    baseDir : '../static/images/'
                }
            }
            // console.log(files.pic.path);
            res.send(response);
        })
        
    },
    addNewHero(req,res){
        heroModel.addNewHero(req.body,(err,result)=>{
            let response = null;
            if(err){
                response = {
                    code : 401,
                    msg : '新增失败'
                }
            }else {
                response = {
                    code : 200,
                    msg : '新增成功'
                }
            }
            res.send(response);
        })
    },
    getHeroById(req,res){
        let id = req.query.id;
        heroModel.getHeroById(id,(err,result)=>{
            let response = null;
            if(err){
                response = {
                    code : 401,
                    msg : '服务器出错'
                }
            }else if(result.length === 0){
                response = {
                    code : 401,
                    msg : '没有满足条件的数据'
                }
            }else {
                response = {
                    code : 200,
                    msg : '获取成功',
                    data : result[0]
                }
            }
            res.send(response);
        })
    },
    eidtHeroById(req,res){
        let id = req.body.id;
        let { name,gender,img } = req.body;
        let data = {name,gender,img};
        heroModel.editHeroById(id,data,(err,result)=>{
            let response = null;
            if(err){
                response = {
                    code : 401,
                    msg : '服务器出错'
                }
            }else if(result.affectedRows !== 1){
                response = {
                    code : 401,
                    msg : '修改失败'
                }
            }else {
                response = {
                    code : 200,
                    msg : '修改成功'
                }
            }
            res.send(response);
        })
    },
    deleteHeroById(req,res){
        let id = req.query.id;
        heroModel.deleteHeroById(id,(err,result)=>{
            let response = null;
            console.log(result);
            if(err){
                response = {
                    code : 401,
                    msg : '服务器出错'
                }
            }else if(result.affectedRows !== 1){
                response = {
                    code : 401,
                    msg : '删除失败'
                }
            }else {
                response = {
                    code : 200,
                    msg : '删除成功'
                }
            }
            res.send(response);
        })
    }



}
module.exports = heroController;