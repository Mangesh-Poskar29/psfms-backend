const StaffModel = require('../models/staff')
const PrincipalStaffModel = require('../models/principalStaff')
const VicePrincipalStaffModel = require('../models/viceprincipalStaff');
const { default: mongoose } = require('mongoose');

module.exports.getstaffdata = async (req, res) => {
  try {
    const staff = await StaffModel.find();
    const principalstaff = await PrincipalStaffModel.find();
    const viceprincipalstaff = await VicePrincipalStaffModel.find();

    if (staff && principalstaff && viceprincipalstaff) {
      return res.status(200).send({ msg: "Data Captured Successufully!", staff: staff, principalStaff: principalstaff, viceprincipalStaff: viceprincipalstaff })
    }
  } catch (error) {
    res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
  }
}

//Update Staff Data Endpoint
module.exports.updatestaffdata = async (req, res) => {
  const { name, email, phone, designation, dob, gender, permanentAddress, temporaryAddress, serviceStartDate, retirementDate, schoolJoinDate, qualification } = req.body

  const { id } = req.params;

  try {

    const staffuser = await StaffModel.findByIdAndUpdate({ _id: id }, { $set: { name: name, email: email, phone: phone, designation: designation, dob: dob, gender: gender, permanentAddress: permanentAddress, temporaryAddress: temporaryAddress, serviceStartDate: serviceStartDate, retirementDate: retirementDate, schoolJoinDate: schoolJoinDate, qualification: qualification } })

    const principalUser = await PrincipalStaffModel.findByIdAndUpdate({ _id: id }, { $set: { name: name, email: email, phone: phone, designation: designation, dob: dob, gender: gender, permanentAddress: permanentAddress, temporaryAddress: temporaryAddress, serviceStartDate: serviceStartDate, retirementDate: retirementDate, schoolJoinDate: schoolJoinDate, qualification: qualification } })

    const viceprincipalUser = await VicePrincipalStaffModel.findByIdAndUpdate({ _id: id }, { $set: { name: name, email: email, phone: phone, designation: designation, dob: dob, gender: gender, permanentAddress: permanentAddress, temporaryAddress: temporaryAddress, serviceStartDate: serviceStartDate, retirementDate: retirementDate, schoolJoinDate: schoolJoinDate, qualification: qualification } })

    if (staffuser) {
      return res.status(200).send({ msg: "User Updated!" })
    } else if (principalUser) {
      return res.status(200).send({ msg: "User Updated!" })
    } else if (viceprincipalUser) {
      return res.status(200).send({ msg: "User Updated!" })
    } else {
      return res.status(400).send({ error: "User not found" })
    }

  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}

module.exports.deletestaffdata = async (req, res) => {
  try {
    const _id = req.params.id;

    const id = mongoose.Types.ObjectId(_id)

    const staffuser = await StaffModel.findByIdAndDelete(id)

    const principalUser = await PrincipalStaffModel.findByIdAndDelete(id)

    const viceprincipalUser = await VicePrincipalStaffModel.findByIdAndDelete(id)


    if (staffuser) {
      return res.status(200).send({ msg: "User Deleted!" })
    } else if (principalUser) {
      return res.status(200).send({ msg: "User Deleted!" })
    } else if (viceprincipalUser) {
      return res.status(200).send({ msg: "User Deleted!" })
    } else {
      return res.status(400).send({ error: "User not found" })
    }
  } catch (error) {
    console.log(error)
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}

// Add Principal Staff Endpoint
module.exports.addprincipalstaff = async (req, res) => {
  const { name, email, phone, designation, dob, gender, permanentAddress, temporaryAddress, serviceStartDate, retirementDate, schoolJoinDate, qualification } = req.body

  try {
    const newPrincipal = new PrincipalStaffModel({ name: name, email: email, phone: phone, designation: designation, dob: dob, gender: gender, permanentAddress: permanentAddress, temporaryAddress: temporaryAddress, serviceStartDate: serviceStartDate, retirementDate: retirementDate, schoolJoinDate: schoolJoinDate, qualification: qualification })
    const oldPrincipal = await PrincipalStaffModel.find()

    if (oldPrincipal.length !== 0) {
      return res.status(400).send({ error: "Principal already exists please delete the user if you want to add new user as principal!" })
    }
    newPrincipal.save().then(() => {
      res.status(200).send({ code: 200, msg: 'User added as principal!' })
    }).catch((err) => {
      res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
    })

  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}

// Add Vice Principal Staff Endpoint
module.exports.addviceprincipalstaff = async (req, res) => {
  const { name, email, phone, designation, dob, gender, permanentAddress, temporaryAddress, serviceStartDate, retirementDate, schoolJoinDate, qualification } = req.body
  try {
    const newVicePrincipal = new VicePrincipalStaffModel({ name: name, email: email, phone: phone, designation: designation, dob: dob, gender: gender, permanentAddress: permanentAddress, temporaryAddress: temporaryAddress, serviceStartDate: serviceStartDate, retirementDate: retirementDate, schoolJoinDate: schoolJoinDate, qualification: qualification })
    const oldVicePrincipal = await VicePrincipalStaffModel.find()

    if (oldVicePrincipal.length !== 0) {
      return res.status(400).send({ error: "Vice Principal already exists please delete the user if you want to add new user as vice principal!" })
    }
    newVicePrincipal.save().then(() => {
      res.status(200).send({ code: 200, msg: 'User added as vice principal!' })
    }).catch((err) => {
      res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
    })

  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })
  }
}

// Add Staff Record Endpoint
module.exports.addstaffdata = async (req, res) => {
  const { name, email, phone, designation, dob, gender, permanentAddress, temporaryAddress, serviceStartDate, retirementDate, schoolJoinDate, qualification } = req.body

  try {
    const newStaff = new StaffModel({ name: name, email: email, phone: phone, designation: designation, dob: dob, gender: gender, permanentAddress: permanentAddress, temporaryAddress: temporaryAddress, serviceStartDate: serviceStartDate, retirementDate: retirementDate, schoolJoinDate: schoolJoinDate, qualification: qualification })

    const oldStaff = await StaffModel.findOne({ email });
    if (oldStaff) {
      return res.status(400).send({ error: "Staff already exists!" })
    }

    newStaff.save().then(() => {
      res.status(200).send({ code: 200, msg: 'Staff Record Added' })
    }).catch((err) => {
      console.log(err)
      res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
    })
  } catch (error) {
    res.send({ code: 400, error: 'Internal Error Occured!' })

  }
}

module.exports.staffcount = async (req, res) => {
  try {
    const count1 = await StaffModel.countDocuments()
    const count2 = await PrincipalStaffModel.countDocuments()
    const count3 = await VicePrincipalStaffModel.countDocuments()

    const totalCount = count1 + count2 + count3
    res.status(200).send({totalCount})
  } catch (error) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
}


module.exports.fetchfacility = async (req, res) => {
  try {
    StaffModel.findOne()
  } catch (error) {
    
  }
}