const VicePrincipalModel = require('../models/viceprincipal')
const nodemailer = require('nodemailer')

// Principal login endpoint
module.exports.viceprincipalsignin = async (req, res) => {
    const {email, password} = req.body
    try {
        const oldVicePrincipal = await VicePrincipalModel.findOne({email})
        if(oldVicePrincipal){
            await VicePrincipalModel.findOne({email})
            .then(result=>{
                if(result.password !== password){
                    res.status(404).send({ error: 'Password incorrect' })
                }else{
                    return res.status(200).send({
                        msg: "Vice Principal found!",
                        token: "principal",
                        email: email
                      })
                }
            }) 
        }else{
            res.status(404).send({ error: 'Vice Principal does not exist!' })
        }     
    } catch (error) {
        
    }
}

// Forgot Password Endpoint
module.exports.forgotviceprincipal = async (req, res) => {
    const {email} = req.body

    const _otp = Math.floor(100000 + Math.random() * 900000); 

    let viceprincipal = await VicePrincipalModel.findOne({email})

    if(!viceprincipal){
        res.status(404).send({error: 'Vice Principal does not exist'})
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
        subject: 'Forget Password(Vice Principal) - OTP',
        text: String(_otp),
        html: `<html><body>OTP for changing the password of your account<br>`+ _otp + `</body></html>`
    }

    transporter.sendMail(msg).then(info=>{
        if(info.messageId){
            VicePrincipalModel.updateOne({ email }, {otp: _otp}).then(result=>{
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
module.exports.changepasswordviceprincipal = async (req, res) => {
    const {otp, password} = req.body
    
    await VicePrincipalModel.findOne({otp: otp})
    .then(result=>{
      VicePrincipalModel.updateOne({ email: result.email }, {password: password}).then(result=>{
        return res.status(200).send({msg: 'Password Updated!'})
      }).catch(err=>{
        return res.status(404).send({error: 'Error in updating password!'})
      })
      
    }).catch(err=>{
      return res.status(404).send({ error: 'User not found!' })
    })
  }