import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/layout/sidebar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CasesPage from "@/pages/cases";
import SurveysPage from "@/pages/surveys";
import KnowledgePage from "@/pages/knowledge";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/cases" component={CasesPage} />
            <Route path="/surveys" component={SurveysPage} />
            <Route path="/knowledge" component={KnowledgePage} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}