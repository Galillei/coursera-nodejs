var mongoose = require('mongoose');
var schema = mongoose.Schema;
var leader = new schema({
    name: String,
    description: String,
    label: String
});
var Leader = mongoose.model('Leader', leader);
module.exports = Leader;