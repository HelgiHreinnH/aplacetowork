
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingProvider } from './context/OnboardingContext';
import OnboardingNavigation from './OnboardingNavigation';
import StepContent from './StepContent';
import { useTourSteps } from './hooks/useTourSteps';
import { saveUserProfile } from './utils/profileUtils';
import { UserProfileData } from './types';

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const tourSteps = useTourSteps();
  const [isSliderDemoStep, setIsSliderDemoStep] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Calculate total steps (1 profile step + 1 intro step + tour steps)
  const totalSteps = 2 + tourSteps.length;

  // Check if onboarding was previously completed on load
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Check user metadata first (most reliable source)
          console.log("Checking onboarding status - user metadata:", session.user.user_metadata);
          
          if (session.user.user_metadata?.onboarding_completed === true) {
            console.log("User metadata shows onboarding completed, redirecting to home");
            navigate("/home", { replace: true });
            return;
          }
          
          // Check localStorage as fallback
          if (localStorage.getItem("onboardingCompleted") === "true") {
            console.log("localStorage shows onboarding completed");
            
            // Update user metadata to match localStorage to avoid future mismatches
            try {
              await supabase.auth.updateUser({
                data: {
                  onboarding_completed: true,
                  onboarding_completed_at: new Date().toISOString()
                }
              });
              
              console.log("Updated user metadata based on localStorage value");
              navigate("/home", { replace: true });
            } catch (error) {
              console.error("Error syncing onboarding status:", error);
              navigate("/home", { replace: true });
            }
            
            return;
          }
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };
    
    checkOnboardingStatus();
  }, [navigate]);

  // Handle completing the entire onboarding flow
  const handleComplete = async () => {
    if (isCompleting) return; // Prevent multiple completion attempts
    
    try {
      setIsCompleting(true);
      console.log("Completing onboarding process");
      
      // Save completion status to localStorage FIRST (as a fallback)
      localStorage.setItem('onboardingCompleted', 'true');
      
      // Save completion status to user profile
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        // Update user metadata (most important)
        await supabase.auth.updateUser({
          data: {
            onboarding_completed: true,
            onboarding_completed_at: new Date().toISOString()
          }
        });
        
        console.log("Updated user metadata with onboarding_completed: true");
        
        // Update profiles table (less critical)
        try {
          await supabase
            .from('profiles')
            .update({ onboarding_completed: true })
            .eq('id', session.user.id);
            
          console.log("Updated profiles table with onboarding_completed: true");
        } catch (err) {
          console.warn("Non-critical: Could not update profiles table:", err);
        }
      }
      
      // Navigate to home page
      navigate('/home', { replace: true });
    } catch (err) {
      console.error('Error completing onboarding:', err);
      // Still navigate to home page using localStorage as fallback
      navigate('/home', { replace: true });
    }
  };

  // Handle profile completion
  const handleProfileComplete = async (profileData: UserProfileData) => {
    try {
      console.log("OnboardingFlow: Saving profile data", profileData);
      
      // Save profile data to database
      const success = await saveUserProfile(profileData);
      
      if (!success) {
        throw new Error("Failed to save profile data");
      }
      
      console.log("OnboardingFlow: Profile saved successfully");
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Failed to save your profile");
      throw error;
    }
  };

  return (
    <OnboardingProvider totalSteps={totalSteps} onComplete={handleComplete}>
      <div className="fixed inset-0 z-[1000] bg-[#F6F6F7] flex flex-col">
        <OnboardingNavigation isSliderDemoStep={isSliderDemoStep} />
        <StepContent 
          onProfileComplete={handleProfileComplete} 
          onSliderDemoStep={setIsSliderDemoStep}
        />
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingFlow;
