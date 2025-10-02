import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            match: [
                /^(09|07)\d{8}$/,
                "Please enter a valid Ethiopian phone number",
            ],
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user",
        },
        roleRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        },
        permissions: {
            dashboard: { type: Boolean, default: false },
            userManagement: { type: Boolean, default: false },
            doctorManagement: { type: Boolean, default: false },
            serviceManagement: { type: Boolean, default: false },
            appointmentManagement: { type: Boolean, default: false },
            videoManagement: { type: Boolean, default: false },
            testimonialManagement: { type: Boolean, default: false },
            subscriberManagement: { type: Boolean, default: false },
            adminManagement: { type: Boolean, default: false },
            resultManagement: { type: Boolean, default: false },
        },
        emailNotifications: {
            type: Boolean,
            default: false,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },

        resetPasswordOTP: String,
        resetPasswordOTPExpire: Date,
        otpVerified: Boolean,
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Set super admin permissions
userSchema.methods.setSuperAdminPermissions = function () {
    if (this.role === "super_admin") {
        Object.keys(this.permissions.toObject()).forEach((key) => {
            this.permissions[key] = true;
        });
    }
};

// Set default admin permissions
userSchema.methods.setDefaultAdminPermissions = function () {
    if (this.role === "admin") {
        this.permissions.dashboard = true;
        this.permissions.appointmentManagement = true;
        this.permissions.testimonialManagement = true;
        this.permissions.videoManagement = true;
    }
};

// Pre-save middleware to set permissions based on role
userSchema.pre('save', function(next) {
    if (this.isModified('role')) {
        if (this.role === 'super_admin') {
            this.setSuperAdminPermissions();
        } else if (this.role === 'admin') {
            // Only set default permissions if no permissions are explicitly set
            const hasExplicitPermissions = Object.values(this.permissions.toObject()).some(p => p === true);
            if (!hasExplicitPermissions) {
                this.setDefaultAdminPermissions();
            }
        }
    }
    next();
});

// Generate password reset OTP
userSchema.methods.getResetPasswordOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    this.resetPasswordOTP = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
    this.resetPasswordOTPExpire = Date.now() + 10 * 60 * 1000;

    return otp;
};

export default mongoose.model("User", userSchema);
