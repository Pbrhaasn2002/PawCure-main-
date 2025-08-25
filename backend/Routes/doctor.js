const express = require("express");
const {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
} = require("../Controllers/doctorController.js");

const { authenticate, restrict } = require("../auth/verifyToken.js");

const reviewRouter = require("./review.js");

const router = express.Router();

//nested route


router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
router.get("/:id", authenticate, restrict(["doctor", "patient"]), getSingleDoctor);
router.get("/",  getAllDoctor);

router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

// Ensure that the reviewRouter is mounted after the doctorId parameter in the URL
router.use("/:doctorId/reviews", reviewRouter);

module.exports = router;
// router.use("/doctorId/reviews", reviewRouter);

// router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
// router.get("/:id",authenticate, restrict(["doctor"]), getSingleDoctor);
// router.get("/", authenticate, restrict(["admin"]),getAllDoctor);

// router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
// router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

// router.get("/:id",authenticate, restrict(["doctor"]), getSingleDoctor);
// router.get("/", authenticate, restrict(["admin"]),getAllDoctor);

// router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
// router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
// router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

// router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

// router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile);


