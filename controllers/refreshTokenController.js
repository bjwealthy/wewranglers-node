// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function(data){
//         this.users = data
//     }
// }
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({refreshToken}).exec()
    //const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if(!foundUser) return res.sendStatus(403) //unauthorized
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                    "username": decoded.username,
                    "roles": roles,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '90s'}
            );
            res.json({accessToken})
        }
    )
}
module.exports = {handleRefreshToken}
