const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const employeeController = require('../controllers/employeeController');






// function isAuthenticated(req, res, next) {

//     const email = req.body.email;

//     req.session.userName = email;
//     if (req.session && req.session.userName) {
//        res.redirect('/loging');
//     }
//     res.redirect('/log');
//   }



// Home Routes
router.get('/',  customerController.homepage);
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
router.get('/log', employeeController.log);
router.get('/register', employeeController.register);
router.post('/register', employeeController.postEmployee);
router.post('/loging', employeeController.loging);
router.get('/',  employeeController.homepage);
router.get('/employee/show/:id', employeeController.show);
// router.get('/employee/update/:id', employeeController.update);





module.exports = router;