import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, User, Lock, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import OTPInput from '@/components/OTPInput';
import { isValidEmail, isValidPassword, isValidName, formatTimeRemaining } from '@/utils/api';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register: registerUser, verifyRegistration, resendOTP, isAuthenticated, isLoading } = useAuth();
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data);
      if (response.success) {
        setEmail(data.email);
        setStep('verify');
        setResendCooldown(60); // 1 minute cooldown
      } else {
        // Handle specific validation errors
        if (response.errors) {
          response.errors.forEach((error: string) => {
            if (error.toLowerCase().includes('email')) {
              setError('email', { message: error });
            } else if (error.toLowerCase().includes('password')) {
              setError('password', { message: error });
            } else if (error.toLowerCase().includes('name')) {
              setError('name', { message: error });
            }
          });
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter a 6-digit OTP');
      return;
    }

    setOtpError('');
    const response = await verifyRegistration({ email, otp });
    
    if (!response.success) {
      setOtpError(response.message);
      setOtp(''); // Clear OTP on error
    }
    // On success, the auth context will handle navigation
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    
    const response = await resendOTP({ email, type: 'registration' });
    if (response.success) {
      setResendCooldown(60);
      setOtp('');
      setOtpError('');
    }
  };

  const goBackToRegister = () => {
    setStep('register');
    setOtp('');
    setOtpError('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {step === 'register' ? 'Create Account' : 'Verify Email'}
            </h1>
            <p className="text-gray-600 mt-2">
              {step === 'register' 
                ? 'Sign up to get started with OTP Auth' 
                : `Enter the 6-digit code sent to ${email}`
              }
            </p>
          </div>

          {step === 'register' ? (
            /* Registration Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Full Name"
                icon={<User />}
                placeholder="Enter your full name"
                error={errors.name?.message}
                {...register('name', {
                  required: 'Name is required',
                  validate: (value) => isValidName(value) || 'Name must be at least 2 characters',
                })}
              />

              <Input
                label="Email Address"
                type="email"
                icon={<Mail />}
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  validate: (value) => isValidEmail(value) || 'Please enter a valid email',
                })}
              />

              <Input
                label="Password"
                type="password"
                icon={<Lock />}
                placeholder="Create a password"
                showPasswordToggle
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  validate: (value) => isValidPassword(value) || 'Password must be at least 6 characters',
                })}
              />

              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                className="w-full"
              >
                Create Account
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
                Verify Email
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
                  className="text-primary-600 hover:text-primary-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {resendCooldown > 0 
                    ? `Resend in ${formatTimeRemaining(resendCooldown)}`
                    : 'Resend Code'
                  }
                </Button>
              </div>

              {/* Back to register */}
              <Button
                variant="ghost"
                onClick={goBackToRegister}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Registration
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            🔒 Your data is encrypted and secure. We'll never share your information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;