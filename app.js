require('dotenv').config();
    const express = require('express');
    const expressLayouts = require('express-ejs-layouts');
    const methodOverride = require('method-override');
    const {flash} = require('express-flash-message');
    const session = require('express-session');
    const connectdb = require('./server/config/db');

    const app = express();
    const port = 5000 || process.env.PORT;

    
    connectdb();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(methodOverride('_method'));
    
    app.use(express.static('public'));

    // Express Session
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
  );
  
  // Flash Messages
  app.use(flash({ sessionKeyName: 'flashMessage' }));

    app.use(expressLayouts);
    
    app.set('layout', './layouts/main');
    app.set('view engine', 'ejs');
    
    
    // Routes
    app.use('/index',require('./server/routes/routes'));
    

    

  
    
    // 404 Page
    app.get('*', (req, res) => {
        res.status(404).render('404');
    });


    app.listen(port, () => {
        console.log(`App listeing on port ${port}`);
    });	
