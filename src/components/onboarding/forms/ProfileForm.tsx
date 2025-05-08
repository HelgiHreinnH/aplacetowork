
import { useState } from 'react';
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
import { UserProfileData } from '../types';
import { motion } from 'framer-motion';
import { useCustomRoles } from '../hooks/useCustomRoles';

interface ProfileFormProps {
  onSubmit: (data: UserProfileData) => void;
  initialData?: Partial<UserProfileData>;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialData = {}, loading }) => {
  const { customRoles } = useCustomRoles();
  
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

  const handleFormSubmit = async (data: UserProfileData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 flex-1">
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
  );
};

export default ProfileForm;
