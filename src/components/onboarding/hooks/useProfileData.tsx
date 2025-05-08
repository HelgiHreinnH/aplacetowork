
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { UserProfileData } from '../types';

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<Partial<UserProfileData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkExistingProfile = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user?.id) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
            
          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching existing profile:', error);
            setError(error.message);
          } else if (data) {
            // Found existing profile data
            console.log("Found existing profile data:", data);
            setProfileData({
              full_name: data.full_name || '',
              role: data.role || 'facility_manager',
              company: data.company || '',
              country: data.country || '',
            });
          }
        }
      } catch (err) {
        console.error('Error checking existing profile:', err);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingProfile();
  }, []);

  return {
    profileData,
    isLoading,
    error
  };
};
