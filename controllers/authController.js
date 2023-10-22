const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data
    }
}

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body
    if(!user || !pwd){
        return res
            .status(400)
            .json({"message":"username and password required"})
    }
    const foundUser = usersDB.users.find(person => person.username === user)
    console.log(foundUser);
    if(!foundUser){
        return res.sendStatus(401) //unauthorized
    }
    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match){
        //create JWTs (Don't pass any sensitive info as d jwt can be grabbed by any1)
        const accessToken = jwt.sign(
            {"username":foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "60s"}
        );

        const refreshToken = jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        );

        //save refresh token in the current user object, to allow logout route, 
        //so as to invalidate refresh token after user logs out
        //-step 1
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
        ////-step 2: add refresh token attrib to d found user
        const currentUser = {...foundUser, refreshToken}
        ////-step 3: add current user to the users array
        usersDB.setUsers([...otherUsers, currentUser])
        ////-step 4: write new users file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        //send refresh token and access token to user, as http-only cookie 
        //so it is not available to JS
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', 
            secure: true, maxAge: 24*60*60*1000})
        //send access token as json, to make it available for frontend dev
        res.json({accessToken})
        // res.json({'success':`user ${user} successfully logged in`})

    }else{
        res.sendStatus(401)
    }
}
module.exports = {handleLogin}
