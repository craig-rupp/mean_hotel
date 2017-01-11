var mongoose = require('mongoose');

var hotelSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	stars : {
		type : Number,
		min : 0,
		max : 5,
		default : 0 //js reserved word 
	},
	services : [String],
	description : String,
	photos : [String],
	currency : String
});

mongoose.model('Hotel', hotelSchema, 'Hotels');