import express from "express";
import Subscriber from "../models/Subscriber.js";
import User from "../models/User.js";

const router = express.Router();

// Subscribe endpoint
router.post("/subscribe", async (req, res) => {
	try {
		const { email } = req.body;

		// Validate email
		if (!email || !email.includes("@")) {
			return res.status(400).json({
				success: false,
				message: "Please provide a valid email address",
			});
		}

		// Check if email already exists
		const existingSubscriber = await Subscriber.findOne({ email });

		if (existingSubscriber) {
			if (existingSubscriber.status === "active") {
				return res.status(400).json({
					success: false,
					message: "This email is already subscribed",
				});
			} else {
				// Reactivate unsubscribed user
				existingSubscriber.status = "active";
				existingSubscriber.unsubscribedAt = null;
				await existingSubscriber.save();

				return res.json({
					success: true,
					message: "Successfully resubscribed to our newsletter",
				});
			}
		}

		// Create new subscriber
		const newSubscriber = new Subscriber({
			email,
			status: "active",
			subscribedAt: new Date(),
		});

		await newSubscriber.save();

		// No confirmation email sent for new subscription

		res.json({
			success: true,
			message: "Successfully subscribed to our newsletter",
		});
	} catch (error) {
		console.error("Subscribe error:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

// Unsubscribe endpoint (GET for email links)
router.get("/unsubscribe/:email", async (req, res) => {
	try {
		const { email } = req.params;
		const decodedEmail = decodeURIComponent(email);

		// Validate email
		if (!decodedEmail || !decodedEmail.includes("@")) {
			return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Email - BiruhKids Pediatric Clinic</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
            .error { color: #dc2626; font-size: 24px; margin-bottom: 20px; }
            .contact { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style="color: #2563eb; margin: 0;">BiruhKids Pediatric Clinic</h1>
            <p style="color: #666; margin: 5px 0 30px 0;">Where children become bright and healthy!</p>
            
            <div class="error">❌ Invalid Email</div>
            
            <p>Please provide a valid email address.</p>
            
            <div class="contact">
              <p><strong>Contact Us:</strong></p>
              <p>📞 +251963555552 / +251939602927</p>
              <p>✉️ biruhkidsclinic@gmail.com</p>
            </div>
          </div>
        </body>
        </html>
      `);
		}

		// Find subscriber or user with email notifications
		const subscriber = await Subscriber.findOne({ email: decodedEmail });
		const user = await User.findOne({ email: decodedEmail, emailNotifications: true });

		if (!subscriber && !user) {
			return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Email Not Found - BiruhKids Pediatric Clinic</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
            .warning { color: #f59e0b; font-size: 24px; margin-bottom: 20px; }
            .email { background: #fef3c7; padding: 10px; border-radius: 5px; margin: 20px 0; }
            .contact { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style="color: #2563eb; margin: 0;">BiruhKids Pediatric Clinic</h1>
            <p style="color: #666; margin: 5px 0 30px 0;">Where children become bright and healthy!</p>
            
            <div class="warning">⚠️ Email Not Found</div>
            
            <p>This email address was not found in our mailing list.</p>
            
            <div class="email"><strong>Email:</strong> ${decodedEmail}</div>
            
            <div class="contact">
              <p><strong>Contact Us:</strong></p>
              <p>📞 +251963555552 / +251939602927</p>
              <p>✉️ biruhkidsclinic@gmail.com</p>
            </div>
          </div>
        </body>
        </html>
      `);
		}

		// Check if already unsubscribed
		if (subscriber && subscriber.status === "unsubscribed" && (!user || !user.emailNotifications)) {
			return res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Already Unsubscribed - BiruhKids Pediatric Clinic</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
            .info { color: #2563eb; font-size: 24px; margin-bottom: 20px; }
            .email { background: #f0f9ff; padding: 10px; border-radius: 5px; margin: 20px 0; }
            .contact { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style="color: #2563eb; margin: 0;">BiruhKids Pediatric Clinic</h1>
            <p style="color: #666; margin: 5px 0 30px 0;">Where children become bright and healthy!</p>
            
            <div class="info">ℹ️ Already Unsubscribed</div>
            
            <p>This email address is already unsubscribed from our newsletter.</p>
            
            <div class="email"><strong>Email:</strong> ${decodedEmail}</div>
            
            <div class="contact">
              <p><strong>Contact Us:</strong></p>
              <p>📞 +251963555552 / +251939602927</p>
              <p>✉️ biruhkidsclinic@gmail.com</p>
            </div>
          </div>
        </body>
        </html>
      `);
		}

		// Update subscriber status if exists
		if (subscriber) {
			subscriber.status = "unsubscribed";
			subscriber.unsubscribedAt = new Date();
			await subscriber.save();
		}

		// Update user email notifications if exists
		if (user) {
			user.emailNotifications = false;
			await user.save();
		}

		res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Unsubscribed - BiruhKids Pediatric Clinic</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
          .success { color: #16a34a; font-size: 24px; margin-bottom: 20px; }
          .email { background: #f0f9ff; padding: 10px; border-radius: 5px; margin: 20px 0; }
          .contact { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 style="color: #2563eb; margin: 0;">BiruhKids Pediatric Clinic</h1>
          <p style="color: #666; margin: 5px 0 30px 0;">Where children become bright and healthy!</p>
          
          <div class="success">✅ Successfully Unsubscribed</div>
          
          <p>You have been successfully unsubscribed from our newsletter.</p>
          
          <div class="email"><strong>Email:</strong> ${decodedEmail}</div>
          
          <p>You will no longer receive newsletter emails from BiruhKids Pediatric Clinic.</p>
          <p>If you change your mind, you can always resubscribe from our website.</p>
          
          <div class="contact">
            <p><strong>Contact Us:</strong></p>
            <p>📞 +251963555552 / +251939602927</p>
            <p>✉️ biruhkidsclinic@gmail.com</p>
            <p>📍 Torhayloch, 100 meters from Augusta Bridge, Addis Ababa</p>
          </div>
        </div>
      </body>
      </html>
    `);
	} catch (error) {
		console.error("Unsubscribe error:", error);
		res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error - BiruhKids Pediatric Clinic</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
          .error { color: #dc2626; font-size: 24px; margin-bottom: 20px; }
          .contact { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 style="color: #2563eb; margin: 0;">BiruhKids Pediatric Clinic</h1>
          <p style="color: #666; margin: 5px 0 30px 0;">Where children become bright and healthy!</p>
          
          <div class="error">❌ Error</div>
          
          <p>An error occurred while processing your request. Please try again later.</p>
          
          <div class="contact">
            <p><strong>Contact Us:</strong></p>
            <p>📞 +251963555552 / +251939602927</p>
            <p>✉️ biruhkidsclinic@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `);
	}
});

// Unsubscribe endpoint (POST for forms)
router.post("/unsubscribe", async (req, res) => {
	try {
		const { email } = req.body;

		// Validate email
		if (!email || !email.includes("@")) {
			return res.status(400).json({
				success: false,
				message: "Please provide a valid email address",
			});
		}

		// Find subscriber
		const subscriber = await Subscriber.findOne({ email });

		if (!subscriber) {
			return res.status(404).json({
				success: false,
				message: "Email not found in our subscribers list",
			});
		}

		if (subscriber.status === "unsubscribed") {
			return res.status(400).json({
				success: false,
				message: "This email is already unsubscribed",
			});
		}

		// Update subscriber status
		subscriber.status = "unsubscribed";
		subscriber.unsubscribedAt = new Date();
		await subscriber.save();

		res.json({
			success: true,
			message: "Successfully unsubscribed from our newsletter",
		});
	} catch (error) {
		console.error("Unsubscribe error:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

// Get all subscribers (including users with email notifications)
router.get("/", async (req, res) => {
	try {
		// Get newsletter subscribers
		const newsletterSubscribers = await Subscriber.find().sort({
			subscribedAt: -1,
		});

		// Get users who opted for email notifications
		const notificationUsers = await User.find({
			emailNotifications: true,
		})
			.select("email name createdAt")
			.sort({ createdAt: -1 });

		// Combine both lists, avoiding duplicates
		const allSubscribers = [];
		const emailSet = new Set();

		// Add newsletter subscribers first
		newsletterSubscribers.forEach((sub) => {
			if (!emailSet.has(sub.email)) {
				allSubscribers.push({
					_id: sub._id,
					email: sub.email,
					status: sub.status,
					subscribedAt: sub.subscribedAt,
					source: "newsletter",
					name: null,
				});
				emailSet.add(sub.email);
			}
		});

		// Add notification users (avoid duplicates)
		notificationUsers.forEach((user) => {
			if (!emailSet.has(user.email)) {
				allSubscribers.push({
					_id: user._id,
					email: user.email,
					status: "active",
					subscribedAt: user.createdAt,
					source: "signup",
					name: user.name,
				});
				emailSet.add(user.email);
			}
		});

		// Sort by subscription date (newest first)
		allSubscribers.sort(
			(a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt)
		);

		res.json({
			success: true,
			data: { subscribers: allSubscribers },
		});
	} catch (error) {
		console.error("Get subscribers error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch subscribers",
		});
	}
});

// Check if email is subscribed
router.get("/check/:email", async (req, res) => {
	try {
		const { email } = req.params;

		if (!email || !email.includes("@")) {
			return res.status(400).json({
				success: false,
				message: "Please provide a valid email address",
			});
		}

		const subscriber = await Subscriber.findOne({ email });
		const isSubscribed = subscriber && subscriber.status === "active";

		res.json({
			success: true,
			isSubscribed,
		});
	} catch (error) {
		console.error("Check subscription error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to check subscription status",
		});
	}
});

// Get subscriber statistics (including users with email notifications)
router.get("/stats", async (req, res) => {
	try {
		// Newsletter subscriber stats
		const newsletterTotal = await Subscriber.countDocuments();
		const newsletterActive = await Subscriber.countDocuments({
			status: "active",
		});
		const newsletterUnsubscribed = await Subscriber.countDocuments({
			status: "unsubscribed",
		});

		// User notification stats
		const notificationUsers = await User.countDocuments({
			emailNotifications: true,
		});

		// Get unique emails to avoid double counting
		const newsletterEmails = await Subscriber.find({}, "email");
		const userEmails = await User.find(
			{ emailNotifications: true },
			"email"
		);

		const allEmails = new Set();
		newsletterEmails.forEach((sub) => allEmails.add(sub.email));
		userEmails.forEach((user) => allEmails.add(user.email));

		const total = allEmails.size;
		const active =
			newsletterActive +
			notificationUsers -
			(newsletterTotal + notificationUsers - total); // Adjust for duplicates
		const unsubscribed = newsletterUnsubscribed;

		res.json({
			success: true,
			data: { total, active, unsubscribed },
		});
	} catch (error) {
		console.error("Get stats error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch statistics",
		});
	}
});

// Bulk unsubscribe endpoint
router.post("/bulk-unsubscribe", async (req, res) => {
	try {
		const { subscriberIds } = req.body;

		if (!subscriberIds || !Array.isArray(subscriberIds)) {
			return res.status(400).json({
				success: false,
				message: "Please provide valid subscriber IDs",
			});
		}

		await Subscriber.updateMany(
			{ _id: { $in: subscriberIds } },
			{
				status: "unsubscribed",
				unsubscribedAt: new Date(),
			}
		);

		res.json({
			success: true,
			message: "Subscribers unsubscribed successfully",
		});
	} catch (error) {
		console.error("Bulk unsubscribe error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to unsubscribe subscribers",
		});
	}
});

// Bulk resubscribe endpoint
router.post("/bulk-resubscribe", async (req, res) => {
	try {
		const { subscriberIds } = req.body;

		if (!subscriberIds || !Array.isArray(subscriberIds)) {
			return res.status(400).json({
				success: false,
				message: "Please provide valid subscriber IDs",
			});
		}

		await Subscriber.updateMany(
			{ _id: { $in: subscriberIds } },
			{
				status: "active",
				unsubscribedAt: null,
			}
		);

		res.json({
			success: true,
			message: "Subscribers resubscribed successfully",
		});
	} catch (error) {
		console.error("Bulk resubscribe error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to resubscribe subscribers",
		});
	}
});

// ✅ Delete single subscriber
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletedSubscriber = await Subscriber.findByIdAndDelete(id);

		if (!deletedSubscriber) {
			return res.status(404).json({
				success: false,
				message: "Subscriber not found",
			});
		}

		res.json({
			success: true,
			message: "Subscriber deleted successfully",
		});
	} catch (error) {
		console.error("Delete subscriber error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to delete subscriber",
		});
	}
});

// ✅ Bulk delete subscribers
router.post("/bulk-delete", async (req, res) => {
	try {
		const { subscriberIds } = req.body;

		if (!subscriberIds || !Array.isArray(subscriberIds)) {
			return res.status(400).json({
				success: false,
				message: "Please provide valid subscriber IDs",
			});
		}

		await Subscriber.deleteMany({ _id: { $in: subscriberIds } });

		res.json({
			success: true,
			message: "Subscribers deleted successfully",
		});
	} catch (error) {
		console.error("Bulk delete error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to delete subscribers",
		});
	}
});

export default router;
