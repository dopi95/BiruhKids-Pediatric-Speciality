// Testimonial validation middleware
export const validateTestimonialData = (req, res, next) => {
  const { name, email, title, treatment, testimony, rating } = req.body;
  const errors = [];

  // Validate required fields
  if (!name || name.trim().length === 0) {
    errors.push("Name is required");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  } else if (name.trim().length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  if (!email || email.trim().length === 0) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push("Please provide a valid email address");
    }
  }

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  } else if (title.trim().length < 5) {
    errors.push("Title must be at least 5 characters long");
  } else if (title.trim().length > 200) {
    errors.push("Title must be less than 200 characters");
  }

  if (!treatment || treatment.trim().length === 0) {
    errors.push("Treatment/Service is required");
  }

  if (!testimony || testimony.trim().length === 0) {
    errors.push("Testimony is required");
  } else if (testimony.trim().length < 10) {
    errors.push("Testimony must be at least 10 characters long");
  } else if (testimony.trim().length > 2000) {
    errors.push("Testimony must be less than 2000 characters");
  }

  if (!rating) {
    errors.push("Rating is required");
  } else {
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      errors.push("Rating must be a number between 1 and 5");
    }
  }

  // Check for potential spam patterns
  const spamPatterns = [
    /(.)\1{10,}/i, // Repeated characters
    /https?:\/\//i, // URLs
    /\b(buy|sale|discount|offer|deal|free|win|prize|lottery|casino|viagra|cialis)\b/i, // Spam keywords
  ];

  const textToCheck = `${name} ${title} ${testimony}`.toLowerCase();
  for (const pattern of spamPatterns) {
    if (pattern.test(textToCheck)) {
      errors.push("Content appears to be spam or contains inappropriate content");
      break;
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

// Rate limiting for testimonial submissions
const submissionAttempts = new Map();

export const rateLimitTestimonials = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 3; // Max 3 submissions per 15 minutes

  if (!submissionAttempts.has(clientIP)) {
    submissionAttempts.set(clientIP, []);
  }

  const attempts = submissionAttempts.get(clientIP);
  
  // Remove old attempts outside the time window
  const recentAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
  submissionAttempts.set(clientIP, recentAttempts);

  if (recentAttempts.length >= maxAttempts) {
    return res.status(429).json({
      success: false,
      message: "Too many testimonial submissions. Please try again later.",
    });
  }

  // Add current attempt
  recentAttempts.push(now);
  submissionAttempts.set(clientIP, recentAttempts);

  next();
};