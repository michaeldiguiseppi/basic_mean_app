var express = require('express');
var router = express.Router();
var Student = require('../models/students');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

router.get('/', function(req, res, next) {
  Student.find()
    .then(function(students) {
      res.status(200).json({
        status: 'success',
        data: students,
      });
    })
    .catch(function(err) {
      return next(err);
    });
});

router.get('/:id', function(req, res, next) {
  Student.findOne({_id: req.params.id})
    .then(function(student) {
      res.status(200).json(student);
    })
    .catch(function(err) {
      return next(err);
    });
});

router.post('/', function(req, res, next) {
  var student = new Student(req.body);
  student.save()
    .then(function(student) {
      res.status(200).json(student);
    })
    .catch(function(err) {
      return next(err);
    });
});

router.put('/:id', function(req, res, next) {
  var studentID = req.params.id;
  Student.findByIdAndUpdate(studentID, req.body, {new: true})
    .then(function(student) {
      res.status(200).json({
        status: 'success',
        data: student
      });
    })
    .catch(function(err) {
      return next(err);
    });
});

router.delete('/:id', function(req, res, next) {
  Student.findByIdAndRemove(req.params.id)
    .then(function(student) {
      res.status(200).json(student);
    })
    .catch(function(err) {
      return next(err);
    });
});

module.exports = router;
