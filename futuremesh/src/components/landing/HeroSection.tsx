import React from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  RocketLaunchIcon, 
  AcademicCapIcon,
  BriefcaseIcon,
  UsersIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const HeroSection: React.FC = () => {
  const stats = [
    { label: 'Students Placed', value: '10K+', icon: AcademicCapIcon },
    { label: 'Companies', value: '500+', icon: BriefcaseIcon },
    { label: 'Alumni Mentors', value: '2K+', icon: UsersIcon },
    { label: 'Success Rate', value: '92%', icon: ChartBarIcon },
  ];

  const floatingElements = [
    { emoji: '🚀', delay: 0, x: 100, y: 50 },
    { emoji: '💼', delay: 1, x: -80, y: 80 },
    { emoji: '🎓', delay: 2, x: 120, y: -60 },
    { emoji: '🤖', delay: 0.5, x: -100, y: -40 },
    { emoji: '⭐', delay: 1.5, x: 150, y: 100 },
    { emoji: '🌟', delay: 2.5, x: -120, y: 120 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-30"></div>
      
      {/* Floating Background Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            x: [element.x, element.x + 20, element.x],
            y: [element.y, element.y - 20, element.y],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: element.delay,
          }}
        >
          {element.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-4 py-2 mb-6"
          >
            <SparklesIcon className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              AI-Powered Career Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight"
          >
            Bridge the Gap Between{' '}
            <span className="gradient-text">Students</span>{' '}
            and{' '}
            <span className="gradient-text">Success</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            FutureMesh revolutionizes student employability through AI-powered mentorship, 
            smart job matching, and seamless collaboration between universities and industry leaders.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <RocketLaunchIcon className="w-5 h-5" />
              <span>Get Started Free</span>
            </motion.a>
            
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:text-primary-600 font-medium text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span>Watch Demo</span>
              <span className="text-2xl">▶️</span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-secondary-400/30 to-accent-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 4,
          }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-gray-400"
        >
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;