var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Favorites = require('../models/favorites');

//@todo переделать все к чертям, не работает как по примеру, нужно брать так же, как в dishes.comments
var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.find({
            'favoriteBy':req.decoded._id
        })
            .populate('favoriteBy')
            // .populate('dishesRef')
            .exec(function (err, favorites) {
                if (err) throw err;
                res.json(favorites);
            });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Favorites.findOne({favoriteBy:req.decoded._id})
            .remove()
            .exec(function (err, favorites) {
                if(err) return next(err);
                res.json(favorites);
            })

    });
favoriteRouter.route('/:dishId')
    .all(Verify.verifyOrdinaryUser)
    .post(function (req, res, next) {
        Favorites.findOne({
            'favoriteBy':req.decoded._id,
        }, function (err, docs) {
            console.log(req.params.dishId);
            if(!docs.length){
                var newFavorite = {
                    favoriteBy: req.decoded._id,
                    dishesRef: []
                };
                newFavorite.dishesRef.push(req.params.dishId)
                Favorites.create(newFavorite, function (err, favorite) {
                    if(err) throw err;
                    console.log('Favorites create');
                    res.json(favorite)
                });
            }else
            {
                console.log(docs);
                var isInArray = docs.dishesRef.some(function (dish) {
                    return dish.equals(req.params.dishId)
                })
                if(isInArray){
                    console.log('Favorites already exist');
                    res.json('Fuck the police');
                }else{
                    docs.dishesRef.push(req.params.dishId);
                    docs.save();
                    res.json(docs);
                }


            }
        });

    })
    .delete(function (req, res, next) {
        Favorites.findOne({
            favoriteBy:req.decoded._id,
        },function (err, favorite) {
            console.log(favorite);
            favorite.dishesRef.pull(req.params.dishId);
            favorite.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        })

    });

module.exports = favoriteRouter;