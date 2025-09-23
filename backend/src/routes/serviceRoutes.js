import express from 'express';

const router = express.Router();

// Placeholder route for services (if needed for backward compatibility)
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Services are now managed through departments. Use /api/departments endpoint.'
  });
});

export default router;