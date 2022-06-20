const mongoose = require('mongoose');
var crypto = require('crypto');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    merchant: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    isMerchant: {type: Boolean, default: false},
    hash : String,
    salt : String
},
{
    timestamps: true
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 
    1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, 
    this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

module.exports = mongoose.model('merchant', userSchema);