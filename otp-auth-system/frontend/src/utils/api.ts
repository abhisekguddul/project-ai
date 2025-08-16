import axios, { AxiosInstance, AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { AuthResponse, ApiError } from '@/types/auth';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
const TOKEN_KEY = 'otp-auth-token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common['Authorization'];
};

// Initialize token if exists
const existingToken = getToken();
if (existingToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle authentication errors
      if (status === 401) {
        removeToken();
        
        // Don't show toast for token verification failures on protected routes
        if (!error.config?.url?.includes('/verify-token')) {
          toast.error(data?.message || 'Session expired. Please login again.');
        }
        
        // Redirect to login page
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }
      }
      
      // Handle rate limiting
      else if (status === 429) {
        const retryAfter = data?.retryAfter || 5;
        toast.error(`Too many requests. Please wait ${retryAfter} minutes before trying again.`);
      }
      
      // Handle server errors
      else if (status >= 500) {
        toast.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.');
    } else {
      // Request setup error
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  // Register user
  register: async (data: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Verify registration OTP
  verifyRegistration: async (data: { email: string; otp: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/verify-registration', data);
    return response.data;
  },

  // Request login OTP
  login: async (data: { email: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Verify login OTP
  verifyLogin: async (data: { email: string; otp: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/verify-login', data);
    return response.data;
  },

  // Resend OTP
  resendOTP: async (data: { email: string; type: 'registration' | 'login' }): Promise<AuthResponse> => {
    const response = await api.post('/auth/resend-otp', data);
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<AuthResponse> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Verify token
  verifyToken: async (): Promise<AuthResponse> => {
    const response = await api.get('/auth/verify-token');
    return response.data;
  },
};

// Utility functions
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const isValidOTP = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};

export const formatTimeRemaining = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default api;