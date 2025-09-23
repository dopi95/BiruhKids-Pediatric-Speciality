import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name_en: {
    type: String,
    required: true,
    trim: true
  },
  name_am: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const departmentSchema = new mongoose.Schema({
  title_en: {
    type: String,
    required: true,
    trim: true
  },
  title_am: {
    type: String,
    required: true,
    trim: true
  },
  description_en: {
    type: String,
    trim: true
  },
  description_am: {
    type: String,
    trim: true
  },
  services: [serviceSchema]
}, { timestamps: true });

export default mongoose.model('Department', departmentSchema);