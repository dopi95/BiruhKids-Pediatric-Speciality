import nodemailer from "nodemailer";
import Subscriber from "../models/Subscriber.js";
import User from "../models/User.js";

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
        from: `"Biruh Kids Pediatric Speciality Clinic" <${
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

// Send result notification email
export const sendResultNotification = async (email, name) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"Biruh Kids Pediatric Speciality Clinic" <${
            process.env.EMAIL_FROM || process.env.EMAIL_USER
        }>`,
        to: email,
        subject: "Test Results Available - Biruh Kids Clinic",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007799;">Test Results Available</h2>
        <p>Dear ${name},</p>
        <p>Your test results have been sent to your dashboard. Please log in and check.</p>
        <p>You can access your results by logging into your account on our website.</p>
        <p>If you have any questions about your results, please contact us or schedule a follow-up appointment.</p>
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

// Newsletter: New Doctor Added
export const sendNewDoctorNewsletter = async (doctor) => {
    const activeSubscribers = await Subscriber.find({ status: "active" });
    const notificationUsers = await User.find({ emailNotifications: true });
    
    const allRecipients = [
        ...activeSubscribers.map(sub => ({ email: sub.email })),
        ...notificationUsers.map(user => ({ email: user.email }))
    ];
    
    // Remove duplicates
    const uniqueRecipients = allRecipients.filter((recipient, index, self) => 
        index === self.findIndex(r => r.email === recipient.email)
    );
    
    if (uniqueRecipients.length === 0) return { success: true, sent: 0 };

    const transporter = createTransporter();
    let sentCount = 0;

    for (const recipient of uniqueRecipients) {
        const mailOptions = {
            from: `"Biruh Kids Pediatric Speciality Clinic" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: recipient.email,
            subject: "New Doctor Joined Our Team! - Biruh Kids Clinic",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
                    <div style="background: white; padding: 30px; border-radius: 10px;">
                        <h2 style="color: #007799; text-align: center;">🩺 New Doctor Alert!</h2>
                        <div style="text-align: center; margin: 20px 0;">
                            ${doctor.photo ? `<img src="${doctor.photo}" alt="Dr. ${doctor.name}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover;">` : ''}
                        </div>
                        <h3 style="color: #333; text-align: center;">Dr. ${doctor.name}</h3>
                        <div style="background: #e8f4f8; padding: 15px; border-radius: 5px; margin: 15px 0;">
                            <p><strong>Specialty:</strong> ${doctor.field}</p>
                            <p><strong>Experience:</strong> ${doctor.experience}</p>
                        </div>
                        <p style="text-align: center; color: #666;">We're excited to welcome Dr. ${doctor.name} to our team of pediatric specialists!</p>
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/doctors" style="background: #007799; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">View All Doctors</a>
                        </div>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 12px; text-align: center;">Biruh Kids Pediatric Specialty Clinic</p>
                    </div>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            sentCount++;
        } catch (error) {
            console.error(`Failed to send newsletter to ${recipient.email}:`, error);
        }
    }

    return { success: true, sent: sentCount, total: uniqueRecipients.length };
};

// Newsletter: New Service Added
export const sendNewServiceNewsletter = async (service) => {
    const activeSubscribers = await Subscriber.find({ status: "active" });
    const notificationUsers = await User.find({ emailNotifications: true });
    
    const allRecipients = [
        ...activeSubscribers.map(sub => ({ email: sub.email })),
        ...notificationUsers.map(user => ({ email: user.email }))
    ];
    
    // Remove duplicates
    const uniqueRecipients = allRecipients.filter((recipient, index, self) => 
        index === self.findIndex(r => r.email === recipient.email)
    );
    
    if (uniqueRecipients.length === 0) return { success: true, sent: 0 };

    const transporter = createTransporter();
    let sentCount = 0;

    for (const recipient of uniqueRecipients) {
        const mailOptions = {
            from: `"Biruh Kids Pediatric Speciality Clinic" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: recipient.email,
            subject: "New Service Available! - Biruh Kids Clinic",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
                    <div style="background: white; padding: 30px; border-radius: 10px;">
                        <h2 style="color: #007799; text-align: center;">🏥 New Service Available!</h2>
                        <h3 style="color: #333; text-align: center;">${service.title_en}</h3>
                        <div style="background: #e8f4f8; padding: 15px; border-radius: 5px; margin: 15px 0;">
                            <p>${service.description_en}</p>
                            ${service.features_en && service.features_en.length > 0 ? `
                                <h4>Key Features:</h4>
                                <ul>
                                    ${service.features_en.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            ` : ''}
                        </div>
                        <p style="text-align: center; color: #666;">We're excited to offer this new service to better serve your child's health needs!</p>
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/services" style="background: #007799; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">View All Services</a>
                        </div>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 12px; text-align: center;">Biruh Kids Pediatric Specialty Clinic</p>
                    </div>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            sentCount++;
        } catch (error) {
            console.error(`Failed to send newsletter to ${recipient.email}:`, error);
        }
    }

    return { success: true, sent: sentCount, total: uniqueRecipients.length };
};

