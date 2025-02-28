import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCaseSchema, 
  insertSurveySchema, 
  insertKnowledgeArticleSchema,
  insertConversationSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Cases endpoints
  app.get("/api/cases", async (_req, res) => {
    const cases = await storage.getCases();
    res.json(cases);
  });

  app.get("/api/cases/:id", async (req, res) => {
    const caseItem = await storage.getCase(parseInt(req.params.id));
    if (!caseItem) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.json(caseItem);
  });

  app.post("/api/cases", async (req, res) => {
    const result = insertCaseSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    const newCase = await storage.createCase(result.data);
    res.status(201).json(newCase);
  });

  app.patch("/api/cases/:id", async (req, res) => {
    const result = insertCaseSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    try {
      const updatedCase = await storage.updateCase(parseInt(req.params.id), result.data);
      res.json(updatedCase);
    } catch (error) {
      res.status(404).json({ message: "Case not found" });
    }
  });

  // Conversations endpoints
  app.get("/api/cases/:id/conversations", async (req, res) => {
    const conversations = await storage.getConversations(parseInt(req.params.id));
    res.json(conversations);
  });

  app.post("/api/cases/:id/conversations", async (req, res) => {
    const result = insertConversationSchema.safeParse({
      ...req.body,
      caseId: parseInt(req.params.id)
    });
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    const newConversation = await storage.createConversation(result.data);
    res.status(201).json(newConversation);
  });

  // Surveys endpoints
  app.get("/api/surveys", async (_req, res) => {
    const surveys = await storage.getSurveys();
    res.json(surveys);
  });

  app.post("/api/surveys", async (req, res) => {
    const result = insertSurveySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    const newSurvey = await storage.createSurvey(result.data);
    res.status(201).json(newSurvey);
  });

  // Knowledge Articles endpoints
  app.get("/api/knowledge", async (req, res) => {
    const query = req.query.q as string | undefined;
    const articles = query 
      ? await storage.searchKnowledgeArticles(query)
      : await storage.getKnowledgeArticles();
    res.json(articles);
  });

  app.post("/api/knowledge", async (req, res) => {
    const result = insertKnowledgeArticleSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    const newArticle = await storage.createKnowledgeArticle(result.data);
    res.status(201).json(newArticle);
  });

  const httpServer = createServer(app);
  return httpServer;
}