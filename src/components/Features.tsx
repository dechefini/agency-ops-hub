
import { motion } from "framer-motion";
import { 
  FileText, Users, ClipboardCheck, Repeat, 
  Shield, Zap, PenTool, BarChart3
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Proposal Generator",
      description: "Create beautiful, professional proposals in minutes with our intuitive form builder."
    },
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "E-Signatures",
      description: "Collect legally binding signatures directly within your proposals."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Client CRM",
      description: "Manage your clients from prospect to completed project in one unified database."
    },
    {
      icon: <Repeat className="h-6 w-6" />,
      title: "Onboarding Automation",
      description: "Streamline client intake with custom forms that sync to your projects."
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "White-Label",
      description: "Fully customizable branding to match your agency's identity and style."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Founder Dashboard",
      description: "Track all agency metrics, from proposal views to project completion."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols to protect sensitive data."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Optimized",
      description: "Built specifically for the unique workflows of AI service agencies."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">All-in-One Agency Platform</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to run your AI agency efficiently, from winning clients to delivering projects.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card hover-card-animation rounded-xl p-6"
              variants={item}
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
