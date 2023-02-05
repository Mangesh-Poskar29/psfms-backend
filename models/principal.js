const mongoose = require('mongoose')

module.exports = mongoose.model('Principal',{ fname: String, lname: String, email: String, password: String, otp: Number, role: String });