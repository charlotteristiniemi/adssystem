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


/* 
 * PUT Change subscriberData view
 */

router.put('/changeSubscriberData', function(req, res) {
	var id = req.session.subscriber.pr_id;

	//validation
  req.assert('namn','Namn måste fyllas i').notEmpty();
  req.assert('telefon','Telefonnummer måste fyllas i').notEmpty();
  req.assert('utdelningsadress','Utdelningsaddress måste fyllas i').notEmpty();
  req.assert('postnummer','Postnummer måste fyllas i').notEmpty();
  req.assert('ort','Ort måste fyllas i').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    res.status(400).json(errors);
    return;
  }

	var input = req.body;

	var data = {
 		namn 							: input.namn,
 		telefon						: input.telefon,
 		utdelningsadress 	: input.utdelningsadress,
 		postnummer	 			: input.postnummer, 
 		ort  							: input.ort
 	};

 	request({
    method: 'PUT',
    url:'http://localhost:4000/putSubscriberData/'+data.namn+'/'+data.telefon+'/'+data.utdelningsadress+'/'+data.postnummer+'/'+data.ort+'/'+id
	}, 
	function(error, response, body) {
		if (error) console.log(error);

	  if (response.statusCode === 404) {
	  	console.log('Error, update went wrong.. status code 404 not found');
	  }
	  else {
	  	var data = JSON.parse(body);
	  	req.session.subscriber = data;

	  	connection.query( "SELECT * FROM tbl_annonsorer WHERE an_pr_id = '" + data.pr_id + "'", function (err1, row1, field1) {
	 			if (err1) console.log(err1);

	  		if (row1[0] == undefined) {
	  			connection.query( "INSERT INTO tbl_annonsorer(an_namn, an_telefon, an_utdelningsadress, an_postnummer, an_ort, an_is_foretag, an_pr_id) "+
						"VALUES ('"+data.pr_namn+"', "+data.pr_telefon+", '"+data.pr_utdelningsadress+"', "+data.pr_postnummer+", '"+data.pr_ort+"', 0, "+data.pr_id+");", function (err2, row2, field2){
						if (err2) console.log(err2);
						res.sendStatus(200);
					});
	  		}
	  		else {

	  			connection.query( "CALL UpdateAnnonsor('"+data.pr_namn+"', '"+data.pr_utdelningsadress+"', "+data.pr_postnummer+", '"+data.pr_ort+"', "+data.pr_telefon+", "+data.pr_id+")", function(err3, row3, field3) {
	  				if (err3) console.log(err3);
	  				res.sendStatus(200);
	  			});
	  		}
	  	});
	  }
	});
});


/* 
 * GET Ad id
 */

router.get('/getAdId', function(req, res) {
	var id = req.session.subscriber.pr_id;
	connection.query( "SELECT an_id FROM tbl_annonsorer WHERE an_pr_id = "+id, function(err, row, field) {
		if (err) console.log(err);
		var id = row[0].an_id;
		res.redirect('makeAd/'+id);
	});
});

/* 
 * GET Make ad view
 */

router.get('/makeAd/:id', function(req, res) {
	var id = req.params.id;
	connection.query( "SELECT an_is_foretag, an_id FROM tbl_annonsorer WHERE an_id = "+id, function(err, row, field) {
		res.render('makeAd', { annonsor: row});
	});
});


/* 
 * POST Ad
 */

router.post('/makeAd', function(req, res) {
	
	//validation
  req.assert('id','Id måste fyllas i').notEmpty();
  req.assert('rubrik','Rubrik måste fyllas i').notEmpty();
  req.assert('innehall','Innehåll måste fyllas i').notEmpty();
  req.assert('pris','Pris måste fyllas i').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    res.status(400).json(errors);
    return;
  }

	var ad = req.body;

	connection.query( "CALL InsertAd("+ad.id+", '"+ad.rubrik+"', '"+ad.innehall+"', "+ad.pris+");", function(err, row, field) {
		if (err) console.log(err);

		res.sendStatus(200);
	});
});


/* 
 * GET Company
 */

router.get('/company', function(req, res) {
	res.render('company');
});



module.exports = router;

