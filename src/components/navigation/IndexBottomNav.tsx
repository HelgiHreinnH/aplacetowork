import { useNavigate } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import { toast } from "sonner";
import MenuSheet from './MenuSheet';
import NavButton from './NavButton';
import { calculateFacilityScore, type TaskValue } from '../../utils/facilityScoring';

const IndexBottomNav = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParamsString = sessionStorage.getItem('searchParams');
    if (!searchParamsString) {
      toast.error("Please adjust the sliders before searching");
      return;
    }

    const searchParams = JSON.parse(searchParamsString);
    console.log('Using search parameters:', searchParams);

    // Fetch facilities from sessionStorage
    const facilitiesString = sessionStorage.getItem('facilities');
    if (!facilitiesString) {
      console.log('No facilities available');
      toast.error("No facilities available");
      return;
    }

    const facilities = JSON.parse(facilitiesString);

    // Calculate scores for all facilities
    const facilitiesWithScores = facilities.map((facility: any) => {
      const score = calculateFacilityScore(
        facility, 
        searchParams.squareMeters, 
        searchParams.users, 
        searchParams.taskValue as TaskValue
      );
      console.log(`Score for ${facility.Facility}:`, score);
      return { facility, score };
    });
    
    console.log('All facilities with scores:', facilitiesWithScores);
    
    // Sort by score and take top 6
    const sortedFacilities = facilitiesWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.facility);
    
    console.log('Final sorted facilities:', sortedFacilities);

    if (sortedFacilities.length === 0) {
      toast.error("No matching facilities found");
      return;
    }
    
    // Store results and navigate
    sessionStorage.setItem('searchResults', JSON.stringify(sortedFacilities));
    sessionStorage.setItem('isExactMatch', JSON.stringify(true));
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