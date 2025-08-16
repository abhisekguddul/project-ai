# 🔐 OTP Authentication System

A complete, production-ready OTP-based authentication system built with **Node.js/Express** (backend) and **React/TypeScript** (frontend). This system provides secure, passwordless authentication using One-Time Passwords (OTP) sent via email.

## ✨ Features

### 🔒 Security Features
- **OTP-based Authentication** - No passwords needed
- **Email Verification** - Account verification via OTP
- **JWT Token Authentication** - Secure session management
- **Rate Limiting** - Protection against brute force attacks
- **Account Lockout** - Automatic protection after failed attempts
- **Encrypted Data** - Passwords and OTPs are properly hashed
- **CORS Protection** - Configurable cross-origin policies

### 🎨 User Experience
- **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- **Real-time Validation** - Form validation with helpful error messages
- **Auto-focus & Paste Support** - Seamless OTP entry experience
- **Resend Functionality** - Cooldown timers and OTP regeneration
- **Toast Notifications** - User-friendly feedback system
- **Loading States** - Clear visual feedback during operations

### 🏗️ Technical Features
- **TypeScript** - Full type safety across the stack
- **React Hooks** - Modern state management with context
- **Form Handling** - React Hook Form integration
- **Email Templates** - Beautiful HTML email designs
- **Database Integration** - MongoDB with Mongoose ODM
- **Error Handling** - Comprehensive error management
- **Environment Configuration** - Secure configuration management

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.0.0
- **MongoDB** (local or Atlas)
- **Gmail Account** (for email sending)

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd otp-auth-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/otp-auth-db
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/otp-auth-db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=1h

# Email Configuration (Gmail)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password-here
EMAIL_FROM="OTP Auth System <your-gmail@gmail.com>"

# OTP Configuration
OTP_EXPIRY_MINUTES=5
OTP_MAX_ATTEMPTS=3

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Configure Frontend Environment

```bash
cd frontend
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME="OTP Auth System"
VITE_APP_VERSION="1.0.0"
VITE_NODE_ENV=development
```

### 4. Set Up Gmail App Password

1. Enable 2FA on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Use this password in your `EMAIL_PASS` environment variable

### 5. Start the Application

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
otp-auth-system/
├── backend/                 # Node.js/Express Backend
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/
│   │   └── authController.js # Authentication logic
│   ├── middleware/
│   │   ├── authMiddleware.js # JWT verification
│   │   └── rateLimiter.js   # Rate limiting
│   ├── models/
│   │   └── User.js         # User schema
│   ├── routes/
│   │   └── authRoutes.js   # API routes
│   ├── utils/
│   │   └── emailService.js # Email utilities
│   ├── .env                # Environment variables
│   ├── package.json        # Dependencies
│   └── server.js           # Server entry point
│
├── frontend/               # React/TypeScript Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── ui/         # UI components
│   │   │   ├── OTPInput.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.tsx # Authentication hook
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── types/
│   │   │   └── auth.ts     # TypeScript types
│   │   ├── utils/
│   │   │   ├── api.ts      # API client
│   │   │   └── cn.ts       # CSS utilities
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Styles
│   ├── package.json
│   └── vite.config.ts
│
└── README.md               # This file
```

## 🔐 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/verify-registration` | Verify registration OTP | ❌ |
| `POST` | `/api/auth/login` | Request login OTP | ❌ |
| `POST` | `/api/auth/verify-login` | Verify login OTP | ❌ |
| `POST` | `/api/auth/resend-otp` | Resend OTP | ❌ |
| `GET` | `/api/auth/profile` | Get user profile | ✅ |
| `GET` | `/api/auth/verify-token` | Verify JWT token | ✅ |

### Example API Usage

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

#### Verify Registration
```bash
curl -X POST http://localhost:5000/api/auth/verify-registration \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

#### Login Request
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

#### Verify Login
```bash
curl -X POST http://localhost:5000/api/auth/verify-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "654321"
  }'
