// Post Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    headline: String,
    slug: String,
    text: String,
    imgUrl: String,
    date: Date,
    alert: String
});

postSchema.pre('save', function(next){
    var now = new Date();
    this.date = now;
    next();
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;