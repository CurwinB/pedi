import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ClarificationQuestion {
  title: string;
  type: 'checkbox' | 'radio';
  options: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      throw new Error('Query parameter is required');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `You are a helpful assistant that generates clarification questions for natural remedy searches. 

For the search query "${query}", generate 2-3 relevant clarification questions that would help provide better natural remedy recommendations. 

Each question should help understand:
- Specific symptoms or manifestations
- Severity or duration 
- Any relevant health context
- Age group considerations

Always include "This is for general knowledge only" as an option in at least one question.

Return ONLY a valid JSON array with this exact structure:
[
  {
    "title": "What specific symptoms are you experiencing?",
    "type": "checkbox",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4", "This is for general knowledge only"]
  },
  {
    "title": "How long have you been experiencing this?",
    "type": "radio", 
    "options": ["Less than a week", "1-4 weeks", "1-6 months", "More than 6 months", "This is for general knowledge only"]
  }
]

Make sure:
- 2-3 questions maximum
- 3-6 options per question
- Include "This is for general knowledge only" as an option
- Questions are relevant to "${query}"
- Use either "checkbox" or "radio" as appropriate
- Return valid JSON only, no other text`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response from Gemini
    let questions: ClarificationQuestion[];
    try {
      questions = JSON.parse(generatedText.trim());
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', generatedText);
      // Fallback questions
      questions = [
        {
          title: "What are your specific symptoms?",
          type: "checkbox",
          options: ["Mild discomfort", "Moderate symptoms", "Severe symptoms", "This is for general knowledge only"]
        },
        {
          title: "How long have you been experiencing this?",
          type: "radio",
          options: ["Less than a week", "1-4 weeks", "1-6 months", "More than 6 months", "This is for general knowledge only"]
        }
      ];
    }

    console.log('Generated questions for query:', query, questions);

    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-clarification-questions function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate clarification questions',
        details: error.message 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});