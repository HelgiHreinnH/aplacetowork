
import { useEffect, useState } from "react";
import { H1 } from "@/components/ui/typography";

const Header = () => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [iconError, setIconError] = useState(false);
  
  useEffect(() => {
    // Updated to use Icon_blue from Supabase
    const iconUrl = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage/Icon_blue.png";
    
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

    return () => {};
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 px-4 relative">
      {!iconError && iconUrl && (
        <div className="flex-shrink-0">
          <img 
            src={iconUrl} 
            alt="Workspace icon" 
            className="h-16 w-16 object-contain" 
          />
        </div>
      )}
      <div className="text-left">
        <H1 className="!text-[#8eb8e5] !mb-2">A Place to Work</H1>
        <p className="font-inter text-small tracking-[0.2em] text-[#8E9196] uppercase">
          Inspiration for the ideal Workspace
        </p>
      </div>
    </div>
  );
};

export default Header;
