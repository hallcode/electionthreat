// Subscriber Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriberSchema = new Schema({
    email: String,
    hasConsented: Boolean,
    criticalOnly: Boolean
});

subscriberSchema.pre('save', function(next){
    var now = new Date();
    this.date = now;
});

var Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;