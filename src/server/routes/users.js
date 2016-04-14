var express = require('express');
var router = express.Router();
var User = require('../models/users');
var moment = require('moment');
var jwt = require('jwt-simple');

// register
router.get('/register', function(req, res, next) {
  // ensure user does not already exist
    User.findOne({email: req.body.email}, function(err, existingUser) {
      if (err) return next(err);
      if (existingUser) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exists.'
        });
      }
    });
    // create a new user
    var newUser = new User(req.body);
    newUser.save(function() {
      // create token
      // var token = ?????
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: user,
        }
      });
    });
});

// login
router.get('/login', function(req, res, next) {

});

// log out
router.get('/logout', function(req, res, next) {

});


module.exports = router;
