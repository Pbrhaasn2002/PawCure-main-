const User = require("../models/UserSchema.js");
const Doctor = require("../models/DoctorSchema.js");
const Booking = require("../models/BookingSchema.js");
const Stripe = require("stripe");

const getCheckoutSession = async (req, res) => {
  try {
    //get currently booked doctor
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    // Add validation checks
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate and parse ticketPrice
    const ticketPrice = parseFloat(doctor.ticketPrice);
    if (isNaN(ticketPrice) || ticketPrice <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ticket price" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "INR",
            unit_amount: Math.round(ticketPrice * 100),
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });
    // create new booking
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: ticketPrice,
      session: session.id,
    });

    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "Successfuly Paid", session });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};
module.exports = {
  getCheckoutSession: getCheckoutSession,
};
