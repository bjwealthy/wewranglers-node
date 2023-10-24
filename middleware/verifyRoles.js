//to pass in as many params as we wish to a fxn, use d spread operator
const verifyRoles = (...allowedRoles) => {
    return ( req, res, next ) => {
        if(!req?.roles) return res.sendStatus(401);
    /*    
        //1. roles that are passed in to be allowed
        const rolesArray = [...allowedRoles]
        console.log(rolesArray)
        //2. user roles coming from jwt
        console.log(req.roles)
    */   
        //check if any of the roles match
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)
        //if no roles match send unauthorised 
        if(!result) return res.sendStatus(401)

        //if any of the roles match, allow the route be accessed
        next()
    }
}
module.exports = verifyRoles