var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Pin = new Schema({
	url: String,
	description: String,
	ownerId: String,
	ownerDisplayName: String
})

module.exports = mongoose.model('Pin', Pin)