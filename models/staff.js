const mongoose = require('mongoose')

module.exports = mongoose.model('Staff',{ name: String, email: String, phone: Number, designation: String, dob: Date, gender: String, permanentAddress: String, temporaryAddress: String,serviceStartDate: Date, retirementDate: Date, schoolJoinDate: Date, qualification: String});   