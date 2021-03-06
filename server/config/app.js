let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//Authentification  odules
let session= require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let localStrategy = passportlocal.Strategy;
let flash = require('connect-flash');


//DB setup
let mongoose = require('mongoose');
let DB = require('./db');


//point mongoose to the DB URI
mongoose.connect(DB.URI,{useNewUrlParser:true, useUnifiedTopology: true });
let mongoDB=mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error:'));
mongoDB.once('open',()=>{
  console.log('Connected to MongoDB');
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactRouter=require('../routes/contacts');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');// Express -e generator for EJS templating engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));// after adding jquery,bootstra[ etc] to access node modules by default

//Setup express session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));

//initialize flash
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());


//passport user configuration

//Create a user model Instanced
let userModel = require('../models/user');
let User= userModel.User;

//serialize and deserialize the USer info


//Implement a User Authenticarion Strategy
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-list',contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Contact'});
});

module.exports = app;
