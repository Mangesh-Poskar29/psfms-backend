const AdminModel = require('../models/admin')
const nodemailer = require('nodemailer')
const env = require('env')


// Contact US form Endpoint
module.exports.contactus = async (req, res) => {
  const {fullname, email, message} = req.body

  let config = {
    service: 'gmail',
    auth: {
      user: 'thepsfms@gmail.com',
      pass: 'ycganmlkbuddrype'
    }
  }

  let transporter = nodemailer.createTransport(config)

  let msg = {
    from: email,
    to: 'thepsfms@gmail.com',
    subject: 'Someone Contacting Us',
    html: `<html><body>`+ fullname + ` Trying to contact us through Email - ` + email + `!<br>Message:<br>`+ message + `</body></html>`
  }

  transporter.sendMail(msg).then(info=>{
    return res.status(200).send({msg: 'Mail Sent'})
    console.log('Mail Sent')
  }).catch(error=>{
    return res.status(404).send({error: 'Error in sending mail'})
  })

}


// Admin Signup Endpoint
module.exports.adminsignup = async (req, res) => {
    const {fname, lname, email, password} = req.body
    try {
      const newAdmin = new AdminModel({fname: fname, lname: lname, email: email, password: password});
      const oldAdmin = await AdminModel.findOne({email});
      if(oldAdmin){
        return res.status(400).send({error: "Admin already exists!"})
      }
      newAdmin.save().then(()=>{
        res.send({ code: 200, msg: 'Signup Successful!' })
      }).catch((err)=>{
        res.send({ code: 400, error: 'Internal Error Occured!' })
      })
    } catch (error) {
      res.send({ code: 400, error: 'Internal Error Occured!' })
    }
}

// Admin Signin Endpoint
module.exports.adminsignin = async (req, res) => {
    const {email, password} = req.body
    await AdminModel.findOne({email})
    .then(result=>{
      if(result.password !== password){
        res.status(404).send({ error: 'Password incorrect' })
      }else{
        return res.status(200).send({
          msg: "Admin found!",
          token: "admins",
          email: email
        })          
      }
    })
}

// Forgot Password Endpoint
module.exports.forgotadmin = async (req, res) => {
    const {email} = req.body
    
    const _otp = Math.floor(100000 + Math.random() * 900000);

    let admin = await AdminModel.findOne({email})
    if(!admin){
      res.status(404).send({error: 'Admin not found'})
    }
  
    let config = {
      service: 'gmail',
      auth: {
        user: 'thepsfms@gmail.com',
        pass: 'ycganmlkbuddrype'
      }
    }

    let transporter = nodemailer.createTransport(config)

    let message = {
      from: 'thepsfms@gmail.com',
      to: email,
      subject: 'OTP for changing password',
      text: String(_otp),
      html: `<html><body>OTP for changing the password of your account<br>`+ _otp + `</body></html>`
    }

    transporter.sendMail(message).then(info=>{
      // return res.status(200).send({msg: 'Mail Sent'})
      console.log('Mail Sent')
      if(info.messageId){
        AdminModel.updateOne({ email }, {otp: _otp}).then(result=>{
          res.status(200).send({msg: 'OTP Sent!',info: info.messageId})
        }).catch(err=>{
          res.status(404).send({error: 'Error in sending OTP!'})
        })
      }

      }).catch(error=>{
      return res.status(404).send({error: 'Error in sending mail'})
    })

}

// Change Password Endpoint
module.exports.changepasswordadmin = async (req, res) => {
  const {otp, email, password} = req.body
  
  await AdminModel.findOne({otp: otp})
  .then(result=>{
    AdminModel.updateOne({ email: result.email }, {password: password}).then(result=>{
      res.status(200).send({msg: 'Password Updated!'})
    }).catch(err=>{
      res.status(404).send({error: 'Error in updating password!'})
    })
    
  }).catch(err=>{
    res.status(404).send({ error: 'User not found!' })
  })
}