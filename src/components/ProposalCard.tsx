
import { motion } from "framer-motion";
import { FileText, Clock, Check, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface ProposalData {
  id: string;
  title: string;
  client: string;
  status: "draft" | "sent" | "viewed" | "signed";
  value: number;
  date: string;
}

export default function ProposalCard({ proposal }: { proposal: ProposalData }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "sent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "viewed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "signed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Edit className="h-3 w-3" />;
      case "sent":
        return <Clock className="h-3 w-3" />;
      case "viewed":
        return <Eye className="h-3 w-3" />;
      case "signed":
        return <Check className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden"
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium mb-1 line-clamp-1 text-lg">{proposal.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{proposal.client}</p>
          </div>
          <div className={`rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1 ${getStatusColor(proposal.status)}`}>
            {getStatusIcon(proposal.status)}
            <span className="capitalize">{proposal.status}</span>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Value</p>
            <p className="font-medium">${proposal.value.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
            <p className="font-medium">{proposal.date}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="secondary" size="sm" className="w-full">
            <Link to={`/proposals/${proposal.id}`}>View</Link>
          </Button>
          {proposal.status === "draft" && (
            <Button asChild size="sm" className="w-full">
              <Link to={`/proposals/${proposal.id}/edit`}>Edit</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
