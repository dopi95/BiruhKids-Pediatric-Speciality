const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const chatWithAI = async (req, res) => {
	try {
		const { message, conversationHistory = [] } = req.body;

		if (!message) {
			console.log("No message provided");
			return res.status(400).json({ error: "Message is required" });
		}

		if (!process.env.GROQ_API_KEY) {
			return res.json({
				response:
					"Thank you for your question! For specific inquiries, please contact us at biruhkidsclinic@gmail.com or call 0996505319. Is there anything else I can help you with regarding your child's healthcare?",
				source: "fallback",
			});
		}

		const messages = [
			{
				role: "system",
				content: `You are a helpful assistant for BiruhKids Pediatric Specialty Clinic in Addis Ababa, Ethiopia.

Services: Pediatric OPD, Emergency care, Laboratory, Ultrasound, Surgery, Nutrition counseling, and paid Consultancy services.
Contact: 0996505319 / 0939602927 / 0984650912 or biruhkidsclinic@gmail.com
Location: Torhayloch, 100 meters from Augusta Bridge

Appointments: You can book appointments online through our website by filling out the appointment form. Once submitted, you'll receive a confirmation email or we'll call you to confirm your appointment. For further assistance, contact us at the phone numbers or email above.

Results: You can access your lab results and reports online by following these steps: 1) Click the 'Sign In' tab 2) Enter your email and password 3) You'll be redirected to your user dashboard where you can see your result history. Alternatively, call us at the phone numbers above. Results are typically available within 24-48 hours.

For consultancy questions, mention it's a premium paid service and provide contact details.
Be warm, professional, and always end with asking if they need more help with their child's healthcare.`,
			},
			...conversationHistory,
			{ role: "user", content: message },
		];

		console.log("🚀 SENDING REQUEST TO GROQ AI...");

		const requestBody = {
			model: "llama-3.1-8b-instant",
			messages: messages,
			temperature: 0.7,
			max_tokens: 300,
			top_p: 0.9,
		};

		const response = await fetch(GROQ_API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});

		console.log("📡 GROQ API RESPONSE STATUS:", response.status);

		if (!response.ok) {
			const errorText = await response.text();

			throw new Error(
				`Groq API error: ${response.status} - ${errorText}`
			);
		}

		const data = await response.json();
		console.log("🤖 GROQ AI RESPONSE RECEIVED");

		const aiResponse =
			data.choices[0]?.message?.content ||
			"I apologize, but I encountered an issue. Please contact us directly at biruhkidsclinic@gmail.com or call 0996505319.";

		console.log("✅ GROQ AI RESPONSE SENT");
		res.json({ response: aiResponse, source: "groq-ai" });
	} catch (error) {
		res.status(500).json({
			error: "AI service temporarily unavailable. Please contact us directly at biruhkidsclinic@gmail.com or call 0996505319.",
			source: "error",
		});
	}
};
