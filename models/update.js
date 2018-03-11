// Update Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var updateSchema = new Schema({
    date: Date,
    electionCode: String,
    level: String,
    headline: String,
    post: String,
    imgUrl: String
});

updateSchema.pre('save', function(next){
    var now = new Date();
    this.date = now;
});

var Update = mongoose.model('Update', updateSchema);

module.exports = Update;