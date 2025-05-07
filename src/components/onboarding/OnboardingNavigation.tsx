
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, X } from "lucide-react";
import { useOnboarding } from './context/OnboardingContext';

interface OnboardingNavigationProps {
  isSliderDemoStep: boolean;
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({ isSliderDemoStep }) => {
  const { step, totalSteps, handleBack, handleNext, handleSkip } = useOnboarding();
  
  // Determine if we're showing the final step
  const isFinalStep = step === totalSteps - 1;

  return (
    <>
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
      
      {/* Footer with navigation buttons */}
      <div className="p-4 flex justify-between border-t border-gray-100">
        {step > 0 ? (
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2 rounded-full"
          >
            <ChevronLeft size={16} />
            Back
          </Button>
        ) : (
          <div></div> // Empty div to maintain layout
        )}
        
        {step !== 0 && (
          <>
            {isSliderDemoStep || step > 1 ? (
              <Button 
                variant="main" 
                onClick={handleNext}
                className="h-14 w-14 p-0 rounded-full shadow-md"
              >
                <ArrowRight size={24} />
              </Button>
            ) : (
              <Button 
                variant="main" 
                onClick={handleNext}
                className="flex items-center gap-2 rounded-full"
              >
                {isFinalStep ? 'Get Started' : 'Next'}
                {!isFinalStep && <ChevronRight size={16} />}
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OnboardingNavigation;
