import express from "express";
import Video from "../models/Video.js";
import { sendNewVideoNewsletter } from "../utils/emailService.js";
import { protect, requirePermission } from "../middleware/authMiddleware.js";
import auditMiddleware from "../middleware/auditMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get videos by platform
router.get("/platform/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const videos = await Video.find({ platform }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single video
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found"
      });
    }
    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Protected admin routes
router.post("/", protect, requirePermission('videoManagement'), auditMiddleware('CREATE', 'Video'), async (req, res) => {
  try {
    const video = await Video.create(req.body);
    
    // Send newsletter to active subscribers
    try {
      const newsletterResult = await sendNewVideoNewsletter(video);
      console.log(`Newsletter sent to ${newsletterResult.sent}/${newsletterResult.total} subscribers`);
    } catch (error) {
      console.error("Newsletter sending failed:", error);
    }
    
    res.status(201).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update video
router.put("/:id", protect, requirePermission('videoManagement'), auditMiddleware('UPDATE', 'Video'), async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found"
      });
    }
    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete video
router.delete("/:id", protect, requirePermission('videoManagement'), auditMiddleware('DELETE', 'Video'), async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found"
      });
    }
    
    const videoTitle = video.title;
    await Video.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: { title: videoTitle },
      message: "Video deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;