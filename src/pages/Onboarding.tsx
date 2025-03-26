
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, ClipboardList, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock onboarding forms data
const mockOnboardingForms = [
  {
    id: "form-1",
    title: "AI Chatbot Implementation - Client Questionnaire",
    projectId: "proj-1",
    projectName: "AI Chatbot Implementation",
    client: "Acme Corporation",
    formStatus: "published",
    responseStatus: "pending",
    createdAt: "2023-05-25",
    updatedAt: "2023-05-25",
  },
  {
    id: "form-2",
    title: "Custom GPT Integration - Technical Requirements",
    projectId: "proj-2",
    projectName: "Custom GPT Integration",
    client: "TechStart Inc.",
    formStatus: "published",
    responseStatus: "completed",
    createdAt: "2023-07-05",
    updatedAt: "2023-07-08",
  },
  {
    id: "form-3",
    title: "Voice Agent Development - Business Requirements",
    projectId: "proj-3",
    projectName: "Voice Agent Development",
    client: "GlobalTech Solutions",
    formStatus: "draft",
    responseStatus: "pending",
    createdAt: "2023-05-10",
    updatedAt: "2023-05-10",
  },
  {
    id: "form-4",
    title: "AI Content Generator - Content Strategy",
    projectId: "proj-4",
    projectName: "AI Content Generator",
    client: "Media Pro",
    formStatus: "published",
    responseStatus: "completed",
    createdAt: "2023-02-20",
    updatedAt: "2023-03-05",
  }
];

export default function Onboarding() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter forms based on search
  const filteredForms = mockOnboardingForms.filter((form) => {
    return (
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Get status details
  const getFormStatusDetails = (status: string) => {
    switch (status) {
      case "draft":
        return { 
          label: "Draft", 
          class: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" 
        };
      case "published":
        return { 
          label: "Published", 
          class: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
        };
      default:
        return { 
          label: status, 
          class: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" 
        };
    }
  };

  const getResponseStatusDetails = (status: string) => {
    switch (status) {
      case "pending":
        return { 
          label: "Awaiting Response", 
          class: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" 
        };
      case "completed":
        return { 
          label: "Completed", 
          class: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" 
        };
      default:
        return { 
          label: status, 
          class: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" 
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Client Onboarding</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Create and manage onboarding forms for your clients
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link to="/create-onboarding" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Onboarding Form
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search forms..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Forms List */}
          <div className="space-y-4">
            {filteredForms.map((form) => {
              const formStatusDetails = getFormStatusDetails(form.formStatus);
              const responseStatusDetails = getResponseStatusDetails(form.responseStatus);
              
              return (
                <motion.div
                  key={form.id}
                  className="glass-card rounded-xl overflow-hidden"
                  whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="p-5">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-lg mb-1">{form.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {form.client} • {form.projectName}
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <div className={`rounded-full px-2 py-1 text-xs font-medium ${formStatusDetails.class}`}>
                          {formStatusDetails.label}
                        </div>
                        <div className={`rounded-full px-2 py-1 text-xs font-medium ${responseStatusDetails.class}`}>
                          {responseStatusDetails.label}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span>Created: {new Date(form.createdAt).toLocaleDateString()}</span>
                        {form.updatedAt !== form.createdAt && (
                          <span> • Updated: {new Date(form.updatedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/onboarding/${form.id}`} className="flex items-center">
                            <ClipboardList className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        
                        {form.formStatus === "published" && (
                          <Button asChild variant="secondary" size="sm">
                            <a href={`/onboarding/${form.id}/view`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              <ArrowUpRight className="h-4 w-4 mr-2" />
                              View
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {filteredForms.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No onboarding forms found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search, or create a new onboarding form.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
