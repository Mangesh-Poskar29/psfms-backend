const mongoose = require('mongoose')

module.exports = mongoose.model('Uniform',{ standard: String, nstudents: Number, ngirls: Number, nboys: Number, uniformsReceivedByGirls: Number, uniformsReceivedByBoys: Number, totalUniformsReceived: Number, uniformsToBeReceivedByBoys: Number, uniformsToBeReceivedByGirls: Number, totalUniformsToBeReceived: Number});   