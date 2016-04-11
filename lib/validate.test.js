'use strict';

var chai = require('chai');
chai.should();

var validate = require('./validate');

describe('Validate', function () {
  /* jshint expr:true */

  describe('Email', function () {
    it('shouldn\'t allow empty string', function () {
      validate.isEmail('').should.be.false;
    });

    it('shouldn\'t allow \'a.c\'', function () {
      validate.isEmail('a.c').should.be.false;
    });

    it('shouldn\'t allow \'arnar\'', function () {
      validate.isEmail('arnar').should.be.false;
    });

    it('should allow a valid email test@test.com', function () {
      validate.isEmail('test@test.com').should.be.true;
    });

    it('should allow a valid email a@a.c', function () {
      validate.isEmail('a@a.c').should.be.true;
    });
  });

  describe('required', function () {
    it('shouldn\'t allow empty string', function () {
      validate.required('').should.be.false;
    });
    
    it('shouldn\'t allow null', function () {
      validate.required(null).should.be.false;
    });

    it('shouldn\'t allow undefined', function () {
      validate.required(undefined).should.be.false;
    });

    it('should allow a string asdf', function () {
      validate.required('asdf').should.be.true;
    });
  });

  describe('length', function () {
    it('shouldn\'t allow the empty string with n=1', function () {
      validate.length('', 1).should.be.false;
    });

    it('shouldn\'t allow "arnar" with n=10', function () {
      validate.length('arnar', 10).should.be.false;
    });

    it('should allow "arnar" with n=3', function () {
      validate.length('arnar', 3).should.be.true;
    });

    it('should allow "arnar" with n=5', function () {
      validate.length('arnar', 5).should.be.true;
    });
  });

  describe('address', function () {
    it('shouldn\'t allow the empty string', function () {
      validate.address('').should.be.false;
    });

    it('shouldn\'t allow the string "arnar"', function () {
      validate.address('arnar').should.be.false;
    });

    it('shouldn\'t allow the string "Stigahlíð 30 31"', function () {
      validate.address('Stigahlíð 30 31').should.be.false;
    });

    it('should allow the string "arnar 123"', function () {
      validate.address('arnar 123').should.be.true;
    });

    it('should allow the string with icelandic chars "stigahlíð 30"', 
      function () {
      validate.address('stigahlíð 30').should.be.true;
    });

    it('should allow the string with capital letters "Stigahlíð 30"', 
      function () {
      validate.address('Stigahlíð 30').should.be.true;
    });
  });

  describe('oneOf', function () {
    it('shouldn\'t allow s="arnar" with array=["Jón"]', function () {
      validate.oneOf('arnar', ['Jón']).should.be.false;
    });

    it('should allow s=\'arnar\' with array=[\'arnar\']', function () {
      validate.oneOf('arnar', ['arnar']).should.be.true;
    });

    it('should allow s=\'arnar\' with array=[\'Steinþór\', \'arnar\']', 
      function () {
      validate.oneOf('arnar', ['Steinþór', 'arnar']).should.be.true;
    });

    it('should allow s=null with array=[null]', function () {
      validate.oneOf(null, [null]).should.be.true;
    });

    it('should allow s=undefined with array=[undefined]', function () {
      validate.oneOf(undefined, [undefined]).should.be.true;
    });
  });

  describe('phonenumber', function () {
    it('shouldn\'t allow \'9999999\'', function () {
      validate.phonenumber('9999999').should.be.false;
    });

    it('shouldn\'t allow \'3999999\'', function () {
      validate.phonenumber('3999999').should.be.false;
    });

    it('shouldn\'t allow \'555+5555\'', function () {
      validate.phonenumber('555+5555').should.be.false;
    });

    it('shouldn\'t allow \'555555\'', function () {
      validate.phonenumber('555555').should.be.false;
    });

    it('shouldn\'t allow \'arnar\'', function () {
      validate.phonenumber('arnar').should.be.false;
    });

    it('should allow \'555-5555\'', function () {
      validate.phonenumber('555-5555').should.be.true;
    });

    it('shouldn\'t allow 1111111', function () {
      validate.phonenumber(1111111).should.be.false;
    });

    it('shouldn\'t allow 9000000', function () {
      validate.phonenumber(9000000).should.be.false;
    });

    it('should allow 5555555', function () {
      validate.phonenumber(5555555).should.be.true;
    });

    it('should allow \'555 5555\'', function () {
      validate.phonenumber('555 5555').should.be.true;
    });
  });
});
