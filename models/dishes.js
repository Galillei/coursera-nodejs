var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;
var commentSchema = new Schema({
   rating:{
       type: Number,
       min: 1,
       max: 5,
       required: true
   },
    comment: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
        unique: false
    },

    description: {
        type: String,
        required: true
    },
    price: {type: Currency},
    
    label: {type: String, default: 'Label'},
    
    comments:[commentSchema]
},{
    timestamps: true
});

var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;