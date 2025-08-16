import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { testEmailConfig } from "./utils/emailService.js";

// Load environment variables
dotenv.config();

const app = express();

// ===================== MIDDLEWARE =====================

// Enable trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
  });
}

// ===================== ROUTES =====================

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'OTP Auth API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Info route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'OTP Authentication API',
    version: '1.0.0',
    documentation: {
      endpoints: {
        auth: {
          register: 'POST /api/auth/register',
          verifyRegistration: 'POST /api/auth/verify-registration',
          login: 'POST /api/auth/login',
          verifyLogin: 'POST /api/auth/verify-login',
          resendOTP: 'POST /api/auth/resend-otp',
          profile: 'GET /api/auth/profile (Protected)',
          verifyToken: 'GET /api/auth/verify-token (Protected)'
        }
      }
    }
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// ===================== ERROR HANDLING =====================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);

  // Mongoose bad ObjectId
  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource ID format'
    });
  }

  // Mongoose duplicate key
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages
    });
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default server error
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// ===================== SERVER STARTUP =====================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Test email configuration
    const emailConfigValid = await testEmailConfig();
    if (!emailConfigValid) {
      console.warn('⚠️  Email configuration test failed. OTP emails may not work.');
    }
    
    // Start server
    const server = app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║                   🚀 OTP AUTH SERVER STARTED                 ║
╠══════════════════════════════════════════════════════════════╣
║  Environment: ${process.env.NODE_ENV || 'development'}                           ║
║  Port:        ${PORT}                                        ║
║  Database:    ${process.env.MONGO_URI ? '✅ Connected' : '❌ Not configured'}       ║
║  Email:       ${emailConfigValid ? '✅ Configured' : '❌ Not configured'}       ║
║                                                              ║
║  API Endpoints:                                              ║
║  📋 Health:     GET  /health                                 ║
║  📋 API Info:   GET  /api                                    ║
║  🔐 Register:   POST /api/auth/register                      ║
║  ✅ Verify:     POST /api/auth/verify-registration           ║
║  🔑 Login:      POST /api/auth/login                         ║
║  ✅ Verify:     POST /api/auth/verify-login                  ║
║  🔄 Resend:     POST /api/auth/resend-otp                    ║
║  👤 Profile:    GET  /api/auth/profile                       ║
║                                                              ║
║  🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}        ║
╚══════════════════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Process terminated');
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received. Shutting down gracefully...');
      server.close(() => {
        console.log('Process terminated');
      });
    });

  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();