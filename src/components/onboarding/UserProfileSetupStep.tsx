
import { useState } from 'react';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { UserProfileData } from './types';
import ProfileForm from './forms/ProfileForm';

interface UserProfileSetupStepProps {
  onComplete: (data: UserProfileData) => void;
  initialData?: Partial<UserProfileData>;
}

const UserProfileSetupStep: React.FC<UserProfileSetupStepProps> = ({ onComplete, initialData = {} }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: UserProfileData) => {
    if (loading) return; // Prevent double submission
    
    setLoading(true);
    console.log('Profile form submitted with data:', data);
    
    try {
      // Simply call onComplete with the form data
      await onComplete(data);
      // Note: We don't set loading=false here because we're transitioning to the next step
    } catch (error) {
      console.error('Error in profile submission:', error);
      toast.error("Failed to save profile. Please try again.");
      setLoading(false);
    }
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
        initialData={initialData || {}}
        loading={loading}
      />
    </motion.div>
  );
};

export default UserProfileSetupStep;
