// Telegram notification service for appointments
const sendTelegramNotification = async (message) => {
    const botToken = '7622120987:AAECTaQR0ZoWfOAxLbW6SeKtWJjeiuf2Afk';
    const chatId = '2120123278';
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();
        
        if (result.ok) {
            console.log('Telegram notification sent successfully');
            return { success: true };
        } else {
            console.error('Telegram API error:', result);
            return { success: false, error: result.description };
        }
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
        return { success: false, error: error.message };
    }
};

// Send new appointment notification
export const sendNewAppointmentNotification = async (appointment) => {
    const message = `
🏥 <b>New Appointment Booking!</b>

👤 <b>Patient:</b> ${appointment.firstName} ${appointment.lastName}
📧 <b>Email:</b> ${appointment.email}
📱 <b>Phone:</b> ${appointment.phone}
🎂 <b>Age:</b> ${appointment.age}
⚧ <b>Gender:</b> ${appointment.gender}
👨‍⚕️ <b>Doctor:</b> ${appointment.doctor}
📅 <b>Date:</b> ${appointment.date}
⏰ <b>Time:</b> ${appointment.time}

Please check the dashboard to manage this appointment.
    `;
    
    return await sendTelegramNotification(message);
};

export default { sendNewAppointmentNotification };