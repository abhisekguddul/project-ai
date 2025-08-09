import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlusIcon,
  CpuChipIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: UserPlusIcon,
      title: 'Sign Up & Profile Creation',
      description: 'Students, alumni, companies, and universities create their profiles with relevant information.',
      details: ['Upload resume & portfolio', 'Set career preferences', 'Add skills & experience', 'Complete verification'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CpuChipIcon,
      title: 'AI Analysis & Matching',
      description: 'Our AI analyzes profiles and creates intelligent matches based on skills, preferences, and requirements.',
      details: ['Resume analysis', 'Skill gap identification', 'Preference matching', 'Smart recommendations'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: UserGroupIcon,
      title: 'Connect & Collaborate',
      description: 'Students connect with alumni mentors, companies find candidates, and universities track progress.',
      details: ['Alumni mentorship', 'Real-time chat', 'Resource sharing', 'Guidance sessions'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BriefcaseIcon,
      title: 'Apply & Interview',
      description: 'Streamlined application process with verified job postings and interview scheduling.',
      details: ['One-click applications', 'Interview scheduling', 'Progress tracking', 'Feedback system'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: ChartBarIcon,
      title: 'Track & Analyze',
      description: 'Comprehensive analytics for all stakeholders to monitor progress and success metrics.',
      details: ['Placement analytics', 'Success metrics', 'Performance insights', 'Trend analysis'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: CheckCircleIcon,
      title: 'Success & Growth',
      description: 'Successful placements, continued mentorship, and ongoing career development support.',
      details: ['Job placements', 'Career growth', 'Alumni network', 'Continuous support'],
      color: 'from-teal-500 to-green-500'
    }
  ];

  const userJourneys = [
    {
      role: 'Student',
      steps: ['Create Profile', 'Get AI Recommendations', 'Connect with Alumni', 'Apply to Jobs', 'Land Dream Job'],
      color: 'text-blue-600'
    },
    {
      role: 'Alumni',
      steps: ['Join Network', 'Set Mentorship Preferences', 'Get Matched with Students', 'Provide Guidance', 'Track Impact'],
      color: 'text-purple-600'
    },
    {
      role: 'Company',
      steps: ['Post Jobs', 'Set Requirements', 'Review AI-Matched Candidates', 'Conduct Interviews', 'Hire Top Talent'],
      color: 'text-green-600'
    },
    {
      role: 'University',
      steps: ['Verify Jobs', 'Monitor Students', 'Track Placements', 'Analyze Trends', 'Improve Programs'],
      color: 'text-orange-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
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
            How <span className="gradient-text">FutureMesh</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A seamless, AI-powered journey from student registration to successful career placement, 
            connecting all stakeholders in the education-to-employment ecosystem.
          </p>
        </motion.div>

        {/* Main Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                {index + 1}
              </div>

              <div className="card h-full group-hover:shadow-2xl transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Connecting Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                    <ArrowRightIcon className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Journey Flows */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
            Tailored Journeys for Every User
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userJourneys.map((journey, index) => (
              <motion.div
                key={journey.role}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <h4 className={`text-lg font-semibold mb-4 ${journey.color}`}>
                  {journey.role} Journey
                </h4>
                <div className="space-y-3">
                  {journey.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${
                        stepIndex === 0 ? 'from-primary-500 to-primary-600' :
                        stepIndex === journey.steps.length - 1 ? 'from-accent-500 to-accent-600' :
                        'from-gray-400 to-gray-500'
                      } flex items-center justify-center text-white text-xs font-bold`}>
                        {stepIndex + 1}
                      </div>
                      <span className="text-gray-700 text-sm">{step}</span>
                      {stepIndex < journey.steps.length - 1 && (
                        <ArrowRightIcon className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-mesh-pattern opacity-10"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              See It in Action
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the power of FutureMesh with our interactive demo. 
              See how AI transforms the career journey for every user type.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <span>Watch Interactive Demo</span>
                <span>🎥</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/30 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center space-x-2"
              >
                <span>Try Free Trial</span>
                <ArrowRightIcon className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;