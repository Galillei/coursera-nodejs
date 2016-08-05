// https://github.com/ZuchaoWang/coursera-serverside-js можно тут позырить ответ
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Favorites = new Schema({
   favoriteBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
   },
    dishesRef:[{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}]

}, {
    timestamps: true
});
var Favorites = mongoose.model('Favorite',Favorites);

module.exports = Favorites;

