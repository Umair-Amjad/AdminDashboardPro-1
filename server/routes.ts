import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertInstituteSchema, 
  insertUserSchema, 
  insertActivitySchema,
  insertAcademicConfigSchema,
  insertOrgSettingsSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard routes
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  app.get("/api/dashboard/top-institutes", async (req, res) => {
    try {
      const institutes = await storage.getTopInstitutes();
      res.json(institutes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch top institutes" });
    }
  });

  app.get("/api/dashboard/recent-activities", async (req, res) => {
    try {
      const activities = await storage.getRecentActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent activities" });
    }
  });

  // Institute routes
  app.get("/api/institutes", async (req, res) => {
    try {
      const filters = {
        status: req.query.status as string,
        type: req.query.type as string,
        search: req.query.search as string,
      };
      const institutes = await storage.getInstitutes(filters);
      res.json(institutes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch institutes" });
    }
  });

  app.get("/api/institutes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const institute = await storage.getInstitute(id);
      
      if (!institute) {
        return res.status(404).json({ message: "Institute not found" });
      }
      
      res.json(institute);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch institute" });
    }
  });

  app.post("/api/institutes", async (req, res) => {
    try {
      const data = insertInstituteSchema.parse(req.body);
      const institute = await storage.createInstitute(data);
      
      // Create activity log
      await storage.createActivity({
        type: "institute",
        description: `New institute ${institute.name} was added`,
        timestamp: new Date(),
        metadata: { instituteId: institute.id }
      });
      
      res.status(201).json(institute);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.issues });
      }
      res.status(500).json({ message: "Failed to create institute" });
    }
  });

  app.put("/api/institutes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertInstituteSchema.parse(req.body);
      const institute = await storage.updateInstitute(id, data);
      
      if (!institute) {
        return res.status(404).json({ message: "Institute not found" });
      }
      
      // Create activity log
      await storage.createActivity({
        type: "institute",
        description: `Institute ${institute.name} was updated`,
        timestamp: new Date(),
        metadata: { instituteId: institute.id }
      });
      
      res.json(institute);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.issues });
      }
      res.status(500).json({ message: "Failed to update institute" });
    }
  });

  app.delete("/api/institutes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const institute = await storage.getInstitute(id);
      
      if (!institute) {
        return res.status(404).json({ message: "Institute not found" });
      }
      
      await storage.deleteInstitute(id);
      
      // Create activity log
      await storage.createActivity({
        type: "institute",
        description: `Institute ${institute.name} was deleted`,
        timestamp: new Date(),
        metadata: { instituteName: institute.name }
      });
      
      res.json({ message: "Institute deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete institute" });
    }
  });

  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const user = await storage.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.issues });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Organization settings routes
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getOrgSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organization settings" });
    }
  });

  app.put("/api/settings", async (req, res) => {
    try {
      const data = insertOrgSettingsSchema.parse(req.body);
      const settings = await storage.updateOrgSettings(data);
      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.issues });
      }
      res.status(500).json({ message: "Failed to update organization settings" });
    }
  });

  // Activities routes
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
