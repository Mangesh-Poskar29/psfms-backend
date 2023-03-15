const mongoose = require('mongoose')

module.exports = mongoose.model('Book',{ subject: String, nb1st: Number, nb2nd: Number, nb3rd: Number, nb4th: Number, nb5th: Number, nb6th: Number, nb7th: Number});   