# Brevo API Setup Instructions

## Getting Your Brevo API Key

1. **Sign up or log in to Brevo**
   - Go to [https://www.brevo.com/](https://www.brevo.com/)
   - Create an account or log in to your existing account

2. **Navigate to API Keys**
   - Go to your Brevo dashboard
   - Click on your profile/account settings
   - Navigate to "SMTP & API" section
   - Click on "API Keys"

3. **Create a New API Key**
   - Click "Generate a new API key"
   - Give it a descriptive name (e.g., "BiruhKids Backend")
   - Copy the generated API key

4. **Update Your Environment Variables**
   - Open your `.env` file
   - Replace `your-brevo-api-key-here` with your actual API key:
   ```
   BREVO_API_KEY=your-actual-api-key-here
   ```

## Benefits of Using Brevo API vs SMTP

- **Better Deliverability**: API calls are less likely to be blocked by hosting providers
- **No Port Restrictions**: Doesn't rely on SMTP ports that might be blocked
- **Better Error Handling**: More detailed error responses
- **Rate Limiting**: Built-in rate limiting and retry mechanisms
- **Analytics**: Better tracking and analytics through Brevo dashboard

## Environment Variables Required

```env
BREVO_API_KEY=your-brevo-api-key-here
EMAIL_FROM=your-verified-sender-email@domain.com
EMAIL_USER=your-verified-sender-email@domain.com
```

**Note**: Make sure your sender email is verified in your Brevo account before sending emails.