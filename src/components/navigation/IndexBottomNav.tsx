
import { useNavigate } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import { toast } from "sonner";
import MenuSheet from './MenuSheet';
import NavButton from './NavButton';
import { calculateFacilityScore, type TaskValue } from '../../utils/facilityScoring';
import { designTokens } from "@/styles/design-tokens";

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
      // If users slider is at maximum (16), include all facilities with Users Min >= 16
      if (searchParams.users === 16 && facility["Users Min"] && facility["Users Min"] >= 16) {
        return { facility, score: 100 }; // Give maximum score to match the criteria
      }
      
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
            variant="alert"
            className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-[#ff8600] hover:bg-[#cc6d00]"
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
