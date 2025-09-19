import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        patientName: {
            type: String,
            required: true,
        },
        patientEmail: {
            type: String,
            required: true,
        },
        patientPhone: {
            type: String,
            required: true,
        },
        doctorName: {
            type: String,
            required: true,
        },
        testDate: {
            type: Date,
            required: true,
        },
        resultFiles: [{
            filename: String,
            originalName: String,
            path: String,
            cloudinaryUrl: String,
            cloudinaryPublicId: String,
            cloudinaryFormat: String,
            cloudinaryVersion: String,
            mimetype: String,
            size: Number,
        }],
        additionalNotes: {
            type: String,
            default: "",
        },
        emailSent: {
            type: Boolean,
            default: false,
        },
        emailSentAt: {
            type: Date,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Result", resultSchema);