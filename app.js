var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const UserRouter = require("./routes/users")
const IndexRouter = require("./routes/index")
const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI
var app = express();
const bodyParser = require('body-parser')
const http=require('http')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.all("*", function (req,res,next) {
  res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    // res.setHeader("Content-Type", "application/json;charset=utf-8");

    res.setHeader("Access-Control-Request-Headers", "Origin, X-Requested-With, content-Type, Accept, Authorization");
    console.log(req.method)
    if (req.method === 'OPTIONS') {
       res.sendStatus(200)
        return
  }
    next();
})

app.use('/', IndexRouter)
app.use('/user', UserRouter)
const server = app.listen(8000, function(){
    const host = server.address().address;
    const port = server.address().port
    console.log(host, port);
    console.log('APP listening ad http://%s:%s',host, port)
})

mongoose.connect(db)
  .then(()=>console.log("MongoDb Connected"))
  .catch(error=>console.log(error))
module.exports = app;
