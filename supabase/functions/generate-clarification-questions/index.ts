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
    
    console.log('Received request with query:', query);
    
    if (!query) {
      throw new Error('Query parameter is required');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    console.log('Gemini API key available:', !!geminiApiKey);
    
    if (!geminiApiKey) {
      console.error('Gemini API key not found in environment');
      throw new Error('Gemini API key not configured');
    }

    const prompt = `You are a medical professional creating clarification questions for someone seeking natural remedies for "${query}". Generate 3-6 relevant questions that a doctor would ask to better understand the patient's condition and provide more targeted natural remedy recommendations.

Focus on questions that would help determine:
- Specific symptoms and their severity/duration
- Triggers or patterns (environmental, dietary, stress-related)
- Current medications or treatments being used
- Age group and any relevant health conditions
- Lifestyle factors that might influence remedy selection
- Allergies or sensitivities to consider

Each question should be medically relevant and help narrow down the most appropriate natural remedies. Always include "This is for general knowledge only" as an option in at least one question.

Examples of good doctor-like questions:
- "How long have you been experiencing these symptoms?" 
- "What seems to trigger or worsen your condition?"
- "Are you currently taking any medications?"
- "Do you have any known allergies or food sensitivities?"
- "What is your age group?" (to determine age-appropriate remedies)
- "How would you rate the severity of your symptoms?"

Return ONLY a valid JSON array with this exact structure:
[
  {
    "title": "How long have you been experiencing symptoms related to ${query}?",
    "type": "radio",
    "options": ["Less than 1 week", "1-4 weeks", "1-6 months", "More than 6 months", "This is for general knowledge only"]
  },
  {
    "title": "What seems to trigger or worsen your condition?",
    "type": "checkbox", 
    "options": ["Stress", "Certain foods", "Weather changes", "Physical activity", "Environmental factors", "This is for general knowledge only"]
  }
]

Make sure:
- 3-6 questions maximum
- Questions are specific to "${query}" and medically relevant
- Include both "checkbox" and "radio" types as appropriate
- 4-6 options per question
- Include "This is for general knowledge only" as an option
- Questions help determine the best natural remedies
- Use medical terminology when appropriate but keep accessible
- Return valid JSON only, no other text`;

    console.log('Making request to Gemini API...');
    
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
      console.error(`Gemini API error: ${response.status} - ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    console.log('Gemini API response received successfully');
    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated text from Gemini:', generatedText);
    
    // Parse the JSON response from Gemini
    let questions: ClarificationQuestion[];
    try {
      questions = JSON.parse(generatedText.trim());
      console.log('Successfully parsed questions:', questions.length, 'questions');
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', generatedText);
      console.error('Parse error:', parseError);
      // Fallback questions - more medical/doctor-like
      questions = [
        {
          title: "How long have you been experiencing these symptoms?",
          type: "radio",
          options: ["Less than 1 week", "1-4 weeks", "1-6 months", "More than 6 months", "This is for general knowledge only"]
        },
        {
          title: "What is your age group?",
          type: "radio",
          options: ["Under 18", "18-30 years", "31-50 years", "51-65 years", "Over 65", "This is for general knowledge only"]
        },
        {
          title: "Do you have any known allergies or sensitivities?",
          type: "checkbox",
          options: ["Food allergies", "Environmental allergies", "Medication sensitivities", "Skin sensitivities", "No known allergies", "This is for general knowledge only"]
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