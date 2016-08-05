var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
        .get(function (req, res, next) {
            Promotions.find({}, function (err, Promotion) {
                if (err) throw err;
                res.json(Promotion);
            });
        })

        .post(function (req, res, next) {
            Promotions.create(req.body, function (err, Promotion) {
               if (err) throw err;
                console.log('Created Promo');
                res.json(Promotion);
            });
        })

        .delete(function (req, res, next) {
            Promotions.remove({}, function (err, resp) {
               if(err) throw err;
               console.log('Promo delete');
                res.json(resp);
            });
        });

    promoRouter.route('/:promoId')

        .get(function (req, res, next) {
            Promotions.find(req.params.promoId, function (err, Promotion) {
                if (err) throw err;
                res.json(Promotion);
            });
        })

        .put(function (req, res, next) {
            Promotions.findByIdAndUpdate(req.params.promoId, {
                $set: req.body
            }, {
                new: true
            }, function (err, Promotion) {
                if (err) throw err;
                res.json(leader);
            });
        })

        .delete(function (req, res, next) {
            Promotions.findByIdAndRemove(req.params.promoId ,function (err , resp) {
                if (err) throw err;
                res.json(resp);
            });
        });

module.exports = promoRouter;
