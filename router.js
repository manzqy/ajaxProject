const express = require('express');
const router = express.Router();
const userController = require('./controller/userController');
const heroController = require('./controller/heroController');
const fileController = require('./controller/fileController');

router.get('/',(req,res)=>{ res.redirect(301,'./views/staticlist.html') })
.get('/talkToServer',(req,res)=>{ res.send('服务器正常开启中...'); })
.get('/getCodeWithoutPhone',userController.getCodeWithoutPhone)
.get('/getCodeWithPhone',userController.getCodeWithPhone)
.get('/isUserNameExist',userController.isUserNameExist)
.post('/doRegister',userController.doRegister)
.post('/doLogin',userController.doLogin)
.get('/isLogin',userController.isUserLogin)
.post('/getAllHero',heroController.getAllHero)
.post('/uploadHeadImg',heroController.uploadHeadImg)
.post('/addNewHero',heroController.addNewHero)
.get('/getHeroById',heroController.getHeroById)
.post('/eidtHeroById',heroController.eidtHeroById)
.get('/deleteHeroById',heroController.deleteHeroById)
.get('/getJson',fileController.getJson)
.get('/getRandomJocke',fileController.getRandomJocke)
.get('/getXML',fileController.getXML)


module.exports = router;