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

    const prompt = `You are a healthcare professional creating exactly 6 follow-up questions for someone seeking natural remedies for "${query}". Generate questions that a doctor would ask to better understand the patient's condition.

You MUST create exactly these 6 questions in this exact order:

1. ALLERGIES QUESTION: Ask about known allergies. Include "None" as an option. If they select anything other than "None," this should trigger follow-up details.

2. AGE GROUP QUESTION: Ask about age group to ensure age-appropriate remedies (child, adult, senior).

3. DURATION/FREQUENCY QUESTION: Ask how long they've had the issue or how often it occurs.

4. ACCOMPANYING SYMPTOMS/CONTEXT QUESTION: Ask about related symptoms or context factors (stress, sleep, digestion, etc.) that might be relevant to "${query}".

5. TREATMENT HISTORY QUESTION: Ask what treatments or remedies they've already tried, including any current medications or natural remedies they're using.

6. CONDITION-SPECIFIC QUESTION: Ask a specific question about "${query}" (e.g., if headache - ask about location/triggers, if stomach pain - ask about timing/food relation).

Requirements:
- Each question should have 4-6 relevant options
- Use "radio" type for single-choice questions, "checkbox" for multiple-choice
- Make questions medically relevant and specific to "${query}"
- Questions should sound like what a healthcare provider would ask

Return ONLY a valid JSON array with exactly 6 questions in this structure:
[
  {
    "title": "Do you have any known allergies or sensitivities?",
    "type": "checkbox",
    "options": ["Medication allergies", "Food allergies", "Environmental allergies", "Skin sensitivities", "Plant/herb allergies", "None"]
  },
  {
    "title": "What is your age group?",
    "type": "radio", 
    "options": ["Child (under 12)", "Teen (12-17)", "Adult (18-64)", "Senior (65+)"]
  }
  ... (continue with remaining 4 questions)
]

Make the questions specific to "${query}" and medically appropriate. Return valid JSON only.`;

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
          temperature: 0.3,
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
      // Clean up the response to extract JSON
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      const jsonText = jsonMatch ? jsonMatch[0] : generatedText.trim();
      questions = JSON.parse(jsonText);
      console.log('Successfully parsed questions:', questions.length, 'questions');
      
      // Ensure we have exactly 6 questions
      if (questions.length !== 6) {
        console.warn(`Expected 6 questions, got ${questions.length}. Using fallback.`);
        throw new Error('Incorrect number of questions generated');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', generatedText);
      console.error('Parse error:', parseError);
      
      // Fallback questions - exactly 6 structured questions
      questions = [
        {
          title: "Do you have any known allergies or sensitivities?",
          type: "checkbox",
          options: ["Medication allergies", "Food allergies", "Environmental allergies", "Skin sensitivities", "Plant/herb allergies", "None"]
        },
        {
          title: "What is your age group?",
          type: "radio",
          options: ["Child (under 12)", "Teen (12-17)", "Adult (18-64)", "Senior (65+)"]
        },
        {
          title: "How long have you been experiencing this condition?",
          type: "radio",
          options: ["Less than 1 week", "1-4 weeks", "1-6 months", "More than 6 months", "This is recurring/ongoing"]
        },
        {
          title: "Are you experiencing any accompanying symptoms or factors?",
          type: "checkbox",
          options: ["Stress or anxiety", "Sleep issues", "Digestive problems", "Fatigue", "Changes in appetite", "None of these"]
        },
        {
          title: "Have you tried any treatments or remedies for this condition?",
          type: "checkbox",
          options: ["Over-the-counter medications", "Prescription medications", "Natural remedies", "Home remedies", "Alternative therapies", "No previous treatments"]
        },
        {
          title: `What best describes your experience with ${query}?`,
          type: "radio",
          options: ["First time experiencing this", "Happens occasionally", "Chronic/ongoing issue", "Getting worse recently", "Varies in intensity"]
        }
      ];
    }

    console.log('Final questions for query:', query, questions);

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