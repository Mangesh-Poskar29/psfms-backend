const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const adminController = require('./controller/admin')
const staffController = require('./controller/staff')
const principalController = require('./controller/principal')
const staffUserController = require('./controller/staffUser')
const userController = require('./controller/user')
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

// Admin Auth Endpoints
app.post('/contact-us', adminController.contactus)
app.post('/admin-signup', adminController.adminsignup)
app.post('/admin-signin', adminController.adminsignin)
app.post('/forgot-admin', adminController.forgotadmin)
app.post('/change-password-admin', adminController.changepasswordadmin )

// Principal Auth Endpoints
app.post('/principal-signin', principalController.principalsignin)
app.post('/forgot-principal', principalController.forgotprincipal)
app.post('/change-password-principal', principalController.changepasswordprincipal)

// StaffUser Auth Endpoints
app.post('/staff-signin', staffUserController.staffusersignin)
app.post('/forgot-staff', staffUserController.forgotstaffuser)
app.post('/change-password-staff', staffUserController.changepasswordstaffuser)


// Admin Dashboard Endpoints
// Manage Staff Data Endpoints
app.post('/get-staff-data', staffController.getstaffdata )
app.post('/add-staff-data', staffController.addstaffdata )
app.put('/update-staff-data/:id', staffController.updatestaffdata )
app.delete('/delete-staff-data/:id', staffController.deletestaffdata )

//Manage Users Endpoints
app.post('/get-user-data', userController.getuserdata )
app.delete('/delete-user-data/:id', userController.deleteuserdata )
app.put('/update-user-data/:id', userController.updateuserdata )
app.post('/add-principal-user', userController.addprincipaluser)
app.post('/add-staff-user', userController.addstaffuser)


// Listening on port 
app.listen(port, ()=>{
    console.log(`Server is listening on port no. ${port}`)
})