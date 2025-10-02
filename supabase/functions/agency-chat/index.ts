import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const AGENCY_CONTEXT = `You are an AI assistant for Epilog Creative, a story & data-driven digital agency based in Jakarta, Indonesia.

ABOUT EPILOG CREATIVE:
- Mission: We partner with businesses of all sizes, from local startups to global brands seeking growth
- Expertise: Story and data-driven digital marketing strategies
- Location: Based in Jakarta, Indonesia
- Approach: All-inclusive digital marketing services with expert counsel, state-of-the-art resources, and a seasoned team

SERVICES:
1. Digital Marketing Strategy
   - Comprehensive digital marketing campaigns
   - Data-driven approach with measurable outcomes
   - Bespoke strategies tailored to business objectives and budget

2. Corporate Training
   - Marketing and digital skills training
   - Custom programs for teams

3. Video Production
   - Professional video content creation
   - Marketing and promotional videos

4. Digital Advertising
   - Paid advertising campaigns
   - Social media advertising
   - Performance optimization

5. Social Media Management
   - Content strategy and creation
   - Community management
   - Award-winning campaigns

NOTABLE CLIENTS:
Financial: BCA, Commonwealth Bank, BSI Bank, OCBC NISP
Healthcare: Kalbe Nutritionals, ERHA Dermatology
Logistics: JNE, Angkasa Pura Airports
Retail: Erajaya, Allianz
And many more leading brands

UNIQUE VALUE PROPOSITION:
- Simplifying the process of creating triumphant marketing strategies
- Emphasis on quantifiable outcomes and measurable ROI
- Tailor-made plans for specific requirements and budget constraints
- Award-winning creative campaigns
- Full partnership approach - "more than just an agency"

SOCIAL MEDIA PLAYBOOK:
Epilog has developed their own "Social Media Playbook" - a guide to creating award-winning campaigns that capture attention, generate buzz, and leave lasting impressions.

Be conversational, friendly, and helpful. Provide specific information about services, approach, and value. If asked about pricing or specific projects, suggest they contact the agency directly for a customized proposal.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: AGENCY_CONTEXT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service error");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
