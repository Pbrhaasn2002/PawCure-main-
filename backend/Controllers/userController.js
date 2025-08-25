const User = require("../models/UserSchema.js");
const Booking = require("../models/BookingSchema.js");
const Doctor = require("../models/DoctorSchema.js");

module.exports = {
  updateUser: async (req, res) => {
    const id = req.params.id

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      )

      res.status(200).json({
        success: true,
        message: "Successfully updated!",
        data: updatedUser,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to update!" });
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;

    try {
      const updatedUser = await User.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Successfully deleted!",
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to delete!" });
    }
  },
  getSingleUser: async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findById(id).select("-password");

      res.status(200).json({
        success: true,
        message: "User found!",
        data: user,
      });
    } catch (err) {
      res.status(404).json({ success: false, message: "No user found!" });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const users = await User.findbyId(id).select("-password");

      res.status(200).json({
        success: true,
        message: "Users found!",
        data: users,
      });
    } catch (err) {
      res.status(404).json({ success: false, message: "Not found!" });
    }
  },
  getUserProfile: async (req, res) => {
    const userId = req.userId;

    try {
      const user = await User.findById(userId)


      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
      }
      const { password, ...rest } = user._doc

      res.status(200).json({ success: true, message: 'profile info is getting ', data: { ...rest } })
    } 
    catch (err) {
      res.status(500).json({ success: false, message: 'something went wrong, cannot get' })
    }
  },
  getMyAppointments: async (req, res) => {
    try {

      //step1 retrieve appointments = require(booking) 
      const bookings = await Booking.find({ user: req.userId })
      //step2 extract doctor ids = require(appointment)s
      const doctorIds = bookings.map(el => el.doctor.id)
      //step3 retrive doctors using extracted doctor id
      const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password')

      res.status(200).json({ success: true, message: 'Appointments are getting', data: doctors })
    } catch (error) {
      res.status(500).json({ success: false, message: 'something went wrong, cannot get' })
    }
  }




};

