import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Survey, Case } from "@shared/schema";

export default function SurveysPage() {
  const { data: surveys, isLoading: surveysLoading } = useQuery<Survey[]>({
    queryKey: ["/api/surveys"],
  });

  const { data: cases, isLoading: casesLoading } = useQuery<Case[]>({
    queryKey: ["/api/cases"],
  });

  if (surveysLoading || casesLoading) {
    return <div className="p-8">Loading surveys...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Surveys</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case Number</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveys?.map((survey) => {
              const case_ = cases?.find(c => c.id === survey.caseId);
              return (
                <TableRow key={survey.id}>
                  <TableCell>{case_?.caseNumber}</TableCell>
                  <TableCell>{case_?.contact}</TableCell>
                  <TableCell>{case_?.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {Array.from({ length: survey.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{survey.comments}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
