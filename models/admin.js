const mongoose = require('mongoose')

module.exports = mongoose.model('Admin',{ fname: String, lname: String, email: String, password: String, otp: Number });