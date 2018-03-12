// Level Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var levelSchema = new Schema({
    name: { type: String, required: true, unique: true },
    order: Number,
    desc: String,
    action: String,
    color: String
});

var Level = mongoose.model('Level', levelSchema);

module.exports = Level;