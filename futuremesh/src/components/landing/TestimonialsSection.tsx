import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { QuoteIcon } from '@heroicons/react/24/outline';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Graduate',
      company: 'Google',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      rating: 5,
      quote: 'FutureMesh completely transformed my job search. The AI recommendations were spot-on, and connecting with alumni mentors gave me the confidence I needed. I landed my dream job at Google within 3 months!',
      category: 'student'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior Software Engineer',
      company: 'Microsoft Alumni',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      rating: 5,
      quote: 'As an alumni mentor, FutureMesh makes it incredibly easy to give back to my university community. The platform intelligently matches me with students who can benefit from my experience.',
      category: 'alumni'
    },
    {
      name: 'Dr. Jennifer Park',
      role: 'Head of Computer Science',
      company: 'Stanford University',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer',
      rating: 5,
      quote: 'The analytics dashboard gives us unprecedented insights into our students\' career journeys. We\'ve improved our placement rates by 40% since implementing FutureMesh.',
      category: 'university'
    },
    {
      name: 'David Thompson',
      role: 'Head of Talent Acquisition',
      company: 'Meta',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      rating: 5,
      quote: 'FutureMesh has revolutionized our campus hiring. The quality of candidates is exceptional, and the AI pre-screening saves us countless hours. It\'s a game-changer for recruitment.',
      category: 'company'
    },
    {
      name: 'Priya Sharma',
      role: 'Data Science Student',
      company: 'MIT',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      rating: 5,
      quote: 'The resume analysis feature helped me optimize my CV perfectly. I got interview calls from 8 out of 10 applications! The alumni chat feature is incredibly valuable too.',
      category: 'student'
    },
    {
      name: 'Alex Johnson',
      role: 'Product Manager',
      company: 'Amazon Alumni',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      rating: 5,
      quote: 'Mentoring students through FutureMesh is so rewarding. The platform makes it easy to share resources, provide guidance, and track the impact of my mentorship.',
      category: 'alumni'
    }
  ];

  const stats = [
    { value: '98%', label: 'User Satisfaction' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '50K+', label: 'Success Stories' },
    { value: '92%', label: 'Recommend to Others' }
  ];

  const categoryColors = {
    student: 'from-blue-500 to-cyan-500',
    alumni: 'from-purple-500 to-pink-500',
    university: 'from-green-500 to-emerald-500',
    company: 'from-orange-500 to-red-500'
  };

  const categoryLabels = {
    student: 'Student',
    alumni: 'Alumni Mentor',
    university: 'University',
    company: 'Company'
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
            Trusted by <span className="gradient-text">Thousands</span> Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what students, alumni, universities, and companies are saying about their 
            transformative experiences with FutureMesh.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card group relative overflow-hidden"
            >
              {/* Category Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[testimonial.category as keyof typeof categoryColors]}`}>
                {categoryLabels[testimonial.category as keyof typeof categoryLabels]}
              </div>

              {/* Quote Icon */}
              <QuoteIcon className="w-8 h-8 text-primary-200 mb-4" />

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-primary-600 font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-mesh-pattern opacity-10"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              See Success Stories in Action
            </h3>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Watch real students, alumni, and professionals share their FutureMesh journey 
              and how it transformed their careers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Student Success', duration: '2:30', views: '15K' },
                { title: 'Alumni Impact', duration: '3:15', views: '12K' },
                { title: 'Company Results', duration: '2:45', views: '8K' }
              ].map((video, index) => (
                <motion.div
                  key={video.title}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer group"
                >
                  <div className="w-full h-32 bg-white/20 rounded-lg mb-4 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl">▶️</span>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{video.title}</h4>
                  <div className="flex justify-between text-sm text-primary-200">
                    <span>{video.duration}</span>
                    <span>{video.views} views</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              View All Success Stories
            </motion.button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-8">Trusted by leading institutions and companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            {['MIT', 'Stanford', 'Google', 'Microsoft', 'Amazon', 'Meta'].map((company) => (
              <div key={company} className="text-2xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;