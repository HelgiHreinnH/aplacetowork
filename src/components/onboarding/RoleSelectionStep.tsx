
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { UserRole } from './OnboardingFlow';

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
}

interface RoleSelectionStepProps {
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelectionStep: React.FC<RoleSelectionStepProps> = ({ selectedRole, onRoleSelect }) => {
  // Define the role options
  const roleOptions: RoleOption[] = [
    {
      id: 'facility_manager',
      title: 'Facility Manager',
      description: 'I manage office space and infrastructure for my organization.'
    },
    {
      id: 'hr_professional',
      title: 'HR Professional',
      description: 'I focus on creating great workplace experiences for employees.'
    },
    {
      id: 'knowledge_worker',
      title: 'Knowledge Worker',
      description: 'I want to understand workplace options for my day-to-day work.'
    }
  ];

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-[#3f00ff] mb-2">What best describes your role?</h2>
        <p className="text-[#8E9196] mb-6">
          We'll customize your experience based on your role.
        </p>
      </motion.div>

      <motion.div 
        className="space-y-4 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {roleOptions.map((role, index) => (
          <motion.div
            key={role.id}
            className={`p-4 rounded-xl border ${
              selectedRole === role.id 
                ? 'border-[#3f00ff] bg-blue-50' 
                : 'border-gray-200 bg-white'
            } cursor-pointer relative overflow-hidden`}
            onClick={() => onRoleSelect(role.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex gap-3 items-start">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                selectedRole === role.id 
                  ? 'bg-[#3f00ff]' 
                  : 'border-2 border-gray-300'
              }`}>
                {selectedRole === role.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{role.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{role.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RoleSelectionStep;
