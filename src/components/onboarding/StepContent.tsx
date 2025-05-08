
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from './context/OnboardingContext';
import UserProfileSetupStep from './UserProfileSetupStep';
import IntroductionStep from './IntroductionStep';
import AppTourStep from './AppTourStep';
import { useTourSteps } from './hooks/useTourSteps';
import { UserProfileData } from './types';
import { toast } from "sonner";

interface StepContentProps {
  onProfileComplete: (profileData: UserProfileData) => Promise<void>;
  onSliderDemoStep?: (isSliderStep: boolean) => void;
}

const StepContent: React.FC<StepContentProps> = ({ onProfileComplete, onSliderDemoStep }) => {
  const { step, totalSteps, userProfile, setUserProfile, handleNext } = useOnboarding();
  const tourSteps = useTourSteps();

  // Handle profile completion with simplified flow
  const handleProfileComplete = async (profileData: UserProfileData) => {
    try {
      console.log("StepContent: Starting profile completion", profileData);
      
      // Update user profile in context
      setUserProfile(profileData);
      
      // Save profile data
      await onProfileComplete(profileData);
      
      // Show success message
      toast.success("Profile saved successfully!");
      
      console.log("StepContent: Profile saved successfully, advancing to next step");
      
      // Ensure we move to the next step using setTimeout to break any potential loops
      setTimeout(() => {
        console.log("StepContent: Executing handleNext after timeout");
        handleNext();
      }, 100);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save your profile. Please try again.");
    }
  };

  // Check if current step is a slider demo step
  React.useEffect(() => {
    if (onSliderDemoStep) {
      const isSliderStep = step > 1 && tourSteps[step - 2]?.customComponent === 'SpaceParametersDemo';
      onSliderDemoStep(isSliderStep);
    }
  }, [step, tourSteps, onSliderDemoStep]);

  // Render appropriate step content
  const renderStepContent = () => {
    console.log(`Rendering onboarding step ${step}/${totalSteps}`);
    
    if (step === 0) {
      return <UserProfileSetupStep onComplete={handleProfileComplete} initialData={userProfile || undefined} />;
    } else if (step === 1) {
      return <IntroductionStep />;
    } else {
      // Calculate which tour step to show
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
