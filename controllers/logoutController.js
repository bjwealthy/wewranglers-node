const User = require('../model/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
   
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data
    }
}


const handleLogout = async (req, res) => {
    //on client, also delete the access token
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204) //no content 
    const refreshToken = cookies.jwt

    //is refresh token in db? 
    const foundUser = await User.findOne({refreshToken}).exec()
    if(!foundUser){
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
        return res.sendStatus(204)
    }
    
    //delete the refresh token in db
    /*
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = {...foundUser, refreshToken: ''}
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
        path.join(__dirname,'..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    )
    */

    //delete refresh token in DB
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})   //secure: true: only serves on https
    res.sendStatus(204)
}
module.exports = {handleLogout}
