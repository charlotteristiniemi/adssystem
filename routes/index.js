var express = require('express');
var request = require('request');
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


/* 
 * POST subscriber number, GET from subscribersystem
 */

router.post('/subscriber', function(req, res) {
	var subNr = req.body.subscribernumber;

	request('http://localhost:4000/getSubscriberData/'+subNr, function (err, res, body) {
	  if (err) console.log(err);

	  if (res.statusCode === 404) {
			
	  }
	  else {
	  	var data = JSON.parse(body);
	  	// console.log(data.pr_namn);
	  }
	});
});


module.exports = router;



/* 
 * POST Request to subscriber system
 */

/*
	request.post({
		url:'http://localhost:4000/getSubscriberData/'+subNr
	}, 
	function(err, res, body) {
		if (err) console.log(err);
	  
	  var data = JSON.parse(body);

	  if (res.statusCode === 404) {
			
	  }
	  else {

	  }
	});
*/