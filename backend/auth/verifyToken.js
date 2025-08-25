const jwt = require("jsonwebtoken");
const Doctor = require("../models/DoctorSchema.js");
const User = require("../models/UserSchema.js");

module.exports = {
  authenticate: async (req, res, next) => {
    // get token = require(headers)
    const authToken = req.headers.authorization;
    // 'Bearer actual token'
    if (!authToken || !authToken.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    try {
      const token = authToken.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.userId = decoded.id;
      req.role = decoded.role;


      next(); //must be call the next function
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token is expired" });
      }

      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  },

  restrict: (role) => async (req, res, next) => {
    const userId = req.userId;
    let user;


    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);
   

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    // console.log('User:', user);
    // console.log('Roles:', role);
    if (!role.includes(user.role)) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }
    next();
  },
};



  // restrict: (roles) => async (req, res, next) => {
  //   try {
  //     const userId = req.userId;
  //     const user = await User.findById(userId) || await Doctor.findById(userId);

     
      
  //     if (!user || !roles.includes(user.role)) {
  //       return res.status(401).json({ success: false, message: "You are not authorized" });
  //     }

  //     next();
  //   } catch (err) {
  //     return res.status(500).json({ success: false, message: "Internal server error" });
  //   }
  // },

