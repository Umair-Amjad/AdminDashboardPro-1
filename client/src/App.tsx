import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Institutes from "@/pages/Institutes";
import Users from "@/pages/Users";
import Reports from "@/pages/Reports";
import Communication from "@/pages/Communication";
import Permissions from "@/pages/Permissions";
import AcademicConfig from "@/pages/AcademicConfig";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/institutes" component={Institutes} />
        <Route path="/users" component={Users} />
        <Route path="/reports" component={Reports} />
        <Route path="/communication" component={Communication} />
        <Route path="/permissions" component={Permissions} />
        <Route path="/academic" component={AcademicConfig} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
