import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        adminName: {
            type: String,
            required: true,
        },
        adminEmail: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            enum: ["CREATE", "UPDATE", "DELETE", "APPROVE", "REJECT", "CONFIRM", "CANCEL"],
            required: true,
        },
        resourceType: {
            type: String,
            enum: [
                "User",
                "Doctor", 
                "Testimonial",
                "Admin",
                "Result",
                "Video",
                "Appointment",
                "Department",
                "Service",
                "Subscriber"
            ],
            required: true,
        },
        resourceId: {
            type: String,
            required: true,
        },
        resourceName: {
            type: String,
            required: true,
        },
        details: {
            type: Object,
            default: {},
        },
        ipAddress: {
            type: String,
        },
        userAgent: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Index for better query performance
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ adminId: 1 });
auditLogSchema.index({ resourceType: 1 });
auditLogSchema.index({ action: 1 });

export default mongoose.model("AuditLog", auditLogSchema);