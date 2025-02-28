import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  caseNumber: text("case_number").notNull().unique(),
  title: text("title").notNull(),
  contactMode: text("contact_mode").notNull(),
  contact: text("contact").notNull(),
  assignedTo: text("assigned_to").notNull(),
  status: text("status").notNull().default("active"),
  assignmentGroup: text("assignment_group").notNull(),
  queryCategory: text("query_category").notNull(),
  firstResponseSLA: text("first_response_sla").notNull(),
  resolvedBySLA: text("resolved_by_sla").notNull(),
  openDateTime: timestamp("open_date_time").notNull().defaultNow(),
  resolvedDateTime: timestamp("resolved_date_time"),
  modifiedOn: timestamp("modified_on").notNull().defaultNow(),
});

export const surveys = pgTable("surveys", {
  id: serial("id").primaryKey(),
  caseId: integer("case_id").notNull(),
  rating: integer("rating").notNull(),
  comments: text("comments"),
});

export const knowledgeArticles = pgTable("knowledge_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
});

export const insertCaseSchema = createInsertSchema(cases).omit({ 
  id: true,
  openDateTime: true,
  modifiedOn: true
});

export const insertSurveySchema = createInsertSchema(surveys).omit({ 
  id: true 
});

export const insertKnowledgeArticleSchema = createInsertSchema(knowledgeArticles).omit({ 
  id: true 
});

export type Case = typeof cases.$inferSelect;
export type InsertCase = z.infer<typeof insertCaseSchema>;

export type Survey = typeof surveys.$inferSelect;
export type InsertSurvey = z.infer<typeof insertSurveySchema>;

export type KnowledgeArticle = typeof knowledgeArticles.$inferSelect;
export type InsertKnowledgeArticle = z.infer<typeof insertKnowledgeArticleSchema>;
