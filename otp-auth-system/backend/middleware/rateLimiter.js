import rateLimit from 'express-rate-limit';

// General rate limiter for auth endpoints
export const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000 / 60)
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Custom key generator that includes email for better tracking
  keyGenerator: (req) => {
    return req.ip + ':' + (req.body?.email || 'no-email');
  }
});

// Stricter rate limiter for OTP verification attempts
export const otpVerificationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // limit each email to 3 OTP verification attempts per 5 minutes
  message: {
    success: false,
    message: 'Too many OTP verification attempts. Please wait 5 minutes before trying again.',
    retryAfter: 5
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.body?.email || req.ip;
  }
});

// Rate limiter for OTP generation/sending
export const otpGenerationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2, // limit each email to 2 OTP generation requests per minute
  message: {
    success: false,
    message: 'Too many OTP requests. Please wait 1 minute before requesting a new OTP.',
    retryAfter: 1
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.body?.email || req.ip;
  }
});

// Strict rate limiter for registration attempts
export const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 registration attempts per hour
  message: {
    success: false,
    message: 'Too many registration attempts from this IP. Please try again later.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false
});