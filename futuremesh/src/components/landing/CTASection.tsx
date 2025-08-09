import React from 'react';
import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon,
  ArrowRightIcon,
  SparklesIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const CTASection: React.FC = () => {
  const benefits = [
    'Free forever for students',
    'AI-powered job matching',
    'Alumni mentorship network',
    'Verified job opportunities',
    'Real-time analytics',
    '24/7 support'
  ];

  const userTypes = [
    {
      title: 'Students',
      description: 'Find your dream job with AI assistance',
      buttonText: 'Start Your Journey',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Alumni',
      description: 'Mentor the next generation',
      buttonText: 'Become a Mentor',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Companies',
      description: 'Hire top talent efficiently',
      buttonText: 'Post Jobs',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Universities',
      description: 'Boost placement rates',
      buttonText: 'Get Started',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-10"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <SparklesIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Join 50,000+ Users</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
              Career Journey?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students, alumni, companies, and universities who are already 
            revolutionizing career development with FutureMesh's AI-powered platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-900 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            >
              <RocketLaunchIcon className="w-5 h-5" />
              <span>Get Started Free</span>
            </motion.a>
            
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white hover:bg-white/10 font-medium text-lg px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <span>Schedule Demo</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-2 text-primary-100"
              >
                <CheckCircleIcon className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* User Type CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
            Choose Your Path
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/15 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.color} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-8 h-8 bg-white/30 rounded-lg"></div>
                </div>
                <h4 className="text-lg font-semibold mb-2">{type.title}</h4>
                <p className="text-primary-200 text-sm mb-4">{type.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {type.buttonText}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA with Urgency */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Limited Time: Free Premium Features
            </h3>
            <p className="text-primary-200 mb-6 max-w-2xl mx-auto">
              Sign up now and get access to premium AI features, priority support, 
              and advanced analytics - absolutely free for the first 3 months.
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-primary-300">Months Free</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">$0</div>
                <div className="text-xs text-primary-300">Setup Cost</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs text-primary-300">Support</div>
              </div>
            </div>

            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span>Claim Your Free Access</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.a>
            
            <p className="text-xs text-primary-300 mt-4">
              No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </motion.div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-secondary-400/20 to-accent-400/20 rounded-full blur-3xl"
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
    </section>
  );
};

export default CTASection;