
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from './context/OnboardingContext';
import UserProfileSetupStep from './UserProfileSetupStep';
import IntroductionStep from './IntroductionStep';
import AppTourStep from './AppTourStep';
import { useTourSteps } from './hooks/useTourSteps';
import { saveUserProfile } from './utils/profileUtils';
import { UserProfileData } from './types';
import { toast } from "sonner";

interface StepContentProps {
  onProfileComplete: (profileData: UserProfileData) => Promise<void>;
  onSliderDemoStep?: (isSliderStep: boolean) => void;
}

const StepContent: React.FC<StepContentProps> = ({ onProfileComplete, onSliderDemoStep }) => {
  const { step, userProfile, setUserProfile, handleNext } = useOnboarding();
  const tourSteps = useTourSteps();

  // Check if current step is a slider demo step
  useEffect(() => {
    if (onSliderDemoStep) {
      // Check if current tour step involves sliders
      const isSliderStep = step > 1 && tourSteps[step - 2]?.customComponent === 'SpaceParametersDemo';
      onSliderDemoStep(isSliderStep);
    }
  }, [step, tourSteps, onSliderDemoStep]);

  // Handle profile completion
  const handleProfileComplete = async (profileData: UserProfileData) => {
    try {
      // Update the user profile in context
      setUserProfile(profileData);
      
      console.log("StepContent: Saving profile data", profileData);
      
      // Save profile data to Supabase
      const result = await saveUserProfile(profileData);
      
      // Call the onProfileComplete callback to notify parent component
      await onProfileComplete(profileData);
      
      // Show success toast
      toast.success("Profile saved successfully");
      
      // Move to next step
      handleNext();
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save your profile. Please try again.");
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
  );
};

export default StepContent;
