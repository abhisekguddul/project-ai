import React from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  LogOut, 
  CheckCircle,
  Clock,
  Settings
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">OTP Auth Dashboard</h1>
                <p className="text-gray-600">Secure authentication system</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Welcome Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-6">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name}!
                  </h2>
                  <p className="text-gray-600 mt-1">
                    You're successfully authenticated with OTP
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Status */}
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-900">Account Status</h3>
                  </div>
                  <p className="text-green-800">
                    ✅ Email Verified<br />
                    ✅ Account Active<br />
                    ✅ Secure Login
                  </p>
                </div>

                {/* Security Info */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-900">Security</h3>
                  </div>
                  <p className="text-blue-800">
                    🔐 OTP Authentication<br />
                    🛡️ JWT Token Protected<br />
                    🔒 Encrypted Data
                  </p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Last Login</span>
                      <span className="text-gray-900 font-medium">
                        {formatDate(user?.lastLogin)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Account Created</span>
                      <span className="text-gray-900 font-medium">
                        {formatDate(user?.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Authentication Method</span>
                      <span className="text-gray-900 font-medium">
                        Email OTP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-gray-900 font-medium">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <div className="flex items-center mt-1">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900 font-medium">{user?.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">User ID</label>
                  <p className="text-gray-600 text-sm font-mono">{user?.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Verification Status</label>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-green-700 font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => alert('Profile settings would open here')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => alert('Security settings would open here')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">System Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-90">Sessions Today</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Security Level</span>
                  <span className="font-bold">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Auth Method</span>
                  <span className="font-bold">OTP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;