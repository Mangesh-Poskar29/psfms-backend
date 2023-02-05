const mongoose = require('mongoose')

module.exports = mongoose.model('PrincipalStaff',{ name: String, email: String, phone: Number, designation: String, dob: Date, gender: String, permanentAddress: String, temporaryAddress: String,serviceStartDate: Date, retirementDate: Date, schoolJoinDate: Date, qualification: String });