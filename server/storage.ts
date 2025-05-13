import { 
  User, 
  InsertUser, 
  Institute, 
  InsertInstitute, 
  Activity, 
  InsertActivity,
  AcademicConfig,
  InsertAcademicConfig,
  OrgSettings,
  InsertOrgSettings
} from "@shared/schema";

// Define the dashboard stats interface
interface DashboardStats {
  institutes: number;
  users: number;
  students: number;
  teachers: number;
  enrollmentRate: string;
  attendance: string;
}

// Define the top institute interface
interface TopInstitute {
  id: string;
  name: string;
  initial: string;
  attendance: string;
  rank: number;
  color: string;
}

// Define filters for institutes
interface InstituteFilters {
  status?: string;
  type?: string;
  search?: string;
}

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  
  // Institute operations
  getInstitute(id: number): Promise<Institute | undefined>;
  getInstitutes(filters?: InstituteFilters): Promise<Institute[]>;
  createInstitute(institute: InsertInstitute): Promise<Institute>;
  updateInstitute(id: number, institute: Partial<InsertInstitute>): Promise<Institute | undefined>;
  deleteInstitute(id: number): Promise<boolean>;
  
  // Activity operations
  getActivities(): Promise<Activity[]>;
  getRecentActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Academic config operations
  getAcademicConfig(id: number): Promise<AcademicConfig | undefined>;
  getAcademicConfigs(): Promise<AcademicConfig[]>;
  createAcademicConfig(config: InsertAcademicConfig): Promise<AcademicConfig>;
  updateAcademicConfig(id: number, config: Partial<InsertAcademicConfig>): Promise<AcademicConfig | undefined>;
  
  // Organization settings operations
  getOrgSettings(): Promise<OrgSettings | undefined>;
  updateOrgSettings(settings: Partial<InsertOrgSettings>): Promise<OrgSettings>;
  
  // Dashboard operations
  getDashboardStats(): Promise<DashboardStats>;
  getTopInstitutes(limit?: number): Promise<TopInstitute[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private institutes: Map<number, Institute>;
  private activities: Map<number, Activity>;
  private academicConfigs: Map<number, AcademicConfig>;
  private orgSettings: OrgSettings | undefined;
  
  private userCurrentId: number;
  private instituteCurrentId: number;
  private activityCurrentId: number;
  private academicConfigCurrentId: number;

  constructor() {
    this.users = new Map();
    this.institutes = new Map();
    this.activities = new Map();
    this.academicConfigs = new Map();
    
    this.userCurrentId = 1;
    this.instituteCurrentId = 1;
    this.activityCurrentId = 1;
    this.academicConfigCurrentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample institutes
    const institutes: InsertInstitute[] = [
      {
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
    
    institutes.forEach(institute => this.createInstitute(institute));
    
    // Sample users
    const users: InsertUser[] = [
      {
        username: "john.carter",
        password: "hashed-password",
        name: "John Carter",
        email: "john.carter@orbitgroup.edu",
        role: "institute_admin",
        instituteId: 1,
        active: true,
      },
      {
        username: "emily.wilson",
        password: "hashed-password",
        name: "Emily Wilson",
        email: "emily.wilson@orbitgroup.edu",
        role: "institute_admin",
        instituteId: 2,
        active: true,
      },
      {
        username: "robert.lee",
        password: "hashed-password",
        name: "Robert Lee",
        email: "robert.lee@orbitgroup.edu",
        role: "institute_admin",
        instituteId: 3,
        active: true,
      },
      {
        username: "sarah.johnson",
        password: "hashed-password",
        name: "Sarah Johnson",
        email: "sarah.johnson@orbitgroup.edu",
        role: "super_admin",
        active: true,
      },
    ];
    
    users.forEach(user => this.createUser(user));
    
    // Sample activities
    const activities: InsertActivity[] = [
      {
        type: "user",
        description: "New admin added: John Carter was added as an Institute Admin for Stellar Academy",
        userId: 4,
        instituteId: 1,
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        metadata: {
          actionType: "create",
          entityType: "user",
          entityId: 1
        },
      },
      {
        type: "settings",
        description: "Settings updated: Academic year template was modified for all institutes",
        userId: 4,
        timestamp: new Date(Date.now() - 18000000), // 5 hours ago
        metadata: {
          actionType: "update",
          entityType: "academic_config",
          changes: ["yearTemplate"]
        },
      },
      {
        type: "institute",
        description: "New institute onboarded: Pathways International School was successfully added to the organization",
        userId: 4,
        timestamp: new Date(Date.now() - 86400000), // Yesterday
        metadata: {
          actionType: "create",
          entityType: "institute",
          entityName: "Pathways International School"
        },
      },
    ];
    
    activities.forEach(activity => this.createActivity(activity));
    
    // Sample organization settings
    this.orgSettings = {
      id: 1,
      orgName: "Orbit Group of Education",
      logo: "OG",
      primaryColor: "#4F46E5",
      language: "en",
      timezone: "UTC",
      contactEmail: "admin@orbitgroup.edu",
      supportPhone: "+1 (123) 456-7890",
      features: {
        exams: true,
        library: true,
        transport: true,
        events: true,
        accounting: true,
      },
    };
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }
  
  // Institute methods
  async getInstitute(id: number): Promise<Institute | undefined> {
    return this.institutes.get(id);
  }
  
  async getInstitutes(filters: InstituteFilters = {}): Promise<Institute[]> {
    let institutes = Array.from(this.institutes.values());
    
    if (filters.status && filters.status !== 'all') {
      institutes = institutes.filter(i => i.status === filters.status);
    }
    
    if (filters.type && filters.type !== 'all') {
      institutes = institutes.filter(i => i.type.toLowerCase() === filters.type.toLowerCase());
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      institutes = institutes.filter(i => 
        i.name.toLowerCase().includes(search) || 
        i.email.toLowerCase().includes(search)
      );
    }
    
    return institutes;
  }
  
  async createInstitute(insertInstitute: InsertInstitute): Promise<Institute> {
    const id = this.instituteCurrentId++;
    const institute: Institute = { ...insertInstitute, id };
    this.institutes.set(id, institute);
    return institute;
  }
  
  async updateInstitute(id: number, data: Partial<InsertInstitute>): Promise<Institute | undefined> {
    const institute = this.institutes.get(id);
    if (!institute) return undefined;
    
    const updatedInstitute = { ...institute, ...data };
    this.institutes.set(id, updatedInstitute);
    return updatedInstitute;
  }
  
  async deleteInstitute(id: number): Promise<boolean> {
    return this.institutes.delete(id);
  }
  
  // Activity methods
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0));
  }
  
  async getRecentActivities(limit: number = 10): Promise<Activity[]> {
    return (await this.getActivities()).slice(0, limit);
  }
  
  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.activityCurrentId++;
    const activity: Activity = { ...insertActivity, id };
    this.activities.set(id, activity);
    return activity;
  }
  
  // Academic config methods
  async getAcademicConfig(id: number): Promise<AcademicConfig | undefined> {
    return this.academicConfigs.get(id);
  }
  
  async getAcademicConfigs(): Promise<AcademicConfig[]> {
    return Array.from(this.academicConfigs.values());
  }
  
  async createAcademicConfig(config: InsertAcademicConfig): Promise<AcademicConfig> {
    const id = this.academicConfigCurrentId++;
    const academicConfig: AcademicConfig = { ...config, id };
    this.academicConfigs.set(id, academicConfig);
    return academicConfig;
  }
  
  async updateAcademicConfig(id: number, data: Partial<InsertAcademicConfig>): Promise<AcademicConfig | undefined> {
    const config = this.academicConfigs.get(id);
    if (!config) return undefined;
    
    const updatedConfig = { ...config, ...data };
    this.academicConfigs.set(id, updatedConfig);
    return updatedConfig;
  }
  
  // Organization settings methods
  async getOrgSettings(): Promise<OrgSettings | undefined> {
    return this.orgSettings;
  }
  
  async updateOrgSettings(data: Partial<InsertOrgSettings>): Promise<OrgSettings> {
    if (!this.orgSettings) {
      const id = 1;
      this.orgSettings = { ...data, id } as OrgSettings;
    } else {
      this.orgSettings = { ...this.orgSettings, ...data };
    }
    
    return this.orgSettings;
  }
  
  // Dashboard methods
  async getDashboardStats(): Promise<DashboardStats> {
    const institutes = await this.getInstitutes();
    const users = await this.getUsers();
    
    const totalStudents = institutes.reduce((sum, institute) => sum + (institute.studentCount || 0), 0);
    const totalTeachers = users.filter(user => user.role === 'teacher').length;
    
    return {
      institutes: institutes.length,
      users: users.length,
      students: totalStudents,
      teachers: totalTeachers,
      enrollmentRate: "92.7%",
      attendance: "89.5%",
    };
  }
  
  async getTopInstitutes(limit: number = 3): Promise<TopInstitute[]> {
    return [
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
    ].slice(0, limit);
  }
}

export const storage = new MemStorage();
