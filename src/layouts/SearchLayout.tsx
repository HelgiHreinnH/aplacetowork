
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StandardBottomNav from "@/components/navigation/StandardBottomNav";
import IndexBottomNav from "@/components/navigation/IndexBottomNav";

export default function SearchLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const isOnboardingPage = location.pathname === "/onboarding";

  // Scroll to top whenever the location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8f7fe] via-[#eceefd] to-[#f1f0fb]">
      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Only show the navigation if not on onboarding page */}
      {!isOnboardingPage && (
        <>
          {isHomePage ? <IndexBottomNav /> : <StandardBottomNav />}
        </>
      )}
    </div>
  );
}
