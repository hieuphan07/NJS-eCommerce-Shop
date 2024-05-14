const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	fullname: {
		type: String,
		required: true,
	},
	phone: Number,
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('User', userSchema);
