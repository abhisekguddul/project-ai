import React from 'react';
import { motion } from 'framer-motion';
import { CogIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <CogIcon className="w-24 h-24 text-gray-700 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Super Admin Dashboard - System management and global analytics
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;