// Newsletter: New Video Added
export const sendNewVideoNewsletter = async (video) => {
    const activeSubscribers = await Subscriber.find({ status: "active" });
    const notificationUsers = await User.find({ emailNotifications: true });
    
    const allRecipients = [
        ...activeSubscribers.map(sub => ({ email: sub.email })),
        ...notificationUsers.map(user => ({ email: user.email }))
    ];
    
    // Remove duplicates
    const uniqueRecipients = allRecipients.filter((recipient, index, self) => 
        index === self.findIndex(r => r.email === recipient.email)
    );
    
    if (uniqueRecipients.length === 0) return { success: true, sent: 0 };

    const transporter = createTransporter();
    let sentCount = 0;

    for (const recipient of uniqueRecipients) {
        const mailOptions = {
            from: `"Biruh Kids Pediatric Speciality Clinic" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: recipient.email,
            subject: "New Educational Video Available! - Biruh Kids Clinic",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
                    <div style="background: white; padding: 30px; border-radius: 10px;">
                        <h2 style="color: #007799; text-align: center;">📹 New Educational Video!</h2>
                        <h3 style="color: #333; text-align: center;">${video.title}</h3>
                        ${video.platform === 'youtube' ? `
                            <div style="text-align: center; margin: 20px 0;">
                                <iframe width="100%" height="315" src="${video.url}" frameborder="0" allowfullscreen style="max-width: 560px; border-radius: 10px;"></iframe>
                            </div>
                        ` : video.thumbnail ? `
                            <div style="text-align: center; margin: 20px 0;">
                                <img src="${video.thumbnail}" alt="${video.title}" style="max-width: 100%; border-radius: 10px;">
                            </div>
                        ` : ''}
                        <div style="background: #e8f4f8; padding: 15px; border-radius: 5px; margin: 15px 0;">
                            ${video.description ? `<p>${video.description}</p>` : ''}
                            <p><strong>Platform:</strong> ${video.platform}</p>
                            ${video.category ? `<p><strong>Category:</strong> ${video.category}</p>` : ''}
                        </div>
                        <p style="text-align: center; color: #666;">Watch this educational video to learn more about pediatric health!</p>
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="${video.url || process.env.FRONTEND_URL + '/videos'}" style="background: #007799; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">Watch on ${video.platform === 'youtube' ? 'YouTube' : 'TikTok'}</a>
                        </div>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 12px; text-align: center;">Biruh Kids Pediatric Specialty Clinic</p>
                    </div>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            sentCount++;
        } catch (error) {
            console.error(`Failed to send newsletter to ${recipient.email}:`, error);
        }
    }

    return { success: true, sent: sentCount, total: uniqueRecipients.length };
};
