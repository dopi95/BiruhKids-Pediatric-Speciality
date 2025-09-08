import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "English name is required"],
    trim: true
  },
  nameAmh: {
    type: String,
    required: [true, "Amharic name is required"],
    trim: true
  },
  field: {
    type: String,
    required: [true, "English field is required"],
    trim: true
  },
  fieldAmh: {
    type: String,
    required: [true, "Amharic field is required"],
    trim: true
  },
  experience: {
    type: String,
    required: [true, "English experience is required"],
    trim: true
  },
  experienceAmh: {
    type: String,
    required: [true, "Amharic experience is required"],
    trim: true
  },
  photo: {
    type: String, // Cloudinary URL
    default: null
  },
  photoPublicId: {
    type: String, // Cloudinary public ID for deletion
    default: null
  }
}, {
  timestamps: true
});

// Text index for search functionality
doctorSchema.index({
  name: "text",
  nameAmh: "text",
  field: "text",
  fieldAmh: "text"
});

export default mongoose.model("Doctor", doctorSchema);