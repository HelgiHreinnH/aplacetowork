
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Grid, Heart, Settings, MessageSquare, Info, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const MenuSheet = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // First clear local storage regardless of API success
      localStorage.removeItem('onboardingCompleted');
      
      try {
        // Attempt to sign out via the API
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.warn("API logout error:", error);
          // Continue with local logout even if API fails
        }
      } catch (signOutError) {
        // Log the error but continue with local logout
        console.warn("Failed API logout:", signOutError);
      }
      
      // Always close the menu sheet
      setIsOpen(false);
      
      // Clear any auth state from localStorage that might be cached by Supabase
      try {
        // Force clear any auth data that might be in localStorage
        const authKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.includes('supabase.auth') || key.includes('sb-'))) {
            authKeys.push(key);
          }
        }
        
        // Remove all auth-related keys
        authKeys.forEach(key => localStorage.removeItem(key));
      } catch (storageError) {
        console.warn("Error clearing auth storage:", storageError);
      }
      
      toast.success("Successfully logged out");
      
      // Always navigate back to landing page regardless of API success
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error in logout flow:", error);
      toast.error("Failed to log out completely");
      
      // Even if there was an error, try to navigate back to login
      navigate("/", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle escape key to cancel logout if in progress
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isLoggingOut) {
        setIsLoggingOut(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isLoggingOut]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-500 hover:text-gray-900 h-14 w-14" 
        >
          <Menu className="h-7 w-7" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="fixed inset-x-0 bottom-0 w-[90%] max-w-md mx-auto h-[65vh] rounded-t-3xl border-t-0 pb-10 origin-bottom animate-slide-up z-40 bg-white overflow-y-auto"
      >
        <nav className="flex flex-col gap-2 mt-3">
          <Link to="/overview" className="flex items-center gap-3 px-4 py-2.5 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Grid className="h-5 w-5" />
            <span>All Facilities</span>
          </Link>
          <Link to="/favorites" className="flex items-center gap-3 px-4 py-2.5 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Heart className="h-5 w-5" />
            <span>Favourites</span>
          </Link>
          <Link to="/contact" className="flex items-center gap-3 px-4 py-2.5 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <MessageSquare className="h-5 w-5" />
            <span>What are you missing?</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <Link to="/about" className="flex items-center gap-3 px-4 py-2.5 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Info className="h-5 w-5" />
            <span>About</span>
          </Link>
          
          <div className="mt-8 border-t pt-6">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-3 px-4 py-4 text-sm rounded-md hover:bg-accent/10 transition-colors text-red-600"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="h-5 w-5" />
              <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
