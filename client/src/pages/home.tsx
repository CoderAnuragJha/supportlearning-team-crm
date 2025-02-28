import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Case, Survey } from "@shared/schema";

export default function Home() {
  const { data: cases } = useQuery<Case[]>({ 
    queryKey: ["/api/cases"] 
  });
  
  const { data: surveys } = useQuery<Survey[]>({ 
    queryKey: ["/api/surveys"] 
  });

  const activeCases = cases?.filter(c => c.status === "active").length || 0;
  const avgRating = surveys?.reduce((acc, s) => acc + s.rating, 0) 
    ? (surveys!.reduce((acc, s) => acc + s.rating, 0) / surveys!.length).toFixed(1)
    : "N/A";

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCases}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
