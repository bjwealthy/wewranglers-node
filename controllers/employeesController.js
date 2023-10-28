// const data = {
//     employees: require('../model/employees.json'),
//     setEmployees: function(data){
//         this.employees = data
//     }   
// }

const Employee = require('../model/employees')
const bcrypt = require('bcrypt')
const { parse } = require('date-fns')  

const getAllEmployees = async (req, res) => {
    // res.json(data.employees)
    const employees = await Employee.find()
    if(!employees){return res.status(204).json({'message': 'No employee in db'})}
    res.json(employees)
}

const createNewEmployee = async (req, res) => {
    // const newEmployee = {
    //     id: data.employees[data.employees.length - 1].id + 1 || 1,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname
    // }
    // if(!newEmployee.firstname || !newEmployee.lastname){
    //     return res.status(400).json({"message":"first and last names are required"})
    // }

    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(401).json({"message":"first and last names required"})
    }

    try {
        const result = await Employee.create({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
        res.status(201).json({"success": `New employee ${firstname} ${lastname} created`})
    } catch (err) {
        console.error(err)
    }
}


const updateEmployee = async (req, res) => {
    //check if ID is passed
    if(!request?.body?.id){ return res.status(204).json({'message':'id is required to select an employee to update'}) }
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    
    //check if the paased ID has an associated employee
    if(!employee){
        return res.status(400).json(({"message":`No Employee matches ID ${req.body.id}`}))
    }
    if(req.body?.firstname) employee.firstname = req.body.firstname
    if(req.body?.lastname) employee.lastname = req.body.lastname

    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    // const unsortedArray = [...filteredArray, employee]
    // data.setEmployees(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    const result = await employee.save()
    res.json(data.setEmployee)
}

const deleteEmployee = async (req, res) => {
    //check if ID is passed
    if(!request?.body?.id){ return res.status(400).json({'message': 'Employee ID required'}) }
    const employee = await Employee.findOne({_id: req.body.id}).exec()
    //check if ID has an associated employee
    if(!employee){
        return res.status(401).json(`No employee with ID ${id}`)
    }else{
        //no use of exec()
        const result = await Employee.deleteOne({_id: req.body.id})
    }
    res.json(result)
    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    // if(!employee){
    //     return res.status(400).json({"message":`Employee ID ${req.body.id} not found`})
    // }
    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    // data.setEmployees([...filteredArray])
    // res.json(data.employees)
}

const getEmployee = async (req, res) => {
    //check if ID is passed
    if(!request?.bosy.id){ return res.status(400).json({'message': 'Employee ID required'}) }
    const employee = await Employee.findOne({_id: req.params.id}).exec()
    //check if ID has an associated employee
    if(!employee){
        return res.status(401).json(`No employee with ID ${id}`)
    }
    res.json(employee)
    
    
    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    // if(!employee){
    //     return res.status(400).json({"message":`Employee ID ${req.body.id} not found`})
    // }
    // res.json(employee)
}


module.exports = {
    getAllEmployees, createNewEmployee,
    updateEmployee, deleteEmployee, getEmployee
}

// Arun R Saitama Uchiha The 5 drinks ordered by the woman were poisoned. She drank 4 of them. But the poison did not kill her. The man drank one drink but ***it wasn't stated that it was from the 5 that the woman ordered**. All the drinks (including those drunk by the man and the woman) were poisoned. Those drunk by the woman are not lethal, while the only one drunk by the man is lethal. Not all poisons are lethal.