var express = require('express');
const Users = require('../models/Users');
var router = express.Router();
const gravatar = require("gravatar")
const bcrypt = require('bcrypt')
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

module.exports = router;
