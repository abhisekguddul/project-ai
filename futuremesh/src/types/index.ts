// User roles
export type UserRole = 'student' | 'alumni' | 'hod' | 'company_hr' | 'university_admin' | 'super_admin';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Student specific data
export interface Student extends User {
  role: 'student';
  studentId: string;
  department: string;
  year: number;
  cgpa: number;
  skills: string[];
  resume?: string;
  projects: Project[];
  applications: JobApplication[];
}

// Alumni specific data
export interface Alumni extends User {
  role: 'alumni';
  graduationYear: number;
  department: string;
  currentCompany: string;
  currentPosition: string;
  experience: number;
  skills: string[];
  achievements: string[];
}

// Company HR specific data
export interface CompanyHR extends User {
  role: 'company_hr';
  companyName: string;
  position: string;
  companySize: string;
  industry: string;
}

// HOD specific data
export interface HOD extends User {
  role: 'hod';
  department: string;
  university: string;
}

// University Admin specific data
export interface UniversityAdmin extends User {
  role: 'university_admin';
  university: string;
  departments: string[];
}

// Super Admin specific data
export interface SuperAdmin extends User {
  role: 'super_admin';
}

// Job interface
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  requirements: string[];
  skills: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  experience: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  minCgpa: number;
  department: string[];
  university: string[];
  postedBy: string; // HR user ID
  status: 'pending' | 'approved' | 'rejected';
  applicants: string[]; // Student user IDs
  shortlisted: string[]; // Student user IDs
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
}

// Job Application interface
export interface JobApplication {
  id: string;
  jobId: string;
  studentId: string;
  status: 'applied' | 'shortlisted' | 'interview' | 'selected' | 'rejected';
  appliedAt: Date;
  notes?: string;
}

// Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  createdAt: Date;
}

// Chat Message interface
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
}

// Chat Room interface
export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  createdAt: Date;
  updatedAt: Date;
}

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Analytics interfaces
export interface PlacementStats {
  totalStudents: number;
  placedStudents: number;
  averagePackage: number;
  topCompanies: { name: string; hires: number }[];
  departmentWise: { department: string; placed: number; total: number }[];
}

export interface SkillGapAnalysis {
  skill: string;
  demand: number;
  supply: number;
  gap: number;
}

// API Response interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

// Form interfaces
export interface LoginForm {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  // Additional fields based on role
  [key: string]: any;
}

export interface JobPostForm {
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  location: string;
  type: Job['type'];
  experience: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  minCgpa: number;
  department: string[];
  university: string[];
  deadline: Date;
}

// Dashboard props
export interface DashboardProps {
  user: User;
}

// Component props
export interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onView?: (jobId: string) => void;
  showActions?: boolean;
}

export interface ChatBoxProps {
  chatRoom: ChatRoom;
  currentUser: User;
  onSendMessage: (message: string) => void;
}

// AI Features
export interface AIRecommendation {
  type: 'job' | 'skill' | 'mentor' | 'project';
  title: string;
  description: string;
  confidence: number;
  data: any;
}

export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  missingSkills: string[];
  suggestions: string[];
}