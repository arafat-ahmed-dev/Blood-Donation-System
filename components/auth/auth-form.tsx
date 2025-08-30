"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/auth-provider";
import { useAuthErrorToast } from "@/lib/auth-errors";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import AuthErrorHandler from "@/components/auth/AuthErrorHandler";

// Login schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Step 1: Essential information schema
const essentialInfoSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  bloodType: z.string().min(1, { message: "Please select your blood type" }),
});

// Step 2: Personal information schema
const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Please enter your date of birth" }),
  gender: z.string().min(1, { message: "Please select your gender" }),
});

// Step 3: Address information schema
const addressInfoSchema = z.object({
  address: z.string().min(5, { message: "Please enter your address" }),
  city: z.string().min(2, { message: "Please enter your city" }),
  upazila: z.string().min(2, { message: "Please enter your upazila" }),
  zipCode: z.string().min(5, { message: "Please enter your zip code" }),
});

// Define animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

const progressVariants = {
  initial: (step: number) => ({
    width: step === 1 ? "0%" : `${(step - 1) * 33.33}%`,
  }),
  animate: (step: number) => ({
    width: `${step * 33.33}%`,
    transition: {
      duration: 0.7,
    },
  }),
};

const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.2,
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const checkmarkVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring" as const, duration: 1, bounce: 0 },
      opacity: { duration: 0.3 },
    },
  },
};

