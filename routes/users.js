var express = require('express');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken'); 
var router = express.Router();
const gravatar = require("gravatar")
const bcrypt = require('bcrypt')
const keys = require("../config/keys")
/* GET users listing. */
router.post('/register', function(req, res, next) {
  Users.findOne({email: req.body.email})
  .then(user=>{
    if(user){
      return res.status(400).json({email: '邮箱已被占用'}) 
    }else{
      const avatar = gravatar.url(req.body.email, {s:'200', r:'pg',d:'mm'})
      const newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      })
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if(err){throw err}
          newUser.password = hash
          newUser.save()
          .then(user=>res.json(user))
          .catch(err=>console.log(err))
        })
      })
    }
  })
});

router.post("/login",(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  res.setHeader("Access-Control-Allow-Origin","*")
  User.findOne({email})
  .then(user =>{
      if(!user){
          return res.json({email:"用户不存在"});  //return res.status(404).json({email:"用户不存在"});
      }
      //密码匹配  使用token
      bcrypt.compare(password,user.password)
      .then(isMatch=>{
          if(isMatch){
            const rule = {id: user.id, name: user.name}
            //用id和name做一个token
            //jwt.sign('规则','加密名字','过期时间','箭头函数')
            console.log(keys);
            jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token)=>{
              if(err){throw err}
              return res.json({
                success: true,
                token: 'dj'+ token
              })
            })
          }else{
              return res.json({password:"密码错误!"});  //return res.status(400).json({password:"密码错误!"});
          }
      })
  })
})

module.exports = router;
