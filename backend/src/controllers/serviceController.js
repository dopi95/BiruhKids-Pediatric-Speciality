import asyncHandler from "express-async-handler";
import Service from "../models/ServiceModel.js";
import { sendNewServiceNewsletter } from "../utils/emailService.js";

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({}).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const {
    title_en,
    description_en,
    features_en,
    title_am,
    description_am,
    features_am,
  } = req.body;

  const service = await Service.create({
    title_en,
    description_en,
    features_en: features_en || [],
    title_am: title_am || "",
    description_am: description_am || "",
    features_am: features_am || [],
  });

  // Send newsletter to active subscribers
  try {
    const newsletterResult = await sendNewServiceNewsletter(service);
    console.log(`Newsletter sent to ${newsletterResult.sent}/${newsletterResult.total} subscribers`);
  } catch (error) {
    console.error("Newsletter sending failed:", error);
  }

  res.status(201).json({
    success: true,
    data: service,
  });
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updatedService,
  });
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  await Service.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Service removed successfully",
  });
});

export {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};