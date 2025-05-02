
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const ProtectedRoute = () => {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

const LogoutButton = () => {
  const [session, setSession] = useState<any | null>(null);
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);
  if (!session) return null;
  return (
    <Button
      variant="secondary"
      size="sm"
      className="absolute right-4 top-4 z-50"
      onClick={() => { supabase.auth.signOut(); window.location.href = "/"; }}
    >
      Log out
    </Button>
  );
};

const RouteWithOverlay = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const showOverlay = location.pathname.startsWith('/card-overlay/');

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<SearchLayout />}>
            <Route path="/home" element={<><LogoutButton /><Index /></>} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/favorites" element={<FavoriteFacilities />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/overview" element={<FacilityOverview />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route element={<DesignLayout />}>
            <Route path="/design">
              <Route path="card-front" element={<CardFrontPage />} />
              <Route path="card-back" element={<CardBackPage />} />
              <Route path="interactive" element={<CardDesignPage />} />
              <Route path="overview" element={<FacilityOverview />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      {showOverlay && (
        <Routes>
          <Route path="/card-overlay/:facilityId" element={<CardOverlay />} />
        </Routes>
      )}
    </>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <RouteWithOverlay />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
