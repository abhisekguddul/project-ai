import express from "express";
import {
  registerUser,
  verifyRegistrationOTP,
  requestLoginOTP,
  verifyLoginOTP,
  resendOTP,
  getUserProfile
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  authLimiter,
  otpVerificationLimiter,
  otpGenerationLimiter,
  registrationLimiter
} from "../middleware/rateLimiter.js";

const router = express.Router();

// ===================== PUBLIC ROUTES =====================

// @desc    Register user and send OTP
// @route   POST /api/auth/register
// @access  Public
router.post("/register", registrationLimiter, otpGenerationLimiter, registerUser);

// @desc    Verify registration OTP
// @route   POST /api/auth/verify-registration
// @access  Public
router.post("/verify-registration", otpVerificationLimiter, verifyRegistrationOTP);

// @desc    Request login OTP
// @route   POST /api/auth/login
// @access  Public
router.post("/login", authLimiter, otpGenerationLimiter, requestLoginOTP);

// @desc    Verify login OTP
// @route   POST /api/auth/verify-login
// @access  Public
router.post("/verify-login", otpVerificationLimiter, verifyLoginOTP);

// @desc    Resend OTP (for both registration and login)
// @route   POST /api/auth/resend-otp
// @access  Public
router.post("/resend-otp", otpGenerationLimiter, resendOTP);

// ===================== PROTECTED ROUTES =====================

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.get("/profile", protect, getUserProfile);

// @desc    Health check for authenticated users
// @route   GET /api/auth/verify-token
// @access  Private
router.get("/verify-token", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid',
    data: {
      userId: req.user,
      authenticated: true
    }
  });
});

export default router;