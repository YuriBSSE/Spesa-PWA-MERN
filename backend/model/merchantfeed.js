const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const merchantFeedSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    feedback: {type: String}
},
{
    timestamps: true
});

module.exports = mongoose.model('merchantFeedback', merchantFeedSchema);