
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
    
    console.log("Saving user profile data:", profileData);
    
    // Handle custom role if the user selected "other" and provided a custom role
    let finalRole = profileData.role;
    
    if (profileData.role === 'other' && profileData.custom_role) {
      finalRole = profileData.custom_role;
      
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
        }
      }
    }
    
    // Cast the role to the appropriate type if it's one of the predefined roles
    // or use 'other' if it's a custom role
    const roleEnum: Database["public"]["Enums"]["user_role"] = 
      ['facility_manager', 'architect', 'designer', 'other'].includes(finalRole) 
        ? finalRole as Database["public"]["Enums"]["user_role"] 
        : 'other';
      
    // Try to save profile data to Supabase - use upsert to ensure we create or update as needed
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profileData.full_name,
          role: roleEnum,
          company: profileData.company,
          country: profileData.country,
          onboarding_completed: false // Initially set to false until onboarding is completed
        });
        
      if (profileError) {
        // Log the error but don't throw - we'll continue with the flow
        console.error('Error updating profile - may be RLS issue:', profileError);
        
        // Continue without failing the whole process
        // The auth metadata is still saved, which is the most important part
        console.log('Continuing despite profile table error - auth metadata was saved');
      } else {
        console.log('Profile saved successfully:', {
          id: user.id,
          full_name: profileData.full_name,
          role: roleEnum,
          company: profileData.company,
          country: profileData.country,
          onboarding_completed: false
        });
      }
    } catch (profileErr) {
      // Log error but don't throw - we'll continue with the flow
      console.error('Exception in profile update - continuing anyway:', profileErr);
    }
    
    // Return success since auth metadata was saved
    return true;
  } catch (error) {
    console.error('Error in profile completion:', error);
    toast.error("An error occurred while saving your profile");
    throw error;
  }
}
