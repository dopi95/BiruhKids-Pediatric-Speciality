import express from "express";
import Subscriber from "../models/Subscriber.js"; // Your subscriber model

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

// Unsubscribe endpoint
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

// Get all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });

    res.json({
      success: true,
      data: { subscribers },
    });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers",
    });
  }
});

// Get subscriber statistics
router.get("/stats", async (req, res) => {
  try {
    const total = await Subscriber.countDocuments();
    const active = await Subscriber.countDocuments({ status: "active" });
    const unsubscribed = await Subscriber.countDocuments({ status: "unsubscribed" });

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
