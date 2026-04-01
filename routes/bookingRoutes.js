const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/create-booking', bookingController.createBooking);
router.get('/confirm/:token', bookingController.confirmBooking);

module.exports = router;