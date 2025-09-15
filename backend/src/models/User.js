import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^(09|07)\d{8}$/, 'Please enter a valid Ethiopian phone number']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin'],
    default: 'user'
  },
  permissions: {
    userManagement: { type: Boolean, default: false },
    doctorManagement: { type: Boolean, default: false },
    serviceManagement: { type: Boolean, default: false },
    appointmentManagement: { type: Boolean, default: false },
    videoManagement: { type: Boolean, default: false },
    testimonialManagement: { type: Boolean, default: false },
    subscriberManagement: { type: Boolean, default: false },
    adminManagement: { type: Boolean, default: false },
    resultManagement: { type: Boolean, default: false }
  },
  emailNotifications: {
    type: Boolean,
    default: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  verificationToken: String,
  verificationTokenExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Set super admin permissions
userSchema.methods.setSuperAdminPermissions = function() {
  if (this.role === 'super_admin') {
    Object.keys(this.permissions.toObject()).forEach(key => {
      this.permissions[key] = true;
    });
  }
};

export default mongoose.model('User', userSchema);