import { z } from 'zod';

// Types
export interface Institute {
  id: number;
  name: string;
  type: string;
  status: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface OrgSettings {
  id: number;
  name: string;
  logo: string;
  theme: string;
  updatedAt: Date;
}

// Schema validation
export const instituteSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  status: z.string(),
  location: z.string(),
});

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string(),
});

export const orgSettingsSchema = z.object({
  name: z.string().min(1),
  logo: z.string(),
  theme: z.string(),
});

// Local Storage Keys
const STORAGE_KEYS = {
  INSTITUTES: 'institutes',
  USERS: 'users',
  ACTIVITIES: 'activities',
  SETTINGS: 'settings',
};

// Helper functions
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const setStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Storage Service
export const storage = {
  // Institute operations
  async getInstitutes(filters?: { status?: string; type?: string; search?: string }) {
    let institutes = getStorageItem<Institute[]>(STORAGE_KEYS.INSTITUTES, []);
    
    if (filters) {
      if (filters.status) {
        institutes = institutes.filter(i => i.status === filters.status);
      }
      if (filters.type) {
        institutes = institutes.filter(i => i.type === filters.type);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        institutes = institutes.filter(i => 
          i.name.toLowerCase().includes(search) || 
          i.location.toLowerCase().includes(search)
        );
      }
    }
    
    return institutes;
  },

  async getInstitute(id: number) {
    const institutes = getStorageItem<Institute[]>(STORAGE_KEYS.INSTITUTES, []);
    return institutes.find(i => i.id === id);
  },

  async createInstitute(data: z.infer<typeof instituteSchema>) {
    const institutes = getStorageItem<Institute[]>(STORAGE_KEYS.INSTITUTES, []);
    const newInstitute: Institute = {
      id: Date.now(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    institutes.push(newInstitute);
    setStorageItem(STORAGE_KEYS.INSTITUTES, institutes);
    
    await this.createActivity({
      type: 'institute',
      description: `New institute ${newInstitute.name} was added`,
      timestamp: new Date(),
      metadata: { instituteId: newInstitute.id }
    });
    
    return newInstitute;
  },

  async updateInstitute(id: number, data: z.infer<typeof instituteSchema>) {
    const institutes = getStorageItem<Institute[]>(STORAGE_KEYS.INSTITUTES, []);
    const index = institutes.findIndex(i => i.id === id);
    
    if (index === -1) return null;
    
    const updatedInstitute = {
      ...institutes[index],
      ...data,
      updatedAt: new Date(),
    };
    
    institutes[index] = updatedInstitute;
    setStorageItem(STORAGE_KEYS.INSTITUTES, institutes);
    
    await this.createActivity({
      type: 'institute',
      description: `Institute ${updatedInstitute.name} was updated`,
      timestamp: new Date(),
      metadata: { instituteId: updatedInstitute.id }
    });
    
    return updatedInstitute;
  },

  async deleteInstitute(id: number) {
    const institutes = getStorageItem<Institute[]>(STORAGE_KEYS.INSTITUTES, []);
    const institute = institutes.find(i => i.id === id);
    
    if (!institute) return false;
    
    setStorageItem(
      STORAGE_KEYS.INSTITUTES,
      institutes.filter(i => i.id !== id)
    );
    
    await this.createActivity({
      type: 'institute',
      description: `Institute ${institute.name} was deleted`,
      timestamp: new Date(),
      metadata: { instituteName: institute.name }
    });
    
    return true;
  },

  // User operations
  async getUsers() {
    return getStorageItem<User[]>(STORAGE_KEYS.USERS, []);
  },

  async createUser(data: z.infer<typeof userSchema>) {
    const users = getStorageItem<User[]>(STORAGE_KEYS.USERS, []);
    const newUser: User = {
      id: Date.now(),
      ...data,
      createdAt: new Date(),
    };
    
    users.push(newUser);
    setStorageItem(STORAGE_KEYS.USERS, users);
    
    return newUser;
  },

  // Activity operations
  async getActivities() {
    return getStorageItem<Activity[]>(STORAGE_KEYS.ACTIVITIES, []);
  },

  async createActivity(data: Omit<Activity, 'id'>) {
    const activities = getStorageItem<Activity[]>(STORAGE_KEYS.ACTIVITIES, []);
    const newActivity: Activity = {
      id: Date.now(),
      ...data,
    };
    
    activities.push(newActivity);
    setStorageItem(STORAGE_KEYS.ACTIVITIES, activities);
    
    return newActivity;
  },

  // Settings operations
  async getOrgSettings() {
    return getStorageItem<OrgSettings>(STORAGE_KEYS.SETTINGS, {
      id: 1,
      name: 'My Organization',
      logo: '/logo.png',
      theme: 'light',
      updatedAt: new Date(),
    });
  },

  async updateOrgSettings(data: z.infer<typeof orgSettingsSchema>) {
    const settings: OrgSettings = {
      id: 1,
      ...data,
      updatedAt: new Date(),
    };
    
    setStorageItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  // Dashboard operations
  async getDashboardStats() {
    const institutes = await this.getInstitutes();
    const users = await this.getUsers();
    const activities = await this.getActivities();

    return {
      totalInstitutes: institutes.length,
      totalUsers: users.length,
      totalActivities: activities.length,
      recentActivities: activities.slice(-5),
    };
  },

  async getTopInstitutes() {
    const institutes = await this.getInstitutes();
    return institutes.slice(0, 5);
  },

  async getRecentActivities() {
    const activities = await this.getActivities();
    return activities.slice(-10);
  },
}; 