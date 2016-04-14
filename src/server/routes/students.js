var express = require('express');
var router = express.Router();
var Students = require('../models/students');


router.get('/', function(req, res, next) {
  Students.find(function(err, students) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      status: 'success',
      data: students,
    });
  });
});

router.get('/:id', function(req, res, next) {
  Students.findOne({_id: req.params.id}, function(err, student) {
    res.status(200).json(student);
  });
});

router.post('/', function(req, res, next) {
  var student = new Students(req.body);
  student.save(function(err, saved) {
    res.status(200).json(saved);
  });
});

router.put('/:id', function(req, res, next) {
  Students.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    year: req.body.year
  }, {new: true}, function(err, student) {
    res.status(200).json(student);
  });
});

router.delete('/:id', function(req, res, next) {
  Students.findByIdAndRemove(req.params.id, {new: true}, function(err, student) {
    res.status(200).json(student);
  });
});

module.exports = router;
