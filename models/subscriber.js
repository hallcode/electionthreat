// Subscriber Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriberSchema = new Schema({
    email: String,
    hasConsented: Boolean,
    criticalOnly: Boolean
});

var Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;