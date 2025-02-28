import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { KnowledgeArticle } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function KnowledgePage() {
  const [search, setSearch] = useState("");

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
    return <div className="p-8">Loading knowledge base...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Knowledge Base</h1>
      
      <div className="max-w-md mb-8">
        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <Badge>{article.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {article.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
