import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { KnowledgeArticle } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  const { data: articles, isLoading } = useQuery<KnowledgeArticle[]>({
    queryKey: ["/api/knowledge", search],
    queryFn: async () => {
      const url = search 
        ? `/api/knowledge?q=${encodeURIComponent(search)}`
        : "/api/knowledge";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    }
  });

  if (isLoading) {
    return <div className="p-4 md:p-8">Loading knowledge base...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Knowledge Base</h1>

      <div className="max-w-md mb-8">
        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => (
          <Card 
            key={article.id} 
            className="cursor-pointer hover:bg-accent/5 transition-colors"
            onClick={() => setSelectedArticle(article)}
          >
            <CardHeader>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <Badge>{article.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {article.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedArticle?.title}
              <Badge>{selectedArticle?.category}</Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 prose prose-sm max-w-none">
            {selectedArticle?.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}