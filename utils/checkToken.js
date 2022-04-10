const jwt = require('jsonwebtoken')
const key = require('../config/keys')

module.exports = function (req, res, next){} {
    let token = req.body.token|| req.query.token||req.header['authorization']
    if(token){
        let decoded = jwt.decode(token, key)
        if(token && decoded.exp <= new Date()/1000){
            return res.json({
                success: false,
                message:'token expired'
            })
        }else{
            return res.status(403).send({
                success: false,
                message: 'no token'
            })
        }
    }
}