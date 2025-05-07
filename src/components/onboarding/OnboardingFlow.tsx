
import React from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { OnboardingProvider } from './context/OnboardingContext';
import OnboardingNavigation from './OnboardingNavigation';
import StepContent from './StepContent';
import { useTourSteps } from './hooks/useTourSteps';
import { saveUserProfile } from './utils/profileUtils';
import { UserProfileData } from './types';

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const tourSteps = useTourSteps();
  
  // Calculate total steps (1 profile step + 1 intro step + tour steps)
  const totalSteps = 2 + tourSteps.length;

  // Handle complete onboarding 
  const handleComplete = () => {
    // Save onboarding completion status to localStorage
    localStorage.setItem('onboardingCompleted', 'true');
    
    // Navigate to home page
    navigate('/home');
  };

  // Handle profile completion
  const handleProfileComplete = async (profileData: UserProfileData) => {
    try {
      await saveUserProfile(profileData);
    } catch (error) {
      console.error('Error in profile completion:', error);
      toast.error("An error occurred while saving your profile");
    }
  };

  // Determine if we're showing the first tour step (which is the slider demo step)
  const isSliderDemoStep = (step: number) => step === 2;

  return (
    <OnboardingProvider totalSteps={totalSteps} onComplete={handleComplete}>
      <div className="fixed inset-0 z-[1000] bg-[#F6F6F7] flex flex-col">
        <OnboardingNavigation isSliderDemoStep={isSliderDemoStep(2)} />
        <StepContent onProfileComplete={handleProfileComplete} />
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingFlow;
