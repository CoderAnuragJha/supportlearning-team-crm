import { 
  Case, InsertCase,
  Survey, InsertSurvey,
  KnowledgeArticle, InsertKnowledgeArticle
} from "@shared/schema";

export interface IStorage {
  // Cases
  getCases(): Promise<Case[]>;
  getCase(id: number): Promise<Case | undefined>;
  createCase(data: InsertCase): Promise<Case>;
  updateCase(id: number, data: Partial<InsertCase>): Promise<Case>;
  
  // Surveys
  getSurveys(): Promise<Survey[]>;
  createSurvey(data: InsertSurvey): Promise<Survey>;
  
  // Knowledge Articles
  getKnowledgeArticles(): Promise<KnowledgeArticle[]>;
  createKnowledgeArticle(data: InsertKnowledgeArticle): Promise<KnowledgeArticle>;
  searchKnowledgeArticles(query: string): Promise<KnowledgeArticle[]>;
}

export class MemStorage implements IStorage {
  private cases: Map<number, Case>;
  private surveys: Map<number, Survey>;
  private knowledgeArticles: Map<number, KnowledgeArticle>;
  private currentIds: { cases: number; surveys: number; articles: number };

  constructor() {
    this.cases = new Map();
    this.surveys = new Map();
    this.knowledgeArticles = new Map();
    this.currentIds = { cases: 1, surveys: 1, articles: 1 };

    // Add some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleCase: InsertCase = {
      caseNumber: "CS001",
      title: "Course Access Issue",
      contactMode: "Email",
      contact: "john.doe@example.com",
      assignedTo: "Sarah Support",
      status: "active",
      assignmentGroup: "Technical Support",
      queryCategory: "Access",
      firstResponseSLA: "Met",
      resolvedBySLA: "Pending"
    };
    this.createCase(sampleCase);

    const sampleSurvey: InsertSurvey = {
      caseId: 1,
      rating: 5,
      comments: "Great support, quick resolution!"
    };
    this.createSurvey(sampleSurvey);

    const sampleArticle: InsertKnowledgeArticle = {
      title: "Common Login Issues",
      content: "Step by step guide to resolve login issues...",
      category: "Authentication"
    };
    this.createKnowledgeArticle(sampleArticle);
  }

  async getCases(): Promise<Case[]> {
    return Array.from(this.cases.values());
  }

  async getCase(id: number): Promise<Case | undefined> {
    return this.cases.get(id);
  }

  async createCase(data: InsertCase): Promise<Case> {
    const id = this.currentIds.cases++;
    const now = new Date();
    const newCase: Case = {
      ...data,
      id,
      openDateTime: now,
      modifiedOn: now,
      resolvedDateTime: null
    };
    this.cases.set(id, newCase);
    return newCase;
  }

  async updateCase(id: number, data: Partial<InsertCase>): Promise<Case> {
    const existingCase = await this.getCase(id);
    if (!existingCase) {
      throw new Error("Case not found");
    }
    const updatedCase: Case = {
      ...existingCase,
      ...data,
      modifiedOn: new Date()
    };
    this.cases.set(id, updatedCase);
    return updatedCase;
  }

  async getSurveys(): Promise<Survey[]> {
    return Array.from(this.surveys.values());
  }

  async createSurvey(data: InsertSurvey): Promise<Survey> {
    const id = this.currentIds.surveys++;
    const survey: Survey = { ...data, id };
    this.surveys.set(id, survey);
    return survey;
  }

  async getKnowledgeArticles(): Promise<KnowledgeArticle[]> {
    return Array.from(this.knowledgeArticles.values());
  }

  async createKnowledgeArticle(data: InsertKnowledgeArticle): Promise<KnowledgeArticle> {
    const id = this.currentIds.articles++;
    const article: KnowledgeArticle = { ...data, id };
    this.knowledgeArticles.set(id, article);
    return article;
  }

  async searchKnowledgeArticles(query: string): Promise<KnowledgeArticle[]> {
    const articles = await this.getKnowledgeArticles();
    const searchTerm = query.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm)
    );
  }
}

export const storage = new MemStorage();
