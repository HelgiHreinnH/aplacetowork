
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface WelcomeEmailRequest {
  email: string;
  redirectUrl?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create a Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Get request data
    const { email, redirectUrl } = await req.json() as WelcomeEmailRequest;
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      );
    }

    // Check if Resend API key is available
    if (RESEND_API_KEY) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "A Place To Work <onboarding@resend.dev>",
            to: [email],
            subject: "Welcome to A Place To Work!",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <img src="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//Icon.png" alt="Logo" style="max-width: 80px;">
                  <h1 style="color: #3f00ff; margin: 10px 0;">Welcome to A Place To Work!</h1>
                </div>
                
                <p>Thank you for signing up! We're excited to have you explore different workplace settings with us.</p>
                
                <p>With A Place To Work, you can discover:</p>
                <ul style="padding-left: 20px; margin: 15px 0;">
                  <li>Work Tables - Perfect for focused individual work</li>
                  <li>Lounge Areas - Comfortable spaces for casual collaboration</li>
                  <li>Meeting Rooms - For structured group discussions</li>
                  <li>Open Areas - Versatile spaces for various activities</li>
                </ul>
                
                <p>To get started, simply log in to your account and explore the various workplace settings.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${redirectUrl || 'https://test.aplacetowork.dk/home'}" style="background-color: #3f00ff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Exploring Now</a>
                </div>
                
                <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                
                <p>Best regards,<br>The A Place To Work Team</p>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center;">
                  &copy; ${new Date().getFullYear()} A Place to Work. All rights reserved.<br>
                  This email was sent to ${email}
                </div>
              </div>
            `,
          }),
        });
        
        const resendData = await resendResponse.json();
        console.log("Welcome email sent via Resend:", resendData);
      } catch (resendError) {
        console.error("Error sending welcome email via Resend:", resendError);
        // Don't fail the function if email sending fails
      }
    } else {
      console.log("No RESEND_API_KEY found, skipping welcome email");
    }

    // Return success even if email failed - we don't want to block user signup
    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );

  } catch (error) {
    console.error("Error in send-welcome-email function:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }
});
