
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Search, Filter, ChevronDown, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import ClientCard, { ClientData } from "@/components/ClientCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Clients() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "company" | "proposals">("name");
  
  // Mock data for demonstration
  useEffect(() => {
    // This would be replaced with an API call in a real application
    setTimeout(() => {
      setClients([
        {
          id: "client-1",
          name: "John Smith",
          company: "Acme Corporation",
          email: "john@acmecorp.com",
          phone: "(555) 123-4567",
          proposals: 3,
          projects: 2,
        },
        {
          id: "client-2",
          name: "Jane Doe",
          company: "TechStart Inc.",
          email: "jane@techstart.com",
          phone: "(555) 987-6543",
          proposals: 1,
          projects: 0,
        },
        {
          id: "client-3",
          name: "Robert Johnson",
          company: "GlobalTech Solutions",
          email: "robert@globaltech.com",
          phone: "(555) 456-7890",
          proposals: 2,
          projects: 1,
        },
        {
          id: "client-4",
          name: "Sarah Williams",
          company: "Innovative AI",
          email: "sarah@innovativeai.com",
          phone: "(555) 789-0123",
          proposals: 1,
          projects: 1,
        },
        {
          id: "client-5",
          name: "Michael Brown",
          company: "Media Pro",
          email: "michael@mediapro.com",
          phone: "(555) 234-5678",
          proposals: 2,
          projects: 2,
        },
        {
          id: "client-6",
          name: "Emily Davis",
          company: "RetailTech",
          email: "emily@retailtech.com",
          phone: "(555) 345-6789",
          proposals: 1,
          projects: 0,
        }
      ]);
    }, 500);
  }, []);

  // Filter clients based on search term
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort clients
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "company") {
      return a.company.localeCompare(b.company);
    } else {
      return b.proposals - a.proposals;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Clients</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your client relationships</p>
            </div>
            
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/clients/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Link>
            </Button>
          </div>
          
          {/* Search and filter controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, company, or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  Sort by
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(value: "name" | "company" | "proposals") => setSortBy(value)}>
                  <DropdownMenuRadioItem value="name">Name (A-Z)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="company">Company (A-Z)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="proposals">Most Proposals</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Clients grid */}
          {sortedClients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                >
                  <ClientCard client={client} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">No clients match your search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
