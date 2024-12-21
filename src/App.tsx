import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import SearchResults from './pages/SearchResults';
import FacilityOverview from './pages/FacilityOverview';
import CardFrontPage from './pages/CardFrontPage';
import CardBackPage from './pages/CardBackPage';
import DesignOverview from './pages/DesignOverview';
import SearchLayout from './layouts/SearchLayout';
import DesignLayout from './layouts/DesignLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<SearchLayout />}>
            <Route path="/search/results" element={<SearchResults />} />
          </Route>
          <Route element={<DesignLayout />}>
            <Route path="/design/overview" element={<DesignOverview />} />
            <Route path="/design/card-front" element={<CardFrontPage />} />
            <Route path="/design/card-back" element={<CardBackPage />} />
          </Route>
          <Route path="/facility/overview" element={<FacilityOverview />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;