const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create booking
router.post('/create-booking', bookingController.createBooking);

// Confirm booking (IMPORTANT)
router.get('/confirm/:token', bookingController.confirmBooking);

module.exports = router;