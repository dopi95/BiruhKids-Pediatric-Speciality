import express from "express";
import { createResult, getPatientResults, markResultAsRead, serveResultFile, downloadResultFile, getResultStats, getPatientResultsByEmail, deleteResult, debugResultFiles } from "../controllers/resultController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { resultUpload } from "../middleware/upload.js";

const router = express.Router();

// Admin routes
router.post("/", protect, adminOnly, (req, res, next) => {
    try {
        const upload = resultUpload();
        upload.array("resultFiles", 10)(req, res, next);
    } catch (error) {
        console.error('Upload middleware error:', error);
        res.status(500).json({
            success: false,
            message: "File upload service not available"
        });
    }
}, createResult);
router.get("/stats", protect, adminOnly, getResultStats);
router.get("/patient/:email", protect, adminOnly, getPatientResultsByEmail);
router.delete("/:id", protect, adminOnly, deleteResult);

// Patient routes
router.get("/patient", protect, getPatientResults);
router.put("/:id/read", protect, markResultAsRead);
router.get("/debug/:resultId", protect, debugResultFiles);
// Middleware to handle token from query parameter
const handleQueryToken = (req, res, next) => {
    if (req.query.token && !req.headers.authorization) {
        req.headers.authorization = `Bearer ${req.query.token}`;
    }
    next();
};

router.get("/file/:publicId", handleQueryToken, protect, (req, res, next) => {
    req.params.publicId = decodeURIComponent(req.params.publicId);
    serveResultFile(req, res, next);
});
router.get("/download/:publicId", handleQueryToken, protect, (req, res, next) => {
    req.params.publicId = decodeURIComponent(req.params.publicId);
    downloadResultFile(req, res, next);
});

export default router;