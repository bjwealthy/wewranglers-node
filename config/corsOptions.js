
//CORS: to request data from d app from outside the app, 
//such as from a browser console, or to open up API endpoints to every client
//However, we can whitelist just some clients:
const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by dear old CORS'))
        }
    }, 
    optionsSuccessStatus: 200
}

module.exports = corsOptions;