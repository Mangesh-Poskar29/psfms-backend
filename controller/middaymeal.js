const middaymealModel = require('../models/middaymeal')
const mongoose = require('mongoose');

module.exports.getmiddaymealdata = async (req, res) => {
    try {
      const middaymealData = await middaymealModel.find();

      if (middaymealData) {
        return res.status(200).send({ msg: "Data Captured Successufully!", middaymealData: middaymealData })
      }
    } catch (error) {
      res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
    }
  }

//Update MidDayMeal Data Endpoint
module.exports.updatemiddaymealdata = async (req, res) => {
  const { standard, totalstudents, wdays, tandul, turdal, mungdal, harbhara, mug, chavali, vatana, tel, tikhat, garamm, meeth, halad, jeera, mohari } = req.body

  const { id } = req.params;

  try {

    const middaymealData = await middaymealModel.findByIdAndUpdate({ _id: id }, { $set: { standard: standard, totalstudents: totalstudents, wdays: wdays, tandul: tandul, turdal: turdal, mungdal: mungdal, harbhara: harbhara, mug: mug, chavali:chavali, vatana: vatana, tel: tel, tikhat: tikhat, garamm: garamm, meeth: meeth, halad: halad, jeera: jeera, mohari: mohari} })

    if (middaymealData) {
      return res.status(200).send({ msg: "Mid-Day-Meal Data Updated!" })
    } else {
      return res.status(400).send({ error: "Mid-Day-Meal Data not found" })
    }

  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}

//   Delete MidDayMeal Record Endpoint
module.exports.deletemiddaymealdata = async (req, res) => {
  try {
    const _id = req.params.id;

    const id = mongoose.Types.ObjectId(_id)

    const middaymealData = await middaymealModel.findByIdAndDelete(id)  

    if (middaymealData) {
      return res.status(200).send({ msg: "Mid-Day-Meal Record Deleted!" })
    } else {
      return res.status(400).send({ error: "Mid-Day-Meal Record Not Found!" })
    }
  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}
  // Add Mid-Day-Meal Record Endpoint
  module.exports.addmiddaymealdata = async (req, res) => {
    const { standard, totalstudents, wdays, tandul, turdal, mungdal, harbhara, mug, chavali, vatana, tel, tikhat, garamm, meeth, halad, jeera, mohari } = req.body
  
    try {
      const newMidDayMeal = new middaymealModel({ standard: standard, totalstudents: totalstudents, wdays: wdays, tandul: tandul, turdal: turdal, mungdal: mungdal, harbhara: harbhara, mug: mug, chavali:chavali, vatana: vatana, tel: tel, tikhat: tikhat, garamm: garamm, meeth: meeth, halad: halad, jeera: jeera, mohari: mohari })
  
      const oldMidDayMeal = await middaymealModel.findOne({ standard });
      if (oldMidDayMeal) {
        return res.status(400).send({ error: `MDM data for standard ${standard} already exists!` })
      }
  
      newMidDayMeal.save().then(() => {
        res.status(200).send({ code: 200, msg: 'MDM Data Saved' })
      }).catch((err) => {
        res.status(400).send({error: 'Internal Error Occured!' })
      })
    } catch (error) {
      res.status(400).send({ error: 'Internal Error Occured!' })
  
    }
  }