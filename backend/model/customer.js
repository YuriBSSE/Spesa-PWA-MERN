const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    itemList: [{
        name: {type: String},
        price: {type: Number},
        amount: {type: Number},
        brand: {type: String},
        image: {type: String},
        itemImgSrc: {type: String},
    }],
    subTotal: {type: Number, required: true},
    promoCode: {type: Number, required: true},
    tax: {type: Number, required: true},
    total: {type: Number, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('customer', customerSchema);