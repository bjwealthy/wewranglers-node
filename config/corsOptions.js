
//CORS: to request data from d app from outside the app, 
//such as from a browser console, or to open up API endpoints to every client
//However, we can whitelist just some clients:
const whitelist = [
    'https://westernwranglers.com', 
    'https://www.google.com', 
    'https://www.somefrontend.com', 
    'http://127.0.0.1',
    'http://localhost:3500' 
]
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
            console.log('good')
        }else{
            callback(new Error('Not allowed by dear old CORS'))
        }
    }, 
    optionsSuccessStatus: 200
}

module.exports = corsOptions;