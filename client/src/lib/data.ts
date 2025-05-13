import { Institute, User, Activity, AcademicConfig, OrgSettings } from "@shared/schema";

// These are client-side type definitions and mock data for use during development
// This file helps with TypeScript type checking and auto-completion while building UI components

export interface DashboardStats {
  institutes: number;
  users: number;
  students: number;
  teachers: number;
  enrollmentRate: string;
  attendance: string;
}

export interface TopInstitute {
  id: string;
  name: string;
  initial: string;
  attendance: string;
  rank: number;
  color: string;
}

export interface RecentActivity {
  id: string;
  type: "user" | "settings" | "institute";
  title: string;
  description: string;
  time: string;
}

// Mock data - only for local development and preview
export const mockDashboardStats: DashboardStats = {
  institutes: 12,
  users: 8294,
  students: 7862,
  teachers: 432,
  enrollmentRate: "92.7%",
  attendance: "89.5%",
};

export const mockTopInstitutes: TopInstitute[] = [
  {
    id: "1",
    name: "Stellar Academy",
    initial: "SA",
    attendance: "98.2% attendance",
    rank: 1,
    color: "purple",
  },
  {
    id: "2",
    name: "Heritage School",
    initial: "HS",
    attendance: "96.7% attendance",
    rank: 2,
    color: "blue",
  },
  {
    id: "3",
    name: "Meridian School",
    initial: "MS",
    attendance: "95.3% attendance",
    rank: 3,
    color: "amber",
  },
];

export const mockRecentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "user",
    title: "New admin added",
    description: "John Carter was added as an Institute Admin for Stellar Academy",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "settings",
    title: "Settings updated",
    description: "Academic year template was modified for all institutes",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "institute",
    title: "New institute onboarded",
    description: "Pathways International School was successfully added to the organization",
    time: "Yesterday",
  },
];

export const mockInstitutes: Institute[] = [
  {
    id: 1,
    name: "Stellar Academy",
    email: "stellar@orbitgroup.edu",
    type: "School",
    typeDetail: "K-12",
    adminId: 1,
    studentCount: 1245,
    status: "active",
    logoInitials: "SA",
    logoColor: "blue",
  },
  {
    id: 2,
    name: "Heritage School",
    email: "heritage@orbitgroup.edu",
    type: "School",
    typeDetail: "K-12",
    adminId: 2,
    studentCount: 980,
    status: "active",
    logoInitials: "HS",
    logoColor: "purple",
  },
  {
    id: 3,
    name: "Meridian School",
    email: "meridian@orbitgroup.edu",
    type: "School",
    typeDetail: "K-12",
    adminId: 3,
    studentCount: 876,
    status: "active",
    logoInitials: "MS",
    logoColor: "amber",
  },
  {
    id: 4,
    name: "Phoenix University",
    email: "phoenix@orbitgroup.edu",
    type: "University",
    typeDetail: "Higher Education",
    adminId: 4,
    studentCount: 2352,
    status: "maintenance",
    logoInitials: "PU",
    logoColor: "red",
  },
  {
    id: 5,
    name: "Global College",
    email: "global@orbitgroup.edu",
    type: "College",
    typeDetail: "Higher Education",
    adminId: 5,
    studentCount: 1654,
    status: "inactive",
    logoInitials: "GC",
    logoColor: "gray",
  },
];

export const mockUsers: User[] = [
  {
    id: 1,
    username: "john.carter",
    password: "hashed-password",
    name: "John Carter",
    email: "john.carter@orbitgroup.edu",
    role: "institute_admin",
    instituteId: 1,
    active: true,
  },
  {
    id: 2,
    username: "emily.wilson",
    password: "hashed-password",
    name: "Emily Wilson",
    email: "emily.wilson@orbitgroup.edu",
    role: "institute_admin",
    instituteId: 2,
    active: true,
  },
  {
    id: 3,
    username: "robert.lee",
    password: "hashed-password",
    name: "Robert Lee",
    email: "robert.lee@orbitgroup.edu",
    role: "institute_admin",
    instituteId: 3,
    active: true,
  },
  {
    id: 4,
    username: "sarah.johnson",
    password: "hashed-password",
    name: "Sarah Johnson",
    email: "sarah.johnson@orbitgroup.edu",
    role: "super_admin",
    active: true,
  },
];
