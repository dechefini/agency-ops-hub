
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Filter, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProposalCard, { ProposalData } from "@/components/ProposalCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Proposals() {
  const [proposals, setProposals] = useState<ProposalData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "value">("newest");
  
  // Mock data for demonstration
  useEffect(() => {
    // This would be replaced with an API call in a real application
    setTimeout(() => {
      setProposals([
        {
          id: "prop-1",
          title: "AI Chatbot Implementation",
          client: "Acme Corporation",
          status: "signed",
          value: 15000,
          date: "2023-09-15",
        },
        {
          id: "prop-2",
          title: "Data Analysis Platform",
          client: "TechStart Inc.",
          status: "viewed",
          value: 8500,
          date: "2023-09-21",
        },
        {
          id: "prop-3",
          title: "GPT Integration Services",
          client: "GlobalTech Solutions",
          status: "sent",
          value: 12000,
          date: "2023-09-25",
        },
        {
          id: "prop-4",
          title: "Custom ML Model Development",
          client: "Innovative AI",
          status: "draft",
          value: 20000,
          date: "2023-09-27",
        },
        {
          id: "prop-5",
          title: "Automated Content Generation",
          client: "Media Pro",
          status: "signed",
          value: 9500,
          date: "2023-09-10",
        },
        {
          id: "prop-6",
          title: "Computer Vision Implementation",
          client: "RetailTech",
          status: "viewed",
          value: 22000,
          date: "2023-09-18",
        },
        {
          id: "prop-7",
          title: "AI Training Workshop",
          client: "EducTech Inc.",
          status: "sent",
          value: 5000,
          date: "2023-09-22",
        },
        {
          id: "prop-8",
          title: "Recommendation Engine",
          client: "E-Commerce Plus",
          status: "draft",
          value: 17500,
          date: "2023-09-30",
        },
      ]);
    }, 500);
  }, []);

  // Filter proposals based on search term and status filter
  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter ? proposal.status === filter : true;
    return matchesSearch && matchesFilter;
  });

  // Sort proposals
  const sortedProposals = [...filteredProposals].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return b.value - a.value;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Proposals</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track all your client proposals</p>
            </div>
            
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/create-proposal">
                <FileText className="h-4 w-4 mr-2" />
                Create Proposal
              </Link>
            </Button>
          </div>
          
          {/* Search and filter controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by proposal title or client..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Status
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup value={filter || ""} onValueChange={(value) => setFilter(value || null)}>
                    <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioItem value="draft">Draft</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sent">Sent</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="viewed">Viewed</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="signed">Signed</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    Sort by
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={(value: "newest" | "oldest" | "value") => setSortBy(value)}>
                    <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="value">Value (high to low)</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Proposals grid */}
          {sortedProposals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProposals.map((proposal, index) => (
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                >
                  <ProposalCard proposal={proposal} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">No proposals match your search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
