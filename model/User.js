const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
})
//create a model using employeeSchema, name it 'Employee'
//by def: mongoose will look for an 'employees' collectn in mongoDB
//Mongoose automatically looks for the plural, lowercased version of your model name
module.exports = mongoose.model('Employee', userSchema)