const StaffUserModel = require('../models/staffUser')
const nodemailer = require('nodemailer')

// StaffUser Signup Endpoint
module.exports.staffusersignup = async (req, res) => {
    const {fname, lname, email, password} = req.body
    try {
        const newStaffUser = new StaffUserModel({fname: fname, lname: lname, email: email, password: password})        
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

// StaffUser login endpoint
module.exports.staffusersignin = async (req, res) => {
    const {email, password} = req.body
    try {
        const oldStaffUser = await StaffUserModel.findOne({email})
        if(oldStaffUser){
            await StaffUserModel.findOne({email})
            .then(result=>{
                if(result.password !== password){
                    return res.status(404).send({ error: 'Password incorrect' })
                }else{
                    return res.status(200).send({
                        msg: "Staff found!",
                        token: "staff",
                        email: email
                      })
                }
            }) 
        }else{
            res.status(404).send({ error: 'Staff does not exist!' })
        }     
    } catch (error) {
        
    }
}

// Forgot Password Endpoint
module.exports.forgotstaffuser = async (req, res) => {
    const {email} = req.body

    const _otp = Math.floor(100000 + Math.random() * 900000); 

    let staffuser = await StaffUserModel.findOne({email})

    if(!staffuser){
        return res.status(404).send({error: 'StaffUser does not exist'})
    }

    let config = {
        service: 'gmail',
        auth: {
            user: 'thepsfms@gmail.com',
            pass: 'ycganmlkbuddrype'
        }
    }

    let transporter = nodemailer.createTransport(config)

    let msg = {
        from: 'thepsfms@gmail.com',
        to: email,
        subject: 'Forget Password(StaffUser) - OTP',
        text: String(_otp),
        html: `<html><body>OTP for changing the password of your account<br>`+ _otp + `</body></html>`
    }

    transporter.sendMail(msg).then(info=>{
        if(info.messageId){
            StaffUserModel.updateOne({ email }, {otp: _otp}).then(result=>{
              return res.status(200).send({msg: 'OTP Sent!',info: info.messageId})
            }).catch(err=>{
              return res.status(404).send({error: 'Error in sending OTP!'})
            })
        }
    }).catch(error=>{
        return res.status(404).send({error: 'Error in sending mail'})
    })
}

// Change Password Endpoint
module.exports.changepasswordstaffuser = async (req, res) => {
    const {otp, password} = req.body
    
    await StaffUserModel.findOne({otp: otp})
    .then(result=>{
      StaffUserModel.updateOne({ email: result.email }, {password: password}).then(result=>{
        return res.status(200).send({msg: 'Password Updated!'})
      }).catch(err=>{
        return res.status(404).send({error: 'Error in updating password!'})
      })
      
    }).catch(err=>{
      return res.status(404).send({ error: 'User not found!' })
    })
  }