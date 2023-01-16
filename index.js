const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const adminController = require('./controller/admin')
const cors = require("cors"); // Importing Cors

const app = express()
const port = 5000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// Using Cors Policy
app.use(cors())


// MongoDB Setup in Node
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://psfms:psfms123@psfms.62vp5y4.mongodb.net/?retryWrites=true&w=majority", (err, success) => {
  if(err){
    console.log('Connection Error')
  }else{
    console.log('DB Connected')
  }
})

// Endpoints
app.post('/admin-signup', adminController.adminsignup )
app.post('/admin-signin', adminController.adminsignin )
app.post('/forgot-admin', adminController.forgotadmin)
app.post('/change-password-admin', adminController.changepasswordadmin )


// Listening on port
app.listen(port, ()=>{
    console.log(`Server is listening on port no. ${port}`)
})