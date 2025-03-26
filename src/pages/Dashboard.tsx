
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Users, CheckSquare, DollarSign, 
  TrendingUp, Eye, Clock, Calendar
} from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import ProposalCard, { ProposalData } from "@/components/ProposalCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [recentProposals, setRecentProposals] = useState<ProposalData[]>([]);
  
  // Mock data for demonstration
  useEffect(() => {
    // This would be replaced with an API call in a real application
    setTimeout(() => {
      setRecentProposals([
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
        }
      ]);
    }, 500);
  }, []);

  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back to your agency dashboard</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button asChild>
                <Link to="/create-proposal">
                  <FileText className="h-4 w-4 mr-2" />
                  New Proposal
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/clients/new">
                  <Users className="h-4 w-4 mr-2" />
                  Add Client
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              staggerChildren: 0.1,
            }}
          >
            <StatCard 
              icon={DollarSign}
              title="Revenue (MTD)"
              value={45000}
              formatter={formatCurrency}
              trend="up"
              trendValue="12%"
            />
            <StatCard 
              icon={CheckSquare}
              title="Proposals Signed"
              value={8}
              trend="up"
              trendValue="2"
            />
            <StatCard 
              icon={Eye}
              title="Proposal Views"
              value={27}
              trend="up"
              trendValue="5"
            />
            <StatCard 
              icon={Clock}
              title="Avg. Sign Time"
              value={3}
              suffix=" days"
              trend="down"
              trendValue="1 day"
            />
          </motion.div>
          
          {/* Recent Proposals */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Recent Proposals</h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/proposals">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProposals.map((proposal, index) => (
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <ProposalCard proposal={proposal} />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Calendar & Tasks Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Upcoming Calendar</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/calendar">
                    <Calendar className="h-4 w-4 mr-1" />
                    View Calendar
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Coming soon...</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Tasks</h2>
                <Button variant="ghost" size="sm">
                  <CheckSquare className="h-4 w-4 mr-1" />
                  Add Task
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
