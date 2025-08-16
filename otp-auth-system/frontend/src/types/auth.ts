export interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: User;
    email?: string;
    expiresIn?: string;
    userId?: string;
    authenticated?: boolean;
  };
  errors?: string[];
  attemptsRemaining?: number;
  retryAfter?: number;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
}

export interface OTPVerificationData {
  email: string;
  otp: string;
}

export interface ResendOTPData {
  email: string;
  type: 'registration' | 'login';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  verifyRegistration: (data: OTPVerificationData) => Promise<AuthResponse>;
  verifyLogin: (data: OTPVerificationData) => Promise<AuthResponse>;
  resendOTP: (data: ResendOTPData) => Promise<AuthResponse>;
  logout: () => void;
  clearError: () => void;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  statusCode?: number;
}