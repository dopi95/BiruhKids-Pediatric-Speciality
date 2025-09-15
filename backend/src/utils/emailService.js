import nodemailer from "nodemailer";

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Send password reset OTP email
export const sendPasswordResetOTP = async (email, otp) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"Biruh Kids Clinic" <${
            process.env.EMAIL_FROM || process.env.EMAIL_USER
        }>`,
        to: email,
        subject: "Password Reset OTP - Biruh Kids Clinic",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007799;">Password Reset OTP</h2>
        <p>You have requested a password reset for your Biruh Kids Clinic account.</p>
        <p>Your verification code is:</p>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
          <h1 style="color: #007799; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p><strong>This code will expire in 10 minutes.</strong></p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">Biruh Kids Pediatric Specialty Clinic</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Email send error:", error);
        return { success: false, error: error.message };
    }
};


// Send welcome email
export const sendWelcomeEmail = async (email, name) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"Biruh Kids Clinic" <${
            process.env.EMAIL_FROM || process.env.EMAIL_USER
        }>`,
        to: email,
        subject: "Welcome to Biruh Kids Clinic!",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007799;">Welcome ${name}!</h2>
        <p>Your account has been successfully created at Biruh Kids Pediatric Specialty Clinic.</p>
        <p>You can now:</p>
        <ul>
          <li>Book appointments with our specialists</li>
          <li>Access your medical records</li>
          <li>Receive important health updates</li>
        </ul>
        <p>If you have any questions, feel free to contact us.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">Biruh Kids Pediatric Specialty Clinic</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Email send error:", error);
        return { success: false, error: error.message };
    }
};
