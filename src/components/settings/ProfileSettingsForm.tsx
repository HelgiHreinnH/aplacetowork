
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Loader2, Save, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types/database";

type ProfileFormData = {
  full_name: string;
  role: string;
  company: string;
  country: string;
};

export function ProfileSettingsForm({ initialData }: { initialData: Partial<ProfileFormData> }) {
  const [loading, setLoading] = useState(false);
  const [customRoles, setCustomRoles] = useState<{id: string, role_name: string}[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<ProfileFormData>({
    defaultValues: initialData || {}
  });

  const selectedRole = watch('role');

  // Fetch custom roles when component mounts
  useEffect(() => {
    const fetchCustomRoles = async () => {
      const { data, error } = await supabase
        .from('custom_roles')
        .select('id, role_name')
        .order('usage_count', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching custom roles:', error);
      } else {
        setCustomRoles(data || []);
      }
    };

    fetchCustomRoles();
  }, []);

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      console.log("Setting form values with:", initialData);
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      console.log('Submitting updated profile data:', data);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("No authenticated user found");
        throw new Error("No authenticated user found");
      }
      
      // Determine the role type
      // If it's a standard role, use it; otherwise, set it as 'other' for the enum
      const roleEnum: Database["public"]["Enums"]["user_role"] = 
        ['facility_manager', 'architect', 'designer', 'other'].includes(data.role) 
          ? data.role as Database["public"]["Enums"]["user_role"]
          : 'other';
          
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          role: roleEnum,
          company: data.company,
          country: data.country
        })
        .eq('id', user.id);

      if (error) throw error;
      
      // If using a custom role and it's not one of the enum values
      if (!['facility_manager', 'architect', 'designer', 'other'].includes(data.role)) {
        // Check if custom role already exists
        const { data: existingRole, error: searchError } = await supabase
          .from('custom_roles')
          .select('id, usage_count')
          .eq('role_name', data.role)
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
              role_name: data.role,
              created_by: user.id
            });
          
          if (insertError) console.error('Error inserting custom role:', insertError);
        }
      }
      
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-end mb-4">
          {!isEditing ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditing(true)}
              className="rounded-xl"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : null}
        </div>

        <div>
          <label htmlFor="full_name" className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            id="full_name"
            {...register("full_name")}
            placeholder="Enter your full name"
            className="rounded-lg"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
          <Select 
            value={selectedRole || 'facility_manager'}
            onValueChange={(value) => setValue('role', value)}
            disabled={!isEditing}
          >
            <SelectTrigger className="rounded-lg" id="role">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="facility_manager">Facility Manager</SelectItem>
              <SelectItem value="architect">Architect</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              {customRoles.map(role => (
                <SelectItem key={role.id} value={role.role_name}>{role.role_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
          <Input
            id="company"
            {...register("company")}
            placeholder="Enter your company name"
            className="rounded-lg"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
          <Input
            id="country"
            {...register("country")}
            placeholder="Enter your country"
            className="rounded-lg"
            disabled={!isEditing}
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setIsEditing(false);
              reset(initialData);
            }} 
            className="mr-2 rounded-xl"
          >
            Cancel
          </Button>
          <Button type="submit" variant="main" disabled={loading} className="rounded-xl">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      )}
    </form>
  );
}
