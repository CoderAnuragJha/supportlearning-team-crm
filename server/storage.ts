import { 
  Case, InsertCase,
  Survey, InsertSurvey,
  KnowledgeArticle, InsertKnowledgeArticle,
  Conversation, InsertConversation,
  cases, surveys, knowledgeArticles, conversations
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, desc } from "drizzle-orm";

export interface IStorage {
  // Cases
  getCases(): Promise<Case[]>;
  getCase(id: number): Promise<Case | undefined>;
  createCase(data: InsertCase): Promise<Case>;
  updateCase(id: number, data: Partial<InsertCase>): Promise<Case>;

  // Conversations
  getConversations(caseId: number): Promise<Conversation[]>;
  createConversation(data: InsertConversation): Promise<Conversation>;

  // Surveys
  getSurveys(): Promise<Survey[]>;
  createSurvey(data: InsertSurvey): Promise<Survey>;

  // Knowledge Articles
  getKnowledgeArticles(): Promise<KnowledgeArticle[]>;
  createKnowledgeArticle(data: InsertKnowledgeArticle): Promise<KnowledgeArticle>;
  searchKnowledgeArticles(query: string): Promise<KnowledgeArticle[]>;
}

export class DatabaseStorage implements IStorage {
  async getCases(): Promise<Case[]> {
    return await db.select().from(cases);
  }

  async getCase(id: number): Promise<Case | undefined> {
    const [caseItem] = await db.select().from(cases).where(eq(cases.id, id));
    return caseItem;
  }

  async createCase(data: InsertCase): Promise<Case> {
    const [newCase] = await db.insert(cases).values({
      ...data,
      openDateTime: new Date(),
      modifiedOn: new Date()
    }).returning();
    return newCase;
  }

  async updateCase(id: number, data: Partial<InsertCase>): Promise<Case> {
    const [updatedCase] = await db
      .update(cases)
      .set({ ...data, modifiedOn: new Date() })
      .where(eq(cases.id, id))
      .returning();

    if (!updatedCase) {
      throw new Error("Case not found");
    }

    return updatedCase;
  }

  async getConversations(caseId: number): Promise<Conversation[]> {
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.caseId, caseId))
      .orderBy(desc(conversations.timestamp));
  }

  async createConversation(data: InsertConversation): Promise<Conversation> {
    const [conversation] = await db
      .insert(conversations)
      .values(data)
      .returning();
    return conversation;
  }

  async getSurveys(): Promise<Survey[]> {
    return await db.select().from(surveys);
  }

  async createSurvey(data: InsertSurvey): Promise<Survey> {
    const [survey] = await db.insert(surveys).values(data).returning();
    return survey;
  }

  async getKnowledgeArticles(): Promise<KnowledgeArticle[]> {
    return await db.select().from(knowledgeArticles);
  }

  async createKnowledgeArticle(data: InsertKnowledgeArticle): Promise<KnowledgeArticle> {
    const [article] = await db.insert(knowledgeArticles).values(data).returning();
    return article;
  }

  async searchKnowledgeArticles(query: string): Promise<KnowledgeArticle[]> {
    return await db
      .select()
      .from(knowledgeArticles)
      .where(ilike(knowledgeArticles.title, `%${query}%`))
      .or(ilike(knowledgeArticles.content, `%${query}%`));
  }
}

export const storage = new DatabaseStorage();