
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FeedbackRequest {
  message: string;
  userEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request has proper authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized request' }),
        { 
          status: 401, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Parse the request body
    const { message, userEmail }: FeedbackRequest = await req.json();
    
    // Basic input validation
    if (!message || message.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Message cannot be empty' }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    if (!userEmail || !userEmail.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Sanitize inputs to prevent injection attacks
    const sanitizedMessage = message.replace(/<[^>]*>?/gm, '');
    
    // Send email with sanitized content
    const emailResponse = await resend.emails.send({
      from: "Feedback <feedback@aplacetowork.dk>",
      to: ["support@aplacetowork.dk"],
      subject: `Feedback / Request from ${userEmail}`,
      text: sanitizedMessage,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      messageId: emailResponse.id 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending feedback:", error);
    return new Response(JSON.stringify({ 
      error: "An error occurred processing your request",
      details: error.message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
