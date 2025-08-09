import React from 'react';
import { motion } from 'framer-motion';
import { BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const UniversityAdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <BuildingLibraryIcon className="w-24 h-24 text-indigo-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600">
            University Admin Dashboard - Oversee placement activities and analytics
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UniversityAdminDashboard;