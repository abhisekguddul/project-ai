import React from 'react';
import { motion } from 'framer-motion';
import { 
  CpuChipIcon,
  UserGroupIcon,
  ChartBarIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: CpuChipIcon,
      title: 'AI-Powered Job Matching',
      description: 'Our advanced AI analyzes student profiles, skills, and preferences to match them with the perfect job opportunities.',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['95% match accuracy', 'Real-time recommendations', 'Skill gap analysis']
    },
    {
      icon: UserGroupIcon,
      title: 'Smart Alumni Mentorship',
      description: 'Connect students with relevant alumni mentors based on career paths, interests, and industry experience.',
      color: 'from-purple-500 to-pink-500',
      benefits: ['Personalized matching', '24/7 chat support', 'Career guidance']
    },
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards for universities and companies to track placement trends and student progress.',
      color: 'from-green-500 to-emerald-500',
      benefits: ['Real-time insights', 'Custom reports', 'Predictive analytics']
    },
    {
      icon: LightBulbIcon,
      title: 'Resume Intelligence',
      description: 'AI-powered resume analysis and optimization suggestions to help students stand out to employers.',
      color: 'from-yellow-500 to-orange-500',
      benefits: ['Instant feedback', 'ATS optimization', 'Industry-specific tips']
    },
    {
      icon: RocketLaunchIcon,
      title: 'Project Recommendations',
      description: 'Get personalized project suggestions based on your skills and career goals to build a stronger portfolio.',
      color: 'from-red-500 to-rose-500',
      benefits: ['Skill-based suggestions', 'Industry relevance', 'Portfolio building']
    },
    {
      icon: ShieldCheckIcon,
      title: 'Verified Opportunities',
      description: 'All job postings are verified by university administrators to ensure quality and legitimacy.',
      color: 'from-indigo-500 to-blue-500',
      benefits: ['100% verified jobs', 'Quality assurance', 'Fraud protection']
    }
  ];

  const roleFeatures = [
    {
      icon: AcademicCapIcon,
      title: 'For Students',
      features: ['Smart job feed', 'Resume analyzer', 'Alumni chat', 'Application tracker', 'Skill assessments']
    },
    {
      icon: UserGroupIcon,
      title: 'For Alumni',
      features: ['Mentorship tools', 'Resource sharing', 'Student matching', 'Impact tracking', 'Community building']
    },
    {
      icon: BriefcaseIcon,
      title: 'For Companies',
      features: ['Talent sourcing', 'Bulk hiring', 'University partnerships', 'Candidate screening', 'Analytics dashboard']
    },
    {
      icon: ChartBarIcon,
      title: 'For Universities',
      features: ['Placement tracking', 'Department analytics', 'Job verification', 'Student monitoring', 'Success metrics']
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Powered by <span className="gradient-text">Artificial Intelligence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of career development with our cutting-edge AI features 
            designed to maximize student success and streamline recruitment processes.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="card h-full">
                {/* Icon with Gradient Background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Role-Specific Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Tailored for Every Role
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specialized features and interfaces designed for students, alumni, companies, and universities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleFeatures.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card text-center group"
            >
              <role.icon className="w-12 h-12 text-primary-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {role.title}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {role.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="w-1 h-1 bg-primary-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* AI Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-mesh-pattern opacity-10"></div>
          
          <div className="relative z-10">
            <CpuChipIcon className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Experience the AI Difference
            </h3>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Our AI processes over 10,000 data points to make perfect matches, 
              analyze resumes in seconds, and provide personalized career guidance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-primary-200">Data Points Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">&lt;2s</div>
                <div className="text-primary-200">Resume Analysis Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-primary-200">Match Accuracy</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Try AI Features
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;