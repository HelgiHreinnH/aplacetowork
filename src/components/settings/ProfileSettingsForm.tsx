
import { useState } from 'react';
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
  role: 'facility_manager' | 'architect' | 'designer' | 'other';
  company: string;
  country: string;
};

export function ProfileSettingsForm({ initialData }: { initialData: Partial<ProfileFormData> }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: initialData
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

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
            {...register("role")}
            defaultValue={initialData.role || 'other'}
            onValueChange={(value) => register("role").onChange({ target: { value } })}
          >
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="facility_manager">Facility Manager</SelectItem>
              <SelectItem value="architect">Architect</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="other">Other</SelectItem>
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
