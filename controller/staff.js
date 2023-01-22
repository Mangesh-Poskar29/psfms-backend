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