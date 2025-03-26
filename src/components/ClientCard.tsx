
import { motion } from "framer-motion";
import { Building, FileText, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface ClientData {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  proposals: number;
  projects: number;
}

export default function ClientCard({ client }: { client: ClientData }) {
  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden"
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="p-5">
        <div className="flex items-center mb-4">
          {client.avatarUrl ? (
            <img
              src={client.avatarUrl}
              alt={client.name}
              className="h-10 w-10 rounded-full mr-3"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium mr-3">
              {initials}
            </div>
          )}
          <div>
            <h3 className="font-medium text-lg">{client.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Building className="h-3 w-3 mr-1" /> {client.company}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm flex items-center">
            <Mail className="h-4 w-4 mr-2 text-gray-500" />
            <a href={`mailto:${client.email}`} className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400">
              {client.email}
            </a>
          </p>
          <p className="text-sm flex items-center">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <a href={`tel:${client.phone}`} className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400">
              {client.phone}
            </a>
          </p>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Proposals</p>
            <p className="font-medium">{client.proposals}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
            <p className="font-medium">{client.projects}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="secondary" size="sm">
            <Link to={`/clients/${client.id}`}>View</Link>
          </Button>
          <Button asChild size="sm">
            <Link to={`/create-proposal?client=${client.id}`}>
              <FileText className="h-4 w-4 mr-1" /> New Proposal
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
