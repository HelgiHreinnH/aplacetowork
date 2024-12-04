import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CardSearchOutput from "./pages/CardSearchOutput";
import CardFrontPage from "./pages/CardFrontPage";
import CardBackPage from "./pages/CardBackPage";
import CardPage from "./pages/CardPage";
import SearchResults from "./pages/SearchResults";
import CardList from "./pages/CardList";
import SearchLayout from "./layouts/SearchLayout";
import DesignLayout from "./layouts/DesignLayout";
import ListLayout from "./layouts/ListLayout";

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
            <Route path="/card-overview" element={<CardSearchOutput />} />
          </Route>

          {/* Design Routes */}
          <Route element={<DesignLayout />}>
            <Route path="/design">
              <Route path="card-front" element={<CardFrontPage />} />
              <Route path="card-back" element={<CardBackPage />} />
              <Route path="card" element={<CardPage />} />
              <Route path="card-overview" element={<CardSearchOutput />} />
            </Route>
          </Route>

          {/* List Routes */}
          <Route element={<ListLayout />}>
            <Route path="/list" element={<CardList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;