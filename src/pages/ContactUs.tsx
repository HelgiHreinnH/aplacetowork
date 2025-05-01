
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import TitleContainer from '@/components/containers/TitleContainer';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface FeedbackMessage {
  message: string;
  timestamp: Date;
}

const ContactUs = () => {
  const [message, setMessage] = useState('');
  const [needsResponse, setNeedsResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([]);
  const [showLocalWarning, setShowLocalWarning] = useState(false);

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    if (!session) {
      toast.error("You must be logged in to send feedback");
      return;
    }
    
    setLoading(true);
    
    try {
      // Get the user's auth token for secure API calls
      const { data: authData } = await supabase.auth.getSession();
      const authToken = authData.session?.access_token;
      
      if (!authToken) {
        throw new Error("Authentication failed");
      }
      
      // Send email via edge function with auth token
      const { data, error } = await supabase.functions.invoke('send-feedback', {
        body: {
          message: message,
          userEmail: session?.user?.email || 'Anonymous User',
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });

      if (error) throw error;
      
      // Check if we got a warning (API key not configured)
      if (data?.warning) {
        setShowLocalWarning(true);
      }

      // Add message to local display
      setFeedbackMessages(prev => [...prev, {
        message: message,
        timestamp: new Date(),
      }]);

      toast.success("Your feedback has been submitted");
      setMessage('');
      setNeedsResponse(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <h1 className="text-2xl font-bold mb-6">What are you missing?</h1>
          
          <Card className="shadow-md mb-6">
            <CardHeader>
              <CardTitle>Send us your feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {showLocalWarning && (
                <Alert className="mb-4">
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    Your feedback has been recorded locally. Email notifications are currently unavailable.
                  </AlertDescription>
                </Alert>
              )}
              
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
                  disabled={loading || !message.trim() || !session}
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
                
                {!session && (
                  <p className="text-sm text-destructive mt-2">
                    You must be logged in to send feedback
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {feedbackMessages.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Feedback</h2>
              {feedbackMessages.map((feedback, index) => (
                <Card key={index} className="shadow-sm">
                  <CardContent className="pt-4">
                    <p className="text-gray-700">{feedback.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {feedback.timestamp.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

export default ContactUs;
