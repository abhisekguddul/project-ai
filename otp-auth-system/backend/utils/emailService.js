import nodemailer from "nodemailer";

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email for registration
export const sendRegistrationOTP = async (email, otp, name) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "🔐 Email Verification - Your OTP Code",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Email Verification</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <h2 style="color: #495057; margin-top: 0;">Hello ${name || 'User'}!</h2>
          
          <p style="font-size: 16px; margin-bottom: 25px;">
            Welcome to our platform! To complete your registration, please verify your email address using the OTP code below:
          </p>
          
          <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 25px; text-align: center; margin: 25px 0;">
            <h2 style="font-size: 36px; letter-spacing: 8px; margin: 0; color: #667eea; font-weight: bold;">${otp}</h2>
            <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 14px;">This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes</p>
          </div>
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>⚠️ Security Note:</strong> Never share this OTP with anyone. Our team will never ask for your OTP via phone or email.
            </p>
          </div>
          
          <p style="color: #6c757d; font-size: 14px; margin-top: 25px;">
            If you didn't request this verification, please ignore this email or contact our support team.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
          <p>© 2024 OTP Auth System. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
    text: `
      Hello ${name || 'User'}!
      
      Welcome to our platform! Your email verification OTP is: ${otp}
      
      This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.
      
      If you didn't request this verification, please ignore this email.
      
      © 2024 OTP Auth System
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Registration OTP sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send registration OTP to ${email}:`, error.message);
    throw new Error('Failed to send OTP email');
  }
};

// Send OTP email for login
export const sendLoginOTP = async (email, otp, name) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "🔑 Login Verification - Your OTP Code",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🔑 Login Verification</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <h2 style="color: #495057; margin-top: 0;">Hello ${name || 'User'}!</h2>
          
          <p style="font-size: 16px; margin-bottom: 25px;">
            Someone is trying to log in to your account. Please use the OTP code below to complete your login:
          </p>
          
          <div style="background: white; border: 2px dashed #2ecc71; border-radius: 8px; padding: 25px; text-align: center; margin: 25px 0;">
            <h2 style="font-size: 36px; letter-spacing: 8px; margin: 0; color: #2ecc71; font-weight: bold;">${otp}</h2>
            <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 14px;">This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes</p>
          </div>
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>⚠️ Security Note:</strong> If you didn't request this login, please secure your account immediately and contact support.
            </p>
          </div>
          
          <p style="color: #6c757d; font-size: 14px; margin-top: 25px;">
            Login Time: ${new Date().toLocaleString()}<br>
            If this wasn't you, please contact our support team immediately.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
          <p>© 2024 OTP Auth System. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
    text: `
      Hello ${name || 'User'}!
      
      Someone is trying to log in to your account. Your login OTP is: ${otp}
      
      This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.
      
      Login Time: ${new Date().toLocaleString()}
      
      If this wasn't you, please contact our support team immediately.
      
      © 2024 OTP Auth System
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Login OTP sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send login OTP to ${email}:`, error.message);
    throw new Error('Failed to send OTP email');
  }
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
};