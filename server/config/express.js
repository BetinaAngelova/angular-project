const express = require('express');
const cors = require('cors');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'main' }));
    app.set('view engine', '.hbs');

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({
        secret: 'taina!@#$%',
        resave: false, saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors());

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;

            res.locals.user.isInRole('Admin').then(isAdmin => {
                res.locals.isAdmin = isAdmin;
            })
        }
        next();
    });

    app.use(express.static('public'));
    console.log('Express ready!');
}



// index.js
//require('./server/config/express')(app)