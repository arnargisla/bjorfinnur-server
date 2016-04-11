'use strict';

var express = require('express');
var router = express.Router();

var validate = require('../lib/validate.js');

/* GET /form */
router.get('/', function(req, res) {
  res.render('form', { title: 'Bjorfinnur' });
});

/* POST /form */
router.post('/', function(req, res) {



  var thereAreNoErrors = true;
  // errorcheck name
  var nameErrorMessage;
  if(!req.body.nameText){
    nameErrorMessage = 'Nafn vantar.';
    thereAreNoErrors = false;
  } else if(!validate.length(req.body.nameText, 3)){
    nameErrorMessage = 'Nafn þarf að vera að minnsta kosti 3 stafir.';
    thereAreNoErrors = false;
  }

  // errorcheck email
  var emailErrorMessage;
  if(!req.body.email){
    emailErrorMessage = 'Netfang vantar.';
    thereAreNoErrors = false;
  } else if(!validate.isEmail(req.body.email)){
    emailErrorMessage = 'Netfang er ekki á réttu formi.' +
      'Dæmi um netfang á rettu formi er jon@island.is.';
    thereAreNoErrors = false;
  }

  // errorcheck address
  var addressErrorMessage;
  if(!req.body.address){
    addressErrorMessage = 'Heimilisfang vantar.';
    thereAreNoErrors = false;
  }else if(!validate.address(req.body.address)){
    addressErrorMessage = 'Heimilisfang er ekki á réttu formi.' +
      'Dæmi um heimilisfang á rettu formi er Látrabjarg 42.';
    thereAreNoErrors = false;
  }

  // errorcheck type
  var typeErrorMessage;
  var validTypes = ['fjolbyli', 'tvibyli', 'einbyli', undefined];
  if(!validate.oneOf(req.body.hometype, validTypes)){
    typeErrorMessage = 'Obbobbobb, ekki setja vitlausa heimilistegund inn.';
    thereAreNoErrors = false;
  }

  // errorcheck phonenumber
  var phonenumberErrorMessage;
  if(!validate.phonenumber(req.body.phone)){
    phonenumberErrorMessage = 'Símanúmer ekki á réttu formi.';
    thereAreNoErrors = false;
  }

  var data = {
    title: 'INFO: Industrial National Form Operation!',
    nameText: req.body.nameText,
    nameTexterror:  nameErrorMessage,
    email: req.body.email,
    emailerror: emailErrorMessage,
    address: req.body.address,
    addresserror: addressErrorMessage,
    fjolbyliChecked: req.body.hometype === 'fjolbyli',
    tvibyliChecked: req.body.hometype === 'tvibyli',
    einbyliChecked: req.body.hometype === 'einbyli',
    typeerror: typeErrorMessage,
    phone: req.body.phone,
    phoneerror: phonenumberErrorMessage,
    successMessage: ''
  };


  if(thereAreNoErrors){
    data.successMessage = 'Flott! öll gögnin eru á réttu formi!';
  }

  res.render('form', data);
});

module.exports = router;
