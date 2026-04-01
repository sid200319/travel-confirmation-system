const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: String,
    customerName: String,
    customerEmail: String,

    passengers: [
        {
            name: String,
            dob: String
        }
    ],

    tripDetails: {
        departure: {
            from: String,
            to: String,
            date: String,
            time: String
        },
        return: {
            from: String,
            to: String,
            date: String,
            time: String
        }
    },

    price: Number,
    currency: String,

    cardDetails: {
        last4: String,
        type: String,
        expiry: String,
        billingAddress: String
    },

    status: {
        type: String,
        default: "PENDING"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);