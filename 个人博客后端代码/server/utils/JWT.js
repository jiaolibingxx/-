const jwt = require('jsonwebtoken')
const secret='haha'
const JWT={
    generate(value,expires){
        return jwt.sign(value,secret,{expiresIn:expires})
    },
    verify(token){
        try {
            return jwt.verify(token,secret)
        } catch (err) {
            return false
        }
    }
}
module.exports={
    JWT,
    secret
}