```

## 🎯 User Flow

### Registration Flow
1. User fills registration form (name, email, password)
2. System sends 6-digit OTP to email
3. User enters OTP for verification
4. Account is created and user is logged in
5. JWT token is issued for authenticated sessions

### Login Flow
1. User enters email address
2. System sends 6-digit OTP to email
3. User enters OTP for verification
4. System validates OTP and issues JWT token
5. User is redirected to dashboard

### Security Features
- **OTP Expiry**: OTPs expire after 5 minutes
- **Attempt Limiting**: Maximum 3 OTP attempts
- **Rate Limiting**: API request throttling
- **Account Lockout**: Temporary lockout after failed attempts
- **JWT Expiry**: Tokens expire after 1 hour
- **Secure Headers**: CORS, XSS protection, etc.

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Required
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

# Optional (with defaults)
PORT=5000
NODE_ENV=development
JWT_EXPIRE=1h
OTP_EXPIRY_MINUTES=5
OTP_MAX_ATTEMPTS=3
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

#### Frontend (.env)
```env
# API endpoint
VITE_API_URL=http://localhost:5000/api

# App metadata
VITE_APP_NAME="OTP Auth System"
VITE_APP_VERSION="1.0.0"
```

### Database Schema

#### User Model
```javascript
{
  name: String,              // User's full name
  email: String,             // Email address (unique)
  password: String,          // Hashed password (optional)
  otp: String,              // Hashed OTP (temporary)
  otpExpiry: Date,          // OTP expiration time
  otpAttempts: Number,      // Failed OTP attempts
  verified: Boolean,         // Email verification status
  isActive: Boolean,         // Account status
  lastLogin: Date,          // Last login timestamp
  loginAttempts: Number,    // Failed login attempts
  lockUntil: Date,          // Account lock expiry
  createdAt: Date,          // Account creation date
  updatedAt: Date           // Last update date
}
```

## 🧪 Testing

### Manual Testing

1. **Registration**:
   - Navigate to `/register`
   - Fill in valid details
   - Check email for OTP
   - Enter OTP to complete registration

2. **Login**:
   - Navigate to `/login`
   - Enter registered email
   - Check email for OTP
   - Enter OTP to login

3. **Dashboard**:
   - Access `/dashboard` (requires authentication)
   - View profile information
   - Test logout functionality

### API Testing with curl

See the API examples above for testing individual endpoints.

## 🚀 Deployment

### Backend Deployment

1. **Environment Setup**:
   ```bash
   NODE_ENV=production
   MONGO_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   ```

2. **Build & Start**:
   ```bash
   npm install --production
   npm start
   ```

### Frontend Deployment

1. **Build**:
   ```bash
   npm run build
   ```

2. **Serve** (using any static file server):
   ```bash
   npm run preview
   ```

### Production Checklist

- [ ] Change JWT secret to a strong, random value
- [ ] Use production MongoDB database
- [ ] Configure proper CORS origins
- [ ] Set up SSL/TLS certificates
- [ ] Configure email service for production
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting appropriately
- [ ] Test all security features

## 🛠️ Development

### Available Scripts

#### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

#### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Style
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** recommended for formatting

## 🔍 Troubleshooting

### Common Issues

#### "Email configuration test failed"
- Check Gmail credentials in `.env`
- Ensure 2FA is enabled and app password is used
- Verify `EMAIL_USER` and `EMAIL_PASS` are correct

#### "MongoDB connection failed"
- Check MongoDB is running (if local)
- Verify `MONGO_URI` connection string
- Ensure database user has proper permissions

#### "OTP not received"
- Check spam/junk folder
- Verify email service configuration
- Check server logs for email sending errors

#### "Token expired" errors
- Check system time synchronization
- Verify JWT_SECRET is consistent
- Clear browser localStorage if needed

### Debug Mode

Enable detailed logging by setting:
```env
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Express.js** for the backend framework
- **React** for the frontend library
- **Tailwind CSS** for styling
- **Nodemailer** for email functionality
- **MongoDB** for data persistence
- **Lucide React** for icons

---

**Built with ❤️ for secure, modern authentication**