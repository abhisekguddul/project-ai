import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CpuChipIcon,
  UserGroupIcon,
  BellIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');

  // Mock data
  const stats = [
    { label: 'Applications Sent', value: '12', change: '+3 this week', icon: DocumentTextIcon, color: 'text-blue-600' },
    { label: 'Interview Calls', value: '4', change: '+2 this week', icon: ChatBubbleLeftRightIcon, color: 'text-green-600' },
    { label: 'Profile Views', value: '89', change: '+15 this week', icon: UserGroupIcon, color: 'text-purple-600' },
    { label: 'AI Match Score', value: '92%', change: '+5% this month', icon: CpuChipIcon, color: 'text-orange-600' }
  ];

  const jobRecommendations = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Internship',
      salary: '$3000/month',
      matchScore: 95,
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      posted: '2 days ago',
      applicants: 23
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k-100k',
      matchScore: 89,
      skills: ['JavaScript', 'Node.js', 'MongoDB'],
      posted: '1 week ago',
      applicants: 45
    },
    {
      id: '3',
      title: 'Data Science Intern',
      company: 'DataFlow Inc',
      location: 'New York, NY',
      type: 'Internship',
      salary: '$2500/month',
      matchScore: 87,
      skills: ['Python', 'Machine Learning', 'SQL'],
      posted: '3 days ago',
      applicants: 67
    }
  ];

  const alumniMentors = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Software Engineer',
      company: 'Google',
      experience: '5 years',
      skills: ['React', 'System Design', 'Leadership'],
      matchScore: 94,
      available: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Microsoft',
      experience: '7 years',
      skills: ['Product Strategy', 'Data Analysis', 'Agile'],
      matchScore: 88,
      available: true
    }
  ];

  const recentActivities = [
    { type: 'application', message: 'Applied to Frontend Developer at TechCorp', time: '2 hours ago' },
    { type: 'message', message: 'New message from Sarah Johnson (Alumni)', time: '4 hours ago' },
    { type: 'recommendation', message: 'AI found 3 new job matches for you', time: '1 day ago' },
    { type: 'profile', message: 'Profile viewed by DataFlow Inc recruiter', time: '2 days ago' }
  ];

  const tabs = [
    { id: 'jobs', label: 'Job Feed', icon: BriefcaseIcon },
    { id: 'mentors', label: 'Alumni Mentors', icon: UserGroupIcon },
    { id: 'applications', label: 'My Applications', icon: DocumentTextIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your personalized career dashboard with AI-powered recommendations.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="card group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card mb-6"
            >
              <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'jobs' && (
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <div className="card">
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search jobs..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FunnelIcon className="w-4 h-4" />
                        <span>Filters</span>
                      </button>
                    </div>
                  </div>

                  {/* Job Recommendations */}
                  <div className="space-y-4">
                    {jobRecommendations.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card group hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                                {job.title}
                              </h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                job.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                                job.matchScore >= 80 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {job.matchScore}% match
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                            <p className="text-gray-700 font-medium mb-3">{job.salary}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {job.skills.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{job.posted}</span>
                              <span className="mx-2">•</span>
                              <span>{job.applicants} applicants</span>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn-primary px-4 py-2 text-sm"
                            >
                              Apply Now
                            </motion.button>
                            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                              Save
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'mentors' && (
                <div className="space-y-4">
                  {alumniMentors.map((mentor, index) => (
                    <motion.div
                      key={mentor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card group hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.name}`}
                          alt={mentor.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                            {mentor.available && (
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-1">{mentor.role} at {mentor.company}</p>
                          <p className="text-sm text-gray-500 mb-2">{mentor.experience} experience</p>
                          <div className="flex flex-wrap gap-1">
                            {mentor.skills.map((skill) => (
                              <span key={skill} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <span className="text-sm font-medium text-green-600">
                            {mentor.matchScore}% match
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary px-4 py-2 text-sm"
                          >
                            Connect
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="card">
                  <div className="text-center py-12">
                    <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600 mb-4">Start applying to jobs to track your progress here.</p>
                    <button className="btn-primary">
                      Browse Jobs
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="card">
                  <div className="text-center py-12">
                    <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                    <p className="text-gray-600">Detailed insights about your job search progress.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card bg-gradient-to-br from-primary-50 to-secondary-50"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <CpuChipIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Get personalized career advice and job recommendations.
              </p>
              <button className="w-full btn-primary text-sm">
                Chat with AI
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Update Resume</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <PlusIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Add Project</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Message Alumni</span>
                </button>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="card"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'application' ? 'bg-blue-500' :
                      activity.type === 'message' ? 'bg-green-500' :
                      activity.type === 'recommendation' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;