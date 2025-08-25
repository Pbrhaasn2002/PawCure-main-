const Doctor = require("../models/DoctorSchema.js");
const Booking = require("../models/BookingSchema.js");

module.exports = {
  updateDoctor: async (req, res) => {
    const id = req.params.id;

    try {
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Successfully updated!",
        data: updatedDoctor,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to update!" });
    }
  },

  deleteDoctor: async (req, res) => {
    const id = req.params.id;

    try {
      const updatedDoctor = await Doctor.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Successfully deleted!",
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to delete!" });
    }
  },

  getSingleDoctor: async (req, res) => {
    const id = req.params.id;

    try {
      const doctor = await Doctor.findById(id)
        .populate("reviews")
        .select("-password");

        // const result = {
        //   success: true,
        //   message: "Doctors found!",
        //   data: doctor,
        // };
        // return res.status(200).json(result);
      res.status(200).json({
        success: true,
        message: "Doctor found!",
        data: doctor,
      });
    } catch (err) {
      res.status(404).json({ success: false, message: "No Doctor found!" });
    }
  },

  getAllDoctor: async (req, res) => {
    try {
      const { query } = req.query;
      let doctors;
      if (query) {
        doctors = await Doctor.find({
          isApproved: "pending",
          $or: [
            { name: { $regex: query, $options: "i" } },
            { specialization: { $regex: query, $options: "i" } },
          ],
        }).select("-password");
      } else {
         doctors = await Doctor.find().select(
          "-password"
        );

        console.log(doctors);
      }
      const result = {
        success: true,
        message: "Doctors found!",
        data: doctors,
      };
      console.log(result);
      return res.status(200).json(result);
    } catch (err) {
      res.status(404).json({ success: false, message: "Not found!" });
    }
  },
  // getDoctorProfile: async (req, res) => {
  //   const doctorId = req.userId;

  //   try {
  //     const doctor = await Doctor.findById(doctorId);

  //     if (!doctor) {
  //       return res
  //         .status(404)
  //         .JSON({ success: false, message: "Doctor not found" });
  //     }
  //     const { password, ...rest } = doctor._doc;
  //     const appointments = await Booking.find({ doctor: doctorId });

  //     res.status(200).JSON({
  //       success: true,
  //       message: "profile info is getting ",
  //       data: { ...rest, appointments },
  //     });
  //   } catch (err) {
  //     res
  //       .status(500)
  //       .json({ success: false, message: "something went wrong, cannot get" });
  //   }
  // },



  getDoctorProfile : async (req, res) => {
    const doctorId = req.userId;
  
    try {
      // Find doctor by ID
      const doctor = await Doctor.findById(doctorId);
  
      // Handle case where doctor is not found
      if (!doctor) {
        return res.status(404).json({ success: false, message: "Doctor not found" });
      }
  
      // Find appointments associated with the doctor
      const appointments = await Booking.find({ doctor: doctorId });
  
      // Respond with profile info and appointments
      res.status(200).json({
        success: true,
        message: "Profile info retrieved successfully",
        data : {...doctor._doc, appointments},
        // data: { doctor: doctor, appointments: appointments },
      });
    } catch (err) {
      // Handle errors
      console.error("Error fetching doctor profile:", err);
      res.status(500).json({ success: false, message: "Something went wrong, unable to retrieve profile" });
    }
  },
  
};









