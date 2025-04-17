
import Header from "../overview/Header";

const TitleContainer = () => (
  <div className="flex-none p-3"> {/* Reduced padding from p-4 to p-3 */}
    <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm p-3 mb-2"> {/* Added mb-2 margin bottom */}
      <Header />
    </div>
  </div>
);

export default TitleContainer;
