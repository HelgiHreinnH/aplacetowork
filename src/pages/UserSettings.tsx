
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import TitleContainer from '@/components/containers/TitleContainer';
import { ProfileSettingsForm } from '@/components/settings/ProfileSettingsForm';
import { LanguageSettings } from '@/components/settings/LanguageSettings';
import { ColorSettings } from '@/components/settings/ColorSettings';

const UserSettings = () => {
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user,
  });

  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user,
  });

  if (sessionLoading || profileLoading || preferencesLoading) {
    return (
      <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
        <TitleContainer />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
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
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileSettingsForm initialData={profile || {}} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <LanguageSettings currentLanguage={preferences?.language || 'en'} />
              </CardContent>
            </Card>

            <Card>
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
