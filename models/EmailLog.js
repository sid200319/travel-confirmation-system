const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
    bookingId: String,
    email: String,
    status: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('EmailLog', emailLogSchema);