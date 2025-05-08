
export interface UserProfileData {
  id?: string;
  full_name: string;
  role: string;
  company: string;
  country: string;
  onboarding_completed?: boolean;
  custom_role?: string;
}

export interface TourStep {
  title: string;
  description: string;
  image?: string;
  images?: string[];
  footer?: string;
  customComponent?: string;
  caption?: string;
}
