import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, RefreshCw, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import OTPInput from '@/components/OTPInput';
import { isValidEmail, formatTimeRemaining } from '@/utils/api';

interface LoginFormData {
  email: string;
}

const Login: React.FC = () => {
  const { login, verifyLogin, resendOTP, isAuthenticated, isLoading } = useAuth();
  const [step, setStep] = useState<'email' | 'verify'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  // Resend cooldown timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data.email);
      if (response.success) {
        setEmail(data.email);
        setStep('verify');
        setResendCooldown(60); // 1 minute cooldown
      }
    } catch (error) {
      console.error('Login request error:', error);
    }
  };

  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter a 6-digit OTP');
      return;
    }

    setOtpError('');
    const response = await verifyLogin({ email, otp });
    
    if (!response.success) {
      setOtpError(response.message);
      setOtp(''); // Clear OTP on error
    }
    // On success, the auth context will handle navigation
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    
    const response = await resendOTP({ email, type: 'login' });
    if (response.success) {
      setResendCooldown(60);
      setOtp('');
      setOtpError('');
    }
  };

  const goBackToEmail = () => {
    setStep('email');
    setOtp('');
    setOtpError('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {step === 'email' ? 'Welcome Back' : 'Verify Login'}
            </h1>
            <p className="text-gray-600 mt-2">
              {step === 'email' 
                ? 'Enter your email to receive a login code' 
                : `Enter the 6-digit code sent to ${email}`
              }
            </p>
          </div>

          {step === 'email' ? (
            /* Email Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                icon={<Mail />}
                placeholder="Enter your email"
                autoFocus
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  validate: (value) => isValidEmail(value) || 'Please enter a valid email',
                })}
              />

              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                className="w-full"
              >
                Send Login Code
              </Button>
            </form>
          ) : (
            /* OTP Verification */
            <div className="space-y-6">
              <div className="text-center">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  onComplete={handleOTPSubmit}
                  error={!!otpError}
                />
                {otpError && (
                  <p className="text-red-600 text-sm mt-2">{otpError}</p>
                )}
              </div>

              <Button
                onClick={handleOTPSubmit}
                size="lg"
                loading={isLoading}
                disabled={otp.length !== 6}
                className="w-full"
              >
                Verify & Login
              </Button>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">
                  Didn't receive the code?
                </p>
                <Button
                  variant="ghost"
                  onClick={handleResendOTP}
                  disabled={resendCooldown > 0}
                  className="text-green-600 hover:text-green-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {resendCooldown > 0 
                    ? `Resend in ${formatTimeRemaining(resendCooldown)}`
                    : 'Resend Code'
                  }
                </Button>
              </div>

              {/* Back to email */}
              <Button
                variant="ghost"
                onClick={goBackToEmail}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Use Different Email
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            🔒 Secure OTP login - No passwords needed!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;