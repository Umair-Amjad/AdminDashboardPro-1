import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"),
  instituteId: integer("institute_id"),
  active: boolean("active").notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Institute schema
export const institutes = pgTable("institutes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  type: text("type").notNull(),
  typeDetail: text("type_detail"),
  adminId: integer("admin_id"),
  studentCount: integer("student_count").default(0),
  status: text("status").notNull().default("active"),
  logoInitials: text("logo_initials").notNull(),
  logoColor: text("logo_color").notNull(),
});

export const insertInstituteSchema = createInsertSchema(institutes).omit({
  id: true,
});

// Activity schema
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  userId: integer("user_id"),
  instituteId: integer("institute_id"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  metadata: jsonb("metadata"),
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
});

// Academic configuration schema
export const academicConfigs = pgTable("academic_configs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  academicYearStructure: jsonb("academic_year_structure").notNull(),
  gradeStructure: jsonb("grade_structure").notNull(),
  subjects: jsonb("subjects").notNull(),
  examTypes: jsonb("exam_types"),
  isDefault: boolean("is_default").default(false),
});

export const insertAcademicConfigSchema = createInsertSchema(academicConfigs).omit({
  id: true,
});

// Organization settings schema
export const orgSettings = pgTable("org_settings", {
  id: serial("id").primaryKey(),
  orgName: text("org_name").notNull(),
  logo: text("logo"),
  primaryColor: text("primary_color").notNull(),
  language: text("language").notNull().default("en"),
  timezone: text("timezone").notNull().default("UTC"),
  contactEmail: text("contact_email").notNull(),
  supportPhone: text("support_phone"),
  features: jsonb("features").notNull(),
});

export const insertOrgSettingsSchema = createInsertSchema(orgSettings).omit({
  id: true,
});

// Types based on schemas
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Institute = typeof institutes.$inferSelect;
export type InsertInstitute = z.infer<typeof insertInstituteSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type AcademicConfig = typeof academicConfigs.$inferSelect;
export type InsertAcademicConfig = z.infer<typeof insertAcademicConfigSchema>;

export type OrgSettings = typeof orgSettings.$inferSelect;
export type InsertOrgSettings = z.infer<typeof insertOrgSettingsSchema>;
