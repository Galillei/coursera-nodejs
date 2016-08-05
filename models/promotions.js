var mongoose = require('mongoose');
var schema = mongoose.Schema;
var promotion = new schema({
    name: String,
    description: String
});
var Promotions = mongoose.model('Promotion', promotion);
module.exports = Promotions;