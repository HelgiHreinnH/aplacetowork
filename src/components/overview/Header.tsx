
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Header = () => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [iconError, setIconError] = useState(false);
  
  useEffect(() => {
    const iconUrl = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//Icon.png";
    
    const img = new Image();
    img.onload = () => {
      setIconUrl(iconUrl);
      setIconError(false);
    };
    img.onerror = () => {
      console.error('Failed to load icon');
      setIconError(true);
    };
    img.src = iconUrl;

    // No need to clean up the object URL in this case
    return () => {};
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
