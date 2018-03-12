// Poll Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
    date: Date,
    election: String,
    region: String
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;