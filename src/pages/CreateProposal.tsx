
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Save, Info, Building,
  Send, User, DollarSign, FileText, ClipboardList
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateProposal() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    scope: "",
    value: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  
  const updateForm = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  
  const totalSteps = 5;
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/proposals");
    }, 1500);
  };
  
  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -100,
    }
  };
  
  // Mock clients for dropdown
  const clients = [
    { id: "client-1", name: "Acme Corporation" },
    { id: "client-2", name: "TechStart Inc." },
    { id: "client-3", name: "GlobalTech Solutions" },
    { id: "client-4", name: "Innovative AI" },
    { id: "client-5", name: "Media Pro" },
    { id: "client-6", name: "RetailTech" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create Proposal</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create a professional proposal for your client
            </p>
          </div>
          
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step > index
                        ? "bg-primary text-white"
                        : step === index + 1
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div
                      className={`h-1 w-full ${
                        step > index + 1
                          ? "bg-primary"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <div className="text-sm font-medium">Project Details</div>
              <div className="text-sm font-medium">Client</div>
              <div className="text-sm font-medium">Scope</div>
              <div className="text-sm font-medium">Pricing</div>
              <div className="text-sm font-medium">Review</div>
            </div>
          </div>
          
          {/* Step content */}
          <div className="glass-card rounded-xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial="initial"
                animate="in"
                exit="exit"
                variants={pageVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="title">Proposal Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => updateForm("title", e.target.value)}
                          placeholder="e.g., AI Chatbot Implementation"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Project Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => updateForm("description", e.target.value)}
                          placeholder="Briefly describe the project and its objectives..."
                          className="mt-1 min-h-32"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Estimated Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => updateForm("startDate", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate">Estimated End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => updateForm("endDate", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Client Information</h2>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="client">Select Client</Label>
                        <Select 
                          value={formData.client}
                          onValueChange={(value) => updateForm("client", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a client" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                        <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Don't see your client? <a href="/clients/new" className="underline font-medium">Add a new client</a> first.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Project Scope</h2>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="scope">Project Scope & Deliverables</Label>
                        <Textarea
                          id="scope"
                          value={formData.scope}
                          onChange={(e) => updateForm("scope", e.target.value)}
                          placeholder="List the specific features, deliverables, and scope of this project..."
                          className="mt-1 min-h-64"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Pricing & Terms</h2>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="value">Project Value</Label>
                        <div className="relative mt-1">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="value"
                            type="number"
                            value={formData.value}
                            onChange={(e) => updateForm("value", e.target.value)}
                            placeholder="0"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      {/* This section would include more pricing components, payment schedules, etc. */}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        More pricing options and payment schedule settings coming soon...
                      </p>
                    </div>
                  </div>
                )}
                
                {step === 5 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Review Proposal</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                            <FileText className="h-4 w-4 mr-1" /> Proposal Title
                          </h3>
                          <p className="mt-1">{formData.title || "Not specified"}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                            <Building className="h-4 w-4 mr-1" /> Client
                          </h3>
                          <p className="mt-1">
                            {formData.client
                              ? clients.find((c) => c.id === formData.client)?.name
                              : "Not specified"}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" /> Value
                          </h3>
                          <p className="mt-1">
                            {formData.value 
                              ? `$${Number(formData.value).toLocaleString()}` 
                              : "Not specified"}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                            <ClipboardList className="h-4 w-4 mr-1" /> Project Timeline
                          </h3>
                          <p className="mt-1">
                            {formData.startDate && formData.endDate
                              ? `${new Date(formData.startDate).toLocaleDateString()} to ${new Date(formData.endDate).toLocaleDateString()}`
                              : "Not specified"}
                          </p>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                        <p className="mt-1 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          {formData.description || "No description provided."}
                        </p>
                      </div>
                      
                      {/* Scope */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Scope & Deliverables</h3>
                        <p className="mt-1 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          {formData.scope || "No scope defined."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-10">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={step === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <div className="space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/proposals')}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                
                {step < totalSteps ? (
                  <Button onClick={nextStep}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Create Proposal
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
