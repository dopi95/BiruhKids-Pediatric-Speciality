import * as brevo from '@getbrevo/brevo';

// Helper function to send email via Brevo API
const sendBrevoEmail = async (to, subject, htmlContent, fromName = "BiruhKids Pediatric Clinic") => {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.sender = { name: fromName, email: process.env.EMAIL_FROM || process.env.EMAIL_USER };
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    
    return await apiInstance.sendTransacEmail(sendSmtpEmail);
};

// Email templates
const getConfirmationEmailTemplate = (appointment) => {
    const appointmentDate = new Date(appointment.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return {
        subject: "Appointment Confirmed - BiruhKids Pediatric Clinic",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2563eb; margin: 0;">BiruhKids Pediatric Clinic</h1>
                        <p style="color: #666; margin: 5px 0;">Where children become bright and healthy!</p>
                    </div>
                    
                    <h2 style="color: #16a34a; text-align: center; margin-bottom: 20px;">✅ Appointment Confirmed</h2>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        Dear ${appointment.firstName} ${appointment.lastName},
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        We are pleased to confirm your appointment with <strong>${appointment.doctor}</strong> at BiruhKids Pediatric Clinic.
                    </p>
                    
                    <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
                        <h3 style="color: #2563eb; margin-top: 0;">Appointment Details:</h3>
                        <p style="margin: 8px 0; color: #333;"><strong>Doctor:</strong> ${appointment.doctor}</p>
                        <p style="margin: 8px 0; color: #333;"><strong>Date:</strong> ${appointmentDate}</p>
                        <p style="margin: 8px 0; color: #333;"><strong>Time:</strong> ${appointment.time}</p>
                        <p style="margin: 8px 0; color: #333;"><strong>Patient:</strong> ${appointment.firstName} ${appointment.lastName}</p>
                    </div>
                    
                    <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                        <p style="margin: 0; color: #92400e; font-weight: 500;">
                            📋 <strong>Important Reminders:</strong>
                        </p>
                        <ul style="color: #92400e; margin: 10px 0; padding-left: 20px;">
                            <li>Please arrive 30 minutes early for check-in</li>
                            <li>Bring any previous medical records or test results</li>
                            <li>If you need to reschedule, please call us at least 24 hours in advance</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <p style="color: #666; margin: 5px 0;">📍 <strong>Location:</strong> Torhayloch, 100 meters from Augusta Bridge, Addis Ababa</p>
                        <p style="color: #666; margin: 5px 0;">📞 <strong>Phone:</strong> +251963555552 / +251939602927</p>
                        <p style="color: #666; margin: 5px 0;">✉️ <strong>Email:</strong> biruhkidsclinic@gmail.com</p>
                    </div>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        We look forward to seeing you and providing the best care for your child.
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        Thank you for choosing BiruhKids Pediatric Clinic!
                    </p>
                    
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
};

const getCancellationEmailTemplate = (appointment, reason) => {
    const appointmentDate = new Date(appointment.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return {
        subject: "Appointment Cancellation - BiruhKids Pediatric Clinic",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2563eb; margin: 0;">BiruhKids Pediatric Clinic</h1>
                        <p style="color: #666; margin: 5px 0;">Where children become bright and healthy!</p>
                    </div>
                    
                    <h2 style="color: #dc2626; text-align: center; margin-bottom: 20px;">❌ Appointment Cancellation</h2>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        Dear ${appointment.firstName} ${appointment.lastName},
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        We sincerely apologize, but unfortunately your appointment with <strong>${appointment.doctor}</strong> could not be confirmed.
                    </p>
                    
                    <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
                        <h3 style="color: #dc2626; margin-top: 0;">Cancelled Appointment Details:</h3>
                        <p style="margin: 8px 0; color: #333;"><strong>Doctor:</strong> ${appointment.doctor}</p>
                        <p style="margin: 8px 0; color: #333;"><strong>Date:</strong> ${appointmentDate}</p>
                        <p style="margin: 8px 0; color: #333;"><strong>Time:</strong> ${appointment.time}</p>
                        <p style="margin: 8px 0; color: #333;"><strong>Reason:</strong> ${reason || "Doctor not available"}</p>
                    </div>
                    
                    <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
                        <p style="margin: 0; color: #1e40af; font-weight: 500;">
                            📅 <strong>Next Steps:</strong>
                        </p>
                        <ul style="color: #1e40af; margin: 10px 0; padding-left: 20px;">
                            <li>Please choose another available date and time</li>
                            <li>Call us at +251963555552 or +251939602927 to reschedule</li>
                            <li>You can also visit our clinic during working hours</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <p style="color: #666; margin: 5px 0;">📍 <strong>Location:</strong> Torhayloch, 100 meters from Augusta Bridge, Addis Ababa</p>
                        <p style="color: #666; margin: 5px 0;">📞 <strong>Phone:</strong> +251963555552 / +251939602927</p>
                        <p style="color: #666; margin: 5px 0;">✉️ <strong>Email:</strong> biruhkidsclinic@gmail.com</p>
                    </div>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        We deeply apologize for any inconvenience this may cause and appreciate your understanding. We are committed to providing you with the best possible care and will do our best to accommodate you at the earliest available time.
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        Thank you for your patience and for choosing BiruhKids Pediatric Clinic.
                    </p>
                    
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
};

// Send appointment email
export const sendAppointmentEmail = async (appointment, type, reason = null) => {
    try {
        let emailTemplate;
        if (type === "confirmed") {
            emailTemplate = getConfirmationEmailTemplate(appointment);
        } else if (type === "cancelled") {
            emailTemplate = getCancellationEmailTemplate(appointment, reason);
        } else {
            throw new Error("Invalid email type");
        }
        
        const result = await sendBrevoEmail(
            appointment.email,
            emailTemplate.subject,
            emailTemplate.html,
            "BiruhKids Pediatric Clinic"
        );
        
        console.log(`${type} email sent successfully:`, result.messageId);
        return result;
        
    } catch (error) {
        console.error(`Error sending ${type} email:`, error);
        throw error;
    }
};