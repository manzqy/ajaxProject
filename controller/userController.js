const userModel = require('../model/userModel');


const userController = {
    makeCode(){
        let code = [];
        for (let i = 0; i < 4; i++) {
            code.push(Math.floor(Math.random() * 10));
        }
        return code.join('');
    },
    getCodeWithoutPhone(req, res) {
        let code = userController.makeCode();
        res.send({
            code
        });
    },
    getCodeWithPhone(req,res){
        let phone = req.query.phone;
        
        let code = userController.makeCode();

        res.send({
            code,phone
        });
    },
    isUserNameExist(req,res){
        let userName = req.query.userName;
        
        userModel.isUserNameExist(userName,(err,result)=>{
            let response = {
                code : 0,
                msg : ''
            }
            if(err){
                response.code = 401;
                response.msg = '服务器发生了错误';
            }else if(result.count >= 1){
                response.code = 401;
                response.msg = '用户名已经存在'
            }else {
                response.code = 200;
                response.msg = '用户名可以使用'
            }
            res.send(response);
        })        
    },
    doRegister(req,res){
        let { userName,password,phone } = req.body;
        userModel.doRegister({userName,password,phone},(err,result)=>{
            let response;
            if(err){
                response = {
                    code : 401,
                    msg : '服务器错误'
                }
            }else if(result.affectedRows !==1){
                response = {
                    code : 401,
                    msg : '注册失败'
                }
            }else {
                response = {
                    code : 200,
                    msg : '注册成功'
                }
            }
            res.send(response);
        })
    },
    doLogin(req,res){
        let userName = req.body.userName;
        let password = req.body.password;

        userModel.doLogin(userName,(err,result)=>{
            let response;
            if(err){
                response = {
                    code : 401,
                    msg : '服务器错误'
                }
            }
            else if(!result){
                response = {
                    code : 401,
                    msg : '用户名错误'
                }
            }else if(result.password != password){
                response = {
                    code : 401,
                    msg : '密码错误'
                }
            }else{
                req.session.isLogin = true;
                req.session.currentUserId = result.id;

                response = {
                    code : 200,
                    msg : '登录成功',
                    userId : result.id
                }
            }

            res.send(response)
        })

    },
    isUserLogin(req,res){
        let id = req.query.id;
        // console.log(id,req.session.isLogin,req.session.currentUserId);
        let response = null;
        if(req.session.isLogin && id == req.session.currentUserId){ 
            response = {
                code : 200,
                msg : '用户已经登录过了'
            }
        }else{
            response = {
                code : 401,
                msg : '用户没有登录或者token已经过期'
            }
        }
        res.send(response);
    }
};
module.exports = userController;