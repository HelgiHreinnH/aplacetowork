
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

const ContactUs = () => {
  const [message, setMessage] = useState('');
  const [needsResponse, setNeedsResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, email')
        .eq('user_id', session?.user?.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error);
      }
      
      return data || { username: session?.user?.email };
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          { 
            message,
            needs_response: needsResponse,
            user_id: session?.user?.id,
            email: session?.user?.email,
            username: profile?.username || session?.user?.email?.split('@')[0]
          }
        ]);
      
      if (error) throw error;
      
      toast.success("Your feedback has been submitted");
      setMessage('');
      setNeedsResponse(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">What are you missing?</h1>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Send us your feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Your message</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what features or workplace settings you'd like to see added"
                className="min-h-[150px]"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="needs-response"
                checked={needsResponse}
                onCheckedChange={setNeedsResponse}
              />
              <Label htmlFor="needs-response">
                I'd like to be notified when this feature is added
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading || !message.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send Feedback
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
