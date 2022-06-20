const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const barcodeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    upc: {type: String, required: true},
    name: {type: String, required: true},
    brand: {type: String, required: true},
    weight: {type: String, required: false},
    price: {type: Number, required: true},
    image: {type: String, required: false},
    gst: {type: Boolean, required: true},
},
{
    timestamps: true
});

module.exports = mongoose.model('barcode', barcodeSchema);