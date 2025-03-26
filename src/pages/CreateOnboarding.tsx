
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Save, Send, 
  FileText, Users, ListTodo, FormInput
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
  title: z.string().min(1, "Form title is required"),
  projectId: z.string().min(1, "Project is required"),
  description: z.string().min(10, "Please provide a description (min 10 characters)"),
  welcomeMessage: z.string().optional(),
  completionMessage: z.string().optional(),
});

type OnboardingFormValues = z.infer<typeof formSchema>;

export default function CreateOnboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      projectId: "",
      description: "",
      welcomeMessage: "",
      completionMessage: "Thank you for completing this form. We'll be in touch soon.",
    },
  });
  
  const totalSteps = 3;
  
  const nextStep = async () => {
    // Validate the current step before proceeding
    let fieldsToValidate: Array<keyof OnboardingFormValues> = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = ["title", "projectId", "description"];
        break;
      case 2:
        fieldsToValidate = ["welcomeMessage", "completionMessage"];
        break;
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
  
  const onSubmit = (data: OnboardingFormValues) => {
    setLoading(true);
    console.log("Submitting onboarding form:", data);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Onboarding Form Created",
        description: "Your onboarding form has been created successfully.",
      });
      navigate("/onboarding");
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
  
  // Mock projects data for dropdown
  const projects = [
    { id: "proj-1", name: "AI Chatbot Implementation - Acme Corporation" },
    { id: "proj-2", name: "Custom GPT Integration - TechStart Inc." },
    { id: "proj-3", name: "Voice Agent Development - GlobalTech Solutions" },
    { id: "proj-4", name: "AI Content Generator - Media Pro" },
    { id: "proj-5", name: "Data Analysis Pipeline - RetailTech" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create Onboarding Form</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create a customized onboarding form for your client
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
                      className={`h-1 w-24 md:w-40 lg:w-60 ${
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
              <div className="font-medium">Form Details</div>
              <div className="font-medium">Messages</div>
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
                    {/* Step 1: Form Details */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                          <FormInput className="mr-2 h-6 w-6" />
                          Form Details
                        </h2>
                        
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Form Title</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Project Kickoff Questionnaire" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="projectId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a project" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {projects.map((project) => (
                                    <SelectItem key={project.id} value={project.id}>
                                      {project.name}
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
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Form Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe the purpose of this form..." 
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
                    
                    {/* Step 2: Messages */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                          <Users className="mr-2 h-6 w-6" />
                          Client Messages
                        </h2>
                        
                        <FormField
                          control={form.control}
                          name="welcomeMessage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Welcome Message (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter a welcome message that clients will see at the start of the form..." 
                                  className="min-h-32" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="completionMessage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Completion Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter a message that clients will see after submitting the form..." 
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
                    
                    {/* Step 3: Review */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                          <FileText className="mr-2 h-6 w-6" />
                          Review Form
                        </h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                              <FormInput className="h-4 w-4 mr-1" /> Form Title
                            </h3>
                            <p className="mt-1 font-medium">{form.watch("title")}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                              <ListTodo className="h-4 w-4 mr-1" /> Project
                            </h3>
                            <p className="mt-1">
                              {form.watch("projectId")
                                ? projects.find((p) => p.id === form.watch("projectId"))?.name
                                : "Not specified"}
                            </p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                            <p className="mt-1 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              {form.watch("description") || "No description provided."}
                            </p>
                          </div>
                          
                          {form.watch("welcomeMessage") && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Welcome Message</h3>
                              <p className="mt-1 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                                {form.watch("welcomeMessage")}
                              </p>
                            </div>
                          )}
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Message</h3>
                            <p className="mt-1 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              {form.watch("completionMessage") || "No completion message provided."}
                            </p>
                          </div>
                          
                          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md flex">
                            <FileText className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                            <p className="text-sm text-amber-700 dark:text-amber-300">
                              In a future update, you'll be able to add specific form fields and questions.
                              For now, this creates the form structure and basic content.
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
                      onClick={() => navigate('/onboarding')}
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
                            Create Form
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
