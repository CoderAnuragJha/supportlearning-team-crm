import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Case, Conversation } from "@shared/schema";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function SLABadge({ status }: { status: string }) {
  return (
    <Badge
      variant={status === "Met" ? "default" : "destructive"}
    >
      {status}
    </Badge>
  );
}

function ConversationDialog({ 
  caseId, 
  isOpen, 
  onClose,
  caseLearner
}: { 
  caseId: number; 
  isOpen: boolean; 
  onClose: () => void;
  caseLearner: string;
}) {
  const { data: conversations } = useQuery<Conversation[]>({
    queryKey: [`/api/cases/${caseId}/conversations`],
    enabled: isOpen
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Conversation with {caseLearner}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4 overflow-y-auto max-h-[60vh] p-4">
          {conversations?.map((conv) => (
            <div
              key={conv.id}
              className={`flex ${conv.sender === caseLearner ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  conv.sender === caseLearner
                    ? 'bg-muted'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <p className="text-sm font-medium mb-1">{conv.sender}</p>
                <p className="text-sm">{conv.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {format(new Date(conv.timestamp), "MMM d, h:mm a")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CasesPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [selectedCaseLearner, setSelectedCaseLearner] = useState<string>("");

  const { data: cases, isLoading } = useQuery<Case[]>({
    queryKey: ["/api/cases"],
  });

  if (isLoading) {
    return <div className="p-4 md:p-8">Loading cases...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Cases</h1>

      <div className="overflow-x-auto rounded-md border">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Learner</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>First Response SLA</TableHead>
                <TableHead>Resolved By SLA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Open Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases?.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell>{case_.caseNumber}</TableCell>
                  <TableCell>{case_.title}</TableCell>
                  <TableCell>{case_.learnerName}</TableCell>
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
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCaseId(case_.id);
                        setSelectedCaseLearner(case_.learnerName);
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedCaseId && (
        <ConversationDialog 
          caseId={selectedCaseId}
          isOpen={!!selectedCaseId}
          onClose={() => setSelectedCaseId(null)}
          caseLearner={selectedCaseLearner}
        />
      )}
    </div>
  );
}
