
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Header = () => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [iconError, setIconError] = useState(false);
  
  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('facilitytempimage')
          .download('icon.png');
        
        if (error) {
          console.error('Error fetching icon:', error);
          setIconError(true);
          return;
        }
        
        const url = URL.createObjectURL(data);
        setIconUrl(url);
      } catch (error) {
        console.error('Failed to fetch icon:', error);
        setIconError(true);
      }
    };
    
    fetchIcon();
    
    // Clean up the object URL on component unmount
    return () => {
      if (iconUrl) {
        URL.revokeObjectURL(iconUrl);
      }
    };
  }, []);

  return (
    <div className="text-center flex items-center justify-center gap-3">
      {!iconError && iconUrl && (
        <img src={iconUrl} alt="Workspace icon" className="h-8 w-8 object-contain" />
      )}
      <div>
        <h1 className="text-2xl font-bold text-[#9b87f5] mb-2">A Place to Work</h1>
        <p className="text-sm tracking-[0.2em] text-[#8E9196] uppercase">Inspiration for the ideal Workspace</p>
      </div>
    </div>
  );
};

export default Header;
