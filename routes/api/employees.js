//router for employee
const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController')

//instead of doing router.get(), router.put() and router.post() separately:
router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee)


module.exports = router;