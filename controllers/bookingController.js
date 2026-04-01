const emailService = require('../services/emailService');
const Booking = require('../models/Booking');
const { v4: uuidv4 } = require('uuid');
const Token = require('../models/Token');

// ================= CREATE BOOKING =================
exports.createBooking = async (req, res) => {
    try {
        const data = req.body;

        const bookingId = "BK-" + Date.now();

        const booking = new Booking({
            bookingId,
            ...data,
            status: "PENDING"
        });

        await booking.save();

        // create token
        const token = new Token({
            bookingId,
            token: uuidv4(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hrs
        });

        await token.save();

        // send email
        try {
            console.log("Sending email...");
            await emailService.sendBookingEmail(
                data.customerEmail,
                bookingId,
                token.token
            );
            console.log("Email sent");
        } catch (err) {
            console.log("Email failed:", err.message);
        }

        res.json({
            message: "Booking Created",
            bookingId,
            token: token.token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ================= CONFIRM BOOKING =================
exports.confirmBooking = async (req, res) => {
    try {
        const { token } = req.params;

        // find token
        const tokenData = await Token.findOne({ token });

        if (!tokenData) {
            return res.send("❌ Invalid or expired token");
        }

        // check expiry
        if (tokenData.expiresAt < new Date()) {
            return res.send("⏰ Token expired");
        }

        // update booking
        const booking = await Booking.findOneAndUpdate(
            { bookingId: tokenData.bookingId },
            {
                status: "CONFIRMED",
                confirmedAt: new Date(),
                confirmedIP: req.ip
            },
            { new: true }
        );

        res.send(`
            <h2>✅ Booking Confirmed</h2>
            <p>Booking ID: ${booking.bookingId}</p>
        `);

    } catch (error) {
        console.log(error);
        res.send("Error confirming booking");
    }
};