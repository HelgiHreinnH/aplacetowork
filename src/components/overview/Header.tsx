
import { useEffect, useState } from "react";
import { H1 } from "@/components/ui/typography";
import { Info } from "lucide-react";

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
        <H1 className="!text-[#9b87f5] !mb-2">A Place to Work</H1>
        <p className="font-inter text-small tracking-[0.2em] text-[#8E9196] uppercase">
          Inspiration for the ideal Workspace
        </p>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <p className="text-sm font-medium text-[#8E9196]">
            Want to learn more
          </p>
          <button 
            className="inline-flex items-center justify-center rounded-full h-6 w-6 bg-transparent hover:bg-gray-100 transition-colors"
            aria-label="More information"
          >
            <Info 
              className="h-5 w-5 text-[#8E9196] hover:text-[#9b87f5]" 
              strokeWidth={1.5} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
