const mongoose = require('mongoose')
const Schema = mongoose.schema;

const employeeSchema = new Schema({
    firstname: {
        type: string,
        required: true
    },
    lastname: {
        type: string,
        required: true
    }
})
//create a model using employeeSchema, name it 'Employee'
//by def: mongoose will look for an 'employees' collectn in mongoDB
//Mongoose automatically looks for the plural, lowercased version of your model name
module.exports = mongoose.model('Employee', employeeSchema)