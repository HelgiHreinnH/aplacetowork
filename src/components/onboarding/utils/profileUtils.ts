
import { supabase } from "@/integrations/supabase/client";
import { UserProfileData } from "../types";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types/database";

export async function saveUserProfile(profileData: UserProfileData): Promise<boolean> {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("No authenticated user found");
    }
    
    console.log("Saving user profile data:", profileData);
    
    // Prepare the role value
    let finalRole = profileData.role;
    if (profileData.role === 'other' && profileData.custom_role) {
      finalRole = profileData.custom_role;
      
      // Handle custom role in the database if needed
      try {
        const { data: existingRole } = await supabase
          .from('custom_roles')
          .select('id, usage_count')
          .eq('role_name', profileData.custom_role)
          .maybeSingle();

        if (existingRole) {
          await supabase
            .from('custom_roles')
            .update({ usage_count: (existingRole.usage_count || 0) + 1 })
            .eq('id', existingRole.id);
        } else {
          await supabase
            .from('custom_roles')
            .insert({ 
              role_name: profileData.custom_role,
              created_by: user.id
            });
        }
      } catch (error) {
        // Non-critical error, we can continue
        console.error('Error handling custom role:', error);
      }
    }
    
    // Cast role to enum type if it's a predefined role
    const roleEnum: Database["public"]["Enums"]["user_role"] = 
      ['facility_manager', 'architect', 'designer', 'other'].includes(finalRole) 
        ? finalRole as Database["public"]["Enums"]["user_role"] 
        : 'other';
    
    // CRITICAL: First update the user metadata
    const { error: metadataError } = await supabase.auth.updateUser({
      data: {
        full_name: profileData.full_name,
        role: finalRole,
        company: profileData.company,
        country: profileData.country,
        onboarding_step_completed: 1,
        has_completed_profile: true,
        profile_completed_at: new Date().toISOString()
      }
    });
    
    if (metadataError) {
      console.error('Error updating user metadata:', metadataError);
      // Even with error, we'll try profiles table as fallback
    } else {
      console.log("Successfully updated user metadata");
    }

    // Save to profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: profileData.full_name,
        role: roleEnum,
        company: profileData.company,
        country: profileData.country
      }, {
        onConflict: 'id'
      });
      
    if (profileError) {
      console.error('Error updating profile table:', profileError);
      // If metadata succeeded, we can still return success
      return !metadataError;
    }
    
    return true;
  } catch (error) {
    console.error('Fatal error saving profile:', error);
    throw error;
  }
}
