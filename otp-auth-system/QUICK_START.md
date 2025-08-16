# 🚀 Quick Start Guide

Get your OTP Authentication System up and running in minutes!

## 📋 Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Gmail Account** - For sending OTP emails

## ⚡ 30-Second Setup

### 1. Install & Setup
```bash
# Run the automated setup script
./setup.sh

# Or manually:
npm run install:all
```

### 2. Configure Environment
Edit `backend/.env`:
```env
# Required: Change these values
MONGO_URI=mongodb://localhost:27017/otp-auth-db
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
JWT_SECRET=your-super-secret-jwt-key-change-this
```

### 3. Start Development
```bash
npm run dev
```

**That's it!** 🎉 
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔧 Quick Configuration

### MongoDB Setup
#### Option A: Local MongoDB
```bash
# Install MongoDB locally
brew install mongodb/brew/mongodb-community  # macOS
# or download from https://www.mongodb.com/try/download/community

# Start MongoDB
brew services start mongodb/brew/mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`

### Gmail App Password Setup
1. Enable 2FA on Gmail
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate password for "Mail"
4. Use this password in `EMAIL_PASS`

## 🧪 Test the System

### Test Registration Flow
1. Go to http://localhost:3000/register
2. Fill in your details
3. Check your email for OTP
4. Enter OTP to complete registration

### Test Login Flow
1. Go to http://localhost:3000/login
2. Enter your email
3. Check email for login OTP
4. Enter OTP to login

## 🔍 Troubleshooting

### Common Issues

#### "MongoDB connection failed"
```bash
# Check if MongoDB is running
brew services list | grep mongodb  # macOS
# or
systemctl status mongod  # Linux
```

#### "Email configuration test failed"
- Verify Gmail credentials in `.env`
- Ensure 2FA is enabled
- Use App Password, not regular password

#### "Port already in use"
```bash
# Kill processes on ports 3000 and 5000
npx kill-port 3000 5000
```

### Environment Variables Reference
```env
# Backend (.env)
PORT=5000
MONGO_URI=mongodb://localhost:27017/otp-auth-db
JWT_SECRET=your-secret-key
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
OTP_EXPIRY_MINUTES=5
```

```env
# Frontend (.env)
VITE_API_URL=http://localhost:5000/api
```

## 📱 API Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:5000/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "password123"
  }'
```

## 🎯 Next Steps

1. **Customize UI** - Modify components in `frontend/src/components/`
2. **Add Features** - Extend authentication with more security features
3. **Deploy** - See deployment section in README.md
4. **Scale** - Add Redis for session storage, implement clustering

## 📚 Need Help?

- 📖 **Full Documentation**: See `README.md`
- 🐛 **Issues**: Check troubleshooting section
- 💡 **Features**: Extend the system as needed

---

**Happy coding! 🚀**