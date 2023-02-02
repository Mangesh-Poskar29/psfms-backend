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

module.exports.updatestaffdata = async (req, res) => {
  const {name, email, phone, designation, dob, gender, permanentAddress, temporaryAddress, serviceStartDate, retirementDate, schoolJoinDate, qualification} = req.body

  const {id} = req.params;

  try {
    await StaffModel.findOne({_id: id}) 
    .then(result=>{
    StaffModel.updateOne({ _id: result.id }, {$set:{name: name, email: email, phone: phone, designation: designation, dob: dob, gender: gender, permanentAddress: permanentAddress, temporaryAddress: temporaryAddress, serviceStartDate: serviceStartDate, retirementDate: retirementDate, schoolJoinDate: schoolJoinDate, qualification: qualification }}).then(result=>{
      res.status(200).send({msg: 'Staff record Updated!'})
    }).catch(err=>{
      res.status(404).send({error: 'Error in updating staff record!'})
    })
    
  }).catch(err=>{
    console.log(err)
    res.status(404).send({ error: 'Staff Record not found!' })
  })
  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}

module.exports.deletestaffdata = async (req, res) => {
  try {
    const {id} = req.params;
    await StaffModel.findOne({id})
    .then(result=>{
      StaffModel.deleteOne({_id: id})
      .then(result=>{
        res.status(200).send({msg: 'Staff record Deleted!'})
      })
    }).catch(err=>{
      res.status(404).send({ error: 'Staff Record not found!' })
    })  
  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}