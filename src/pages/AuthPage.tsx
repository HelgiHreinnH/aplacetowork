
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { H1 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin } from "lucide-react";

const AuthPage = () => {
  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    
    try {
      if (view === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          console.error("Login error:", error);
          toast.error(error.message || "Failed to login.");
        } else {
          toast.success("Logged in!");
        }
      } else {
        // Enhanced signup process with additional metadata for a complete user record
        const { error, data } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              signup_initiated_at: new Date().toISOString(),
              onboarding_required: true
            },
            emailRedirectTo: window.location.origin + '/home'
          }
        });
        
        if (error) {
          console.error("Signup error:", error);
          toast.error(error.message || "Failed to register.");
        } else {
          console.log("Signup successful:", data);
          
          // Send welcome email through edge function
          try {
            const { error: welcomeEmailError } = await supabase.functions.invoke('send-welcome-email', {
              body: { 
                email, 
                redirectUrl: window.location.origin + '/home'
              }
            });
            
            if (welcomeEmailError) {
              console.warn("Welcome email could not be sent:", welcomeEmailError);
            }
          } catch (emailError) {
            console.warn("Error calling welcome email function:", emailError);
          }
          
          toast.success(
            "Account created! Please check your email to confirm your registration."
          );
        }
      }
    } catch (error) {
      console.error("Auth process error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/home'
        }
      });
      if (error) toast.error(error.message);
    } catch (error) {
      toast.error("Failed to sign in with Google");
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: window.location.origin + '/home'
        }
      });
      if (error) toast.error(error.message);
    } catch (error) {
      toast.error("Failed to sign in with LinkedIn");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f7fe] to-[#eceefd]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border">
        <div className="flex flex-col items-center">
          <img src="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//Icon.png" alt="Workspace icon" className="w-16 h-16 mb-2" />
          <H1 className="!mb-1">A Place to Work</H1>
          <p className="text-[#8E9196] tracking-wide text-sm mb-2">Inspiration for the ideal workspace</p>
        </div>
        
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2" 
            onClick={handleGoogleSignIn}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLinkedInSignIn}
          >
            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            Continue with LinkedIn
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleAuth}>
          <div>
            <label className="block text-sm font-medium text-[#9b87f5] mb-1" htmlFor="email">Email</label>
            <Input 
              id="email" 
              type="email" 
              autoComplete="email" 
              required 
              placeholder="you@email.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              disabled={loading} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#9b87f5] mb-1" htmlFor="password">Password</label>
            <Input 
              id="password" 
              type="password" 
              autoComplete={view === "signup" ? "new-password" : "current-password"} 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              disabled={loading} 
            />
          </div>
          <Button type="submit" variant="default" className="w-full mt-3" disabled={loading}>
            {loading ? (view === "login" ? "Logging in" : "Signing up") + "..." : (view === "login" ? "Log In" : "Sign Up")}
          </Button>
        </form>
        
        <div className="flex flex-col items-center space-y-1 pt-0">
          <span className="text-xs text-muted-foreground">
            {view === "login" ? "No account yet?" : "Already have an account?"}
          </span>
          <Button 
            variant="link" 
            className="p-0 h-auto text-[#9b87f5]" 
            type="button" 
            onClick={() => setView(view === "login" ? "signup" : "login")}
          >
            {view === "login" ? "Create a new account" : "Back to login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
