
import { supabase } from "@/integrations/supabase/client";
import { UserProfileData } from "../types";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types/database";

export async function saveUserProfile(profileData: UserProfileData) {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("No authenticated user found");
      throw new Error("No authenticated user found");
    }
    
    // Handle custom role if the user selected "other" and provided a custom role
    if (profileData.role === 'other' && profileData.custom_role) {
      // Check if custom role already exists
      const { data: existingRole, error: searchError } = await supabase
        .from('custom_roles')
        .select('id, usage_count')
        .eq('role_name', profileData.custom_role)
        .maybeSingle();

      if (searchError) {
        console.error('Error checking for existing custom role:', searchError);
      } else if (existingRole) {
        // Update existing custom role's usage count
        const { error: updateError } = await supabase
          .from('custom_roles')
          .update({ usage_count: (existingRole.usage_count || 0) + 1 })
          .eq('id', existingRole.id);
        
        if (updateError) console.error('Error updating custom role usage count:', updateError);
        
        // Use the existing custom role
        profileData.role = profileData.custom_role;
      } else {
        // Create new custom role
        const { error: insertError } = await supabase
          .from('custom_roles')
          .insert({ 
            role_name: profileData.custom_role,
            created_by: user.id
          });
        
        if (insertError) {
          console.error('Error inserting custom role:', insertError);
        } else {
          // Use the new custom role
          profileData.role = profileData.custom_role;
        }
      }
    }
    
    // Cast the role to the appropriate type if it's one of the predefined roles
    // or use it as is if it's a custom role
    const role = ['facility_manager', 'architect', 'designer', 'other'].includes(profileData.role) 
      ? profileData.role as Database["public"]["Enums"]["user_role"] 
      : 'other';
      
    // Save profile data to Supabase - use upsert to ensure we create or update as needed
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: profileData.full_name,
        role: role,
        company: profileData.company,
        country: profileData.country
      });
      
    if (profileError) {
      console.error('Error updating profile:', profileError);
      toast.error("Failed to save profile information");
      throw profileError;
    } 
    
    console.log('Profile saved successfully:', profileData);
    toast.success("Profile saved successfully");
    return true;
  } catch (error) {
    console.error('Error in profile completion:', error);
    toast.error("An error occurred while saving your profile");
    throw error;
  }
}
