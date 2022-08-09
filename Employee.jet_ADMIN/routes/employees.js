const passport = require('passport');
const router = require('express').Router();
const employeeController = require(`../controller/employeeController`);

// Rendering employees page
router.get('/', passport.checkAuthentication ,  employeeController.renderEmployees);

// rendering add new employee page
router.get('/renderAddNew', passport.checkAuthentication ,  employeeController.renderAddEmployeeForm);

// Adding new employee
router.post('/addNew', passport.checkAuthentication ,  employeeController.addNewEmployee);

// removing employee from organization
router.get('/remove/:id', passport.checkAuthentication ,  employeeController.remove);

// Show employee profile
router.get('/showDetails/:id', passport.checkAuthentication ,  employeeController.showProfile);

module.exports = router;