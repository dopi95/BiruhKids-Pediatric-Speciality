import nodemailer from "nodemailer";

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

// Send subscription confirmation email
export const sendSubscriptionEmail = async (email) => {
    try {
        console.log('Creating email transporter...');
        const transporter = createTransporter();
        
        console.log('Generating unsubscribe URL...');
        const unsubscribeUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/subscribers/unsubscribe/${encodeURIComponent(email)}`;
        console.log('Unsubscribe URL:', unsubscribeUrl);

        console.log('Preparing mail options...');
        const mailOptions = {
            from: `"BiruhKids Pediatric Clinic" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome to BiruhKids Newsletter! 🎉",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #2563eb; margin: 0;">BiruhKids Pediatric Clinic</h1>
                            <p style="color: #666; margin: 5px 0;">Where children become bright and healthy!</p>
                        </div>
                        
                        <h2 style="color: #16a34a; text-align: center; margin-bottom: 20px;">🎉 Welcome to Our Newsletter!</h2>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #333;">
                            Dear Subscriber,
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #333;">
                            Thank you for subscribing to the BiruhKids Pediatric Clinic newsletter! We're excited to have you join our community of parents and caregivers who are committed to their children's health and wellbeing.
                        </p>
                        
                        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
                            <h3 style="color: #2563eb; margin-top: 0;">What to Expect:</h3>
                            <ul style="color: #333; margin: 10px 0; padding-left: 20px;">
                                <li>Health tips and advice for children</li>
                                <li>Updates on our latest services and treatments</li>
                                <li>Educational content about pediatric care</li>
                                <li>Clinic news and announcements</li>
                                <li>Special offers and health programs</li>
                            </ul>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="color: #666; margin: 5px 0;">📍 <strong>Location:</strong> Torhayloch, 100 meters from Augusta Bridge, Addis Ababa</p>
                            <p style="color: #666; margin: 5px 0;">📞 <strong>Phone:</strong> +251963555552 / +251939602927</p>
                            <p style="color: #666; margin: 5px 0;">✉️ <strong>Email:</strong> biruhkidsclinic@gmail.com</p>
                        </div>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #333;">
                            We're committed to providing you with valuable information to help keep your children healthy and happy.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${unsubscribeUrl}" 
                               style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                                Unsubscribe
                            </a>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                            <p style="color: #666; font-size: 14px; margin: 0;">
                                Best regards,<br>
                                <strong>BiruhKids Pediatric Clinic Team</strong>
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        console.log('Sending email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });
        
        const result = await transporter.sendMail(mailOptions);
        console.log(`Subscription confirmation email sent successfully to ${email}`);
        console.log('Email result:', result.messageId);
        return result;
    } catch (error) {
        console.error("Error sending subscription email:", error);
        console.error("Email error details:", {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response
        });
        throw error;
    }
};