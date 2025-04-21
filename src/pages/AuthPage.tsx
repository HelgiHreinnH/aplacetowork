
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { H1 } from "@/components/ui/typography";

const AuthPage = () => {
  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/home", { replace: true });
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/home", { replace: true });
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
        toast.error(error.message || "Failed to login.");
      } else {
        toast.success("Logged in!");
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error(error.message || "Failed to register.");
      } else {
        toast.success("Check your email to confirm your account.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f7fe] to-[#eceefd]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border">
        <div className="flex flex-col items-center">
          <img src="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//Icon.png" alt="Workspace icon" className="w-16 h-16 mb-2" />
          <H1 className="!mb-1">A Place to Work</H1>
          <p className="text-[#8E9196] tracking-wide text-sm mb-2">Inspiration for the ideal workspace</p>
        </div>
        <form className="space-y-4" onSubmit={handleAuth}>
          <div>
            <label className="block text-sm font-medium text-[#9b87f5] mb-1" htmlFor="email">Email</label>
            <Input id="email" type="email" autoComplete="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#9b87f5] mb-1" htmlFor="password">Password</label>
            <Input id="password" type="password" autoComplete={view === "signup" ? "new-password" : "current-password"} required value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
          </div>
          <Button type="submit" variant="default" className="w-full mt-3" disabled={loading}>
            {loading ? (view === "login" ? "Logging in" : "Signing up") + "..." : (view === "login" ? "Log In" : "Sign Up")}
          </Button>
        </form>
        <div className="flex flex-col items-center space-y-1 pt-2">
          <span className="text-xs text-muted-foreground">
            {view === "login" ? "No account yet?" : "Already have an account?"}
          </span>
          <Button variant="link" className="p-0 h-auto text-[#9b87f5]" type="button" onClick={() => setView(view === "login" ? "signup" : "login")}>
            {view === "login" ? "Create a new account" : "Back to login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
