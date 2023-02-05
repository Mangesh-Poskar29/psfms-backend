const PrincipalModel = require('../models/principal')
const VicePrincipalModel = require('../models/viceprincipal')
const StaffUserModel = require('../models/staffUser')
const CircularJSON = require('circular-json');
const { default: mongoose, Mongoose } = require('mongoose');

// Get all users Endpoint
module.exports.getuserdata = async (req, res) => {
    try {
        const staffUsers = await StaffUserModel.find();
        const principalUser = await PrincipalModel.find();
        const viceprincipalUser = await VicePrincipalModel.find();
        if (staffUsers && principalUser && viceprincipalUser) {
            return res.status(200).send({ msg: "Data Captured Successufully!", staffUsers: staffUsers, principalUser: principalUser, VicePrincipalUser: viceprincipalUser })
        }
    } catch (error) {
        return res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
    }
}

// Delete User Endpoint
module.exports.deleteuserdata = async (req, res) => {
    try {
        const _id = req.params.id;
        
        const id = mongoose.Types.ObjectId(_id)

        const staffuser = await StaffUserModel.findByIdAndDelete(id)
        
        const principalUser = await PrincipalModel.findByIdAndDelete(id)

        const viceprincipalUser = await VicePrincipalModel.findByIdAndDelete(id)


        if(staffuser){
            return res.status(200).send({msg: "User Deleted!"})
        }else if(principalUser){
            return res.status(200).send({msg: "User Deleted!"})
        }else if(viceprincipalUser){
            return res.status(200).send({msg: "User Deleted!"})
        }else{
            return res.status(400).send({error: "User not found"})
        }

    } catch (error) {
        return res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
    }
} 

// Update User Endpoint
module.exports.updateuserdata = async (req, res) => {
    const {fname, lname, email, password, role} = req.body
  
    const {id} = req.params;
  
    try {
        const staffuser = await StaffUserModel.findByIdAndUpdate({_id: id}, {$set:{fname: fname, lname: lname, email: email, password: password, role: role}})
        
        const principalUser = await PrincipalModel.findByIdAndUpdate({_id: id}, {$set:{fname: fname, lname: lname, email: email, password: password, role: role}})

        const viceprincipalUser = await VicePrincipalModel.findByIdAndUpdate({_id: id}, {$set:{fname: fname, lname: lname, email: email, password: password, role: role}})

        if(staffuser){
            return res.status(200).send({msg: "User Updated!"})
        }else if(principalUser){
            return res.status(200).send({msg: "User Updated!"})
        }else if(viceprincipalUser){
            return res.status(200).send({msg: "User Updated!"})
        }else{
            return res.status(400).send({error: "User not found"})
        }
    } catch (error) {
      res.send({ code: 400, error: 'Internal Error Occured!' })
    }
}

// Add Principal User Endpoint
module.exports.addprincipaluser = async (req, res) => {
    const {fname, lname, email, password, role} = req.body
    try {
        const newPrincipal = new PrincipalModel({fname: fname, lname: lname, email: email, password: password, role: role})        
        const oldPrincipal = await PrincipalModel.find()

        if(oldPrincipal.length !== 0){
            return res.status(400).send({error: "Principal already exists please delete the user if you want to add new user as principal!"})
        }
        newPrincipal.save().then(()=>{
            res.status(200).send({ code: 200, msg: 'User added as principal!' })
          }).catch((err)=>{
            res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
          })

    } catch (error) {
        res.send({ code: 400, error: 'Internal Error Occured!' })
    }
}

// Add Vice Principal User Endpoint
module.exports.addviceprincipaluser = async (req, res) => {
    const {fname, lname, email, password, role} = req.body
    try {
        const newVicePrincipal = new VicePrincipalModel({fname: fname, lname: lname, email: email, password: password, role: role})        
        const oldVicePrincipal = await VicePrincipalModel.find()

        if(oldVicePrincipal.length !== 0){
            return res.status(400).send({error: "Vice Principal already exists please delete the user if you want to add new user as vice principal!"})
        }
        newVicePrincipal.save().then(()=>{
            res.status(200).send({ code: 200, msg: 'User added as vice principal!' })
          }).catch((err)=>{
            res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
          })

    } catch (error) {
        res.send({ code: 400, error: 'Internal Error Occured!' })
    }
}

// Add Staff User  Endpoint
module.exports.addstaffuser = async (req, res) => {
    const {fname, lname, email, password, role} = req.body
    try {
        const newStaffUser = new StaffUserModel({fname: fname, lname: lname, email: email, password: password, role: role})        
        const oldStaffUser = await StaffUserModel.findOne({email});

        if(oldStaffUser){
            return res.status(400).send({error: "User already exist!"})
        }
        newStaffUser.save().then(()=>{
            res.status(200).send({ code: 200, msg: 'User added as staff!' })
          }).catch((err)=>{
            console.log(err)
            res.status(400).send({ code: 400, error: 'Internal Error Occured!' })
          })

    } catch (error) {
        res.send({ code: 400, error: 'Internal Error Occured!' })
    }
}