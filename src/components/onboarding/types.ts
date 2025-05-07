
import { Database } from "@/integrations/supabase/types/database";

// Define the user profile data type
export type UserProfileData = {
  full_name: string;
  role: string; // Using string to accommodate custom roles
  company?: string;
  country?: string;
  custom_role?: string;
};

// Define the tour step type
export interface TourStep {
  title: string;
  description: string;
  customComponent?: string;
  images?: string[];
  image?: string;
  footer?: string;
  caption?: string;
}

// Define the onboarding completion handler
export type OnboardingCompleteHandler = () => void;

// Define the profile completion handler
export type ProfileCompleteHandler = (profileData: UserProfileData) => Promise<void>;
