const bookModel = require('../models/book')
const mongoose = require('mongoose');

module.exports.getbookdata = async (req, res) => {
    try {
      const bookData = await bookModel.find();

      if (bookData) {
        return res.status(200).send({ msg: "Data Captured Successufully!", bookData: bookData })
      }
    } catch (error) {
      res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
    }
  }
  
//Update Book Data Endpoint
module.exports.updatebookdata = async (req, res) => {
  const {subject, nb1st, nb2nd, nb3rd, nb4th, nb5th, nb6th, nb7th} = req.body

  const { id } = req.params;

  try {

    const bookData = await bookModel.findByIdAndUpdate({ _id: id }, { $set: { subject: subject, nb1st: nb1st, nb2nd: nb2nd, nb3rd: nb3rd, nb4th: nb4th, nb5th: nb5th, nb6th: nb6th, nb7th: nb7th} })

    if (uniformData) {
      return res.status(200).send({ msg: "Boo Data Updated!" })
    } else {
      return res.status(400).send({ error: "Book Data not found" })
    }

  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}

//   Delete Book Record Endpoint
module.exports.deletebookdata = async (req, res) => {
  try {
    const _id = req.params.id;

    const id = mongoose.Types.ObjectId(_id)

    const bookData = await bookModel.findByIdAndDelete(id)  

    if (bookData) {
      return res.status(200).send({ msg: "Book Record Deleted!" })
    } else {
      return res.status(400).send({ error: "Book Record Not Found!" })
    }
  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}


  // Add Book Record Endpoint
  module.exports.addbookdata = async (req, res) => {
    const { subject, nb1st, nb2nd, nb3rd, nb4th, nb5th, nb6th, nb7th} = req.body
  
    try {
      const newBook = new bookModel({ subject: subject, nb1st: nb1st, nb2nd: nb2nd, nb3rd: nb3rd, nb4th: nb4th, nb5th: nb5th, nb6th: nb6th, nb7th: nb7th })
  
      const oldBook = await bookModel.findOne({ subject });
      if (oldBook) {
        return res.status(400).send({ error: `Book data for subject ${subject} already exists!` })
      }
  
      newBook.save().then(() => {
        res.status(200).send({ code: 200, msg: 'Book Data Saved' })
      }).catch((err) => {
        res.status(400).send({error: 'Internal Error Occured!' })
      })
    } catch (error) {
      res.status(400).send({ error: 'Internal Error Occured!' })
  
    }
  }