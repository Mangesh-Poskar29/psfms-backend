const mongoose = require('mongoose')

module.exports = mongoose.model('StaffUser',{ fname: String, lname: String, email: String, password: String, otp: Number, role: String });