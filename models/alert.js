// Alert Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alertSchema = new Schema({
    date: Date,
    election: String,
    level: String
});

var Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;