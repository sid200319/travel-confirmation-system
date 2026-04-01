const mongoose = require('mongoose');

const confirmationSchema = new mongoose.Schema({
    bookingId: String,
    confirmed: Boolean,

    ipAddress: String,
    userAgent: String,

    confirmedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Confirmation', confirmationSchema);