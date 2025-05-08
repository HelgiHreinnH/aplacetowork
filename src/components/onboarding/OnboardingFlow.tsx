
import React, { useState } from 'react';
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
  const [isSliderDemoStep, setIsSliderDemoStep] = useState(false);
  
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
      console.log("Onboarding: Saving profile data", profileData);
      
      // Save user profile data to Supabase
      const result = await saveUserProfile(profileData);
      
      if (result) {
        console.log("Onboarding: Profile data saved successfully");
      }
    } catch (error) {
      console.error('Error in profile completion:', error);
      toast.error("An error occurred while saving your profile");
    }
  };

  // Update slider demo state based on current step
  const handleSliderDemoStep = (isSliderStep: boolean) => {
    setIsSliderDemoStep(isSliderStep);
  };

  return (
    <OnboardingProvider totalSteps={totalSteps} onComplete={handleComplete}>
      <div className="fixed inset-0 z-[1000] bg-[#F6F6F7] flex flex-col">
        <OnboardingNavigation isSliderDemoStep={isSliderDemoStep} />
        <StepContent 
          onProfileComplete={handleProfileComplete} 
          onSliderDemoStep={handleSliderDemoStep}
        />
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingFlow;
