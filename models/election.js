// Elections Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var electionSchema = new Schema({
    name: String,
    code: String,
    order: Number,
    desc: {
        summary: String,
        when: String,
        who: String,
        how: String,
        function: String,
    },
    color: String,
    isWatched: Boolean
});

var Election = mongoose.model('Election', electionSchema);

module.exports = Election;