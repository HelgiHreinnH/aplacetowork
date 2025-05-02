
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import TitleContainer from '@/components/containers/TitleContainer';
import { ProfileSettingsForm } from '@/components/settings/ProfileSettingsForm';
import { LanguageSettings } from '@/components/settings/LanguageSettings';
import { ColorSettings } from '@/components/settings/ColorSettings';
import { toast } from "sonner";

const UserSettings = () => {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Only fetch the session once
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  // Better error handling and timeout for profile data
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          toast.error("Failed to load profile data");
          throw error;
        }
        return data || {};
      } catch (err) {
        return {};
      }
    },
    enabled: !!session?.user,
    retry: 1,
    staleTime: 300000, // 5 minutes
  });

  // Better error handling and timeout for preferences data
  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching preferences:', error);
          toast.error("Failed to load preference data");
          throw error;
        }
        return data || { language: 'en' };
      } catch (err) {
        return { language: 'en' };
      }
    },
    enabled: !!session?.user,
    retry: 1,
    staleTime: 300000, // 5 minutes
  });

  // Set initial load complete after a timeout if loading takes too long
  useState(() => {
    const timer = setTimeout(() => {
      if (profileLoading || preferencesLoading) {
        setInitialLoadComplete(true);
      }
    }, 3000); // Show content after 3 seconds even if still loading
    return () => clearTimeout(timer);
  });

  // Show loading state, but only briefly
  if ((profileLoading || preferencesLoading) && !initialLoadComplete) {
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

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Color Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <ColorSettings />
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
