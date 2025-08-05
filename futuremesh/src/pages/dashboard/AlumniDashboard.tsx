import React from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon, ChatBubbleLeftRightIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const AlumniDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <UserGroupIcon className="w-24 h-24 text-purple-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Alumni Dashboard - Mentor the next generation of professionals
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card text-center">
              <ChatBubbleLeftRightIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mentorship</h3>
              <p className="text-gray-600">Connect with students seeking guidance</p>
            </div>
            <div className="card text-center">
              <AcademicCapIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Share Experience</h3>
              <p className="text-gray-600">Share your knowledge and career insights</p>
            </div>
            <div className="card text-center">
              <UserGroupIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Network</h3>
              <p className="text-gray-600">Build connections within the community</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlumniDashboard;