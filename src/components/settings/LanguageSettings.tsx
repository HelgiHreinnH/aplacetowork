
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function LanguageSettings({ currentLanguage }: { currentLanguage: string }) {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(currentLanguage);

  const handleLanguageChange = async (value: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .update({ language: value })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      setLanguage(value);
      toast.success("Language updated successfully");
    } catch (error) {
      console.error('Error updating language:', error);
      toast.error("Failed to update language");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="language" className="block text-sm font-medium mb-1">
          Language
        </label>
        <Select
          value={language}
          onValueChange={handleLanguageChange}
          disabled={loading}
        >
          <SelectTrigger className="rounded-lg">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="da">Danish</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && (
        <div className="flex items-center text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Updating...
        </div>
      )}
    </div>
  );
}
