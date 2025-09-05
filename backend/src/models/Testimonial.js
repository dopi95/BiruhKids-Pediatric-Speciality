import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ""
  },
  treatment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true
  },
  testimony: {
    type: String,
    required: true
  },
  allowPublic: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model("Testimonial", testimonialSchema);