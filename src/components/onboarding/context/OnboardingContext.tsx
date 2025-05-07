
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

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

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
