var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leaders = require('../models/leaders');

var leadersRouter = express.Router();

leadersRouter.use(bodyParser.json());

leadersRouter.route('/')

    .get(function (req, res, next) {
        Leaders.find({}, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        });
    })

   .post(function (req, res, next) {
       Leaders.create(req.body, function (err, leader) {
           if (err) throw err;
           console.log('Leader created!');
           res.json(leader);
          
       });
   })

   .delete(function (req, res, next) {
       Leaders.remove({}, function (err, resp) {
           if (err) throw err;
           res.json(resp);
       });
   });

leadersRouter.route('/:leadersId')

   .get(function (req, res, next) {
       Leaders.findById(req.params.leadersId, function (err, leader) {
           if (err) throw err;
           res.json(leader);
       });      
   })

   .put(function (req, res, next) {
       Leaders.findByIdAndUpdate(req.params.leadersId, {
           $set: req.body
       }, {
           new: true
       }, function (err, leader) {
           if (err) throw err;
           res.json(leader);
       });
   })

   .delete(function (req, res, next) {
       Leaders.findByIdAndRemove(req.params.leadersId, function (err, resp) {        if (err) throw err;
           res.json(resp);
       });
   });
module.exports = leadersRouter;
