const mongoose = require('mongoose')

module.exports = mongoose.model('VicePrincipal',{ fname: String, lname: String, email: String, password: String, otp: Number, role: String });