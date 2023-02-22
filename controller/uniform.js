const uniformModel = require('../models/uniform')
const mongoose = require('mongoose');

module.exports.getuniformdata = async (req, res) => {
    try {
      const uniformData = await uniformModel.find();

      if (uniformData) {
        return res.status(200).send({ msg: "Data Captured Successufully!", uniformData: uniformData })
      }
    } catch (error) {
      res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
    }
  }
  
  //Update Staff Data Endpoint
  module.exports.updateuniformdata = async (req, res) => {
    const { standard, nstudents, ngirls, nboys, uniformsReceivedByGirls, uniformsReceivedByBoys, uniformsToBeReceivedByBoys, uniformsToBeReceivedByGirls, totalUniformsToBeReceived } = req.body
  
    const { id } = req.params;
  
    try {
  
      const uniformData = await uniformModel.findByIdAndUpdate({ _id: id }, { $set: { standard: standard, nstudents: nstudents, ngirls: ngirls, nboys: nboys, uniformsReceivedByGirls: uniformsReceivedByGirls, uniformsReceivedByBoys: uniformsReceivedByBoys, uniformsToBeReceivedByBoys: uniformsToBeReceivedByBoys, uniformsToBeReceivedByGirls: uniformsToBeReceivedByGirls, totalUniformsToBeReceived: totalUniformsToBeReceived } })
  
      if (uniformData) {
        return res.status(200).send({ msg: "Uniform Data Updated!" })
      } else {
        return res.status(400).send({ error: "Uniform Data not found" })
      }
  
    } catch (error) {
      res.send({ code: 400, error: 'Internal Error Occured!' })
    }
  }
  
//   Delete Uniform Record Endpoint
  module.exports.deleteuniformdata = async (req, res) => {
    try {
      const _id = req.params.id;
  
      const id = mongoose.Types.ObjectId(_id)
  
      const uniformData = await uniformModel.findByIdAndDelete(id)  
  
      if (uniformData) {
        return res.status(200).send({ msg: "Uniform Record Deleted!" })
      } else {
        return res.status(400).send({ error: "Uniform Record Not Found!" })
      }
    } catch (error) {
      res.send({ code: 400, error: 'Internal Error Occured!' })
    }
  }
  
  // Add Uniform Record Endpoint
  module.exports.adduniformdata = async (req, res) => {
    const { standard, nstudents, ngirls, nboys, uniformsReceivedByGirls, uniformsReceivedByBoys, uniformsToBeReceivedByBoys, uniformsToBeReceivedByGirls, totalUniformsToBeReceived } = req.body
  
    try {
      const newUniform = new uniformModel({ standard: standard, nstudents: nstudents, ngirls: ngirls, nboys: nboys, uniformsReceivedByGirls: uniformsReceivedByGirls, uniformsReceivedByBoys: uniformsReceivedByBoys, uniformsToBeReceivedByBoys: uniformsToBeReceivedByBoys, uniformsToBeReceivedByGirls: uniformsToBeReceivedByGirls, totalUniformsToBeReceived: totalUniformsToBeReceived })
  
      const oldUniform = await uniformModel.findOne({ standard });
      if (oldUniform) {
        return res.status(400).send({ error: `Uniform data for standard ${standard} already exists!` })
      }
  
      newUniform.save().then(() => {
        res.status(200).send({ code: 200, msg: 'Uniform Data Saved' })
      }).catch((err) => {
        res.status(400).send({error: 'Internal Error Occured!' })
      })
    } catch (error) {
      res.status(400).send({ error: 'Internal Error Occured!' })
  
    }
  }