const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weightSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    brand: {type: String, default: null},
    price: {type: Number, required: true},
    image: {type: String, required: false},
    gst: {type: Boolean, required: false},
},
{
    timestamps: true
});

module.exports = mongoose.model('weightproduct', weightSchema);