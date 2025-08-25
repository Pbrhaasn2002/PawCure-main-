const express = require("express");
const {authenticate} = require("./../auth/verifyToken.js");
const bookingController = require('../Controllers/bookingController.js');

const router = express.Router();

router.post('/checkout-session/:doctorId', authenticate, bookingController.getCheckoutSession);

module.exports = router;
