require('dotenv').config()
express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')

//db connection config
const mongoose = require('mongoose')
const connectDB = require('./config/dbcon')
connectDB();

const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')

const cors = require('cors')
const corsOptions = require('./config/corsOptions')

//CUSTOM MWs must be placed before every other route
app.use(logger)

//handle options credentials check - before CORS!
//and fetch cookies credentials requireement
app.use(credentials)

app.use(cors(corsOptions ))

// Builtin MWs: don't need a call to next()
//1. to apply MWs to all routes coming in. Putting it above all routes 
//will make it applicable to them all. It s used to extract url data from forms
app.use(express.urlencoded({extended: false}))

//2. Builtin MW to extract parameters from JSON data. It also applies to all routes under it
app.use(express.json())

//3. MW for cookies
app.use(cookieParser())

//3. Builtin MW to serve static files. Express will search the public directory for requests 
//before moving to other routes
app.use('/', express.static(path.join(__dirname, '/public')))

//root route
app.use('/', require('./routes/root'))
//register route
app.use('/register', require('./routes/register'))
//auth route
app.use('/auth', require('./routes/auth'))
//refresh route
app.use('/refresh', require('./routes/refresh'))
//logout route
app.use('/logout', require('./routes/logout'))

//employees route
app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'))



//chaining route handlers
// const one = (req, res, next) => {
//     console.log('one')
//     next()
// }

// const two = (req, res, next) => {
//     console.log('two')
//     next()
// }

// const three = (req, res) => {
//     console.log('three')
//     res.send('finished')
// }

// // to use all 3 fxns in a route
// app.get('/chain(.html)?', [one, two, three,])




//COMPARING app.use() and app.all()
//app.use() does not accept REGEX and is most likely to be used for MWs
//app.all() is used for routing and so is mostly applied to all http methods, and it accpts REGEX

//catch all unregistered routes
// app.all('*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
// });


//catch all uncaught routes
app.get('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
}else if(req.accepts('json')){
    res.json({error: '404 not found'})
}else{
    res.type('txt').send('404 not found!')
}
})
    
//custom error handling with MW
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB')
    //server listens; after successful connection to DB
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    
    })
})


 

