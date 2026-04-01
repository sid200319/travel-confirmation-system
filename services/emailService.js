const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

exports.sendBookingEmail = async (to, bookingId, token) => {

    // ✅ FIXED LINK
    const confirmationLink = `${process.env.BASE_URL}/api/confirm/${token}`;

    const html = `
        <h2>Booking Confirmation</h2>
        <p>Your booking ID: ${bookingId}</p>
        <p>Please confirm your booking:</p>
        <a href="${confirmationLink}" 
           style="padding:10px 20px;background:green;color:white;text-decoration:none;">
           Confirm Booking
        </a>
    `;

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: "Confirm Your Booking",
        html
    });
};