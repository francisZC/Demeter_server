var express = require('express');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken'); 
var router = express.Router();
const gravatar = require("gravatar")
const bcrypt = require('bcrypt')
const keys = require("../config/keys");
const createToken = require('../utils/createToken');
/* GET users listing. */
router.post('/register', function(req, res, next) {
  const userName = req.body.userName,
  password = req.body.password,
  phoneNumber = req.body.phoneNumber;

  Users.findOne({"userName": userName})
  .then(user=>{
    if(user){
      return res.status(400).json({
        message: '用户名已被占用',
        success: false
    })
    }else{
      const avatar = gravatar.url(req.body.phoneNumber, {s:'200', r:'pg',d:'mm'})
      const newUser = new Users({
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        avatar,
        password: req.body.password
      })
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if(err){throw err}
          newUser.password = hash
          newUser.save()
          .then(
            user=>{
              res.json({
                    success: true,
                    message:'注册成功',
              })
            })
          .catch(err=>console.log(err))
        })
      })
    }
  })
  .catch(error=>{
    console.log('error: ', error)
    return
  })
});

router.post("/login",(req,res)=>{
  const phoneNumber = req.body.phoneNumber;
  const userName = req.body.userName;
  const password = req.body.password;
  Users.findOne({"userName": userName})
  .then(user =>{
      if(!user){
          return res.json(
            {
              msg:"用户不存在",
              success: false
            });  //return res.status(404).json({email:"用户不存在"});
      }
      //密码匹配  使用token
      bcrypt.compare(password,user.password)
      .then(isMatch=>{
          if(isMatch){
            const rule = {id: user.id, name: user.name}
            
            //用id和name做一个token头函数')
            let _token = createToken(rule);
            user.token = _token;
            console.log(user.save());
            user.save(error => {
              console.log(error);

              if(error){
                console.log('error: '+ error + 'token');
              }
            })
            
            if(user){
              res.send({
                success:true,
                message:'登录成功',
                token: _token
              })
            }else{
              res.send({
                success: false,
                message:"登录失败"
              })
            }


          }else{
              return res.json({password:"密码错误!"});  //return res.status(400).json({password:"密码错误!"});
          }
      })
  })
})

module.exports = router;
