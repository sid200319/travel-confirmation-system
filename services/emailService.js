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

    const confirmationLink = `${process.env.BASE_URL}/api/confirm/${token}`;

    const html = `
        <div style="font-family:Arial;padding:20px;">
            <h2>Booking Confirmation</h2>
            <p>Your booking ID: <strong>${bookingId}</strong></p>
            <p>Please confirm your booking:</p>

            <a href="${confirmationLink}" 
               style="display:inline-block;padding:12px 25px;background:#28a745;color:white;text-decoration:none;border-radius:5px;">
               Confirm Booking
            </a>

            <p style="margin-top:20px;font-size:12px;color:gray;">
                If you did not make this booking, please ignore this email.
            </p>
        </div>
    `;

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: "Confirm Your Booking",
        html
    });
};