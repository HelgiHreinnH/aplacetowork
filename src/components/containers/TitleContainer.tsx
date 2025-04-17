
import Header from "../overview/Header";

const TitleContainer = () => (
  <div className="flex-none p-4"> {/* Reduced padding from p-6 to p-4 */}
    <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm p-4"> {/* Reduced padding from p-6 to p-4 */}
      <Header />
    </div>
  </div>
);

export default TitleContainer;
