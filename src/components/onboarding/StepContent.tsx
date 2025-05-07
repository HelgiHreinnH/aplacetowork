
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from './context/OnboardingContext';
import UserProfileSetupStep from './UserProfileSetupStep';
import IntroductionStep from './IntroductionStep';
import AppTourStep from './AppTourStep';
import { useTourSteps } from './hooks/useTourSteps';
import { saveUserProfile } from './utils/profileUtils';
import { UserProfileData } from './types';

interface StepContentProps {
  onProfileComplete: (profileData: UserProfileData) => Promise<void>;
}

const StepContent: React.FC<StepContentProps> = ({ onProfileComplete }) => {
  const { step, userProfile, setUserProfile, handleNext } = useOnboarding();
  const tourSteps = useTourSteps();

  // Handle profile completion
  const handleProfileComplete = async (profileData: UserProfileData) => {
    setUserProfile(profileData);
    await onProfileComplete(profileData);
    handleNext();
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
