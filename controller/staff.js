const StaffModel = require('../models/staff')

module.exports.getstaffdata = async (req, res) => {
    try {
      const staff = await StaffModel.find();
      if(staff){
        return res.status(200).send({msg: "Data Captured Successufully!", data: staff})
      }
    } catch (error) {
      res.send({ code: 400, error: 'Internal Error Occured!' })
    }
}

module.exports.addstaffdata = async (req, res) => {
  const {name, email, phone, designation, dob, gender, permanentAddress, temporaryAddress, serviceStartDate, retirementDate, schoolJoinDate, qualification} = req.body
  console.log(req.body)

  try {
    const newStaff = new StaffModel({name: name, email: email, phone: phone, designation: designation, dob: dob, gender: gender, permanentAddress: permanentAddress, temporaryAddress: temporaryAddress, serviceStartDate: serviceStartDate, retirementDate: retirementDate, schoolJoinDate: schoolJoinDate, qualification: qualification })

    const oldStaff = await StaffModel.findOne({email});
    if(oldStaff){
      return res.status(400).send({error: "Staff already exists!"})
    }

    newStaff.save().then(()=>{
      res.status(200).send({ code: 200, msg: 'Staff Record Added' })
      }).catch((err)=>{
        console.log(err)
        res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
    })
  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })

  }
}