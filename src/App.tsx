
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Proposals from "./pages/Proposals";
import Clients from "./pages/Clients";
import CreateProposal from "./pages/CreateProposal";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// New pages to be implemented
import Projects from "./pages/Projects";
import Onboarding from "./pages/Onboarding";
import CreateOnboarding from "./pages/CreateOnboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Proposal Routes */}
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/create-proposal" element={<CreateProposal />} />
          
          {/* Client Routes */}
          <Route path="/clients" element={<Clients />} />
          
          {/* Project Routes */}
          <Route path="/projects" element={<Projects />} />
          
          {/* Onboarding Routes */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/create-onboarding" element={<CreateOnboarding />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
