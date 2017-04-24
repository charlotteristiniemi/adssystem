var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session')

var index = require('./routes/index');

var server = express();


// View setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');


// Middleware
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
server.use(bodyParser.json());
server.use(session({ secret: 'itssosecret', resave: false, saveUninitialized: false }));
server.use(expressValidator());

// Log all /GET, /POST, /PUT request
server.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// Routes
server.use('/', index);


// Start Server
var server = server.listen(3000,function(){
  console.log("Listening to port %s",server.address().port);
});