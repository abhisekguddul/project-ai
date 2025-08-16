import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { 
  AuthState, 
  AuthContextType, 
  User, 
  RegisterData, 
  OTPVerificationData, 
  ResendOTPData,
  AuthResponse 
} from '@/types/auth';
import { authAPI, setToken, removeToken, getToken } from '@/utils/api';
import toast from 'react-hot-toast';

// Initial state
const initialState: AuthState = {
  user: null,
  token: getToken(),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          const response = await authAPI.verifyToken();
          
          if (response.success && response.data?.authenticated) {
            // Get user profile
            const profileResponse = await authAPI.getProfile();
            if (profileResponse.success && profileResponse.data?.user) {
              dispatch({
                type: 'AUTH_SUCCESS',
                payload: {
                  user: profileResponse.data.user,
                  token,
                },
              });
            }
          } else {
            removeToken();
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          removeToken();
          dispatch({ type: 'LOGOUT' });
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Register user
  const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.register(data);
      
      if (response.success) {
        toast.success(response.message);
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: response.message });
        toast.error(response.message);
      }
      
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  // Verify registration OTP
  const verifyRegistration = async (data: OTPVerificationData): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.verifyRegistration(data);
      
      if (response.success && response.data?.token && response.data?.user) {
        setToken(response.data.token);
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: response.data.user,
            token: response.data.token,
          },
        });
        toast.success(response.message);
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: response.message });
        if (!response.success) {
          toast.error(response.message);
        }
      }
      
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  // Request login OTP
  const login = async (email: string): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.login({ email });
      
      if (response.success) {
        toast.success(response.message);
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: response.message });
        toast.error(response.message);
      }
      
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login request failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  // Verify login OTP
  const verifyLogin = async (data: OTPVerificationData): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.verifyLogin(data);
      
      if (response.success && response.data?.token && response.data?.user) {
        setToken(response.data.token);
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: response.data.user,
            token: response.data.token,
          },
        });
        toast.success(response.message);
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: response.message });
        if (!response.success) {
          toast.error(response.message);
        }
      }
      
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login verification failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  // Resend OTP
  const resendOTP = async (data: ResendOTPData): Promise<AuthResponse> => {
    try {
      const response = await authAPI.resendOTP(data);
      
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to resend OTP';
      toast.error(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  // Logout
  const logout = () => {
    removeToken();
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    register,
    verifyRegistration,
    login,
    verifyLogin,
    resendOTP,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};