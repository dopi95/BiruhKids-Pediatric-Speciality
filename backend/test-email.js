import * as brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';

dotenv.config();

const testEmail = async () => {
    try {
        console.log('API Key:', process.env.BREVO_API_KEY ? 'Found' : 'Missing');
        
        const apiInstance = new brevo.TransactionalEmailsApi();
        apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

        const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.to = [{ email: process.env.EMAIL_FROM }];
        sendSmtpEmail.sender = { name: "BiruhKids Test", email: process.env.EMAIL_FROM };
        sendSmtpEmail.subject = "Test Email from BiruhKids";
        sendSmtpEmail.htmlContent = "<h1>Test Email</h1><p>Your Brevo API is working!</p>";

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('✅ Email sent successfully!', result.messageId);
    } catch (error) {
        console.error('❌ Email failed:', error.response?.data || error.message);
    }
};

testEmail();