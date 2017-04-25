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

	request('http://localhost:4000/getSubscriberData/'+subNr, function (error, response, body) {
	  if (error) console.log(error);

	  if (response.statusCode === 404) {
	  	res.render('subscriber', {title: 'Ange ditt prenumerationsnummer', 
	  		error: 'Ingen prenumerant med det prenumerationsnummret hittades'});
	  }
	  else {
	  	var data = JSON.parse(body);
	  	req.session.subscriber = data;
	  	res.redirect('/subscriberData');
	  }
	});
});


/* 
 * GET subscriberData view
 */

router.get('/subscriberData', function(req, res) {
	var sub = req.session.subscriber;
	// req.session.destroy();
	res.render('subscriberData', { subscriber: sub})
});

/* 
 * GET Change subscriberData view
 */

router.get('/changeSubscriberData', function(req, res) {
	var sub = req.session.subscriber;
	res.render('changeSubscriberData', { subscriber: sub})
});

/*NÄR MAN GÅR VIDARE MÅSTE SESSION TAS BORT...*/


router.post('changeSubscriberData', function(req, res) {
	console.log('req.body.namn: '+req.body.namn);
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