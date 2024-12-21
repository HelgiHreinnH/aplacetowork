import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Home, Heart, User } from 'lucide-react';
import MenuSheet from './navigation/MenuSheet';
import NavButton from './navigation/NavButton';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexPage = location.pathname === '/';

  const handleSearch = () => {
    if (!isIndexPage) {
      navigate('/');
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-6 py-4 z-50 w-[90%] max-w-md">
      <div className="flex justify-between items-center">
        <NavButton 
          to="/"
          icon={Home}
          label="Home"
        />

        <MenuSheet />
        
        <div className="relative -mt-10">
          <NavButton 
            icon={Search}
            label="Search"
            onClick={handleSearch}
            className="bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-full w-14 h-14 shadow-lg"
          />
        </div>

        <NavButton 
          to="/favorites"
          icon={Heart}
          label="Favorites"
        />
        
        <NavButton 
          to="/profile"
          icon={User}
          label="Profile"
        />
      </div>
    </div>
  );
};

export default BottomNav;