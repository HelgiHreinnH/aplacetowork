
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

    return () => {};
  }, []);

  return (
    <div className="text-center flex flex-col items-center justify-center relative">
      {!iconError && iconUrl && (
        <img 
          src={iconUrl} 
          alt="Workspace icon" 
          className="h-16 w-16 object-contain mb-4" 
        />
      )}
      <div>
        <h1 className="font-playfair text-h2 font-bold text-[#9b87f5] mb-2">A Place to Work</h1>
        <p className="font-inter text-small tracking-[0.2em] text-[#8E9196] uppercase">Inspiration for the ideal Workspace</p>
      </div>
    </div>
  );
};

export default Header;
