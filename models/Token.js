const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    bookingId: String,
    token: String,
    used: {
        type: Boolean,
        default: false
    },
    expiresAt: Date
});

module.exports = mongoose.model('Token', tokenSchema);