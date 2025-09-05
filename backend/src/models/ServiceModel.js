import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title_en: {
      type: String,
      required: true,
      trim: true,
    },
    description_en: {
      type: String,
      required: true,
    },
    features_en: [
      {
        type: String,
        trim: true,
      },
    ],
    title_am: {
      type: String,
      trim: true,
      default: "",
    },
    description_am: {
      type: String,
      default: "",
    },
    features_am: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;