'use strict';

var validate = { };

validate.isEmail = function (email) {
  if(!email) {
    return false;
  }
  if(!/(^\S+@\S+\.\S+$)/.exec(email)){
    return false;
  }
  return true;
};

validate.required = function (s) {
  if(!s) {
    return false;
  }
  return true;
};

validate.length = function (s, n) {
  if(!s) {
    return false;
  }
  if(n <= s.length){
    return true; 
  }
  return false;
};

validate.address = function (s) {
  if(!s) {
    return false;
  }
  var match = s.match(/(^([a-záéíóúýþæð])+\s(\d)+$)/i);
  if(!match) {
    return false;
  }
  return match.length > 0;
};

validate.oneOf = function (s, array) {
  if(!array) {
    return false;
  }

  return array.reduce(function(acc, item){
    if(item===s) {
      return true;
    }
    return acc;
  }, false);
};

validate.phonenumber = function (s) {
  if(!s){
    return false;
  }

  if((typeof s) === 'number'){
    if(3999999 < s && s < 9000000){
      return true;
    }
    return false;
  }

  // check if the first digit is not 4, 5, 6, 7, or, 8
  var firstLetter = s.split('')[0];
  if(!/[45678]/.exec(firstLetter)){
    return false;
  }

  // check weather s has anything other than digits, space
  // and -s's
  if(!/^[\d-' ']+$/.exec(s)){
    return false;
  }

  // count the numbers
  var numberCount = s.split('').filter(
    function(s){
      if(/\d/.exec(s)){
        return true;
      }
    })
  .length;

  // check if there are the correct amount of digits
  if(numberCount !== 7){
    return false;
  }

  return true;


};

module.exports = validate;

