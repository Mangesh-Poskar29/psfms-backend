const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const adminController = require('./controller/admin')
const staffController = require('./controller/staff')
const principalController = require('./controller/principal')
const staffUserController = require('./controller/staffUser')
const userController = require('./controller/user')
const uniformController = require('./controller/uniform')
const bookController = require('./controller/book')
const middaymealController= require('./controller/middaymeal')
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

// Vice Principal Auth Endpoints
app.post('/viceprincipal-signin', principalController.principalsignin)
app.post('/forgot-viceprincipal', principalController.forgotprincipal)
app.post('/change-password-viceprincipal', principalController.changepasswordprincipal)

// StaffUser Auth Endpoints
app.post('/staff-signin', staffUserController.staffusersignin)
app.post('/forgot-staff', staffUserController.forgotstaffuser)
app.post('/change-password-staff', staffUserController.changepasswordstaffuser)


// Admin Dashboard Endpoints
// Manage Staff Data Endpoints
app.post('/get-staff-data', staffController.getstaffdata )
app.put('/update-staff-data/:id', staffController.updatestaffdata )
app.delete('/delete-staff-data/:id', staffController.deletestaffdata )
app.post('/add-staff-data', staffController.addstaffdata )
app.post('/add-principal-staff', staffController.addprincipalstaff )
app.post('/add-viceprincipal-staff', staffController.addviceprincipalstaff )
app.post('/staff_count', staffController.staffcount)

//Manage Users Endpoints
app.post('/get-user-data', userController.getuserdata )
app.delete('/delete-user-data/:id', userController.deleteuserdata )
app.put('/update-user-data/:id', userController.updateuserdata )
app.post('/add-principal-user', userController.addprincipaluser)
app.post('/add-viceprincipal-user', userController.addviceprincipaluser)
app.post('/add-staff-user', userController.addstaffuser)
app.post('/users_count', userController.userscount)
app.post('/assign-facility/:id', userController.assignfacility)
app.post('/fetch-facility', userController.fetchfacility)

// Manage Uniform Facility Endpoints
app.post('/get-uniform-data', uniformController.getuniformdata )
app.put('/update-uniform-data/:id', uniformController.updateuniformdata )
app.delete('/delete-uniform-data/:id', uniformController.deleteuniformdata )
app.post('/add-uniform-data', uniformController.adduniformdata )

// Manage Book Facility Endpoints
app.post('/add-book-data', bookController.addbookdata)
app.post('/get-book-data', bookController.getbookdata)
app.put('/update-book-data/:id', bookController.updatebookdata)
app.delete('/delete-book-data/:id', bookController.deletebookdata )

// Manage Mid-Day-Meal Facility Endpoints
app.post('/add-middaymeal-data', middaymealController.addmiddaymealdata)
app.post('/get-middaymeal-data', middaymealController.getmiddaymealdata)
app.put('/update-middaymeal-data/:id', middaymealController.updatemiddaymealdata)
app.delete('/delete-middaymeal-data/:id', middaymealController.deletemiddaymealdata )

// Listening on port 
app.listen(port, ()=>{
    console.log(`Server is listening on port no. ${port}`)
})