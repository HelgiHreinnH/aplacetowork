
import React from 'react'
import './App.css'
import { Toaster } from '@/components/ui/toaster'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import WorkplaceSettings from '@/components/workplace/WorkplaceSettings'
import UserSettings from '@/pages/UserSettings'
import Index from '@/pages/Index'
import SearchResults from '@/pages/SearchResults'
import FacilityOverview from '@/pages/FacilityOverview'
import FavoriteFacilities from '@/pages/FavoriteFacilities'
import LandingPage from '@/pages/LandingPage'
import SearchLayout from '@/layouts/SearchLayout'
import DesignLayout from '@/layouts/DesignLayout'
import About from '@/pages/About'
import ContactUs from '@/pages/ContactUs'
import CardDesignPage from '@/pages/CardDesignPage'
import CardOverlay from '@/components/overlay/CardOverlay'
import DesignSystemPage from '@/pages/DesignSystemPage'
import OnboardingFlow from '@/components/onboarding/OnboardingFlow'
import AuthPage from '@/pages/AuthPage'

function App() {
  return (
    <Router>
      <RoutesWithOverlay />
      <Toaster />
    </Router>
  );
}

function RoutesWithOverlay() {
  const location = useLocation();
  const background = location.state?.backgroundLocation;

  return (
    <>
      <Routes location={background || location}>
        {/* Auth Routes - No Navigation */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Design System Routes */}
        <Route path="/design" element={<DesignLayout />}>
          <Route index element={<WorkplaceSettings />} />
          <Route path="system" element={<DesignSystemPage />} />
        </Route>

        {/* Main Application Routes with Navigation */}
        <Route path="/" element={<SearchLayout />}>
          <Route path="home" element={<Index />} />
          <Route path="search-results" element={<SearchResults />} />
          <Route path="facility/:id" element={<FacilityOverview />} />
          <Route path="overview" element={<FacilityOverview />} />
          <Route path="favorites" element={<FavoriteFacilities />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="workplace-settings" element={<WorkplaceSettings />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="card-design" element={<CardDesignPage />} />
          <Route path="design-system" element={<DesignSystemPage />} />
          <Route path="onboarding" element={<OnboardingFlow />} />
        </Route>
      </Routes>

      {/* Show the overlay when a background location exists */}
      {background && (
        <Routes>
          <Route path="/card-overlay/:facilityId" element={<CardOverlay />} />
        </Routes>
      )}
    </>
  );
}

export default App
