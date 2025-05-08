
import { useState } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from 'framer-motion';
import { UserProfileData } from './types';
import ProfileForm from './forms/ProfileForm';
import { useProfileData } from './hooks/useProfileData';

interface UserProfileSetupStepProps {
  onComplete: (data: UserProfileData) => void;
  initialData?: Partial<UserProfileData>;
}

const UserProfileSetupStep: React.FC<UserProfileSetupStepProps> = ({ onComplete, initialData = {} }) => {
  const [loading, setLoading] = useState(false);
  const { profileData } = useProfileData();
  
  // Combine provided initialData with data from database
  const combinedInitialData = { ...profileData, ...initialData };

  const handleSubmit = async (data: UserProfileData) => {
    setLoading(true);
    try {
      console.log('Submitting profile data:', data);
      
      // Update user metadata in auth - this is critical and must succeed
      const { data: { user }, error: userUpdateError } = await supabase.auth.updateUser({
        data: {
          full_name: data.full_name,
          role: data.role === 'other' ? data.custom_role : data.role,
          company: data.company,
          country: data.country
        }
      });
      
      if (userUpdateError) {
        console.error("Error updating user metadata:", userUpdateError);
        toast.error("Failed to update profile information");
        setLoading(false);
        return;
      }
      
      console.log("Auth metadata updated successfully:", user);
      
      // Proceed with saving profile - this may fail due to RLS but we'll continue anyway
      await onComplete(data);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Failed to save profile");
      setLoading(false);
    }
    // We don't set loading to false here because if onComplete succeeds, 
    // the component will unmount as we navigate to the next step
  };

  return (
    <motion.div
      className="flex flex-col h-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-[#3f00ff] mb-2">Tell us about yourself</h2>
      <p className="text-[#8E9196] mb-6">
        This helps us personalize your experience
      </p>

      <ProfileForm 
        onSubmit={handleSubmit} 
        initialData={combinedInitialData}
        loading={loading}
      />
    </motion.div>
  );
};

export default UserProfileSetupStep;
