const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const employeeController = require('../controllers/employeeController');

// Home Routes
router.get('/index', customerController.homepage);
router.get('/about', customerController.about);

// Customer Routes
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);
router.get('/view/:id', customerController.view);
router.get('/edit/:id', customerController.edit);
router.put('/edit/:id', customerController.editPost);
router.delete('/edit/:id', customerController.deleteCustomer);
router.post('/search', customerController.searchCustomers);

// Employee Routes
router.get('/employee', employeeController.employee);
router.get('/login', employeeController.login);



module.exports = router;