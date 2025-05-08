
import { useNavigate } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';
import MenuSheet from './MenuSheet';
import NavButton from './NavButton';
import { designTokens } from "@/styles/design-tokens";

const StandardBottomNav = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-8 py-3 w-[85%] max-w-md z-50">
      <div className="flex items-center justify-between gap-4">
        {/* Menu section with taller buttons */}
        <div className="flex items-center">
          <MenuSheet />
        </div>
        
        <div className="relative">
          <NavButton 
            icon={Home}
            label="Home"
            onClick={handleHomeClick}
            variant="main"
            className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-blue-600 hover:bg-blue-700"
          />
        </div>

        <NavButton 
          to="/favorites"
          icon={Heart}
          label="Favorites"
          variant="alert"
          className="bg-[#ff8600] hover:bg-[#cc6d00]"
        />
      </div>
    </nav>
  );
};

export default StandardBottomNav;
