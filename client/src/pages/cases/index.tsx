import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Case } from "@shared/schema";
import { format } from "date-fns";

function SLABadge({ status }: { status: string }) {
  return (
    <Badge
      variant={status === "Met" ? "default" : "destructive"}
    >
      {status}
    </Badge>
  );
}

export default function CasesPage() {
  const { data: cases, isLoading } = useQuery<Case[]>({
    queryKey: ["/api/cases"],
  });

  if (isLoading) {
    return <div className="p-8">Loading cases...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Cases</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case Number</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>First Response SLA</TableHead>
              <TableHead>Resolved By SLA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Open Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases?.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell>{case_.caseNumber}</TableCell>
                <TableCell>{case_.title}</TableCell>
                <TableCell>{case_.contact}</TableCell>
                <TableCell>{case_.assignedTo}</TableCell>
                <TableCell>
                  <SLABadge status={case_.firstResponseSLA} />
                </TableCell>
                <TableCell>
                  <SLABadge status={case_.resolvedBySLA} />
                </TableCell>
                <TableCell>
                  <Badge variant={case_.status === "active" ? "default" : "secondary"}>
                    {case_.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(case_.openDateTime), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
