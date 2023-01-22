const mongoose = require('mongoose')

module.exports = mongoose.model('Staff',{ name: String, dob: Date, gender: String, email: String, phone: Number,  permanentAddress: String, temporaryAddress: String, designation: String, serviceStartDate: String, retirementDate: String, schoolJoinDate: Date, qualification: String});   