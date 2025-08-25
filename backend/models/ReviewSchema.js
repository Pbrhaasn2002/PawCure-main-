const mongoose = require("mongoose");
const Doctor = require("./DoctorSchema.js");

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      // required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  const stats = await this.aggregate([{
    $match: { doctor: doctorId }
  },
  {
    $group: {
      _id: '$doctor',
      numofRating: { $sum: 1 },
      avgRating: { $avg: '$rating' },
    },
  },
  ]);
  await Doctor.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].numofRating,
    averageRating: stats[0].avgRating
  })
  console.log(stats);
};


// reviewSchema.statics.calcAverageRatings = async function (doctorId) {
//   const stats = await this.aggregate([
//     {
//       $match: { doctor: doctorId }
//     },
//     {
//       $group: {
//         _id: '$doctor',
//         numofRating: { $sum: 1 },
//         avgRating: { $avg: '$rating' },
//       },
//     },
//   ]);

//   // Update Doctor document with totalRating and averageRating
//   await Doctor.findByIdAndUpdate(doctorId, {
//     totalRating: stats.length > 0 ? stats[0].numofRating : 0,
//     averageRating: stats.length > 0 ? stats[0].avgRating : 0
//   });
// };
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.doctor);
});

module.exports = mongoose.model("Review", reviewSchema);



