// User Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: String,
    password: String,
    isMod: Boolean
});

userSchema.pre('save', function(next){
    var salt = bcrypt.genSaltSync(9);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;