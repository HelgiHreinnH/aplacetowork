
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import TitleContainer from '@/components/containers/TitleContainer';
import { ProfileSettingsForm } from '@/components/settings/ProfileSettingsForm';
import { LanguageSettings } from '@/components/settings/LanguageSettings';
import { toast } from "sonner";

const UserSettings = () => {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Fetch the current session
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Session data:", data.session);
      return data.session;
    },
  });

  // Better error handling and timeout for profile data
  const { data: profile, isLoading: profileLoading, refetch: refetchProfile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      try {
        if (!session?.user?.id) {
          console.log("No user ID available to fetch profile");
          return null;
        }

        console.log("Fetching profile for user:", session.user.id);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            console.log("No profile found for user, creating one...");
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({ id: session.user.id });
            
            if (insertError) {
              console.error("Error creating profile:", insertError);
              toast.error("Failed to create user profile");
              throw insertError;
            }
            
            // Fetch the newly created profile
            const { data: newProfile, error: fetchError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (fetchError) {
              console.error("Error fetching new profile:", fetchError);
              throw fetchError;
            }
            
            return newProfile;
          } else {
            console.error('Error fetching profile:', error);
            toast.error("Failed to load profile data");
            throw error;
          }
        }
        
        console.log("Retrieved profile data:", data);
        return data;
      } catch (err) {
        console.error('Error in profile query:', err);
        return null;
      }
    },
    enabled: !!session?.user?.id,
    retry: 1,
    staleTime: 300000, // 5 minutes
  });

  // Better error handling and timeout for preferences data
  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['preferences', session?.user?.id],
    queryFn: async () => {
      try {
        if (!session?.user?.id) {
          return { language: 'en' };
        }

        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            console.log("No preferences found for user, creating default...");
            const { error: insertError } = await supabase
              .from('user_preferences')
              .insert({ id: session.user.id, language: 'en' });
            
            if (insertError) {
              console.error("Error creating preferences:", insertError);
            }
            
            return { language: 'en' };
          }
          
          console.error('Error fetching preferences:', error);
          return { language: 'en' };
        }
        return data || { language: 'en' };
      } catch (err) {
        return { language: 'en' };
      }
    },
    enabled: !!session?.user?.id,
    retry: 1,
    staleTime: 300000, // 5 minutes
  });

  // Set initial load complete after a timeout if loading takes too long
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sessionLoading || profileLoading || preferencesLoading) {
        setInitialLoadComplete(true);
      }
    }, 3000); // Show content after 3 seconds even if still loading
    return () => clearTimeout(timer);
  }, [sessionLoading, profileLoading, preferencesLoading]);

  // Show loading state, but only briefly
  if ((sessionLoading || profileLoading || preferencesLoading) && !initialLoadComplete) {
    return (
      <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
        <TitleContainer />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileSettingsForm initialData={profile || {}} />
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <LanguageSettings currentLanguage={preferences?.language || 'en'} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex-none h-20">
        {/* Reserved space for bottom navigation */}
      </div>
    </div>
  );
};

export default UserSettings;
