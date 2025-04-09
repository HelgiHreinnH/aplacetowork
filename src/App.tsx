
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CardFrontPage from "./pages/CardFrontPage";
import CardBackPage from "./pages/CardBackPage";
import CardDesignPage from "./pages/CardDesignPage";
import FacilityOverview from "./pages/FacilityOverview";
import SearchResults from "./pages/SearchResults";
import SearchLayout from "./layouts/SearchLayout";
import DesignLayout from "./layouts/DesignLayout";
import UserSettings from "./pages/UserSettings";
import FavoriteFacilities from "./pages/FavoriteFacilities";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import CardOverlay from "./components/overlay/CardOverlay";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Search Journey Routes */}
          <Route element={<SearchLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/favorites" element={<FavoriteFacilities />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/overview" element={<FacilityOverview />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Design Routes */}
          <Route element={<DesignLayout />}>
            <Route path="/design">
              <Route path="card-front" element={<CardFrontPage />} />
              <Route path="card-back" element={<CardBackPage />} />
              <Route path="interactive" element={<CardDesignPage />} />
              <Route path="overview" element={<FacilityOverview />} />
            </Route>
          </Route>

          {/* Overlay Routes */}
          <Route path="/card-overlay/:facilityId" element={<CardOverlay />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
