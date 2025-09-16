import express from "express";
import { createResult, getPatientResults, markResultAsRead, serveResultFile, getResultStats, getPatientResultsByEmail, deleteResult } from "../controllers/resultController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { resultUpload } from "../middleware/upload.js";

const router = express.Router();

// Admin routes
router.post("/", protect, adminOnly, resultUpload.array("resultFiles", 10), createResult);
router.get("/stats", protect, adminOnly, getResultStats);
router.get("/patient/:email", protect, adminOnly, getPatientResultsByEmail);
router.delete("/:id", protect, adminOnly, deleteResult);

// Patient routes
router.get("/patient", protect, getPatientResults);
router.put("/:id/read", protect, markResultAsRead);
// Middleware to handle token from query parameter
const handleQueryToken = (req, res, next) => {
    if (req.query.token && !req.headers.authorization) {
        req.headers.authorization = `Bearer ${req.query.token}`;
    }
    next();
};

router.get("/file/:filename", handleQueryToken, protect, serveResultFile);

export default router;