// Progress indicator component
const ProgressIndicator = ({
  step,
  completed,
  isActive,
  label,
}: {
  step: number;
  completed: boolean;
  isActive: boolean;
  label: string;
}) => (
  <div className="relative flex flex-col items-center">
    <motion.div
      className={`
        z-10 flex items-center justify-center w-8 h-8 rounded-full 
        ${
          completed
            ? "bg-red-600"
            : isActive
            ? "bg-red-500 border-2 border-red-300"
            : "bg-gray-200 dark:bg-gray-700"
        }
      `}
      initial={false}
      animate={isActive && !completed ? "animate" : "initial"}
      variants={pulseVariants}
    >
      {completed ? (
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial="initial"
          animate="animate"
        >
          <motion.path
            d="M5 13L9 17L19 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={checkmarkVariants}
          />
        </motion.svg>
      ) : (
        <span
          className={`text-sm font-medium ${
            isActive ? "text-white" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {step}
        </span>
      )}
    </motion.div>
    <span className="mt-2 text-xs font-medium text-center text-muted-foreground">
      {label}
    </span>
  </div>
);

// Enhanced progress bar component
const StepProgressBar = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { label: "Essentials" },
    { label: "Personal" },
    { label: "Address" },
  ];

  return (
    <div className="mb-8 px-1">
      <div className="relative flex items-center justify-between mb-2">
        {steps.map((step, i) => (
          <ProgressIndicator
            key={i}
            step={i + 1}
            completed={currentStep > i + 1}
            isActive={currentStep === i + 1}
            label={step.label}
          />
        ))}

        {/* Background track */}
        <div className="absolute h-1 top-4 left-0 right-0 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 z-0" />

        {/* Animated progress */}
        <motion.div
          className="absolute h-1 top-4 left-0 -translate-y-1/2 bg-gradient-to-r from-red-500 to-red-600 z-0"
          custom={currentStep}
          initial="initial"
          animate="animate"
          variants={progressVariants}
        />
      </div>

      <motion.div
        className="mt-6 flex justify-between text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span>Step {currentStep} of 3</span>
        <span>{Math.round(currentStep * 33.33)}% Complete</span>
      </motion.div>
    </div>
  );
};

// Define types for registration data
interface EssentialInfo {
  email: string;
  phone: string;
  bloodType: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
}

interface AddressInfo {
  address: string;
  city: string;
  upazila: string;
  zipCode: string;
}

interface RegistrationData
  extends Partial<EssentialInfo>,
    Partial<PersonalInfo>,
    Partial<AddressInfo> {}

// Define the form field wrapper component with animations
const AnimatedFormField = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.01 }}
  >
    {children}
  </motion.div>
);

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [registrationStep, setRegistrationStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>(
    {}
  );
  const router = useRouter();
  const { toast } = useToast();
  const { handleApiError, showAuthError } = useAuthErrorToast();
  const { register } = useAuth();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/profile";
  const { sendOTP } = useAuth();

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  // Step 1: Essential information form
  const essentialInfoForm = useForm<z.infer<typeof essentialInfoSchema>>({
    resolver: zodResolver(essentialInfoSchema),
    defaultValues: {
      email: "",
      phone: "",
      bloodType: "",
    },
  });

  // Step 2: Personal information form
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  // Step 3: Address information form
  const addressInfoForm = useForm<z.infer<typeof addressInfoSchema>>({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: {
      address: "",
      city: "",
      upazila: "",
      zipCode: "",
    },
  });

  // Login form submission
  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);

    try {
      // Generate OTP for verification
      const result = await sendOTP(values.email);

      // Type check the result
      if (!result || typeof result !== "object") {
        return; // Error is already handled by auth-provider
      }

      // Check if result contains an error
      if ("error" in result && result.error) {
        return; // Error is already handled by auth-provider
      }

      // Success case
      if ("success" in result && result.success && "tempToken" in result) {
        toast({
          title: "Verification Required",
          description: "Please check your email for a verification code.",
        });

        // Navigate to verification page
        router.push(
          `/verify?email=${encodeURIComponent(
            values.email
          )}&token=${encodeURIComponent(
            result.tempToken as string
          )}&redirect=${encodeURIComponent(redirectPath)}`
        );
      }
    } catch (error) {
      // Error is already handled by auth-provider
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Step 1: Essential information form submission
  async function onEssentialInfoSubmit(
    values: z.infer<typeof essentialInfoSchema>
  ) {
    setRegistrationData({
      ...registrationData,
      ...values,
    });
    setRegistrationStep(2);
  }

  // Step 2: Personal information form submission
  function onPersonalInfoSubmit(values: z.infer<typeof personalInfoSchema>) {
    setRegistrationData({
      ...registrationData,
      ...values,
    });
    setRegistrationStep(3);
  }

  // Step 3: Address information form submission (final step)
  async function onAddressInfoSubmit(
    values: z.infer<typeof addressInfoSchema>
  ) {
    setIsLoading(true);

    try {
      // Combine all registration data
      const completeData = {
        ...registrationData,
        ...values,
        // Create name field from firstName and lastName for the API
        name: `${registrationData.firstName || ""} ${
          registrationData.lastName || ""
        }`.trim(),
      };

      const result = await register(completeData);

      // Check for successful registration
      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Please check your email for verification instructions.",
          variant: "default",
        });

        // Safely access email with optional chaining
        const emailForVerification = completeData.email || "";
        router.push(
          `/verify?email=${encodeURIComponent(
            emailForVerification
          )}&token=${encodeURIComponent(
            result.tempToken
          )}&redirect=${encodeURIComponent(redirectPath)}`
        );
      }
      // Error is already handled by auth-provider
    } catch (error) {
      // Error is already handled by auth-provider
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Go back to previous registration step
  function goToPreviousStep() {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
    }
  }

  // Calculate progress percentage
  const getProgressPercentage = () => {
    return registrationStep * 33.33;
  };

  const renderStepTitle = () => {
    switch (registrationStep) {
      case 1:
        return "Essential Information";
      case 2:
        return "Personal Details";
      case 3:
        return "Address Information";
      default:
        return "";
    }
  };

  const renderStepDescription = () => {
    switch (registrationStep) {
      case 1:
        return "Enter your essential details to get started";
      case 2:
        return "Tell us about yourself";
      case 3:
        return "Where do you live?";
      default:
        return "";
    }
  };

  // Enhance the form rendering functions to use the animated wrapper
  const renderFormStep = () => {
    switch (registrationStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Form {...essentialInfoForm}>
              <form
                onSubmit={essentialInfoForm.handleSubmit(onEssentialInfoSubmit)}
              >
                <CardContent className="space-y-6">
                  <AnimatedFormField>
                    <FormField
                      control={essentialInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              {...field}
                              className="transition-all focus:border-red-500 focus:ring-red-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedFormField>

                  <AnimatedFormField>
                    <FormField
                      control={essentialInfoForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                              className="transition-all focus:border-red-500 focus:ring-red-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedFormField>

                  <AnimatedFormField>
                    <FormField
                      control={essentialInfoForm.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="transition-all focus:border-red-500 focus:ring-red-500">
                                <SelectValue placeholder="Select your blood type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedFormField>
                </CardContent>
                <CardFooter>
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-300"
                      disabled={isLoading}
                    >
                      Continue
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
                          repeatDelay: 2,
                          duration: 1,
                        }}
                      >
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Form>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Form {...personalInfoForm}>
              <form
                onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)}
              >
                <CardContent className="space-y-6">
                  <AnimatedFormField>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={personalInfoForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="First name"
                                {...field}
                                className="transition-all focus:border-red-500 focus:ring-red-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Last name"
                                {...field}
                                className="transition-all focus:border-red-500 focus:ring-red-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AnimatedFormField>

                  <AnimatedFormField>
                    <FormField
                      control={personalInfoForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="transition-all focus:border-red-500 focus:ring-red-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedFormField>

                  <AnimatedFormField>
                    <FormField
                      control={personalInfoForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="transition-all focus:border-red-500 focus:ring-red-500">
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                              <SelectItem value="Prefer not to say">
                                Prefer not to say
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedFormField>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPreviousStep}
                      className="transition-colors duration-300"
                    >
                      <motion.div
                        animate={{ x: [0, -3, 0] }}
                        transition={{
                          repeat: Infinity,
                          repeatDelay: 2,
                          duration: 1,
                        }}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                      </motion.div>
                      Back
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 transition-colors duration-300"
                    >
                      Continue
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
                          repeatDelay: 2,
                          duration: 1,
                        }}
                      >
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Form>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Form {...addressInfoForm}>
              <form
                onSubmit={addressInfoForm.handleSubmit(onAddressInfoSubmit)}
              >
                <CardContent className="space-y-6">
                  <AnimatedFormField>
                    <FormField
                      control={addressInfoForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your street address"
                              {...field}
                              className="transition-all focus:border-red-500 focus:ring-red-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedFormField>

                  <AnimatedFormField>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={addressInfoForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City"
                                {...field}
                                className="transition-all focus:border-red-500 focus:ring-red-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addressInfoForm.control}
                        name="upazila"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upazila</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Upazila"
                                {...field}
                                className="transition-all focus:border-red-500 focus:ring-red-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AnimatedFormField>

                  <AnimatedFormField>
                    <FormField
                      control={addressInfoForm.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Zip code"
                              {...field}
                              className="transition-all focus:border-red-500 focus:ring-red-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedFormField>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPreviousStep}
                      className="transition-colors duration-300"
                    >
                      <motion.div
                        animate={{ x: [0, -3, 0] }}
                        transition={{
                          repeat: Infinity,
                          repeatDelay: 2,
                          duration: 1,
                        }}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                      </motion.div>
                      Back
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block"
                          />
                          Creating account...
                        </motion.div>
                      ) : (
                        <>
                          Register
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              repeat: Infinity,
                              repeatDelay: 2,
                              duration: 1,
                            }}
                          >
                            <Check className="ml-2 h-4 w-4" />
                          </motion.div>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Form>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <AuthErrorHandler />

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="relative">
            Login
            {activeTab === "login" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                layoutId="activeTab"
              />
            )}
          </TabsTrigger>
          <TabsTrigger value="register" className="relative">
            Register
            {activeTab === "register" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                layoutId="activeTab"
              />
            )}
          </TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "login" && (
            <TabsContent value="login" asChild>
              <motion.div
                key="login"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <motion.div
                        className="mr-2 text-red-600"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </motion.div>
                      Login
                    </CardTitle>
                    <CardDescription>
                      Enter your email to access your account
                    </CardDescription>
                  </CardHeader>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                      <CardContent className="space-y-4">
                        <AnimatedFormField>
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your email"
                                    {...field}
                                    className="transition-all focus:border-red-500 focus:ring-red-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AnimatedFormField>
                      </CardContent>
                      <CardFooter>
                        <motion.div
                          className="w-full"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-300"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <motion.div
                                className="flex items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <motion.span
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block"
                                />
                                Logging in...
                              </motion.div>
                            ) : (
                              <>
                                Login
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    duration: 1,
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="ml-2 h-4 w-4"
                                  >
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <polyline points="10 17 15 12 10 7" />
                                    <line x1="15" y1="12" x2="3" y2="12" />
                                  </svg>
                                </motion.div>
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </form>
                  </Form>
                </Card>
              </motion.div>
            </TabsContent>
          )}

          {/* Register Tab */}
          {activeTab === "register" && (
            <TabsContent value="register" asChild>
              <motion.div
                key="register"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>{renderStepTitle()}</CardTitle>
                    <CardDescription>{renderStepDescription()}</CardDescription>
                    <div className="mt-4">
                      <StepProgressBar currentStep={registrationStep} />
                    </div>
                  </CardHeader>

                  <AnimatePresence mode="wait">
                    {renderFormStep()}
                  </AnimatePresence>
                </Card>
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>

      {/* Toast notifications */}
      <Toaster />
    </motion.div>
  );
}
