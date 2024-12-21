import { useNavigate } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import MenuSheet from './MenuSheet';
import NavButton from './NavButton';

const IndexBottomNav = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParamsString = sessionStorage.getItem('searchParams');
    if (!searchParamsString) {
      navigate('/');
      return;
    }
    navigate('/search-results');
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-8 py-3 w-[85%] max-w-md z-50">
      <div className="flex items-center justify-between gap-4">
        <MenuSheet />
        
        <div className="relative">
          <NavButton 
            icon={Search}
            label="Search"
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          />
        </div>

        <NavButton 
          to="/favorites"
          icon={Heart}
          label="Favorites"
        />
      </div>
    </nav>
  );
};

export default IndexBottomNav;