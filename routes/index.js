var express = require('express');
var router = express.Router();
var connection = require('../connection');

connection.connect(); //connect to database

/* 
 * GET home page
 */

router.get('/', function(req, res) {
	res.render('index', {title: 'Välkommen till mitt annonssystem'})
});


/* 
 * GET subscriber number
 */

router.get('/subscriber', function(req, res) {
	res.render('subscriber', {title: 'Ange ditt prenumerationsnummer', error: ''})
});


module.exports = router;