const Employee = require('../models/Employee');
const mongoose = require('mongoose');

// employee page load
exports.employee = async (req, res) => {
  const messages = await req.consumeFlash('info');
  const locals = {
    title: 'Employee',
    description: 'User Management System'
  }

  try {
    
    res.render('employee', { locals } );
  } catch (error) {
    console.log(error);
  }
}

exports.login= async (req, res) => {
  const locals = {
    title: 'About',
    description: 'User Management System'
  }

  try {
    res.render('login', locals );
  } catch (error) {
    console.log(error);
  }
}


