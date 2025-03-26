
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Save, Send, 
  FileText, Building, DollarSign, Calendar, AlertCircle
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form schema using Zod
const formSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  client: z.string().min(1, "Client is required"),
  industry: z.string().optional(),
  useCase: z.string().min(1, "Use case is required"),
  description: z.string().min(10, "Please provide a short description (min 10 characters)"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
  budget: z.string().min(1, "Budget range is required"),
  scope: z.string().min(10, "Project scope is required"),
});

type ProposalFormValues = z.infer<typeof formSchema>;

export default function CreateProposal() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      client: "",
      industry: "",
      useCase: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "Medium",
      budget: "",
      scope: "",
    },
  });
  
  const totalSteps = 5;
  
  const nextStep = async () => {
    // Validate the current step before proceeding
    let fieldsToValidate: Array<keyof ProposalFormValues> = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = ["title", "client", "industry", "description"];
        break;
      case 2:
        fieldsToValidate = ["startDate", "endDate", "priority", "budget"];
        break;
      case 3:
        fieldsToValidate = ["useCase", "scope"];
        break;
      // Add cases for other steps as needed
    }
    
    const result = await form.trigger(fieldsToValidate as any);
    if (result && step < totalSteps) {
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
  
  const onSubmit = (data: ProposalFormValues) => {
    setLoading(true);
    console.log("Submitting proposal:", data);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Proposal Created",
        description: "Your proposal has been created successfully.",
      });
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

  // Mock AI use cases
  const aiUseCases = [
    { id: "voice-agent", name: "Voice Agent" },
    { id: "chatbot", name: "Chatbot" },
    { id: "automation", name: "Backend Automation" },
    { id: "custom-saas", name: "Custom SaaS Platform" },
    { id: "other", name: "Other" },
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
                <div key={index} className="flex items-center relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step > index + 1
                        ? "bg-primary text-primary-foreground"
                        : step === index + 1
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div
                      className={`h-1 w-16 sm:w-24 md:w-32 lg:w-40 ${
                        step > index + 1
                          ? "bg-primary"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs sm:text-sm">
              <div className="font-medium">Project Details</div>
              <div className="font-medium">Timeline & Budget</div>
              <div className="font-medium">Scope</div>
              <div className="font-medium">Features</div>
              <div className="font-medium">Review</div>
            </div>
          </div>
          
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="glass-card rounded-xl p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial="initial"
                    animate="in"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* Step 1: Project Overview */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                          <FileText className="mr-2 h-6 w-6" />
                          Project Overview
                        </h2>
                        
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Title</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., AI Chatbot Implementation" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="client"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a client" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {clients.map((client) => (
                                    <SelectItem key={client.id} value={client.id}>
                                      {client.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Industry / Niche</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Healthcare, Retail, Finance" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Briefly describe the project and its objectives..." 
                                  className="min-h-32" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Step 2: Timeline & Budget */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                          <Calendar className="mr-2 h-6 w-6" />
                          Timeline & Budget
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Estimated Start Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Desired Completion Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="priority"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Priority Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Low">Low</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget Range</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <Input placeholder="e.g., $5,000 - $10,000" className="pl-10" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Step 3: Scope & Use Case */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                          <Building className="mr-2 h-6 w-6" />
                          Project Scope
                        </h2>
                        
                        <FormField
                          control={form.control}
                          name="useCase"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>AI Use Case</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select AI use case" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {aiUseCases.map((useCase) => (
                                    <SelectItem key={useCase.id} value={useCase.id}>
                                      {useCase.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="scope"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Scope & Deliverables</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="List the specific features, deliverables, and scope of this project..." 
                                  className="min-h-64" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md flex">
                          <AlertCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Be specific about what's included and not included in the project scope.
                            This helps set clear expectations with the client.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Step 4: Features */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Project Features</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                          Additional features and functionality options will be available in a future update.
                          For now, you can specify these in the project scope section.
                        </p>
                        
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md flex">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            In a future update, you'll be able to add specific features, timeline milestones,
                            and payment schedules to your proposal.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Step 5: Review */}
                    {step === 5 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                          <FileText className="mr-2 h-6 w-6" />
                          Review Proposal
                        </h2>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <FileText className="h-4 w-4 mr-1" /> Project Title
                              </h3>
                              <p className="mt-1">{form.watch("title") || "Not specified"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <Building className="h-4 w-4 mr-1" /> Client
                              </h3>
                              <p className="mt-1">
                                {form.watch("client")
                                  ? clients.find((c) => c.id === form.watch("client"))?.name
                                  : "Not specified"}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" /> Budget Range
                              </h3>
                              <p className="mt-1">{form.watch("budget") || "Not specified"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <Calendar className="h-4 w-4 mr-1" /> Project Timeline
                              </h3>
                              <p className="mt-1">
                                {form.watch("startDate") && form.watch("endDate")
                                  ? `${form.watch("startDate")} to ${form.watch("endDate")}`
                                  : "Not specified"}
                              </p>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                            <p className="mt-1 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              {form.watch("description") || "No description provided."}
                            </p>
                          </div>
                          
                          {/* Scope */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Scope & Deliverables</h3>
                            <p className="mt-1 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              {form.watch("scope") || "No scope defined."}
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
                    type="button"
                    variant="outline" 
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="space-x-3">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => navigate('/proposals')}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    
                    {step < totalSteps ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
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
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
