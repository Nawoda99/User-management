const Employee = require('../models/Employee');
const mongoose = require('mongoose');

// employee page load
exports.employee = async(req, res) => {
   const locals = {
      title: 'UMS',
      description: 'User Management System'
  }
   
  let perPage = 15;
  let page = req.query.page || 1;

  try {
    const employees = await Employee.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(); 
    const count = await Employee.count();

    res.render('employee', {
      locals,
      employees,
      current: page,
      pages: Math.ceil(count / perPage),
      
    });

  } catch (error) {
    console.log(error);
  }
}




// exports.employee = async (req, res) => {
  
//   const locals = {
//     title: 'Employee',
//     description: 'User Management System'
//   }

//   try {
    
//     res.render('employee', { locals } );
//   } catch (error) {
//     console.log(error);
//   }
// }

exports.log= async (req, res) => {
  
  const locals = {
    title: 'Login',
    description: 'User Management System'
  }

  try {
    res.render('log',{showSidebar: false } );
  } catch (error) {
    console.log(error);
  }
}


exports.register= async (req, res) => {
  const locals = {
    title: 'Register',
    description: 'User Management System'
  }

  try {
    res.render('register', locals );
  } catch (error) {
    console.log(error);
  }
}

/**
 * POST /
 * Create New 
 */
exports.postEmployee = async (req, res) => {
  console.log(req.body);
  
  const newEmployee = new Employee({
    
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  try {
    await Employee.create(newEmployee);
    req.flash('success', 'Registration successful! You can now log in.');
    res.redirect('/log');
   
    

    
  } catch (error) {
    console.log(error);
  }
};








async function verifyLogin(email, password) {
  try {
    const employee = await Employee.findOne({ email });

    if (employee && employee.password === password) {
      return true;
      
    } else {
      return false;
    }
    
  } catch (error) {
    console.error('Error during login verification:', error);
    return false;
  }
}



// Handle the login form submission
exports.loging = async (req, res) => {

  
  const { email, password } = req.body;

  if (await verifyLogin(email, password)) {

    
    
    req.session.isAuthenticated = true;
    
    
    res.redirect('/');
    
  } else {
    req.flash('error', 'Invalid email or password.');
    res.redirect('/log');
    
  }
};




exports.about = async (req, res) => {
    const locals = {
      title: 'About',
      description: 'User Management System'
    }

    try {
      res.render('about', locals );
    } catch (error) {
      console.log(error);
    }
}


/**
 * GET /
 * Employee Data 
*/
exports.show= async (req, res) => {
  
  try {
    const employee = await Employee.findOne({ _id: req.params.id })

    const locals = {
      title: "View Employee Data",
      description: "User Management System",
    };

    res.render('employee/show', {
      locals,
      employee
    })

  } catch (error) {
    console.log(error);
  }

}

/**
 * GET /
 * Edit Data 
*/
// exports.update = async (req, res) => {
//   try {
//     const employee = await Employee.findOne({ _id: req.params.id })

//     const locals = {
//       title: "Edit Employee Data",
//       description: "User Management System",
//     };

//     res.render('/employee/update', {
//       locals,
//       employee
//     })

//   } catch (error) {
//     console.log(error);
//   }

// }


exports.homepage = async(req, res) => {

 
  const locals = {
      title: 'UMS',
      description: 'User Management System'
  }
   
  let perPage = 15;
  let page = req.query.page || 1;

  try {
      const customers = await Customer.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(); 
    const count = await Customer.count();

    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages
      
    });
    

  } catch (error) {
    console.log(error);
  }
}