const usersDB = {
    //bring in users.json
    users: require('../model/users.json'),
    //populate users.json
    setUsers: function(data){
        this.users = data
    }
}

const fsPromises = require('fs').promises;
const jwt = require('jsonwebtoken')
const path = require('path')
const bcrypt = require('bcrypt')

//create user accout
const handleNewUser = async (req, res) => {
    console.log(usersDB.users)
    const {user, pwd} = req.body;
    if(!user || !pwd){
        return res.status(400).json({"message": "username and pw required!"})
    }
    const duplicate = usersDB.users.find(person => person.username === user)
    if(duplicate){
         return res.sendStatus(409)  
    }
    try {
        //encrypt password
        const hashedPwd = await bcrypt.hash(pwd, 10)
        //create new user 
        const newUser = {"username": user, "password": hashedPwd}
        //store new user inside usersDB object
        usersDB.setUsers([...usersDB.users, newUser])
        //write the new object userDB (with the latest user) to d users.json file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'), 
            JSON.stringify(usersDB.users)
        )

        console.log(usersDB.users)
        //display json response
        res.status(201).json({"success": `New user ${user} created successfully`})
        
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}; 
module.exports = {handleNewUser};