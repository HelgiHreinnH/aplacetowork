
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Loader2, Save } from "lucide-react";
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

type ProfileFormData = {
  full_name: string;
  role: string;
  company: string;
  country: string;
};

export function ProfileSettingsForm({ initialData }: { initialData: Partial<ProfileFormData> }) {
  const [loading, setLoading] = useState(false);
  const [customRoles, setCustomRoles] = useState<{id: string, role_name: string}[]>([]);
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
      
      // Handle custom role if the user selected "other" and provided a custom role
      if (data.role === 'other') {
        // In the settings form, we don't have a separate custom_role field
        // We'll need to handle this differently or update the form structure
        console.log("Note: 'other' role selected but no custom role input available in settings form");
      }
      
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          role: data.role,
          company: data.company,
          country: data.country
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success("Profile updated successfully");
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
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            id="full_name"
            {...register("full_name")}
            placeholder="Enter your full name"
            className="rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
          <Select 
            value={selectedRole || 'facility_manager'}
            onValueChange={(value) => setValue('role', value)}
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
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
          <Input
            id="country"
            {...register("country")}
            placeholder="Enter your country"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-end">
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
    </form>
  );
}
