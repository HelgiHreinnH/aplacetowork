
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
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
import { motion } from 'framer-motion';
import { UserProfileData } from './types';

interface UserProfileSetupStepProps {
  onComplete: (data: UserProfileData) => void;
  initialData?: Partial<UserProfileData>;
}

const UserProfileSetupStep: React.FC<UserProfileSetupStepProps> = ({ onComplete, initialData = {} }) => {
  const [loading, setLoading] = useState(false);
  const [customRoles, setCustomRoles] = useState<{id: string, role_name: string}[]>([]);
  
  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<UserProfileData>({
    defaultValues: {
      full_name: initialData.full_name || '',
      role: initialData.role || 'facility_manager',
      company: initialData.company || '',
      country: initialData.country || '',
      custom_role: initialData.custom_role || ''
    },
    mode: "onChange" // Enable validation on change
  });

  const selectedRole = watch('role');
  const fullName = watch('full_name');

  useEffect(() => {
    // Fetch custom roles from the database
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

    // Also check if user already has profile data that should be pre-filled
    const checkExistingProfile = async () => {
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
          } else if (data) {
            // Pre-fill form with existing data
            console.log("Found existing profile data:", data);
            setValue('full_name', data.full_name || '');
            setValue('role', data.role || 'facility_manager');
            setValue('company', data.company || '');
            setValue('country', data.country || '');
          }
        }
      } catch (err) {
        console.error('Error checking existing profile:', err);
      }
    };

    fetchCustomRoles();
    checkExistingProfile();
  }, [setValue]);

  const onSubmit = async (data: UserProfileData) => {
    setLoading(true);
    try {
      console.log('Submitting profile data:', data);
      
      // Update user metadata in auth
      const { data: { user }, error: userUpdateError } = await supabase.auth.updateUser({
        data: {
          full_name: data.full_name,
          role: data.role === 'other' ? data.custom_role : data.role,
          company: data.company,
          country: data.country
        }
      });
      
      if (userUpdateError) {
        throw userUpdateError;
      }
      
      // Proceed with saving profile
      await onComplete(data);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Failed to save profile");
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col h-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-[#3f00ff] mb-2">Tell us about yourself</h2>
      <p className="text-[#8E9196] mb-6">
        This helps us personalize your experience
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <div className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              id="full_name"
              {...register("full_name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="rounded-lg"
            />
            {errors.full_name && (
              <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
            <Select 
              onValueChange={(value) => {
                setValue('role', value, { shouldValidate: true });
              }}
              defaultValue={initialData.role || 'facility_manager'}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facility_manager">Facility Manager</SelectItem>
                <SelectItem value="architect">Architect</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="other">Other (specify)</SelectItem>
                {customRoles.map(role => (
                  <SelectItem key={role.id} value={role.role_name}>{role.role_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRole === 'other' && (
            <div>
              <label htmlFor="custom_role" className="block text-sm font-medium mb-1">Specify Your Role</label>
              <Input
                id="custom_role"
                {...register("custom_role", { 
                  required: selectedRole === 'other' ? "Please specify your role" : false 
                })}
                placeholder="Enter your specific role"
                className="rounded-lg"
              />
              {errors.custom_role && (
                <p className="text-xs text-red-500 mt-1">{errors.custom_role.message}</p>
              )}
            </div>
          )}

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

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            variant="main" 
            disabled={loading || !fullName} 
            className="rounded-xl w-full"
            aria-label="Save your profile and continue"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default UserProfileSetupStep;
