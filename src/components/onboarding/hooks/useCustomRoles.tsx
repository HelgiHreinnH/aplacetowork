
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface CustomRole {
  id: string;
  role_name: string;
}

export const useCustomRoles = () => {
  const [customRoles, setCustomRoles] = useState<CustomRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCustomRoles = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('custom_roles')
          .select('id, role_name')
          .order('usage_count', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching custom roles:', error);
          setError(error.message);
        } else {
          setCustomRoles(data || []);
        }
      } catch (err) {
        console.error('Exception fetching custom roles:', err);
        setError('Failed to fetch custom roles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomRoles();
  }, []);

  return {
    customRoles,
    isLoading,
    error
  };
};
