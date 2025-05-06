
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import UserProfileSetupStep from './UserProfileSetupStep';
import IntroductionStep from './IntroductionStep';
import AppTourStep from './AppTourStep';
import { Database } from "@/integrations/supabase/types/database";

// Define the user profile data type with the proper enum type for role
type UserProfileData = {
  full_name: string;
  role: string; // Changed from enum type to string to accommodate custom roles
  company?: string;
  country?: string;
  custom_role?: string;
};

const OnboardingFlow = () => {
  const [step, setStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const navigate = useNavigate();

  // Tour steps data
  const tourSteps = [
    {
      title: "Browse Workplace Settings",
      description: "Explore different workplace settings from the home screen, including Work Tables, Lounge Areas, Meeting Rooms, and Open Areas.",
      image: "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage/tour-browse.png",
    },
    {
      title: "View Setting Details",
      description: "Tap on any setting to view detailed information, images, and specifications that help you understand the space better.",
      image: "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage/tour-details.png",
    },
    {
      title: "Adjust Parameters",
      description: "Use the sliders to adjust parameters like square meters, number of users, and task categories to find the perfect setting for your needs.",
      image: "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage/tour-sliders.png",
    },
    {
      title: "Save Favorites",
      description: "Mark settings as favorites to easily access them later from your favorites page.",
      image: "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage/tour-favorites.png",
    }
  ];

  // Calculate max steps (1 profile step + 1 intro step + tour steps)
  const totalSteps = 2 + tourSteps.length;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Complete onboarding and navigate to main app
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Save onboarding completion status to localStorage
    localStorage.setItem('onboardingCompleted', 'true');
    
    // Navigate to home page
    navigate('/home');
  };

  const handleSkip = () => {
    // Mark as completed but skip the rest of onboarding
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/home');
  };

  const handleProfileComplete = async (profileData: UserProfileData) => {
    setUserProfile(profileData);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("No authenticated user found");
        return;
      }
      
      // Save profile data to Supabase
      // Cast the role to the appropriate type if it's one of the predefined roles
      // or use it as is if it's a custom role
      const role = ['facility_manager', 'architect', 'designer', 'other'].includes(profileData.role) 
        ? profileData.role as Database["public"]["Enums"]["user_role"] 
        : 'other';
        
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          role: role,
          company: profileData.company,
          country: profileData.country
        })
        .eq('id', user.id);
        
      if (profileError) {
        console.error('Error updating profile:', profileError);
        toast.error("Failed to save profile information");
      } else {
        toast.success("Profile saved successfully");
        handleNext();
      }
    } catch (error) {
      console.error('Error in profile completion:', error);
      toast.error("An error occurred while saving your profile");
    }
  };

  // Determine which step content to show
  const renderStepContent = () => {
    if (step === 0) {
      return <UserProfileSetupStep onComplete={handleProfileComplete} initialData={userProfile || undefined} />;
    } else if (step === 1) {
      return <IntroductionStep />;
    } else {
      // Calculate which tour step to show (step - 2 because we have 2 initial steps)
      const currentTourStep = tourSteps[step - 2];
      return <AppTourStep step={currentTourStep} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F6F6F7] flex flex-col">
      {/* Header with progress and close button */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#8E9196]">
            Step {step + 1}/{totalSteps}
          </span>
          <div className="w-32 h-1 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-[#3f00ff] rounded-full transition-all" 
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        <button 
          onClick={handleSkip} 
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <X size={18} className="text-[#8E9196]" />
        </button>
      </div>

      {/* Main content with animation */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="flex-1 flex flex-col px-6 py-4 overflow-y-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer with navigation buttons */}
      <div className="p-4 flex justify-between border-t border-gray-100">
        {step > 0 ? (
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Back
          </Button>
        ) : (
          <div></div> // Empty div to maintain layout
        )}
        
        {step !== 0 && (
          <Button 
            variant="main" 
            onClick={handleNext}
            className="flex items-center gap-2"
          >
            {step === totalSteps - 1 ? 'Get Started' : 'Next'}
            {step !== totalSteps - 1 && <ChevronRight size={16} />}
          </Button>
        )}
        {/* Step 0 has its own submit button inside the form */}
      </div>
    </div>
  );
};

export default OnboardingFlow;
