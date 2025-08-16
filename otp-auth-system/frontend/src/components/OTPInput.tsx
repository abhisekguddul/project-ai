import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange: (otp: string) => void;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  error = false,
  autoFocus = true,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize OTP array from value prop
  useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      while (otpArray.length < length) {
        otpArray.push('');
      }
      setOtp(otpArray);
    } else {
      setOtp(Array(length).fill(''));
    }
  }, [value, length]);

  // Auto-focus first input
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, digit: string) => {
    // Only allow digits
    if (!/^\d*$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit.slice(-1); // Take only the last digit
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChange(otpString);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all digits are filled
    if (otpString.length === length && onComplete) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    // Handle backspace
    if (key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (newOtp[index]) {
        // Clear current digit
        newOtp[index] = '';
      } else if (index > 0) {
        // Move to previous input and clear it
        newOtp[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      }
      
      setOtp(newOtp);
      onChange(newOtp.join(''));
    }

    // Handle left/right arrow keys
    if (key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Handle delete key
    if (key === 'Delete') {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      onChange(newOtp.join(''));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    
    if (pastedData) {
      const newOtp = Array(length).fill('');
      for (let i = 0; i < Math.min(pastedData.length, length); i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      onChange(newOtp.join(''));
      
      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex(digit => !digit);
      const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
      
      // Call onComplete if all digits are filled
      if (newOtp.join('').length === length && onComplete) {
        onComplete(newOtp.join(''));
      }
    }
  };

  const handleFocus = (index: number) => {
    // Select the content when focused
    inputRefs.current[index]?.select();
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={cn(
            'w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg',
            'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
            'bg-white',
            {
              'border-gray-300 focus:border-primary-500 focus:ring-primary-500': !error,
              'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50': error,
              'opacity-50 cursor-not-allowed': disabled,
              'border-primary-400 bg-primary-50': digit && !error,
            }
          )}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};

export default OTPInput;