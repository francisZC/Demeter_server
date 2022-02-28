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
app.use('/', IndexRouter)
app.use('/user', UserRouter)

const server = app.listen(3000, function(){
    const host = server.address().address;
    const port = server.address().port
    console.log(host, port);
    console.log('APp listening ad http://%s:%s',host, port)
})

mongoose.connect(db)
  .then(()=>console.log("MongoDb Connected"))
  .catch(error=>console.log(error))
module.exports = app;
