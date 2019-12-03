const express = require('express');
const app = express();
const port = 8080;

const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');

app.listen(port, () => {
    console.log(`server is running on : http://127.0.0.1:${port}`);
})

let allow = function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Access-Control-Allow-Headers','Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
}
app.use(allow);


app.use('/static',express.static('static'));
app.use('/views',express.static('views'));
app.use('/fileData',express.static('fileData'));
app.use('/ajaxCode',express.static('ajaxCode'));

app.use(session({
    secret : '一个随便的字符串',
    resave : false,
    saveUninitialized : false
}));

app.use(bodyParser.urlencoded({ extended: false }));


app.use(router);