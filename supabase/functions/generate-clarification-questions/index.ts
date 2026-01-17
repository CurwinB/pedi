import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ClarificationQuestion {
  title: string;
  type: 'checkbox' | 'radio';
  options: string[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    console.log('Received request with query:', query);
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    console.log('LOVABLE_API_KEY available:', !!apiKey);
    
    if (!apiKey) {
      console.error('LOVABLE_API_KEY not found in environment');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
- For questions requiring additional detail, you can reference "comments section" or "additional details section"

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

    console.log('Making request to Lovable AI...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      console.error(`Lovable AI API error: ${response.status} - ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate questions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Lovable AI response received successfully');
    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content;
    
    if (!generatedText) {
      console.error('No content in API response');
      return new Response(
        JSON.stringify({ error: 'No response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('Generated text from Lovable AI:', generatedText.substring(0, 200) + '...');
    
    // Parse the JSON response
    let questions: ClarificationQuestion[];
    try {
      // Clean up the response to extract JSON
      let cleanContent = generatedText.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      
      const jsonMatch = cleanContent.match(/\[[\s\S]*\]/);
      const jsonText = jsonMatch ? jsonMatch[0] : cleanContent;
      questions = JSON.parse(jsonText);
      console.log('Successfully parsed questions:', questions.length, 'questions');
      
      // Ensure we have exactly 6 questions
      if (questions.length !== 6) {
        console.warn(`Expected 6 questions, got ${questions.length}. Using fallback.`);
        throw new Error('Incorrect number of questions generated');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      
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
          options: ["Over-the-counter medications", "Prescription medications", "Natural/herbal remedies", "Home remedies", "Alternative therapies", "No previous treatments"]
        },
        {
          title: `What best describes your experience with ${query}?`,
          type: "radio",
          options: ["First time experiencing this", "Happens occasionally", "Chronic/ongoing issue", "Getting worse recently", "Varies in intensity"]
        }
      ];
    }

    console.log('Final questions for query:', query);

    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-clarification-questions function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate clarification questions',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
