import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, sendRegistrationOTP, sendLoginOTP } from "../utils/emailService.js";

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '1h'
  });
};

// Validation helper
const validateInput = (email, name = null, password = null) => {
  const errors = [];
  
  if (!email || !email.includes('@')) {
    errors.push('Valid email is required');
  }
  
  if (name !== null && (!name || name.trim().length < 2)) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (password !== null && (!password || password.length < 6)) {
    errors.push('Password must be at least 6 characters');
  }
  
  return errors;
};

// ===================== REGISTRATION =====================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    const validationErrors = validateInput(email, name, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user && user.verified) {
      return res.status(400).json({
        success: false,
        message: 'User already exists and is verified'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const salt = await bcrypt.genSalt(12);
    const hashedOTP = await bcrypt.hash(otp, salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otpExpiry = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES) || 5) * 60 * 1000);

    if (user && !user.verified) {
      // Update existing unverified user
      user.name = name;
      user.password = hashedPassword;
      user.otp = hashedOTP;
      user.otpExpiry = otpExpiry;
      user.otpAttempts = 0;
      await user.save();
    } else {
      // Create new user
      user = new User({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        otp: hashedOTP,
        otpExpiry,
        otpAttempts: 0
      });
      await user.save();
    }

    // Send OTP email
    await sendRegistrationOTP(email, otp, name);

    res.status(200).json({
      success: true,
      message: 'Registration initiated. Please check your email for OTP verification.',
      data: {
        email: user.email,
        expiresIn: `${process.env.OTP_EXPIRY_MINUTES || 5} minutes`
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ===================== VERIFY REGISTRATION OTP =====================

export const verifyRegistrationOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Find user with OTP fields
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    }).select('+otp +otpExpiry +otpAttempts');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: 'User is already verified'
      });
    }

    // Check OTP attempts
    if (user.otpAttempts >= (parseInt(process.env.OTP_MAX_ATTEMPTS) || 3)) {
      return res.status(400).json({
        success: false,
        message: 'Maximum OTP attempts exceeded. Please request a new OTP.'
      });
    }

    // Check OTP expiry
    if (user.isOTPExpired()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    const isOTPValid = await bcrypt.compare(otp, user.otp);
    if (!isOTPValid) {
      user.otpAttempts += 1;
      await user.save();
      
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
        attemptsRemaining: (parseInt(process.env.OTP_MAX_ATTEMPTS) || 3) - user.otpAttempts
      });
    }

    // Successful verification
    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.otpAttempts = 0;
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully. Account created!',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          verified: user.verified
        }
      }
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during OTP verification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ===================== LOGIN REQUEST (SEND OTP) =====================

export const requestLoginOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find user
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    }).select('+loginAttempts +lockUntil');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        success: false,
        message: 'Please verify your email first'
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed attempts'
      });
    }

    // Generate and save OTP
    const otp = generateOTP();
    const salt = await bcrypt.genSalt(12);
    const hashedOTP = await bcrypt.hash(otp, salt);
    const otpExpiry = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES) || 5) * 60 * 1000);

    user.otp = hashedOTP;
    user.otpExpiry = otpExpiry;
    user.otpAttempts = 0;
    await user.save();

    // Send OTP email
    await sendLoginOTP(email, otp, user.name);

    res.status(200).json({
      success: true,
      message: 'Login OTP sent to your email',
      data: {
        email: user.email,
        expiresIn: `${process.env.OTP_EXPIRY_MINUTES || 5} minutes`
      }
    });

  } catch (error) {
    console.error('Login OTP request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ===================== VERIFY LOGIN OTP =====================

export const verifyLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Find user with all necessary fields
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    }).select('+otp +otpExpiry +otpAttempts +loginAttempts +lockUntil');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked'
      });
    }

    // Check OTP attempts
    if (user.otpAttempts >= (parseInt(process.env.OTP_MAX_ATTEMPTS) || 3)) {
      user.incLoginAttempts();
      return res.status(400).json({
        success: false,
        message: 'Maximum OTP attempts exceeded'
      });
    }

    // Check OTP expiry
    if (user.isOTPExpired()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    const isOTPValid = await bcrypt.compare(otp, user.otp);
    if (!isOTPValid) {
      user.otpAttempts += 1;
      await user.save();
      
      // Check if max attempts reached
      if (user.otpAttempts >= (parseInt(process.env.OTP_MAX_ATTEMPTS) || 3)) {
        user.incLoginAttempts();
      }
      
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
        attemptsRemaining: (parseInt(process.env.OTP_MAX_ATTEMPTS) || 3) - user.otpAttempts
      });
    }

    // Successful login
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.otpAttempts = 0;
    user.lastLogin = new Date();
    user.resetLoginAttempts(); // Reset failed login attempts
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          verified: user.verified,
          lastLogin: user.lastLogin
        }
      }
    });

  } catch (error) {
    console.error('Login OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login verification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ===================== RESEND OTP =====================

export const resendOTP = async (req, res) => {
  try {
    const { email, type } = req.body; // type: 'registration' or 'login'

    if (!email || !type) {
      return res.status(400).json({
        success: false,
        message: 'Email and type are required'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    if (type === 'registration' && user.verified) {
      return res.status(400).json({
        success: false,
        message: 'User is already verified'
      });
    }

    if (type === 'login' && !user.verified) {
      return res.status(400).json({
        success: false,
        message: 'Please verify your email first'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const salt = await bcrypt.genSalt(12);
    const hashedOTP = await bcrypt.hash(otp, salt);
    const otpExpiry = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES) || 5) * 60 * 1000);

    user.otp = hashedOTP;
    user.otpExpiry = otpExpiry;
    user.otpAttempts = 0;
    await user.save();

    // Send appropriate OTP email
    if (type === 'registration') {
      await sendRegistrationOTP(email, otp, user.name);
    } else {
      await sendLoginOTP(email, otp, user.name);
    }

    res.status(200).json({
      success: true,
      message: `New ${type} OTP sent to your email`,
      data: {
        email: user.email,
        expiresIn: `${process.env.OTP_EXPIRY_MINUTES || 5} minutes`
      }
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resending OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ===================== GET USER PROFILE =====================

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          verified: user.verified,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};