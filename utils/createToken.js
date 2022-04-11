const jwt = require('jsonwebtoken')
const keys = require("../config/keys")

/**
 *      payload: string | Buffer | object,
        secretOrPrivateKey: Secret,
        options?: SignOptions,
 */
module.exports = function (user_id) {
    const token = jwt.sign({
        user_id: user_id
    },
    keys.secretOrKey,{
        expiresIn: 60
    })
    return token
}