import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import AlumniDashboard from './pages/dashboard/AlumniDashboard';
import HODDashboard from './pages/dashboard/HODDashboard';
import CompanyHRDashboard from './pages/dashboard/CompanyHRDashboard';
import UniversityAdminDashboard from './pages/dashboard/UniversityAdminDashboard';
import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard';
import LoadingSpinner from './components/common/LoadingSpinner';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Dashboard Router Component
const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'alumni':
      return <AlumniDashboard />;
    case 'hod':
      return <HODDashboard />;
    case 'company_hr':
      return <CompanyHRDashboard />;
    case 'university_admin':
      return <UniversityAdminDashboard />;
    case 'super_admin':
      return <SuperAdminDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

// Main App Layout
const AppLayout: React.FC<{ children: React.ReactNode; isLanding?: boolean }> = ({ 
  children, 
  isLanding = false 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLanding={isLanding} />
      <main className={isLanding ? '' : 'pt-16'}>
        {children}
      </main>
      {isLanding && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <AppLayout isLanding>
                  <LandingPage />
                </AppLayout>
              } 
            />
            <Route 
              path="/login" 
              element={
                <AppLayout>
                  <LoginPage />
                </AppLayout>
              } 
            />
            <Route 
              path="/register" 
              element={
                <AppLayout>
                  <RegisterPage />
                </AppLayout>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <DashboardRouter />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />

            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
