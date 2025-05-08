
import React, { createContext, useContext, useState } from 'react';
import { UserProfileData } from '../types';

interface OnboardingContextType {
  step: number;
  setStep: (step: number) => void;
  userProfile: UserProfileData | null;
  setUserProfile: (data: UserProfileData | null) => void;
  totalSteps: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSkip: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{
  children: React.ReactNode;
  totalSteps: number;
  onComplete: () => void;
}> = ({ children, totalSteps, onComplete }) => {
  const [step, setStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  // Handle navigation to next step
  const handleNext = () => {
    console.log(`Moving from step ${step} to ${step + 1}/${totalSteps - 1}`);
    
    if (step < totalSteps - 1) {
      // Use functional update to ensure we get the latest state
      setStep(prevStep => {
        console.log(`Updating step from ${prevStep} to ${prevStep + 1}`);
        return prevStep + 1;
      });
    } else {
      // Complete onboarding if we're at the last step
      onComplete();
    }
  };

  // Handle navigation to previous step
  const handleBack = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
    }
  };

  // Handle skipping onboarding
  const handleSkip = () => {
    // Skip to the end
    onComplete();
  };

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        userProfile,
        setUserProfile,
        totalSteps,
        handleNext,
        handleBack,
        handleSkip,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
