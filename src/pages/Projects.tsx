
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock project data
const mockProjects = [
  {
    id: "proj-1",
    name: "AI Chatbot Implementation",
    client: "Acme Corporation",
    status: "proposal_sent",
    startDate: "2023-06-01",
    endDate: "2023-07-15",
    budget: "$5,000 - $10,000",
    priority: "High",
  },
  {
    id: "proj-2",
    name: "Custom GPT Integration",
    client: "TechStart Inc.",
    status: "signed",
    startDate: "2023-07-10",
    endDate: "2023-08-30",
    budget: "$10,000 - $15,000",
    priority: "Medium",
  },
  {
    id: "proj-3",
    name: "Voice Agent Development",
    client: "GlobalTech Solutions",
    status: "in_dev",
    startDate: "2023-05-15",
    endDate: "2023-08-15",
    budget: "$15,000 - $20,000",
    priority: "Medium",
  },
  {
    id: "proj-4",
    name: "AI Content Generator",
    client: "Media Pro",
    status: "completed",
    startDate: "2023-03-01",
    endDate: "2023-05-01",
    budget: "$8,000 - $12,000",
    priority: "Low",
  },
  {
    id: "proj-5",
    name: "Data Analysis Pipeline",
    client: "RetailTech",
    status: "prospect",
    startDate: "2023-09-01",
    endDate: "2023-11-15",
    budget: "$20,000 - $30,000",
    priority: "High",
  },
];

// Status options
const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "prospect", label: "Prospect" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "signed", label: "Signed" },
  { value: "in_dev", label: "In Development" },
  { value: "completed", label: "Completed" },
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter projects based on search and status
  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status display details
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "prospect":
        return { 
          label: "Prospect", 
          class: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" 
        };
      case "proposal_sent":
        return { 
          label: "Proposal Sent", 
          class: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" 
        };
      case "signed":
        return { 
          label: "Signed", 
          class: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" 
        };
      case "in_dev":
        return { 
          label: "In Development", 
          class: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" 
        };
      case "completed":
        return { 
          label: "Completed", 
          class: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
        };
      default:
        return { 
          label: status, 
          class: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" 
        };
    }
  };

  // Get priority badge class
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage and track your AI implementation projects
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link to="/create-proposal" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full sm:w-48">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const statusDetails = getStatusDetails(project.status);
              
              return (
                <motion.div
                  key={project.id}
                  className="glass-card rounded-xl overflow-hidden"
                  whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium mb-1 line-clamp-1 text-lg">{project.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{project.client}</p>
                      </div>
                      <div className={`rounded-full px-2 py-1 text-xs font-medium ${statusDetails.class}`}>
                        {statusDetails.label}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Timeline</p>
                        <p className="text-sm font-medium">
                          {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                          {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                        <p className="text-sm font-medium">{project.budget}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityBadgeClass(project.priority)}`}>
                        {project.priority} Priority
                      </div>
                      
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/projects/${project.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters, or add a new project.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
