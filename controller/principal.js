const PrincipalModel = require('../models/principal')
const nodemailer = require('nodemailer')

// Principal Signup Endpoint
module.exports.principalsignup = async (req, res) => {
    const {fname, lname, email, password} = req.body
    try {
        const newPrincipal = new PrincipalModel({fname: fname, lname: lname, email: email, password: password})        
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

// Principal login endpoint
module.exports.principalsignin = async (req, res) => {
    const {email, password} = req.body
    try {
        const oldPrincipal = await PrincipalModel.findOne({email})
        if(oldPrincipal){
            await PrincipalModel.findOne({email})
            .then(result=>{
                if(result.password !== password){
                    res.status(404).send({ error: 'Password incorrect' })
                }else{
                    return res.status(200).send({
                        msg: "Principal found!",
                        token: "principal",
                        email: email
                      })
                }
            }) 
        }else{
            res.status(404).send({ error: 'Principal does not exist!' })
        }     
    } catch (error) {
        
    }
}

// Forgot Password Endpoint
module.exports.forgotprincipal = async (req, res) => {
    const {email} = req.body

    const _otp = Math.floor(100000 + Math.random() * 900000); 

    let principal = await PrincipalModel.findOne({email})

    if(!principal){
        res.status(404).send({error: 'Principal does not exist'})
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
        subject: 'Forget Password(Principal) - OTP',
        text: String(_otp),
        html: `<html><body>OTP for changing the password of your account<br>`+ _otp + `</body></html>`
    }

    transporter.sendMail(msg).then(info=>{
        if(info.messageId){
            PrincipalModel.updateOne({ email }, {otp: _otp}).then(result=>{
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
module.exports.changepasswordprincipal = async (req, res) => {
    const {otp, password} = req.body
    
    await PrincipalModel.findOne({otp: otp})
    .then(result=>{
      PrincipalModel.updateOne({ email: result.email }, {password: password}).then(result=>{
        return res.status(200).send({msg: 'Password Updated!'})
      }).catch(err=>{
        return res.status(404).send({error: 'Error in updating password!'})
      })
      
    }).catch(err=>{
      return res.status(404).send({ error: 'User not found!' })
    })
  }