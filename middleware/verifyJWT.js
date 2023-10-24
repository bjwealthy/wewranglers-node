const jwt = require('jsonwebtoken')
require('dotenv').config()

//to be used to protect routes
const verifyJwt = (req, res, next) => {
   const authHeader = req.headers.authorization || req.headers.Authorization 
   //check if we dont av an auth header
   //or even if we have an auth header but it doesn't start with 'Bearer '
   if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
  
   const token = authHeader.split(" ")[1]
   jwt.verify(
    token, process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if(err) return res.sendStatus(403) //invalid token 
        req.user = decoded.userInfo.username
        req.roles = decoded.userInfo.roles
        next()
    }
   )
}

module.exports = verifyJwt