import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { H1 } from "@/components/ui/typography";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

const LandingPage = () => {
  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // Check if onboarding is completed
        const onboardingCompleted = localStorage.getItem('onboardingCompleted');
        if (onboardingCompleted === 'true') {
          navigate("/home", { replace: true });
        } else {
          setShowOnboarding(true);
        }
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // Check if onboarding is completed
        const onboardingCompleted = localStorage.getItem('onboardingCompleted');
        if (onboardingCompleted === 'true') {
          navigate("/home", { replace: true });
        } else {
          setShowOnboarding(true);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (view === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ variant: "destructive", description: error.message || "Failed to login." });
      } else {
        toast({ description: "Logged in!" });
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast({ variant: "destructive", description: error.message || "Failed to register." });
      } else {
        toast({ description: "Check your email to confirm your account." });
      }
    }
    setLoading(false);
  };

  // If onboarding should be shown, render it
  if (showOnboarding) {
    return <OnboardingFlow />;
  }

  // Otherwise render the landing page with auth
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8f7fe] via-[#eceefd] to-[#f1f0fb] flex flex-col items-center justify-between px-2">
      {/* Top intro section */}
      <header className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center pt-16 pb-10">
        <img
          src="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//Icon.png"
          alt="Workspace icon"
          className="w-20 h-20 mb-5 drop-shadow-xl"
          draggable={false}
        />
        <H1 className="!text-4xl sm:!text-5xl !mb-4 !text-[#3f00ff] drop-shadow">A Place to Work</H1>
        <p className="font-inter text-lg sm:text-xl text-[#8E9196] max-w-xl text-center mb-2">
          Discover and get inspired by different workplace settings. Find your ideal workspace—whether it's a <span className="font-semibold text-[#3f00ff]">Work Table</span>, <span className="font-semibold text-[#3f00ff]">Lounge Area</span>, <span className="font-semibold text-[#3f00ff]">Meeting Room</span>, or <span className="font-semibold text-[#3f00ff]">Open Area</span>.
        </p>
        <p className="text-sm text-muted-foreground mb-1">Facility managers & HR professionals: start your journey now by creating an account.</p>
      </header>

      {/* Auth card section */}
      <main className="w-full flex justify-center items-center pb-16">
        <div className="w-[370px] max-w-full bg-white rounded-2xl shadow-lg p-7 space-y-5 border border-[#eceefd] flex flex-col items-center">
          <form className="space-y-4 w-full" onSubmit={handleAuth} aria-label={view === "login" ? "Login Form" : "Sign up Form"}>
            <div>
              <label className="block text-xs font-semibold text-[#3f00ff] mb-1" htmlFor="email">Email</label>
              <Input id="email" type="email" autoComplete="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3f00ff] mb-1" htmlFor="password">Password</label>
              <Input id="password" type="password" autoComplete={view === "signup" ? "new-password" : "current-password"} required value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
            </div>
            <Button type="submit" variant="main" className="w-full mt-2" disabled={loading}>
              {loading ? (view === "login" ? "Logging in" : "Signing up") + "..." : (view === "login" ? "Log In" : "Sign Up")}
            </Button>
          </form>
          <div className="flex flex-col items-center space-y-1 pt-0">
            <span className="text-xs text-muted-foreground">
              {view === "login" ? "No account yet?" : "Already have an account?"}
            </span>
            <Button variant="link" className="p-0 h-auto text-[#3f00ff]" type="button" onClick={() => setView(view === "login" ? "signup" : "login")}>
              {view === "login" ? "Create a new account" : "Back to login"}
            </Button>
          </div>
        </div>
      </main>

      {/* Optional: Add some visual inspiration at page bottom */}
      <footer className="w-full text-center font-inter text-xs text-[#8E9196] pb-5">
        &copy; {new Date().getFullYear()} A Place to Work. Inspiration for the ideal workspace.
      </footer>
    </div>
  );
};

export default LandingPage;
