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
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-4 w-[90%] max-w-md z-50">
      <div className="flex justify-between items-center">
        <MenuSheet />
        
        <div className="relative -mt-10">
          <NavButton 
            icon={Search}
            label="Search"
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg animate-bounce"
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