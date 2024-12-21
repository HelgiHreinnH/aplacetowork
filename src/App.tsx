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
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;